const express = require('express')
const router = express.Router()
const fs = require('fs').promises
const path = require('path')

// Load sample users data
let users = []
const loadUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, '../data/users.json'), 'utf8')
    users = JSON.parse(data)
  } catch (error) {
    console.error('Error loading users:', error)
    users = []
  }
}

// Initialize users data
loadUsers()

/**
 * Calculate compatibility score between two users
 * @param {Object} user1 - First user
 * @param {Object} user2 - Second user
 * @returns {number} Compatibility score (0-1)
 */
function calculateCompatibility(user1, user2) {
  let score = 0
  let factors = 0
  
  // Work location compatibility (40% weight)
  if (user1.workAddress === user2.workAddress) {
    score += 0.4
  }
  factors += 0.4
  
  // Work time compatibility (30% weight)
  const time1Start = new Date(`2000-01-01T${user1.workStartTime}`)
  const time1End = new Date(`2000-01-01T${user1.workEndTime}`)
  const time2Start = new Date(`2000-01-01T${user2.workStartTime}`)
  const time2End = new Date(`2000-01-01T${user2.workEndTime}`)
  
  const timeOverlap = Math.max(0, Math.min(time1End, time2End) - Math.max(time1Start, time2Start))
  const maxTimeSpan = Math.max(time1End - time1Start, time2End - time2Start)
  const timeCompatibility = maxTimeSpan > 0 ? timeOverlap / maxTimeSpan : 0
  
  score += timeCompatibility * 0.3
  factors += 0.3
  
  // Distance compatibility (20% weight)
  // Mock distance calculation (in real app, use actual distance API)
  const mockDistance = Math.random() * 10 // 0-10 miles
  const maxDistance = Math.min(user1.preferences?.maxDistance || 5, user2.preferences?.maxDistance || 5)
  const distanceScore = Math.max(0, 1 - (mockDistance / maxDistance))
  
  score += distanceScore * 0.2
  factors += 0.2
  
  // Preference compatibility (10% weight)
  let preferenceScore = 0
  if (user1.preferences && user2.preferences) {
    const prefs1 = user1.preferences
    const prefs2 = user2.preferences
    
    // Music preference
    if (prefs1.musicPreference === prefs2.musicPreference || 
        prefs1.musicPreference === 'any' || 
        prefs2.musicPreference === 'any') {
      preferenceScore += 0.3
    }
    
    // Conversation level
    if (prefs1.conversationLevel === prefs2.conversationLevel) {
      preferenceScore += 0.3
    }
    
    // Smoking preference
    if (prefs1.smokingAllowed === prefs2.smokingAllowed) {
      preferenceScore += 0.4
    }
  }
  
  score += preferenceScore * 0.1
  factors += 0.1
  
  return factors > 0 ? score / factors : 0
}

/**
 * Generate mock matches for a user
 * @param {string} userId - User ID
 * @returns {Array} Array of potential matches
 */
function generateMatches(userId) {
  const currentUser = users.find(user => user.id === userId)
  if (!currentUser) {
    return []
  }
  
  const matches = users
    .filter(user => user.id !== userId) // Exclude current user
    .map(user => {
      const compatibility = calculateCompatibility(currentUser, user)
      
      // Mock additional data for display
      const mockDistance = Math.random() * 10
      const mockGroupSize = Math.floor(Math.random() * 3) + 2 // 2-4 people
      
      return {
        id: user.id,
        name: user.name,
        workCompany: user.workAddress.split(',')[0], // Extract company name
        homeDistance: Math.round(mockDistance * 10) / 10,
        workStartTime: user.workStartTime,
        workEndTime: user.workEndTime,
        hasCar: user.hasCar,
        carModel: user.carModel,
        groupSize: mockGroupSize,
        groupId: `group_${user.id}_${Date.now()}`,
        compatibility,
        preferences: [
          user.preferences?.musicPreference || 'any',
          user.preferences?.conversationLevel || 'moderate',
          user.hasCar ? 'Driver' : 'Passenger'
        ].filter(Boolean)
      }
    })
    .filter(match => match.compatibility > 0.3) // Only show matches with >30% compatibility
    .sort((a, b) => b.compatibility - a.compatibility) // Sort by compatibility
    .slice(0, 5) // Return top 5 matches
  
  return matches
}

/**
 * GET /api/match/:userId
 * Get potential matches for a user
 */
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    // Reload users data to get latest
    await loadUsers()
    
    const matches = generateMatches(userId)
    
    res.json(matches)
  } catch (error) {
    console.error('Error fetching matches:', error)
    res.status(500).json({ error: 'Failed to fetch matches' })
  }
})

module.exports = router

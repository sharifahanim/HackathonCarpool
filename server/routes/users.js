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
 * POST /api/users
 * Save or update user information
 */
router.post('/', async (req, res) => {
  try {
    const userData = req.body
    
    // Validate required fields
    if (!userData.id || !userData.name || !userData.email) {
      return res.status(400).json({ 
        error: 'Missing required fields: id, name, email' 
      })
    }
    
    // Check if user exists
    const existingUserIndex = users.findIndex(user => user.id === userData.id)
    
    if (existingUserIndex >= 0) {
      // Update existing user
      users[existingUserIndex] = {
        ...users[existingUserIndex],
        ...userData,
        updatedAt: new Date().toISOString()
      }
    } else {
      // Create new user
      const newUser = {
        ...userData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      users.push(newUser)
    }
    
    // Save to file (in a real app, this would be saved to database)
    await fs.writeFile(
      path.join(__dirname, '../data/users.json'), 
      JSON.stringify(users, null, 2)
    )
    
    res.json({ 
      success: true, 
      message: 'User saved successfully',
      user: existingUserIndex >= 0 ? users[existingUserIndex] : users[users.length - 1]
    })
  } catch (error) {
    console.error('Error saving user:', error)
    res.status(500).json({ error: 'Failed to save user' })
  }
})

/**
 * GET /api/users/:id
 * Get user by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const user = users.find(user => user.id === id)
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

/**
 * GET /api/users
 * Get all users (for debugging)
 */
router.get('/', async (req, res) => {
  try {
    res.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

module.exports = router

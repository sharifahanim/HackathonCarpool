const express = require('express')
const router = express.Router()
const { createRotationSchedule } = require('../utils/rotation')
const fs = require('fs').promises
const path = require('path')

// In-memory storage for groups (in production, use database)
let groups = []

/**
 * POST /api/group
 * Create a new carpool group with rotation schedule
 */
router.post('/', async (req, res) => {
  try {
    const { name, members, pickupTime = '08:30' } = req.body
    
    // Validate required fields
    if (!name || !members || !Array.isArray(members) || members.length < 2) {
      return res.status(400).json({ 
        error: 'Group must have a name and at least 2 members' 
      })
    }
    
    // Check if there are any drivers in the group
    const drivers = members.filter(member => member.hasCar && member.carCapacity > 1)
    if (drivers.length === 0) {
      return res.status(400).json({ 
        error: 'Group must have at least one driver' 
      })
    }
    
    // Create rotation schedule
    const schedule = createRotationSchedule(members)
    
    // Create group object
    const group = {
      id: `group_${Date.now()}`,
      name,
      members,
      schedule,
      pickupTime,
      pickupPoints: [], // Will be populated by group members
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    // Add to groups array
    groups.push(group)
    
    res.status(201).json({
      success: true,
      message: 'Group created successfully',
      group
    })
  } catch (error) {
    console.error('Error creating group:', error)
    res.status(500).json({ error: error.message || 'Failed to create group' })
  }
})

/**
 * GET /api/group/:groupId
 * Get group details
 */
router.get('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params
    const group = groups.find(g => g.id === groupId)
    
    if (!group) {
      return res.status(404).json({ error: 'Group not found' })
    }
    
    res.json(group)
  } catch (error) {
    console.error('Error fetching group:', error)
    res.status(500).json({ error: 'Failed to fetch group' })
  }
})

/**
 * PUT /api/group/:groupId
 * Update group information
 */
router.put('/:groupId', async (req, res) => {
  try {
    const { groupId } = req.params
    const updates = req.body
    
    const groupIndex = groups.findIndex(g => g.id === groupId)
    if (groupIndex === -1) {
      return res.status(404).json({ error: 'Group not found' })
    }
    
    // Update group
    groups[groupIndex] = {
      ...groups[groupIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    // If members were updated, regenerate schedule
    if (updates.members) {
      try {
        groups[groupIndex].schedule = createRotationSchedule(updates.members)
      } catch (error) {
        return res.status(400).json({ error: error.message })
      }
    }
    
    res.json({
      success: true,
      message: 'Group updated successfully',
      group: groups[groupIndex]
    })
  } catch (error) {
    console.error('Error updating group:', error)
    res.status(500).json({ error: 'Failed to update group' })
  }
})

/**
 * POST /api/group/:groupId/join
 * Add a member to the group
 */
router.post('/:groupId/join', async (req, res) => {
  try {
    const { groupId } = req.params
    const { member } = req.body
    
    if (!member) {
      return res.status(400).json({ error: 'Member data is required' })
    }
    
    const groupIndex = groups.findIndex(g => g.id === groupId)
    if (groupIndex === -1) {
      return res.status(404).json({ error: 'Group not found' })
    }
    
    // Check if member is already in group
    const existingMember = groups[groupIndex].members.find(m => m.id === member.id)
    if (existingMember) {
      return res.status(400).json({ error: 'Member already in group' })
    }
    
    // Add member to group
    groups[groupIndex].members.push(member)
    
    // Regenerate schedule with new member
    try {
      groups[groupIndex].schedule = createRotationSchedule(groups[groupIndex].members)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
    
    groups[groupIndex].updatedAt = new Date().toISOString()
    
    res.json({
      success: true,
      message: 'Member added to group successfully',
      group: groups[groupIndex]
    })
  } catch (error) {
    console.error('Error adding member to group:', error)
    res.status(500).json({ error: 'Failed to add member to group' })
  }
})

/**
 * GET /api/group
 * Get all groups (for debugging)
 */
router.get('/', async (req, res) => {
  try {
    res.json(groups)
  } catch (error) {
    console.error('Error fetching groups:', error)
    res.status(500).json({ error: 'Failed to fetch groups' })
  }
})

module.exports = router

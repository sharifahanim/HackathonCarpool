// API utility functions for frontend
const API_BASE_URL = 'http://localhost:5000/api'

export const api = {
  // User endpoints
  async saveUser(userData) {
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
    return response.json()
  },

  async getUser(userId) {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`)
    return response.json()
  },

  // Match endpoints
  async getMatches(userId) {
    const response = await fetch(`${API_BASE_URL}/match/${userId}`)
    return response.json()
  },

  // Group endpoints
  async createGroup(groupData) {
    const response = await fetch(`${API_BASE_URL}/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(groupData),
    })
    return response.json()
  },

  async getGroup(groupId) {
    const response = await fetch(`${API_BASE_URL}/group/${groupId}`)
    return response.json()
  },

  async updateGroup(groupId, updates) {
    const response = await fetch(`${API_BASE_URL}/group/${groupId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    return response.json()
  },

  async joinGroup(groupId, member) {
    const response = await fetch(`${API_BASE_URL}/group/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ member }),
    })
    return response.json()
  }
}

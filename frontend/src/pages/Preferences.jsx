import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { auth } from '../utils/firebase'

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    maxDistance: 5,
    maxGroupSize: 4,
    preferredDays: [],
    smokingAllowed: false,
    musicPreference: 'any',
    conversationLevel: 'moderate'
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const days = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' }
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        preferences,
        updatedAt: new Date()
      })
      navigate('/matches')
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDayToggle = (dayId) => {
    setPreferences(prev => ({
      ...prev,
      preferredDays: prev.preferredDays.includes(dayId)
        ? prev.preferredDays.filter(d => d !== dayId)
        : [...prev.preferredDays, dayId]
    }))
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Set Your Preferences</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum distance from your route (miles)
              </label>
              <input
                type="range"
                name="maxDistance"
                min="1"
                max="20"
                value={preferences.maxDistance}
                onChange={handleChange}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                {preferences.maxDistance} miles
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum group size
              </label>
              <select
                name="maxGroupSize"
                value={preferences.maxGroupSize}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value={2}>2 people</option>
                <option value={3}>3 people</option>
                <option value={4}>4 people</option>
                <option value={5}>5 people</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred days for carpooling
              </label>
              <div className="grid grid-cols-2 gap-2">
                {days.map(day => (
                  <label key={day.id} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={preferences.preferredDays.includes(day.id)}
                      onChange={() => handleDayToggle(day.id)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-900">{day.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="smokingAllowed"
                id="smokingAllowed"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={preferences.smokingAllowed}
                onChange={handleChange}
              />
              <label htmlFor="smokingAllowed" className="ml-2 block text-sm text-gray-900">
                Smoking allowed in car
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Music preference
              </label>
              <select
                name="musicPreference"
                value={preferences.musicPreference}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="any">Any music</option>
                <option value="quiet">Quiet/No music</option>
                <option value="classical">Classical</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="jazz">Jazz</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conversation level
              </label>
              <select
                name="conversationLevel"
                value={preferences.conversationLevel}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="quiet">Quiet ride</option>
                <option value="moderate">Moderate conversation</option>
                <option value="chatty">Lots of conversation</option>
              </select>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Find Matches'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Preferences

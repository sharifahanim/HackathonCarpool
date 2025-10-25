import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MatchCard from '../components/MatchCard'

const Matches = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      // In a real app, you'd get the user ID from auth context
      const userId = 'user123' // This would come from Firebase auth
      const response = await fetch(`/api/match/${userId}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch matches')
      }
      
      const data = await response.json()
      setMatches(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGroup = (groupId) => {
    // In a real app, you'd make an API call to join the group
    console.log('Joining group:', groupId)
    navigate(`/group/${groupId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading matches...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Error: {error}</div>
          <button
            onClick={fetchMatches}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Carpool Matches</h1>
          <p className="text-gray-600">
            We found {matches.length} potential carpool partners based on your preferences
          </p>
        </div>

        {matches.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your preferences or check back later for new potential matches.
            </p>
            <button
              onClick={() => navigate('/preferences')}
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            >
              Update Preferences
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
                onJoinGroup={handleJoinGroup}
              />
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={fetchMatches}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 transition-colors"
          >
            Refresh Matches
          </button>
        </div>
      </div>
    </div>
  )
}

export default Matches

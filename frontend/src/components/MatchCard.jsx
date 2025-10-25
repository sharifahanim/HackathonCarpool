import { MapPin, Clock, Users, Car } from 'lucide-react'

const MatchCard = ({ match, onJoinGroup }) => {
  const compatibilityScore = Math.round(match.compatibility * 100)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{match.name}</h3>
          <p className="text-sm text-gray-600">{match.workCompany}</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{compatibilityScore}%</div>
          <div className="text-xs text-gray-500">Match</div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span>{match.homeDistance} miles from you</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span>Work: {match.workStartTime} - {match.workEndTime}</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>{match.groupSize} people in group</span>
        </div>
        
        {match.hasCar && (
          <div className="flex items-center text-sm text-gray-600">
            <Car className="h-4 w-4 mr-2" />
            <span>Can drive ({match.carModel})</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {match.preferences.map((pref, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
          >
            {pref}
          </span>
        ))}
      </div>

      <div className="flex space-x-3">
        <button
          onClick={() => onJoinGroup(match.groupId)}
          className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          Join Group
        </button>
        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
          View Profile
        </button>
      </div>
    </div>
  )
}

export default MatchCard

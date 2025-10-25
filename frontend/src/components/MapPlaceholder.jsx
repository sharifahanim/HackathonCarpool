import { MapPin, Navigation } from 'lucide-react'

const MapPlaceholder = ({ pickupPoints = [] }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Navigation className="h-5 w-5 text-primary-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Pickup Points</h3>
      </div>

      <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500">Interactive Map Coming Soon</p>
          <p className="text-sm text-gray-400">This will show pickup locations and routes</p>
        </div>
      </div>

      {pickupPoints.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900">Current Pickup Points:</h4>
          {pickupPoints.map((point, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full mr-2"></div>
              <span>{point.address}</span>
              <span className="ml-auto text-gray-500">{point.time}</span>
            </div>
          ))}
        </div>
      )}

      {pickupPoints.length === 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">
            No pickup points set yet. Group members can add their preferred pickup locations.
          </p>
        </div>
      )}
    </div>
  )
}

export default MapPlaceholder

import { Calendar, User, Car } from 'lucide-react'

const RotationCard = ({ schedule, currentUser }) => {
  const getDayName = (dayIndex) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    return days[dayIndex]
  }

  const isCurrentUserDriver = (driverId) => {
    return driverId === currentUser?.id
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Calendar className="h-5 w-5 text-primary-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Driver Rotation Schedule</h3>
      </div>

      <div className="space-y-3">
        {schedule.map((day, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-md ${
              isCurrentUserDriver(day.driverId)
                ? 'bg-primary-50 border border-primary-200'
                : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-sm font-medium text-primary-700">
                  {day.driverName.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-medium text-gray-900">{day.driverName}</div>
                <div className="text-sm text-gray-600">{getDayName(index)}</div>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              {day.hasCar && (
                <div className="flex items-center mr-2">
                  <Car className="h-4 w-4 mr-1" />
                  <span>{day.carModel}</span>
                </div>
              )}
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{day.passengerCount} passengers</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Drivers are responsible for pickup times and routes. 
          Contact your group members for specific pickup locations and times.
        </p>
      </div>
    </div>
  )
}

export default RotationCard

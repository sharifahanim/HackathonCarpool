import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import RotationCard from '../components/RotationCard'
import MapPlaceholder from '../components/MapPlaceholder'
import { Users, MessageCircle, Settings, Calendar } from 'lucide-react'

const GroupDashboard = () => {
  const { groupId } = useParams()
  const [group, setGroup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('schedule')

  useEffect(() => {
    // In a real app, you'd fetch group data from the API
    // For now, we'll use mock data
    const mockGroup = {
      id: groupId,
      name: 'Downtown Commuters',
      members: [
        { id: '1', name: 'John Smith', hasCar: true, carModel: 'Toyota Camry 2020' },
        { id: '2', name: 'Sarah Johnson', hasCar: false },
        { id: '3', name: 'Mike Chen', hasCar: true, carModel: 'Honda Civic 2019' },
        { id: '4', name: 'Emily Davis', hasCar: false }
      ],
      schedule: [
        { driverId: '1', driverName: 'John Smith', hasCar: true, carModel: 'Toyota Camry 2020', passengerCount: 3 },
        { driverId: '2', driverName: 'Sarah Johnson', hasCar: false, carModel: null, passengerCount: 0 },
        { driverId: '3', driverName: 'Mike Chen', hasCar: true, carModel: 'Honda Civic 2019', passengerCount: 3 },
        { driverId: '4', driverName: 'Emily Davis', hasCar: false, carModel: null, passengerCount: 0 },
        { driverId: '1', driverName: 'John Smith', hasCar: true, carModel: 'Toyota Camry 2020', passengerCount: 3 }
      ],
      pickupPoints: [
        { address: '123 Main St, Downtown', time: '8:30 AM' },
        { address: '456 Oak Ave, Midtown', time: '8:45 AM' },
        { address: '789 Pine St, Uptown', time: '9:00 AM' }
      ]
    }
    
    setTimeout(() => {
      setGroup(mockGroup)
      setLoading(false)
    }, 1000)
  }, [groupId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading group...</div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">Group not found</div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">{group.name}</h1>
            <p className="mt-2 text-gray-600">
              {group.members.length} members • Active carpool group
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {activeTab === 'schedule' && (
            <>
              <RotationCard 
                schedule={group.schedule} 
                currentUser={{ id: '1', name: 'John Smith' }} 
              />
              <MapPlaceholder pickupPoints={group.pickupPoints} />
            </>
          )}

          {activeTab === 'members' && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Members</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center p-4 border border-gray-200 rounded-lg">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-sm font-medium text-primary-700">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{member.name}</div>
                        {member.hasCar && (
                          <div className="text-sm text-gray-600">{member.carModel}</div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {member.hasCar ? 'Driver' : 'Passenger'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Chat</h3>
                <div className="bg-gray-50 rounded-lg p-4 h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="h-12 w-12 mx-auto mb-2" />
                    <p>Chat feature coming soon!</p>
                    <p className="text-sm">Group members can communicate here</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Group Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Name</label>
                    <input
                      type="text"
                      value={group.name}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Pickup Time</label>
                    <input
                      type="time"
                      defaultValue="08:30"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GroupDashboard

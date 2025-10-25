import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { auth } from '../utils/firebase'

const Onboarding = () => {
  const [formData, setFormData] = useState({
    name: '',
    homeAddress: '',
    workAddress: '',
    workStartTime: '09:00',
    workEndTime: '17:00',
    hasCar: false,
    carModel: '',
    carCapacity: 4
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Save user data to Firestore
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      navigate('/preferences')
    } catch (error) {
      console.error('Error saving user data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome! Let's set up your profile</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700">
                Home Address
              </label>
              <input
                type="text"
                name="homeAddress"
                id="homeAddress"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.homeAddress}
                onChange={handleChange}
                placeholder="123 Main St, City, State"
              />
            </div>

            <div>
              <label htmlFor="workAddress" className="block text-sm font-medium text-gray-700">
                Work Address
              </label>
              <input
                type="text"
                name="workAddress"
                id="workAddress"
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                value={formData.workAddress}
                onChange={handleChange}
                placeholder="456 Business Ave, City, State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="workStartTime" className="block text-sm font-medium text-gray-700">
                  Work Start Time
                </label>
                <input
                  type="time"
                  name="workStartTime"
                  id="workStartTime"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={formData.workStartTime}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="workEndTime" className="block text-sm font-medium text-gray-700">
                  Work End Time
                </label>
                <input
                  type="time"
                  name="workEndTime"
                  id="workEndTime"
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  value={formData.workEndTime}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="hasCar"
                id="hasCar"
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                checked={formData.hasCar}
                onChange={handleChange}
              />
              <label htmlFor="hasCar" className="ml-2 block text-sm text-gray-900">
                I have a car and can drive
              </label>
            </div>

            {formData.hasCar && (
              <>
                <div>
                  <label htmlFor="carModel" className="block text-sm font-medium text-gray-700">
                    Car Model
                  </label>
                  <input
                    type="text"
                    name="carModel"
                    id="carModel"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={formData.carModel}
                    onChange={handleChange}
                    placeholder="e.g., Toyota Camry 2020"
                  />
                </div>
                <div>
                  <label htmlFor="carCapacity" className="block text-sm font-medium text-gray-700">
                    Car Capacity (including driver)
                  </label>
                  <select
                    name="carCapacity"
                    id="carCapacity"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    value={formData.carCapacity}
                    onChange={handleChange}
                  >
                    <option value={2}>2 people</option>
                    <option value={4}>4 people</option>
                    <option value={5}>5 people</option>
                    <option value={7}>7 people</option>
                  </select>
                </div>
              </>
            )}

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Continue to Preferences'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Onboarding

/**
 * Driver rotation helper for carpool groups
 * Assigns drivers Monday-Friday among car owners
 */

/**
 * Creates a driver rotation schedule for a group
 * @param {Array} members - Array of group members
 * @param {number} weekOffset - Week offset for rotation (0 = current week)
 * @returns {Array} Array of daily driver assignments
 */
function createRotationSchedule(members, weekOffset = 0) {
  // Filter members who have cars and can drive
  const drivers = members.filter(member => member.hasCar && member.carCapacity > 1)
  
  if (drivers.length === 0) {
    throw new Error('No drivers available in the group')
  }

  // Calculate starting driver index based on week offset
  const startIndex = (weekOffset * 5) % drivers.length
  
  const schedule = []
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  
  for (let i = 0; i < 5; i++) {
    const driverIndex = (startIndex + i) % drivers.length
    const driver = drivers[driverIndex]
    
    // Calculate passenger count (total members - 1 for driver)
    const passengerCount = Math.min(members.length - 1, driver.carCapacity - 1)
    
    schedule.push({
      day: days[i],
      driverId: driver.id,
      driverName: driver.name,
      hasCar: driver.hasCar,
      carModel: driver.carModel,
      carCapacity: driver.carCapacity,
      passengerCount: Math.max(0, passengerCount)
    })
  }
  
  return schedule
}

/**
 * Gets the driver for a specific day
 * @param {Array} members - Array of group members
 * @param {string} day - Day of the week (Monday-Friday)
 * @param {number} weekOffset - Week offset for rotation
 * @returns {Object} Driver information for the day
 */
function getDriverForDay(members, day, weekOffset = 0) {
  const schedule = createRotationSchedule(members, weekOffset)
  const dayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(day)
  
  if (dayIndex === -1) {
    throw new Error('Invalid day. Must be Monday-Friday')
  }
  
  return schedule[dayIndex]
}

/**
 * Gets the next driver in rotation
 * @param {Array} members - Array of group members
 * @param {string} currentDriverId - ID of current driver
 * @returns {Object} Next driver information
 */
function getNextDriver(members, currentDriverId) {
  const drivers = members.filter(member => member.hasCar && member.carCapacity > 1)
  const currentIndex = drivers.findIndex(driver => driver.id === currentDriverId)
  
  if (currentIndex === -1) {
    throw new Error('Current driver not found')
  }
  
  const nextIndex = (currentIndex + 1) % drivers.length
  return drivers[nextIndex]
}

/**
 * Calculates rotation fairness score
 * @param {Array} members - Array of group members
 * @param {number} weeks - Number of weeks to analyze
 * @returns {Object} Fairness analysis
 */
function calculateRotationFairness(members, weeks = 4) {
  const drivers = members.filter(member => member.hasCar && member.carCapacity > 1)
  const driverCounts = {}
  
  // Initialize counts
  drivers.forEach(driver => {
    driverCounts[driver.id] = 0
  })
  
  // Count driving days over the specified weeks
  for (let week = 0; week < weeks; week++) {
    const schedule = createRotationSchedule(members, week)
    schedule.forEach(day => {
      driverCounts[day.driverId]++
    })
  }
  
  const counts = Object.values(driverCounts)
  const min = Math.min(...counts)
  const max = Math.max(...counts)
  const average = counts.reduce((sum, count) => sum + count, 0) / counts.length
  
  return {
    driverCounts,
    min,
    max,
    average,
    fairnessScore: drivers.length > 1 ? (min / max) : 1,
    isFair: max - min <= 1
  }
}

module.exports = {
  createRotationSchedule,
  getDriverForDay,
  getNextDriver,
  calculateRotationFairness
}

import { Loader } from '@googlemaps/js-api-loader';

// Initialize Google Maps loader only if API key is available
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const loader = apiKey ? new Loader({
  apiKey,
  version: 'weekly',
  libraries: ['places', 'geometry']
}) : null;

let mapsLoaded = false;
let geocoder = null;
let directionsService = null;

// Initialize Google Maps services
export const initializeGoogleMaps = async () => {
  if (mapsLoaded) return;
  
  if (!loader) {
    console.warn('⚠️ Google Maps API key not found. Some features will be limited.');
    return false;
  }
  
  try {
    const google = await loader.load();
    geocoder = new google.maps.Geocoder();
    directionsService = new google.maps.DirectionsService();
    mapsLoaded = true;
    console.log('✅ Google Maps initialized successfully');
    return true;
  } catch (error) {
    console.error('❌ Error initializing Google Maps:', error);
    return false;
  }
};

// Convert address to coordinates
export const geocodeAddress = async (address) => {
  if (!mapsLoaded) {
    const initialized = await initializeGoogleMaps();
    if (!initialized) {
      // Return mock coordinates if Google Maps is not available
      console.warn('⚠️ Using mock coordinates for address:', address);
      return {
        lat: 37.7749 + (Math.random() - 0.5) * 0.1, // San Francisco area with some randomness
        lng: -122.4194 + (Math.random() - 0.5) * 0.1,
        formatted_address: address,
        isMock: true
      };
    }
  }

  return new Promise((resolve, reject) => {
    if (!geocoder) {
      reject(new Error('Geocoder not available'));
      return;
    }
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formatted_address: results[0].formatted_address
        });
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
};

// Calculate distance between two coordinates using Haversine formula
export const calculateDistance = (coord1, coord2) => {
  const R = 3959; // Earth's radius in miles
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};

// Calculate driving distance and time between two addresses
export const calculateDrivingDistance = async (origin, destination) => {
  if (!mapsLoaded) {
    await initializeGoogleMaps();
  }

  return new Promise((resolve, reject) => {
    directionsService.route({
      origin,
      destination,
      travelMode: 'DRIVING',
      unitSystem: 'IMPERIAL'
    }, (result, status) => {
      if (status === 'OK') {
        const route = result.routes[0];
        const leg = route.legs[0];
        resolve({
          distance: leg.distance.text,
          distanceValue: leg.distance.value, // in meters
          duration: leg.duration.text,
          durationValue: leg.duration.value // in seconds
        });
      } else {
        reject(new Error(`Directions request failed: ${status}`));
      }
    });
  });
};

// Find nearby users based on coordinates and max distance
export const findNearbyUsers = (userCoords, allUsers, maxDistance) => {
  return allUsers.filter(user => {
    if (!user.coordinates) return false;
    const distance = calculateDistance(userCoords, user.coordinates);
    return distance <= maxDistance;
  }).map(user => ({
    ...user,
    distance: calculateDistance(userCoords, user.coordinates)
  }));
};

// Batch geocode multiple addresses
export const batchGeocodeAddresses = async (addresses) => {
  const results = [];
  
  for (const address of addresses) {
    try {
      const coords = await geocodeAddress(address);
      results.push({ address, ...coords });
    } catch (error) {
      console.error(`Failed to geocode ${address}:`, error);
      results.push({ address, error: error.message });
    }
  }
  
  return results;
};

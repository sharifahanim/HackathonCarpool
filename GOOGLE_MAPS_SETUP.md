# Google Maps API Setup Instructions

## 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API**
   - **Geocoding API** 
   - **Directions API**
4. Go to "Credentials" and create an API key
5. Restrict the API key to your domain for security

## 2. Environment Variables

Create a `.env` file in the `frontend` directory with:

```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

## 3. Features Enabled

With Google Maps integration, the app now supports:

- **Address Geocoding**: Converts addresses to coordinates
- **Distance Calculation**: Finds users within your preferred distance
- **Real-time Matching**: Uses actual geographic data for carpool matching
- **Driving Distance**: Calculates actual driving routes and times

## 4. How It Works

1. When users enter their home/work addresses, they are automatically geocoded
2. The matching algorithm calculates real distances between users
3. Only users within your specified distance are shown as matches
4. Matches are sorted by distance (closest first)

## 5. Troubleshooting

- **No matches found**: Check if users have valid addresses and coordinates
- **Geocoding errors**: Verify your Google Maps API key is correct
- **API quota exceeded**: Check your Google Cloud Console for usage limits

## 6. Security Notes

- Never commit your API key to version control
- Use environment variables for API keys
- Restrict your API key to specific domains/IPs in production

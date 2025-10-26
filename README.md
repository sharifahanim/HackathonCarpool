# Carpool App - 9-to-5 Commuter App

A full-stack carpool matching application built with Expo, React Native, Express, and Firebase for hackathon MVP.

## 🚗 Features

- **User Authentication**: Firebase Auth integration
- **Smart Matching**: Algorithm to match users based on location, schedule, and preferences
- **Driver Rotation**: Automatic driver rotation schedule for fair carpooling
- **Group Management**: Create and manage carpool groups
- **Real-time Updates**: Live group dashboard with schedule and member management
- **Cross-platform**: Works on iOS, Android, and Web

## 🏗️ Tech Stack

### Mobile App (Expo)
- **Expo** for cross-platform development
- **React Native** for mobile UI
- **Expo Router** for navigation
- **TypeScript** for type safety
- **Firebase Auth** for authentication

### Backend
- **Express.js** REST API
- **Firebase Firestore** for database
- **CORS** enabled for cross-origin requests
- **Node.js** runtime

## 📁 Project Structure

```
carpool-ap/
├── app/                      # Expo app directory
│   ├── (tabs)/              # Tab navigation
│   ├── _layout.tsx          # Root layout
│   └── modal.tsx            # Modal screens
├── components/              # Reusable components
├── constants/               # App constants
├── hooks/                   # Custom hooks
├── frontend/                # Web frontend (React)
├── server/                  # Express backend
│   ├── routes/              # API routes
│   ├── data/                # Sample data
│   └── utils/               # Helper functions
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g @expo/cli`
- Firebase project (for authentication and database)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase config to the appropriate files

### Running the Application

**Start the Expo app:**
```bash
npx expo start
```

In the output, you'll find options to open the app in a:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

**Start the backend server:**
```bash
cd server && npm start
```

## 📋 API Endpoints

### Users
- `POST /api/users` - Create/update user profile
- `GET /api/users/:id` - Get user by ID

### Matches
- `GET /api/match/:userId` - Get potential matches for user

### Groups
- `POST /api/group` - Create new carpool group
- `GET /api/group/:groupId` - Get group details
- `PUT /api/group/:groupId` - Update group
- `POST /api/group/:groupId/join` - Join group

## 🎯 Key Features Explained

### Smart Matching Algorithm
The app matches users based on:
- **Work location** (40% weight)
- **Schedule compatibility** (30% weight)
- **Distance from route** (20% weight)
- **Preferences** (10% weight)

### Driver Rotation System
- Automatically assigns drivers Monday-Friday
- Ensures fair rotation among car owners
- Considers car capacity and passenger count
- Handles group size changes dynamically

## 🔧 Development

### Mobile Development
```bash
npx expo start          # Start Expo development server
npm run android         # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on Web
```

### Backend Development
```bash
cd server
npm run dev          # Start with nodemon
npm start           # Start production server
```

## 🚀 Deployment

### Mobile App
- **Expo Application Services (EAS)**: For app store deployment
- **Expo Go**: For development and testing

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy with your preferred platform
```

## 🔮 Future Enhancements

- **Real-time Chat**: WebSocket integration for group communication
- **Maps Integration**: Google Maps API for route optimization
- **Push Notifications**: Real-time updates for schedule changes
- **Payment Integration**: Split gas costs automatically
- **Advanced Matching**: Machine learning for better compatibility

## 🤝 Contributing

This is a hackathon MVP. For production use, consider:
- Adding proper error handling and validation
- Implementing comprehensive testing
- Adding security middleware
- Setting up CI/CD pipelines
- Adding monitoring and logging

## 📄 License

MIT License - feel free to use for your hackathon projects!

---

**Happy Carpooling! 🚗💨**

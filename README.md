# Carpool MVP - 9-to-5 Commuter App

A full-stack carpool matching application built with React, Express, and Firebase for hackathon MVP.

## 🚗 Features

- **User Authentication**: Firebase Auth integration
- **Smart Matching**: Algorithm to match users based on location, schedule, and preferences
- **Driver Rotation**: Automatic driver rotation schedule for fair carpooling
- **Group Management**: Create and manage carpool groups
- **Real-time Updates**: Live group dashboard with schedule and member management

## 🏗️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Firebase Auth** for authentication
- **Lucide React** for icons

### Backend
- **Express.js** REST API
- **Firebase Firestore** for database
- **CORS** enabled for cross-origin requests
- **Node.js** runtime

## 📁 Project Structure

```
carpool-mvp/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── utils/           # Firebase config & utilities
│   │   └── assets/          # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/                   # Express backend
│   ├── routes/              # API routes
│   ├── data/                # Sample data
│   ├── utils/               # Helper functions
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project (for authentication and database)

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd carpool-mvp
   npm run install-all
   ```

2. **Set up Firebase:**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication and Firestore
   - Copy your Firebase config to `frontend/src/utils/firebase.js`
   - Set up Firebase Admin SDK for the backend (optional for MVP)

3. **Configure environment variables:**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your Firebase credentials
   ```

### Running the Application

**Start the backend server:**
```bash
npm start
# or for development with auto-restart:
cd server && npm run dev
```

**Start the frontend development server:**
```bash
npm run dev
# or:
cd frontend && npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

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

### Sample Data
The app includes 10 sample users with realistic profiles:
- Different work locations and schedules
- Mix of drivers and passengers
- Various preferences and car types

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd server
npm run dev          # Start with nodemon
npm start           # Start production server
```

### Code Structure
- **Components**: Reusable UI components (MatchCard, RotationCard, MapPlaceholder)
- **Pages**: Main application pages (Login, Onboarding, Preferences, Matches, GroupDashboard)
- **Utils**: Helper functions and Firebase configuration
- **Routes**: Express API endpoints with proper error handling

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

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
- **Mobile App**: React Native version
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

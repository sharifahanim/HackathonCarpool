# 🚗 Carpool MVP - Demo Guide

## 🎯 Quick Demo Flow

### 1. **User Registration & Onboarding**
- Sign up with email/password
- Complete profile setup:
  - Name, home address, work address
  - Work schedule (start/end times)
  - Car information (if applicable)

### 2. **Set Preferences**
- Maximum distance from route
- Group size preferences
- Days for carpooling
- Music/conversation preferences

### 3. **Find Matches**
- View potential carpool partners
- See compatibility scores
- Review profiles and preferences

### 4. **Join/Create Groups**
- Join existing groups
- Create new carpool groups
- View driver rotation schedule

### 5. **Group Management**
- View rotation schedule (Monday-Friday)
- See group members
- Manage pickup points
- Group settings

## 🧪 Testing with Sample Data

The app includes **10 sample users** with realistic profiles:

### Sample Users:
1. **John Smith** - Toyota Camry driver, Downtown → Tech District
2. **Sarah Johnson** - Passenger, Midtown → Tech District  
3. **Mike Chen** - Honda Civic driver, Uptown → Tech District
4. **Emily Davis** - Passenger, Suburbs → Tech District
5. **David Wilson** - Ford Focus driver, Eastside → Financial District
6. **Lisa Brown** - Passenger, Westside → Financial District
7. **Alex Rodriguez** - Tesla Model 3 driver, Northside → Tech District
8. **Jessica Taylor** - Passenger, Southside → Tech District
9. **Robert Kim** - Nissan Altima driver, Central → Civic Center
10. **Maria Garcia** - Passenger, Riverside → Civic Center

## 🔍 Key Features to Demo

### Smart Matching Algorithm
- **Work Location** (40% weight): Same work address = high compatibility
- **Schedule Overlap** (30% weight): Overlapping work hours
- **Distance** (20% weight): Proximity to route
- **Preferences** (10% weight): Music, conversation, smoking

### Driver Rotation System
- Fair Monday-Friday rotation among car owners
- Automatic passenger count calculation
- Handles group size changes
- Fairness scoring

### API Endpoints
- `GET /api/match/user123` - Get matches for user
- `POST /api/group` - Create carpool group
- `GET /api/group/groupId` - Get group details
- `POST /api/users` - Save user profile

## 🚀 Demo Script

1. **Start the application**
   ```bash
   # Terminal 1 - Backend
   npm start
   
   # Terminal 2 - Frontend  
   npm run dev
   ```

2. **Navigate to http://localhost:3000**

3. **Sign up with any email/password**

4. **Complete onboarding with sample data:**
   - Name: "Demo User"
   - Home: "123 Demo St, Demo City"
   - Work: "456 Business Plaza, Tech District"
   - Times: 9:00 AM - 5:00 PM
   - Car: Check "I have a car" → "Toyota Camry 2020"

5. **Set preferences:**
   - Distance: 5 miles
   - Group size: 4 people
   - Days: All weekdays
   - Music: Pop
   - Conversation: Moderate

6. **View matches** - Should see compatibility scores

7. **Join a group** - Click "Join Group" on any match

8. **Explore group dashboard:**
   - Schedule tab: See driver rotation
   - Members tab: View group members
   - Settings tab: Group configuration

## 🎨 UI/UX Highlights

- **Responsive Design**: Works on mobile and desktop
- **Clean Interface**: Modern Tailwind CSS styling
- **Loading States**: Smooth loading indicators
- **Error Handling**: Graceful error boundaries
- **Navigation**: Intuitive routing with React Router

## 🔧 Technical Features

- **Firebase Auth**: Secure user authentication
- **REST API**: Clean Express.js backend
- **State Management**: React hooks for state
- **Component Architecture**: Reusable components
- **Error Boundaries**: Graceful error handling
- **API Integration**: Frontend-backend communication

## 📱 Mobile Responsive

The app is fully responsive and works great on:
- Desktop (1024px+)
- Tablet (768px - 1023px)  
- Mobile (320px - 767px)

## 🎯 Hackathon Ready

This MVP includes everything needed for a hackathon:
- ✅ Working authentication
- ✅ Smart matching algorithm
- ✅ Group management
- ✅ Driver rotation system
- ✅ Responsive UI
- ✅ Sample data for testing
- ✅ Complete documentation
- ✅ Easy setup instructions

**Perfect for demo and further development!** 🚀

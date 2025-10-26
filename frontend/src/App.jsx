import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { auth } from './utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

// Components
import Header from './components/Header'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

// Pages
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import Preferences from './pages/Preferences'
import Matches from './pages/Matches'
import GroupDashboard from './pages/GroupDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading Carpool MVP..." />
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {user && <Header user={user} />}
          <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/onboarding" /> : <Login />} 
          />
          <Route 
            path="/onboarding" 
            element={user ? <Onboarding /> : <Navigate to="/login" />} 
          />
         <Route
            path="/preferences"
          element={user ? <Preferences currentUser={user} /> : <Navigate to="/login" />}
          />

          <Route 
            path="/matches" 
            element={user ? <Matches /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/group/:groupId" 
            element={user ? <GroupDashboard /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  )
}

export default App

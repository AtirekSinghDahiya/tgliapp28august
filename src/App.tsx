import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Services from './pages/Services'
import Donate from './pages/Donate'
import News from './pages/News'
import About from './pages/About'
import Careers from './pages/Careers'
import Events from './pages/Events'
import GetInvolved from './pages/GetInvolved'
import Apply from './pages/Apply'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Auth routes without layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Main app routes with layout */}
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/events" element={<Events />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/apply/:serviceId" element={<Apply />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
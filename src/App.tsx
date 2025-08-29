import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { NotificationProvider } from './contexts/NotificationContext'
import Layout from './components/Layout/Layout'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Programs from './pages/Programs'
import Donate from './pages/Donate'
import News from './pages/News'
import About from './pages/About'
import Careers from './pages/Careers'
import Events from './pages/Events'
import GetInvolved from './pages/GetInvolved'
import Apply from './pages/Apply'
import EventRegistration from './pages/EventRegistration'
import JobApplication from './pages/JobApplication'
import NewsArticle from './pages/NewsArticle'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Contact from './pages/Contact'
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
      <AuthProvider>
        <NotificationProvider>
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
                    <Route path="/services" element={<Programs />} />
                    <Route path="/programs" element={<Programs />} />
                    <Route path="/donate" element={<Donate />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/careers" element={<Careers />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/get-involved" element={<GetInvolved />} />
                    <Route path="/apply/:serviceId" element={<Apply />} />
                    <Route path="/register-event/:eventId" element={<EventRegistration />} />
                    <Route path="/apply-job/:jobId" element={<JobApplication />} />
                    <Route path="/news/:articleId" element={<NewsArticle />} />
                    <Route path="/profile" element={<Profile />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </div>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
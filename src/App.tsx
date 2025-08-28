import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { PWAProvider } from './contexts/PWAContext';
import Layout from './components/Layout/Layout';
import SplashScreen from './components/SplashScreen/SplashScreen';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import News from './pages/News';
import Careers from './pages/Careers';
import Donate from './pages/Donate';
import ProgramApplication from './pages/ProgramApplication';
import './App.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2500));
      setShowSplash(false);
      setIsLoading(false);
    };

    initializeApp();
  }, []);

  if (showSplash || isLoading) {
    return <SplashScreen />;
  }

  return (
    <PWAProvider>
      <AuthProvider>
        <NotificationProvider>
          <Router>
            <div className="App">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/login" element={
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Login />
                    </motion.div>
                  } />
                  <Route path="/register" element={
                    <motion.div
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Register />
                    </motion.div>
                  } />
                  <Route path="/*" element={
                    <Layout>
                      <AnimatePresence mode="wait">
                        <Routes>
                          <Route path="/" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Home />
                            </motion.div>
                          } />
                          <Route path="/about" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <About />
                            </motion.div>
                          } />
                          <Route path="/programs" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Programs />
                            </motion.div>
                          } />
                          <Route path="/contact" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Contact />
                            </motion.div>
                          } />
                          <Route path="/profile" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Profile />
                            </motion.div>
                          } />
                          <Route path="/news" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <News />
                            </motion.div>
                          } />
                          <Route path="/careers" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Careers />
                            </motion.div>
                          } />
                          <Route path="/donate" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Donate />
                            </motion.div>
                          } />
                          <Route path="/apply/:programId" element={
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ProgramApplication />
                            </motion.div>
                          } />
                        </Routes>
                      </AnimatePresence>
                    </Layout>
                  } />
                </Routes>
              </AnimatePresence>
            </div>
          </Router>
        </NotificationProvider>
      </AuthProvider>
    </PWAProvider>
  );
}

export default App;
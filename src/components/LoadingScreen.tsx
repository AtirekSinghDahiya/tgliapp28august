import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Much faster loading for mobile
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center text-white z-50 font-heading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      <motion.img 
        src="https://tgli.org/TGLI_Logo.png" 
        alt="TGLI" 
        className="w-20 h-20 mb-6 bg-white rounded-full p-2 shadow-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 0.4,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
      />
      <motion.h1 
        className="text-xl font-bold mb-2 text-center px-4 font-heading"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        style={{ fontFamily: 'Comfortaa, Nunito, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Toronto Global Leadership Institute
      </motion.h1>
      <motion.p 
        className="text-red-100 mb-6 text-center px-4 font-body"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        style={{ fontFamily: 'Quicksand, Nunito, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Empowering Communities, Building Leaders
      </motion.p>
      
      <motion.div 
        className="w-48 bg-red-400/50 rounded-full h-2 mb-3 backdrop-blur-sm border border-white/20"
        initial={{ width: 0 }}
        animate={{ width: 192 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <motion.div 
          className="bg-white h-2 rounded-full transition-all duration-100"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.02 }}
        />
      </motion.div>
      <motion.p 
        className="text-sm text-red-100 font-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.2 }}
        style={{ fontFamily: 'Quicksand, Nunito, -apple-system, BlinkMacSystemFont, sans-serif' }}
      >
        Loading... {progress}%
      </motion.p>
    </motion.div>
  )
}

export default LoadingScreen
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 bg-gradient-to-br from-red-500 via-red-600 to-red-700 flex flex-col items-center justify-center text-white z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img 
        src="https://tgli.org/TGLI_Logo.png" 
        alt="TGLI" 
        className="w-24 h-24 mb-8 bg-white rounded-full p-3 shadow-2xl"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 200,
          damping: 15
        }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      />
      <motion.h1 
        className="text-2xl font-bold mb-2 text-center px-4"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Toronto Global Leadership Institute
      </motion.h1>
      <motion.p 
        className="text-red-100 mb-8 text-center px-4"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        Empowering Communities, Building Leaders
      </motion.p>
      
      <motion.div 
        className="w-64 bg-red-400/50 rounded-full h-3 mb-4 backdrop-blur-sm border border-white/20"
        initial={{ width: 0 }}
        animate={{ width: 256 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <motion.div 
          className="bg-white h-2 rounded-full transition-all duration-100"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      <motion.p 
        className="text-sm text-red-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Loading... {progress}%
      </motion.p>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/30 rounded-full"
          style={{
            left: `${20 + i * 10}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

export default LoadingScreen
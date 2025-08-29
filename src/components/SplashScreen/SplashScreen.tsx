import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Star } from 'lucide-react';
import './SplashScreen.css';

const SplashScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-600 via-red-500 to-red-400 flex items-center justify-center z-50 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-30, 30, -30],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="text-center max-w-md mx-auto p-8 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Floating Icons */}
        <motion.div 
          className="absolute -top-10 -left-10"
          animate={{ 
            rotate: 360,
            y: [-10, 10, -10]
          }}
          transition={{ 
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </motion.div>
        
        <motion.div 
          className="absolute -top-8 -right-8"
          animate={{ 
            rotate: -360,
            y: [10, -10, 10]
          }}
          transition={{ 
            rotate: { duration: 6, repeat: Infinity, ease: "linear" },
            y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
          }}
        >
          <Zap className="w-6 h-6 text-blue-300" />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-8 left-4"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Star className="w-5 h-5 text-green-300" />
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="relative inline-block"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
          <img 
            src="https://tgli.org/TGLI_Logo.png" 
            alt="TGLI Logo" 
            className="w-24 h-24 mx-auto mb-4 bg-white rounded-full p-3 shadow-2xl"
          />
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={12} className="text-yellow-800" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.h1 
            className="text-2xl sm:text-3xl font-bold mb-4 leading-tight"
            animate={{ 
              textShadow: [
                "0 0 10px rgba(255,255,255,0.5)",
                "0 0 20px rgba(255,255,255,0.8)",
                "0 0 10px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Toronto Global Leadership Institute
          </motion.h1>
          <motion.p 
            className="text-red-100 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Empowering Communities, Building Leaders
          </motion.p>
        </motion.div>

        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="w-64 bg-red-400/30 rounded-full h-2 mx-auto backdrop-blur-sm border border-white/20 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-white via-yellow-200 to-white h-full rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
          <motion.p 
            className="text-red-100 font-medium"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading your experience... {progress}%
          </motion.p>
        </motion.div>

        {/* Floating Dots Animation */}
        <motion.div 
          className="flex justify-center gap-2 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-white rounded-full shadow-lg"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.4, 1, 0.4],
                y: [0, -8, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
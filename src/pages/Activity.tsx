import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Activity, Target, Briefcase, Calendar, Award, CheckCircle, Clock, Sparkles, Star, ArrowRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
  const { activities } = useActivity()

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'program': return Target
      case 'workshop': return Briefcase
      case 'event': return Calendar
      default: return Award
    }
  }

  const getActivityColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600',
      'from-orange-500 to-orange-600',
      'from-teal-500 to-teal-600'
    ]
    return colors[index % colors.length]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-600'
      case 'Completed': return 'bg-blue-100 text-blue-600'
      case 'In Progress': return 'bg-yellow-100 text-yellow-600'
      case 'Attended': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
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

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 pt-16 relative z-10">
        <motion.div 
          className="flex items-center gap-4 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h1 className="text-2xl font-bold">Your Activity</h1>
          </div>
        </motion.div>
        <motion.p 
          className="text-blue-100"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Track your progress and achievements with TGLI
        </motion.p>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Activity Summary */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Activity className="w-5 h-5 text-blue-500" />
            Activity Overview
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-green-50 via-green-100 to-green-50 rounded-xl border border-green-200/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl font-bold text-green-600 mb-1">5</p>
              <p className="text-sm text-green-700 font-medium">{activities.length}</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-xl border border-blue-200/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-2xl font-bold text-blue-600 mb-1">{activities.filter(a => a.status === 'Completed').length}</p>
              <p className="text-sm text-blue-700 font-medium">Completed</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Activities List */}
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className={`bg-gradient-to-r ${activity.color} p-3 rounded-xl shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <activity.icon size={24} className="text-white" />
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{activity.title}</h3>
                      <p className="text-gray-600 text-sm">{activity.description}</p>
                    </div>
                    <span className={`${activity.statusColor} px-3 py-1 rounded-full text-xs font-medium`}>
                      {activity.status}
                    </span>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Enrolled on {new Date(activity.startDate).toLocaleDateString()}
                    </div>
                    {activity.status === 'Active' && (
                      <motion.button
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/programs`)}
                      >
                        View Program
                      </motion.button>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityPage
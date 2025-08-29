import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Heart, 
  Users, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Award,
  Bell,
  ArrowRight,
  Plus,
  Activity,
  Target,
  Briefcase,
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getUserDonations } from '../services/supabase'

const Home: React.FC = () => {
  const { user } = useAuth()
  const [donations, setDonations] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const { data } = await getUserDonations(user.id)
          // Mock donations for demo purposes since we don't have real Supabase connection
          const mockDonations = [
            { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
            { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
            { id: '3', amount: 75, created_at: '2024-01-05T00:00:00Z' }
          ]
          setDonations(data && data.length > 0 ? data : mockDonations)
        } catch (error) {
          console.error('Error loading user data:', error)
          // Fallback to mock data on error
          const mockDonations = [
            { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
            { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
            { id: '3', amount: 75, created_at: '2024-01-05T00:00:00Z' }
          ]
          setDonations(mockDonations)
        }
      } else {
        setDonations([])
      }
      setLoading(false)
    }

    loadUserData()
  }, [user])

  const quickActions = [
    {
      title: 'Programs',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/programs'
    },
    {
      title: 'Donation',
      icon: Heart,
      color: 'bg-red-500',
      link: '/donate'
    },
    {
      title: 'View Events',
      icon: Calendar,
      color: 'bg-green-500',
      link: '/events'
    },
    {
      title: 'Career Opportunities',
      icon: Briefcase,
      color: 'bg-purple-500',
      link: '/careers'
    }
  ]

  const stats = [
    { label: 'Active Programs', value: '8', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Community Members', value: '10K+', icon: Users, color: 'text-green-600' },
    { label: 'Success Stories', value: '2.5K', icon: Award, color: 'text-purple-600' },
    { label: 'Events This Month', value: '12', icon: Calendar, color: 'text-orange-600' }
  ]

  const recentActivity = [
    { type: 'application', message: 'New application submitted for Community Leadership', time: '2 hours ago' },
    { type: 'event', message: 'Job Fair 2024 registration opened', time: '1 day ago' },
    { type: 'donation', message: 'Monthly donation goal reached', time: '3 days ago' }
  ]

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white">
        <div className="hero-section p-3 sm:p-4 md:p-6 pt-4 sm:pt-6 md:pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight text-center sm:text-left">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome to TGLI'}
            </h1>
            <p className="text-red-100 mb-4 sm:mb-6 text-xs sm:text-sm md:text-base leading-relaxed text-center sm:text-left px-2 sm:px-0">
              {user 
                ? 'Here\'s your personalized dashboard with recent activity and quick actions.'
                : 'Empowering communities and building leaders across the Greater Toronto Area.'
              }
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 stats-grid">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 md:p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: index * 0.15, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                    <div className="bg-white/20 p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg flex-shrink-0">
                      <stat.icon size={14} className="text-white sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-base sm:text-lg md:text-2xl font-bold leading-tight">{stat.value}</p>
                      <p className="text-red-100 text-xs sm:text-sm leading-tight truncate">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6 -mt-2 sm:-mt-3 md:-mt-4">
        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-lg backdrop-blur-sm border border-white/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          whileHover={{ 
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            transition: { duration: 0.3 }
          }}
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Quick Actions</h2>
            <motion.button
              className="p-1.5 sm:p-2 bg-gray-100 rounded-md sm:rounded-lg"
              whileHover={{ 
                scale: 1.1, 
                rotate: 90,
                backgroundColor: "rgba(225, 29, 72, 0.1)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Plus size={12} className="text-gray-600 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 quick-actions-grid">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.4 + index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
              >
                <Link
                  to={action.link}
                  className="block p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg sm:rounded-xl hover:from-white hover:to-gray-50 transition-all duration-300 group quick-action-item backdrop-blur-sm border border-white/50"
                >
                  <motion.div 
                    className="flex items-center gap-2 sm:gap-3 transition-all duration-300 group"
                    whileHover={{ x: 5 }}
                  >
                    <motion.div 
                      className={`${action.color} p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl flex-shrink-0 shadow-lg`}
                      whileHover={{ 
                        scale: 1.15, 
                        rotate: 5,
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <action.icon size={14} className="text-white sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </motion.div>
                    <div className="flex-1 min-w-0 flex items-center">
                      <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base leading-tight truncate">{action.title}</h3>
                    </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={12} className="text-gray-400 group-hover:text-red-500 transition-colors flex-shrink-0 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Content */}
        {user ? (
          <>
            {/* Activity Overview */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Your Activity</h2>
                <motion.button
                  className="text-red-500 text-sm font-medium"
                  whileHover={{ 
                    scale: 1.05,
                    color: "#be185d"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All
                </motion.button>
              </div>
              
              {/* Progress Cards */}
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200/50 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-blue-500 p-2 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Target size={16} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Community Leadership</h3>
                      <p className="text-gray-600 text-sm">Progress: 75% complete</p>
                    </div>
                  </div>
                  <motion.span 
                    className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    Active
                  </motion.span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gray-400 p-2 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Briefcase size={16} className="text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Employment Services</h3>
                      <p className="text-gray-600 text-sm">Completed successfully</p>
                    </div>
                  </div>
                  <motion.span 
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                    whileHover={{ scale: 1.05 }}
                  >
                    Completed
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Activity size={20} className="text-red-500" />
                </motion.div>
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 rounded-lg transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-gray-200/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 0.7 + index * 0.1, 
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      x: 5,
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-red-100 to-red-200 p-2 rounded-lg mt-1 shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Bell size={12} className="text-red-500" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">{activity.message}</p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Donation Summary */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart size={20} className="text-red-500" />
                </motion.div>
                <h2 className="text-lg font-bold text-gray-900">Your Impact</h2>
              </div>
              
              {donations.length > 0 ? (
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200/50 backdrop-blur-sm"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(34, 197, 94, 0.15)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div>
                      <motion.p 
                        className="text-2xl font-bold text-green-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 10 }}
                      >
                        ${donations.reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0)}
                      </motion.p>
                      <p className="text-green-700 text-sm">Total Donated</p>
                    </div>
                    <motion.div 
                      className="bg-green-500 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <DollarSign size={20} className="text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-2">
                    {donations.slice(0, 2).map((donation: any) => (
                      <motion.div 
                        key={donation.id} 
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200/50 backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.02,
                          x: 5,
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <span className="text-gray-700 font-medium">${donation.amount}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(donation.created_at).toLocaleDateString()}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">No donations yet</p>
                  <Link
                    to="/donate"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Heart size={16} />
                    Make Your First Donation
                  </Link>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          /* Guest User Content */
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-lg backdrop-blur-sm border border-white/20"
              whileHover={{ 
                y: -5,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Get Started with TGLI</h2>
              
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                  to="/programs" 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group border border-blue-200/50 backdrop-blur-sm"
                  >
                    <motion.div 
                      className="bg-blue-500 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    <BookOpen size={24} className="text-white" />
                    </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Explore Programs</h3>
                    <p className="text-gray-600 text-sm">Discover our comprehensive programs and services</p>
                  </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                  to="/signup" 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 group border border-red-200/50 backdrop-blur-sm"
                  >
                    <motion.div 
                      className="bg-red-500 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.15, rotate: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    <Users size={24} className="text-white" />
                    </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Join Our Community</h3>
                    <p className="text-gray-600 text-sm">Create your account and start your journey</p>
                  </div>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 shadow-lg backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.6 + index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 120,
                    damping: 20
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gradient-to-br from-gray-100 to-gray-200 p-2 rounded-lg shadow-sm"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <stat.icon size={20} className={stat.color} />
                    </motion.div>
                    <div>
                      <motion.p 
                        className="text-xl font-bold text-gray-900"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-gray-600 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Home
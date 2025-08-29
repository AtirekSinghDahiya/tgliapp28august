import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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
  MessageSquare,
  Sparkles,
  Zap,
  Star
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getUserDonations } from '../services/supabase'

const Home: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [donations, setDonations] = useState([])
  const [totalDonated, setTotalDonated] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [activityData, setActivityData] = useState([
    { id: '1', title: 'Leadership Program', status: 'Active', icon: Target, color: 'from-blue-500 to-blue-600' },
    { id: '2', title: 'Career Workshop', status: 'Completed', icon: Briefcase, color: 'from-green-500 to-green-600' }
  ])

  // Initialize app faster
  useEffect(() => {
    setIsLoaded(true)
    if (user) {
      loadDonations()
    }
  }, [])

  // Real-time activity updates
  useEffect(() => {
    const handleActivityUpdate = (event: CustomEvent) => {
      const newActivity = event.detail.activity
      setActivityData(prev => [newActivity, ...prev.slice(0, 2)])
      console.log('New activity added:', event.detail.activity);
    };

    window.addEventListener('activityUpdated', handleActivityUpdate as EventListener);
    return () => window.removeEventListener('activityUpdated', handleActivityUpdate as EventListener);
  }, []);

  // Real-time donation updates
  useEffect(() => {
    const handleDonationUpdate = (event: CustomEvent) => {
      const newDonation = event.detail.donation;
      setDonations(prev => [newDonation, ...prev]);
      setTotalDonated(prev => prev + parseFloat(newDonation.amount));
    };

    window.addEventListener('donationUpdated', handleDonationUpdate as EventListener);
    return () => window.removeEventListener('donationUpdated', handleDonationUpdate as EventListener);
  }, []);

  const loadDonations = async () => {
    try {
      const { data } = await getUserDonations(user!.id)
      const mockDonations = [
        { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
        { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
        { id: '3', amount: 50, created_at: '2024-01-05T00:00:00Z' }
      ]
      setDonations(data && data.length > 0 ? data : mockDonations)
      
      const total = (data && data.length > 0 ? data : mockDonations)
        .reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0)
      setTotalDonated(total)
    } catch (error) {
      console.error('Error loading donations:', error)
      const mockDonations = [
        { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
        { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
        { id: '3', amount: 50, created_at: '2024-01-05T00:00:00Z' }
      ]
      setDonations(mockDonations)
      setTotalDonated(225)
    }
  }

  const stats = [
    { label: 'Active Programs', value: '12+', icon: BookOpen, color: 'text-blue-500', gradient: 'from-blue-500 to-blue-600' },
    { label: 'Community Members', value: '500+', icon: Users, color: 'text-green-500', gradient: 'from-green-500 to-green-600' },
    { label: 'Events This Year', value: '25+', icon: Calendar, color: 'text-purple-500', gradient: 'from-purple-500 to-purple-600' },
    { label: 'Lives Impacted', value: '1000+', icon: TrendingUp, color: 'text-orange-500', gradient: 'from-orange-500 to-orange-600' }
  ]

  const quickActions = [
    {
      title: 'Programs',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      link: '/programs'
    },
    {
      title: 'Donation',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      link: '/donate'
    },
    {
      title: 'View Events',
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      link: '/events'
    },
    {
      title: 'Career Opportunities',
      icon: Briefcase,
      color: 'from-purple-500 to-purple-600',
      link: '/careers'
    }
  ]

  const recentActivity = [
    { id: '1', text: 'New leadership workshop announced', time: '2 hours ago', icon: Calendar },
    { id: '2', text: 'Community event registration opened', time: '1 day ago', icon: Users },
    { id: '3', text: 'Monthly newsletter published', time: '3 days ago', icon: Bell }
  ]

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        
        <div className="hero-section p-4 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <Zap className="w-5 h-5 text-yellow-300" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold mb-3 leading-tight text-center font-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome to TGLI'}
            </motion.h1>
            <motion.p 
              className="text-red-100 mb-5 text-base leading-relaxed text-center font-body"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {user 
                ? 'Here\'s your personalized dashboard with recent activity and quick actions.'
                : 'Empowering communities and building leaders across the Greater Toronto Area.'
              }
            </motion.p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 gpu-accelerated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.1, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-white/20 p-2 rounded-lg flex-shrink-0"
                    >
                      <stat.icon size={20} className="text-white" />
                    </motion.div>
                    <div className="min-w-0">
                      <motion.p 
                        className="text-2xl font-bold leading-tight font-heading"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1, type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-red-100 text-sm leading-tight font-body">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="p-4 space-y-6">
        {/* Quick Actions */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 gpu-accelerated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Quick Actions</h2>
                </motion.div>
                <motion.button
                  className="p-2 bg-red-100 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/programs')}
                >
                  <Plus size={16} className="text-red-600" />
                </motion.button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={action.link}
                      className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group gpu-accelerated"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-r ${action.color} p-2 rounded-lg shadow-md`}>
                          <action.icon size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm font-heading truncate">
                            {action.title}
                          </p>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Your Activity Section */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 gpu-accelerated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                >
                  <Activity className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-bold text-gray-900 font-heading">Your Activity</h2>
                </motion.div>
                <motion.button
                  className="text-red-500 text-sm font-medium font-body"
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/activity')}
                >
                  View All
                </motion.button>
              </div>
              
              <div className="space-y-3">
                {activityData.slice(0, 2).map((activity, index) => (
                  <motion.div 
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl gpu-accelerated"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`bg-gradient-to-r ${activity.color} p-2 rounded-lg shadow-md`}>
                        <activity.icon size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm font-heading">{activity.title}</p>
                        <p className="text-xs text-gray-600 font-body">{activity.status}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium font-body">
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Activity Section */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 gpu-accelerated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-900 font-heading">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-all duration-200 gpu-accelerated"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="bg-red-100 p-2 rounded-lg mt-1">
                      <activity.icon size={12} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium font-body">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1 font-body">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Your Impact Section */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 gpu-accelerated"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-900 font-heading">Your Impact</h2>
              </div>
              
              {user && donations.length > 0 ? (
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center justify-between p-4 bg-green-50 rounded-xl gpu-accelerated"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                  >
                    <div>
                      <p className="text-sm text-green-600 font-medium font-body">Total Donated</p>
                      <p className="text-2xl font-bold text-green-600 font-heading">${totalDonated}</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-lg shadow-md">
                      <DollarSign size={20} className="text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-2">
                    {donations.slice(0, 2).map((donation: any, index) => (
                      <motion.div 
                        key={donation.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gpu-accelerated"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                      >
                        <div>
                          <p className="font-medium text-gray-900 font-heading">${donation.amount}</p>
                          <p className="text-xs text-gray-500 font-body">{new Date(donation.created_at).toLocaleDateString()}</p>
                        </div>
                        <Award size={16} className="text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4 font-body">
                    {user ? 'No donations yet' : 'Sign in to track your impact'}
                  </p>
                  <Link
                    to={user ? "/donate" : "/signin"}
                    className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors font-body"
                  >
                    <Heart size={16} />
                    {user ? 'Make Your First Donation' : 'Sign In to Donate'}
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Get Started Section - for non-authenticated users */}
        {!user && (
          <AnimatePresence>
            {isLoaded && (
              <motion.div
                className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200 gpu-accelerated"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.h2 
                  className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 font-heading"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Get Started with TGLI
                </motion.h2>
                
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <Link 
                      to="/programs" 
                      className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group gpu-accelerated"
                    >
                      <div className="bg-blue-500 p-3 rounded-lg shadow-md">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 font-heading">Explore Programs</h3>
                        <p className="text-sm text-gray-600 font-body">Discover leadership development programs</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9, duration: 0.4 }}
                  >
                    <Link 
                      to="/signup" 
                      className="flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group gpu-accelerated"
                    >
                      <div className="bg-red-500 p-3 rounded-lg shadow-md">
                        <Users size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1 font-heading">Join Our Community</h3>
                        <p className="text-sm text-gray-600 font-body">Create account for exclusive access</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Community Stats */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 gpu-accelerated"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900 font-heading">{stat.value}</p>
                      <p className="text-sm text-gray-600 font-body">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Quick Actions</h2>
            </motion.div>
            <motion.button
              className="p-2 sm:p-2.5 bg-gradient-to-r from-red-100 to-red-200 rounded-lg sm:rounded-xl shadow-sm"
              whileHover={{ 
                scale: 1.15, 
                rotate: 90,
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => navigate('/programs')}
            >
              <Plus size={14} className="text-red-600 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 1.5 + index * 0.15, 
                  duration: 0.8,
                  type: "spring",
                  stiffness: 150,
                  damping: 20
                }}
              >
                <Link
                  to={action.link}
                  className="block p-3 sm:p-4 md:p-5 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl hover:from-white hover:to-gray-50 transition-all duration-300 group quick-action-item backdrop-blur-sm border border-gray-200/50 shadow-sm hover:shadow-lg"
                >
                  <motion.div 
                    className="flex items-center gap-3 sm:gap-4 transition-all duration-300 group"
                    whileHover={{ x: 8 }}
                  >
                    <motion.div 
                      className={`bg-gradient-to-r ${action.color} p-2.5 sm:p-3 md:p-3.5 rounded-xl sm:rounded-2xl flex-shrink-0 shadow-lg`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 10,
                        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.25)"
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <action.icon size={16} className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base leading-tight truncate">
                        {action.title}
                      </p>
                    </div>
                    <motion.div
                      whileHover={{ x: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-red-500 transition-colors flex-shrink-0 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Always show user sections for better UX - they will show demo data if not logged in */}
        {showUserSections && (
          <div className="space-y-6 mt-6">
            {/* Activity Overview */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-5 sm:p-6 md:p-7 shadow-2xl border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <motion.div 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                >
                  <Activity className="w-5 h-5 text-blue-500" />
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900">Your Activity</h2>
                </motion.div>
                <motion.button
                  className="text-red-500 text-sm font-medium"
                  whileHover={{ 
                    scale: 1.1,
                    color: "#be185d",
                    x: 5
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/activity')}
                >
                  View All
                </motion.button>
              </div>
              
              <div className="space-y-4">
                <motion.div 
                  className="flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-xl border border-blue-200/50 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.03,
                    x: 5,
                    boxShadow: "0 12px 30px rgba(59, 130, 246, 0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 10 }}
                    >
                      <Target size={18} className="text-white" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">Leadership Program</p>
                      <p className="text-xs sm:text-sm text-gray-600">In Progress</p>
                    </div>
                  </div>
                  <motion.span 
                    className="bg-green-100 text-green-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    Active
                  </motion.span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.6, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.03,
                    x: 5,
                    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="bg-gradient-to-r from-gray-400 to-gray-500 p-2 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.15, rotate: -10 }}
                    >
                      <Briefcase size={16} className="text-white" />
                    </motion.div>
                    <div>
                      <p className="font-semibold text-gray-900">Career Workshop</p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                  </div>
                  <motion.span 
                    className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                    whileHover={{ scale: 1.1 }}
                  >
                    Completed
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Activity size={20} className="text-red-500 drop-shadow-sm" />
                </motion.div>
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-lg transition-all duration-300 backdrop-blur-sm border border-transparent hover:border-red-200/50 hover:shadow-md"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      delay: 2.4 + index * 0.15, 
                      duration: 0.8,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ 
                      x: 8,
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div 
                      className="bg-gradient-to-br from-red-100 via-red-200 to-red-100 p-2 rounded-lg mt-1 shadow-md"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      <Bell size={12} className="text-red-500" />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Your Impact - Donation Summary */}
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              whileHover={{ 
                y: -6,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart size={20} className="text-red-500 drop-shadow-sm" />
                </motion.div>
                <h2 className="text-lg font-bold text-gray-900">Your Impact</h2>
              </div>
              
              {user && donations.length > 0 ? (
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 via-green-100 to-green-50 rounded-xl border border-green-200/50 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.6, duration: 0.8, type: "spring", stiffness: 120, damping: 15 }}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 12px 30px rgba(34, 197, 94, 0.2)"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Donated</p>
                      <motion.p 
                        className="text-2xl font-bold text-green-600"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 2.4, type: "spring", stiffness: 200, damping: 10 }}
                      >
                        ${totalDonated}
                      </motion.p>
                    </div>
                    <motion.div 
                      className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.15, rotate: 15 }}
                    >
                      <DollarSign size={20} className="text-white" />
                    </motion.div>
                  </motion.div>
                  
                  <div className="space-y-2">
                    {donations.slice(0, 2).map((donation: any) => (
                      <motion.div 
                        key={donation.id} 
                        className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-lg border border-gray-200/50 backdrop-blur-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.6 + parseInt(donation.id) * 0.1, duration: 0.6 }}
                        whileHover={{ 
                          scale: 1.03,
                          x: 8,
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <div>
                          <p className="font-medium text-gray-900">${donation.amount}</p>
                          <p className="text-xs text-gray-500">{new Date(donation.created_at).toLocaleDateString()}</p>
                        </div>
                        <Award size={16} className="text-yellow-500" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <motion.div 
                    className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 2.6, type: "spring", stiffness: 200, damping: 15 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Heart size={24} className="text-gray-400" />
                  </motion.div>
                  <p className="text-gray-500 mb-4">
                    {user ? 'No donations yet' : 'Sign in to track your impact'}
                  </p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.4, duration: 0.6 }}
                  >
                    <Link
                      to={user ? "/donate" : "/signin"}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Heart size={16} />
                      {user ? 'Make Your First Donation' : 'Sign In to Donate'}
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Get Started Section - only show for non-authenticated users */}
        {!user && (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <motion.div 
              className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
              whileHover={{ 
                y: -8,
                boxShadow: "0 32px 64px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h2 
                className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
              >
                <Sparkles className="w-5 h-5 text-yellow-500" />
                Get Started with TGLI
              </motion.h2>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                  to="/programs" 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group border border-blue-200/50 backdrop-blur-sm shadow-sm hover:shadow-lg"
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    <BookOpen size={24} className="text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Explore Programs</h3>
                    <p className="text-sm text-gray-600">Discover leadership development and community programs</p>
                  </div>
                    <motion.div
                      whileHover={{ x: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link 
                  to="/signup" 
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-xl hover:from-red-100 hover:to-red-200 transition-all duration-300 group border border-red-200/50 backdrop-blur-sm shadow-sm hover:shadow-lg"
                  >
                    <motion.div 
                      className="bg-gradient-to-r from-red-500 to-red-600 p-3 rounded-lg shadow-lg"
                      whileHover={{ scale: 1.2, rotate: -10 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                    <Users size={24} className="text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">Join Our Community</h3>
                    <p className="text-sm text-gray-600">Create an account to access exclusive content and events</p>
                  </div>
                    <motion.div
                      whileHover={{ x: 8, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <ArrowRight size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    </motion.div>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Community Stats - always show */}
        <motion.div
          className="grid grid-cols-2 gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.8 }}
        >
          {stats.slice(2).map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 3 + index * 0.2, 
                duration: 0.8,
                type: "spring",
                stiffness: 150,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.08,
                y: -8,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-2 rounded-lg shadow-md"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <stat.icon size={20} className={stat.color} />
                </motion.div>
                <div>
                  <motion.p 
                    className="text-xl font-bold text-gray-900"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 3.2 + index * 0.2, type: "spring", stiffness: 200, damping: 10 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default Home
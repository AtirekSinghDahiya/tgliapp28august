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
  Sparkles,
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
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    
    if (user) {
      loadDonations()
    }
    
    return () => clearTimeout(timer)
  }, [user])

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div 
        className="bg-gradient-to-br from-red-600 via-red-500 to-red-400 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="p-4 pt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </motion.div>
            <motion.h1 
              className="text-2xl font-bold mb-3 leading-tight text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome to TGLI'}
            </motion.h1>
            <motion.p 
              className="text-red-100 mb-5 text-base leading-relaxed text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
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
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 0.4 + index * 0.1, 
                    duration: 0.4,
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
                        className="text-2xl font-bold leading-tight"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200, damping: 10 }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-red-100 text-sm leading-tight">{stat.label}</p>
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
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
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
                  <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
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
                      className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`bg-gradient-to-r ${action.color} p-2 rounded-lg shadow-md`}>
                          <action.icon size={18} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate">
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
              className="bg-white rounded-2xl p-5 shadow-lg border border-gray-200"
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
                  <h2 className="text-xl font-bold text-gray-900">Your Activity</h2>
                </motion.div>
                <motion.button
                  className="text-red-500 text-sm font-medium"
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
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`bg-gradient-to-r ${activity.color} p-2 rounded-lg shadow-md`}>
                        <activity.icon size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-600">{activity.status}</p>
                      </div>
                    </div>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                      {activity.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Recent Activity */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Bell size={20} className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                  >
                    <div className="bg-red-100 p-2 rounded-lg mt-1">
                      <activity.icon size={12} className="text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 font-medium">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Your Impact */}
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Your Impact</h2>
              </div>
              
              {user && donations.length > 0 ? (
                <div className="space-y-3">
                  <motion.div 
                    className="flex items-center justify-between p-4 bg-green-50 rounded-xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                  >
                    <div>
                      <p className="text-sm text-green-600 font-medium">Total Donated</p>
                      <p className="text-2xl font-bold text-green-600">${totalDonated}</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-lg shadow-md">
                      <DollarSign size={20} className="text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="space-y-2">
                    {donations.slice(0, 2).map((donation: any, index) => (
                      <motion.div 
                        key={donation.id} 
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
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
                <div className="text-center py-6">
                  <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Heart size={24} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">
                    {user ? 'No donations yet' : 'Sign in to track your impact'}
                  </p>
                  <Link
                    to={user ? "/donate" : "/signin"}
                    className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
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
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <motion.h2 
                  className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1, duration: 0.4 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                  Get Started with TGLI
                </motion.h2>
                
                <div className="space-y-3">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                  >
                    <Link 
                      to="/programs" 
                      className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                    >
                      <div className="bg-blue-500 p-3 rounded-lg shadow-md">
                        <BookOpen size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Explore Programs</h3>
                        <p className="text-sm text-gray-600">Discover leadership development programs</p>
                      </div>
                      <ArrowRight size={18} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.4 }}
                  >
                    <Link 
                      to="/signup" 
                      className="flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                    >
                      <div className="bg-red-500 p-3 rounded-lg shadow-md">
                        <Users size={20} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">Join Our Community</h3>
                        <p className="text-sm text-gray-600">Create account for exclusive access</p>
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
              transition={{ delay: 1.3, duration: 0.4 }}
            >
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 shadow-lg border border-gray-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.4 + index * 0.1, 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 150,
                    damping: 20
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <stat.icon size={18} className={stat.color} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
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

export default Home
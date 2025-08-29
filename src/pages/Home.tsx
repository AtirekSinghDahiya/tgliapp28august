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
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const { data } = await getUserDonations(user.id)
          setDonations(data || [])
        } catch (error) {
          console.error('Error loading user data:', error)
        }
      }
      setLoading(false)
    }

    loadUserData()
  }, [user])

  const quickActions = [
    {
      title: 'Apply to Programs',
      description: 'Browse and apply to our programs',
      icon: BookOpen,
      color: 'bg-blue-500',
      link: '/programs'
    },
    {
      title: 'Make a Donation',
      description: 'Support our community initiatives',
      icon: Heart,
      color: 'bg-red-500',
      link: '/donate'
    },
    {
      title: 'View Events',
      description: 'Join upcoming community events',
      icon: Calendar,
      color: 'bg-green-500',
      link: '/events'
    },
    {
      title: 'Career Opportunities',
      description: 'Explore job openings',
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
        <div className="p-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl font-bold mb-2">
              {user ? `Welcome back, ${user.name.split(' ')[0]}!` : 'Welcome to TGLI'}
            </h1>
            <p className="text-red-100 mb-6">
              {user 
                ? 'Here\'s your personalized dashboard with recent activity and quick actions.'
                : 'Empowering communities and building leaders across the Greater Toronto Area.'
              }
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-lg">
                      <stat.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-red-100 text-sm">{stat.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Quick Actions */}
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <motion.button
              className="p-2 bg-gray-100 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} className="text-gray-600" />
            </motion.button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              >
                <Link
                  to={action.link}
                  className="block p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                      <action.icon size={16} className="text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">{action.title}</h3>
                      <p className="text-gray-600 text-xs leading-relaxed">{action.description}</p>
                    </div>
                    <ArrowRight size={14} className="text-gray-400 group-hover:text-gray-600 transition-colors mt-1" />
                  </div>
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
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Your Activity</h2>
                <motion.button
                  className="text-red-500 text-sm font-medium"
                  whileHover={{ scale: 1.05 }}
                >
                  View All
                </motion.button>
              </div>
              
              {/* Progress Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Target size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Community Leadership</h3>
                      <p className="text-gray-600 text-sm">Progress: 75% complete</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-400 p-2 rounded-lg">
                      <Briefcase size={16} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Employment Services</h3>
                      <p className="text-gray-600 text-sm">Completed successfully</p>
                    </div>
                  </div>
                  <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-medium">
                    Completed
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity size={20} className="text-red-500" />
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
              </div>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="bg-red-100 p-2 rounded-lg mt-1">
                      <Bell size={12} className="text-red-500" />
                    </div>
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
              className="bg-white rounded-2xl p-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Heart size={20} className="text-red-500" />
                <h2 className="text-lg font-bold text-gray-900">Your Impact</h2>
              </div>
              
              {donations.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${donations.reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0)}
                      </p>
                      <p className="text-green-700 text-sm">Total Donated</p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-lg">
                      <DollarSign size={20} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {donations.slice(0, 2).map((donation: any) => (
                      <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-gray-700 font-medium">${donation.amount}</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(donation.created_at).toLocaleDateString()}
                        </span>
                      </div>
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
                    className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
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
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Get Started with TGLI</h2>
              
              <div className="space-y-4">
                <Link 
                  to="/programs" 
                  className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                >
                  <div className="bg-blue-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <BookOpen size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Explore Programs</h3>
                    <p className="text-gray-600 text-sm">Discover our comprehensive programs and services</p>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </Link>
                
                <Link 
                  to="/signup" 
                  className="flex items-center gap-4 p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors group"
                >
                  <div className="bg-red-500 p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Users size={24} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Join Our Community</h3>
                    <p className="text-gray-600 text-sm">Create your account and start your journey</p>
                  </div>
                  <ArrowRight size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                </Link>
              </div>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(2).map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white rounded-xl p-4 shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <stat.icon size={20} className={stat.color} />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
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
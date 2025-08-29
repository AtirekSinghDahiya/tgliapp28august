import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Edit3, Save, X, Award, Calendar, TrendingUp, Heart, Sparkles, Star } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getProfile, updateProfile, getUserDonations } from '../services/supabase'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: ''
  })
  const [donations, setDonations] = useState<any[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return

      try {
        const { data, error } = await getProfile(user.id)
        if (error) throw error
        
        if (data) {
          setProfile({
            full_name: data.full_name || user.name,
            email: data.email || user.email,
            phone: data.phone || '',
            bio: data.bio || ''
          })
        } else {
          setProfile({
            full_name: user.name,
            email: user.email,
            phone: '',
            bio: ''
          })
        }

        // Load user donations
        const { data: donationData } = await getUserDonations(user.id)
        // Mock donations for demo purposes since we don't have real Supabase connection
        const mockDonations = [
          { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
          { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
          { id: '3', amount: 50, created_at: '2024-01-05T00:00:00Z' }
        ]
        setDonations(donationData && donationData.length > 0 ? donationData : mockDonations)
      } catch (error) {
        console.error('Error loading profile:', error)
        // Fallback to mock donations on error
        const mockDonations = [
          { id: '1', amount: 100, created_at: '2024-01-15T00:00:00Z' },
          { id: '2', amount: 75, created_at: '2024-01-10T00:00:00Z' },
          { id: '3', amount: 50, created_at: '2024-01-05T00:00:00Z' }
        ]
        setDonations(mockDonations)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user])

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    setError('')

    try {
      await updateProfile(user.id, profile)
      setIsEditing(false)
    } catch (err) {
      setError('Failed to update profile')
      console.error('Profile update error:', err)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="animate-pulse space-y-6 relative z-10">
          <div className="h-32 bg-gray-200 rounded-2xl"></div>
          <div className="h-48 bg-gray-200 rounded-2xl"></div>
          <div className="h-40 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <motion.div 
          className="text-center bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <User size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">Please sign in to view your profile.</p>
        </motion.div>
      </div>
    )
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
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <h1 className="text-2xl font-bold">My Profile</h1>
        </motion.div>
        <motion.p 
          className="text-blue-100"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Manage your account and track your journey
        </motion.p>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Profile Header */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {user.name.charAt(0).toUpperCase()}
              </motion.div>
              <div>
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 flex items-center gap-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <Star className="w-5 h-5 text-yellow-500" />
                  {user.name}
                </motion.h2>
                <motion.p 
                  className="text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {user.email}
                </motion.p>
              </div>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="p-3 hover:bg-blue-100 rounded-xl transition-all duration-300 bg-blue-50"
              whileHover={{ scale: 1.1, rotate: isEditing ? 180 : 0 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEditing ? <X size={20} className="text-blue-600" /> : <Edit3 size={20} className="text-blue-600" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-500" />
            Personal Information
          </h3>
          
          {error && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {error}
            </motion.div>
          )}

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2 text-blue-500" />
                Full Name
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={profile.full_name}
                  onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50 bg-white/50 backdrop-blur-sm transition-all duration-300"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2 text-green-500" />
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2 text-purple-500" />
                Phone Number
              </label>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none disabled:bg-gray-50 bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="(416) 555-0123"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                disabled={!isEditing}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none disabled:bg-gray-50 resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </motion.div>

            {isEditing && (
              <motion.button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                {saving ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Save Changes
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Activity Summary */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Activity Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="text-center p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-xl border border-blue-200/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(59, 130, 246, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 15 }}
              >
                <p className="text-3xl font-bold text-blue-600 mb-2">3</p>
                <p className="text-sm text-blue-700 font-medium flex items-center justify-center gap-1">
                  <Calendar size={14} />
                  Programs Enrolled
                </p>
              </motion.div>
            </motion.div>
            <motion.div 
              className="text-center p-6 bg-gradient-to-br from-green-50 via-green-100 to-green-50 rounded-xl border border-green-200/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(34, 197, 94, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 200, damping: 15 }}
              >
                <p className="text-3xl font-bold text-green-600 mb-2">
                  ${donations.reduce((sum: number, d: any) => sum + parseFloat(d.amount), 0)}
                </p>
                <p className="text-sm text-green-700 font-medium flex items-center justify-center gap-1">
                  <Heart size={14} />
                  Total Donated
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Donations */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Heart className="w-5 h-5 text-red-500" />
            Recent Donations
          </h3>
          <div className="space-y-3">
            {donations.map((donation: any, index: number) => (
              <motion.div 
                key={donation.id} 
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.03,
                  x: 8,
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg shadow-lg"
                    whileHover={{ scale: 1.15, rotate: 10 }}
                  >
                    <Heart size={16} className="text-white" />
                  </motion.div>
                  <div>
                    <p className="font-semibold text-gray-900">${donation.amount}</p>
                    <p className="text-xs text-gray-500">{new Date(donation.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Award size={20} className="text-yellow-500" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
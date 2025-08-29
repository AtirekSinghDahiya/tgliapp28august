import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, CreditCard, DollarSign, Users, Sparkles, Star, TrendingUp, Award } from 'lucide-react'
import { submitDonation } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const Donate: React.FC = () => {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    amount: '',
    donorName: user?.name || '',
    donorEmail: user?.email || '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const presetAmounts = [25, 50, 100, 250, 500]

  const impactStats = [
    { amount: 25, impact: 'Provides school supplies for 1 student', icon: Star },
    { amount: 50, impact: 'Funds a workshop session for 5 participants', icon: Users },
    { amount: 100, impact: 'Supports a family with emergency assistance', icon: Heart },
    { amount: 250, impact: 'Sponsors a youth leadership program', icon: TrendingUp }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.donorName || !formData.donorEmail) {
      setError('Please fill in all required fields')
      return
    }

    const amount = parseFloat(formData.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid donation amount')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitDonation({
        user_id: user?.id,
        amount: amount,
        donor_name: formData.donorName,
        donor_email: formData.donorEmail,
        message: formData.message
      })
      
      setSuccess(true)
      
      // Log confirmation for testing
      console.log('Donation submitted successfully for:', formData.donorEmail);
      
      // Trigger real-time update across the app
      window.dispatchEvent(new CustomEvent('donationUpdated', { 
        detail: { 
          donation: { 
            id: Date.now().toString(),
            amount: amount,
            donor_name: formData.donorName,
            donor_email: formData.donorEmail,
            created_at: new Date().toISOString()
          } 
        } 
      }));
      
      setFormData({ amount: '', donorName: '', donorEmail: '', message: '' })
    } catch (err) {
      setError('Failed to process donation. Please try again.')
      console.error('Donation error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Success Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-green-300/30 rounded-full"
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
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <motion.div 
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl text-center max-w-md border border-white/50 relative z-10"
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          <motion.div 
            className="bg-gradient-to-r from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Heart size={32} className="text-green-600" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Thank You!
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Your generous donation has been submitted successfully. Together, we're making a real difference in our community!</p>
          </motion.div>
          
          <motion.button 
            onClick={() => setSuccess(false)}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Make Another Donation
          </motion.button>
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
            className="absolute w-2 h-2 bg-red-200/20 rounded-full"
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
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Heart className="w-6 h-6 text-pink-300" />
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Make a Donation</h1>
          <p className="text-red-100">Support our community programs and initiatives</p>
        </motion.div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Impact Stats */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <TrendingUp className="w-5 h-5 text-green-500" />
            Your Impact
          </motion.h2>
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-green-50 via-green-100 to-green-50 rounded-xl border border-green-200/50 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(34, 197, 94, 0.2)" }}
            >
              <motion.div 
                className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg w-fit mx-auto mb-3 shadow-lg"
                whileHover={{ scale: 1.15, rotate: 10 }}
              >
                <DollarSign size={24} className="text-white" />
              </motion.div>
              <p className="text-2xl font-bold text-green-600 mb-1">$2.5M</p>
              <p className="text-sm text-green-700 font-medium">Raised This Year</p>
            </motion.div>
            <motion.div 
              className="text-center p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-xl border border-blue-200/50 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0 12px 30px rgba(59, 130, 246, 0.2)" }}
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg w-fit mx-auto mb-3 shadow-lg"
                whileHover={{ scale: 1.15, rotate: -10 }}
              >
                <Users size={24} className="text-white" />
              </motion.div>
              <p className="text-2xl font-bold text-blue-600 mb-1">5,000+</p>
              <p className="text-sm text-blue-700 font-medium">Lives Impacted</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Impact Examples */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h3 
            className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Award className="w-5 h-5 text-yellow-500" />
            What Your Donation Can Do
          </motion.h3>
          <div className="space-y-3">
            {impactStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-4 p-3 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-lg border border-gray-200/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.03, x: 8 }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-lg shadow-lg"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <stat.icon size={16} className="text-white" />
                </motion.div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">${stat.amount}</p>
                  <p className="text-sm text-gray-600">{stat.impact}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Donation Form */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Heart className="w-5 h-5 text-red-500" />
            Make Your Donation
          </motion.h2>
          
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Select Amount (CAD)
              </label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount, index) => (
                  <motion.button
                    key={amount}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                    className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                      formData.amount === amount.toString()
                        ? 'border-red-500 bg-gradient-to-r from-red-50 to-red-100 text-red-600 shadow-lg'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-red-300 hover:bg-red-50'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  >
                    ${amount}
                  </motion.button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
              />
            </motion.div>

            {/* Donor Information */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.donorName}
                onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                required
              />
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.donorEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, donorEmail: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                required
              />
              <textarea
                placeholder="Message (optional)"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                rows={3}
              />
            </motion.div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {loading ? (
                <>
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  <Heart size={16} />
                  Donate ${formData.amount || '0'}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default Donate
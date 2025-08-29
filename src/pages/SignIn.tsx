import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Sparkles, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { signIn } from '../services/supabase'

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signIn(formData.email, formData.password)
      // Check for redirect destination
      const redirectTo = sessionStorage.getItem('redirectAfterLogin')
      if (redirectTo) {
        sessionStorage.removeItem('redirectAfterLogin')
        navigate(redirectTo)
      } else {
        navigate('/')
      }
    } catch (err: any) {
      if (err.message === 'Invalid login credentials') {
        setError('Invalid email or password. Please check your credentials or confirm your email address if you haven\'t already.')
      } else {
        setError(err.message || 'Invalid email or password')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-200/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
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
      <motion.div 
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-4 pt-12 relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={() => navigate('/')} 
            className="p-2 hover:bg-red-100 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <motion.img 
            src="https://tgli.org/TGLI_Logo.png" 
            alt="TGLI" 
            className="h-8 w-8 rounded-full shadow-md"
            whileHover={{ scale: 1.1, rotate: 5 }}
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="font-bold text-gray-900">TGLI</span>
          </motion.div>
        </div>
      </motion.div>

      <div className="p-6 relative z-10">
        <div className="max-w-md mx-auto">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.div 
              className="flex items-center justify-center gap-2 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            >
              <Sparkles className="w-6 h-6 text-red-500" />
              <Shield className="w-5 h-5 text-blue-500" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your TGLI account and continue your journey</p>
          </motion.div>

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

          <motion.div
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2 text-red-500" />
                Gmail Address
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                >
                  <Mail size={16} />
                </motion.div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                  placeholder="your.email@gmail.com"
                  required
                />
              </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock size={16} className="inline mr-2 text-red-500" />
                Password
              </label>
              <div className="relative">
                <motion.div
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                >
                  <Lock size={16} />
                </motion.div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-10 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-300"
                  placeholder="Enter your password"
                  required
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </motion.button>
              </div>
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
              >
                {loading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    Signing In...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Sign In
                  </>
                )}
              </motion.button>
          </form>
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-red-500 font-semibold hover:text-red-600 transition-colors">
                Sign Up
              </Link>
            </p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mt-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <p className="text-blue-700 text-sm text-center">
              <Shield size={16} className="inline mr-2" />
              <strong>Secure Login:</strong> Only Gmail addresses (@gmail.com) are accepted for enhanced security.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
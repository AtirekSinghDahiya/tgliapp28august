import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, ArrowLeft, CheckCircle, Sparkles, Send } from 'lucide-react'

const EventRegistration: React.FC = () => {
  const { eventId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    emergencyContact: '',
    additionalNotes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Mock event data - in real app, fetch from database
  const eventDetails = {
    '1': { title: 'Community Leadership Workshop', date: '2024-04-15', time: '10:00 AM - 4:00 PM', location: 'TGLI Main Office' },
    '2': { title: 'Job Fair 2024', date: '2024-04-22', time: '9:00 AM - 5:00 PM', location: 'Convention Centre' }
  }

  const event = eventDetails[eventId as keyof typeof eventDetails] || { title: 'Event', date: '', time: '', location: '' }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitEventRegistration({
        user_id: user?.id,
        event_id: eventId || '',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dietary_restrictions: formData.dietaryRestrictions,
        emergency_contact: formData.emergencyContact,
        additional_notes: formData.additionalNotes
      })
      
      console.log('Event registration submitted successfully for:', formData.email)
      
      setSuccess(true)
    } catch (err) {
      setError('Failed to register for event. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
            <CheckCircle size={32} className="text-green-600" />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Registration Confirmed!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            You're registered for <strong>{event.title}</strong>. We'll send you a confirmation email with event details shortly.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/events')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Other Events
            </button>
            <button 
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:from-gray-200 hover:to-gray-300 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
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
      
      {/* Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-4 pt-12 relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={() => navigate('/events')} 
            className="p-2 hover:bg-blue-100 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Event Registration
            </h1>
            <p className="text-sm text-gray-600">{event.title}</p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 relative z-10">
        <motion.div 
          className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/50 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Event Details */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">{event.title}</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User size={16} className="inline mr-2 text-blue-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail size={16} className="inline mr-2 text-green-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2 text-purple-500" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="(416) 555-0123"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dietary Restrictions
              </label>
              <input
                type="text"
                value={formData.dietaryRestrictions}
                onChange={(e) => setFormData(prev => ({ ...prev, dietaryRestrictions: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Any dietary restrictions or allergies"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emergency Contact
              </label>
              <input
                type="text"
                value={formData.emergencyContact}
                onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Emergency contact name and phone"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Any additional information or special requests"
                rows={3}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <motion.div 
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Registering...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Register for Event
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default EventRegistration
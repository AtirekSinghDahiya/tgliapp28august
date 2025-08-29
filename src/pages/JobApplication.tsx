import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, FileText, Upload, ArrowLeft, CheckCircle, Sparkles, Send, Briefcase } from 'lucide-react'

const JobApplication: React.FC = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    coverLetter: '',
    experience: '',
    availability: '',
    references: '',
    linkedinProfile: '',
    portfolioUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  // Mock job data - in real app, fetch from database
  const jobDetails = {
    '1': { title: 'Community Program Coordinator', department: 'Programs', location: 'Toronto, ON', type: 'Full-time' },
    '2': { title: 'Employment Services Specialist', department: 'Employment', location: 'Scarborough, ON', type: 'Full-time' }
  }

  const job = jobDetails[jobId as keyof typeof jobDetails] || { title: 'Position', department: '', location: '', type: '' }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.coverLetter) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitJobApplication({
        user_id: user?.id,
        job_id: jobId || '',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        cover_letter: formData.coverLetter,
        experience: formData.experience,
        availability: formData.availability,
        references: formData.references,
        linkedin_profile: formData.linkedinProfile,
        portfolio_url: formData.portfolioUrl
      })
      
      console.log('Job application submitted successfully for:', formData.email)
      
      setSuccess(true)
    } catch (err) {
      setError('Failed to submit application. Please try again.')
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
            Application Submitted!
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your application for <strong>{job.title}</strong> has been submitted successfully. Our HR team will review it and contact you within 5-7 business days.
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/careers')}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Other Positions
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
            className="absolute w-2 h-2 bg-orange-200/30 rounded-full"
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
            onClick={() => navigate('/careers')} 
            className="p-2 hover:bg-orange-100 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-orange-500" />
              Job Application
            </h1>
            <p className="text-sm text-gray-600">{job.title} - {job.department}</p>
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
          {/* Job Details */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 mb-6 border border-orange-200">
            <h3 className="font-bold text-orange-900 mb-2">{job.title}</h3>
            <div className="text-sm text-orange-700 space-y-1">
              <p><strong>Department:</strong> {job.department}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Your full address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FileText size={16} className="inline mr-2 text-orange-500" />
                Cover Letter *
              </label>
              <textarea
                value={formData.coverLetter}
                onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Experience
              </label>
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Describe your relevant work experience and achievements..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <input
                  type="text"
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="When can you start?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Website
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                  placeholder="https://yourportfolio.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                References
              </label>
              <textarea
                value={formData.references}
                onChange={(e) => setFormData(prev => ({ ...prev, references: e.target.value }))}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none bg-white/50 backdrop-blur-sm transition-all duration-300"
                placeholder="Please provide 2-3 professional references with contact information..."
                rows={3}
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Upload size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Resume Upload</span>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                Please email your resume to <strong>careers@tgli.org</strong> with the subject line: "Resume - {job.title} - [Your Name]"
              </p>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4 rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
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
                  Submitting Application...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Application
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default JobApplication
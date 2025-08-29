import React, { useState } from 'react'
import { Users, Heart, Calendar, Send } from 'lucide-react'

const GetInvolved: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interests: '',
    availability: '',
    experience: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1000)
  }

  if (success) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">We'll be in touch about volunteer opportunities.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Submit Another Form
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Get Involved</h1>
        <p className="text-gray-600">Join our community as a volunteer or partner</p>
      </div>

      {/* Involvement Options */}
      <div className="grid gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Volunteer</h3>
          </div>
          <p className="text-gray-600 text-sm">Help deliver programs and support community members</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Heart size={20} className="text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Partner</h3>
          </div>
          <p className="text-gray-600 text-sm">Collaborate with us on community initiatives</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar size={20} className="text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900">Event Support</h3>
          </div>
          <p className="text-gray-600 text-sm">Help organize and run community events</p>
        </div>
      </div>

      {/* Volunteer Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Volunteer Application</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name *"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
            required
          />
          
          <input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
            required
          />
          
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
          />
          
          <textarea
            placeholder="Areas of Interest *"
            value={formData.interests}
            onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
            rows={3}
            required
          />
          
          <textarea
            placeholder="Availability *"
            value={formData.availability}
            onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
            className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
            rows={2}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={16} />
                Submit Application
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default GetInvolved
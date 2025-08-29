import React, { useState } from 'react'
import { Heart, CreditCard, DollarSign, Users } from 'lucide-react'
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.donorName || !formData.donorEmail) {
      setError('Please fill in all required fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await submitDonation({
        user_id: user?.id,
        amount: parseFloat(formData.amount),
        donor_name: formData.donorName,
        donor_email: formData.donorEmail,
        message: formData.message
      })
      
      setSuccess(true)
      
      // Log confirmation for testing
      console.log('Donation submitted successfully for:', formData.donorEmail);
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
      <div className="p-4 flex items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-xl p-8 shadow-lg text-center max-w-md">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart size={32} className="text-green-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your donation has been submitted successfully.</p>
          <button 
            onClick={() => setSuccess(false)}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Make Another Donation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Make a Donation</h1>
        <p className="text-gray-600">Support our community programs and initiatives</p>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <DollarSign size={24} className="text-green-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-900">$2.5M</p>
          <p className="text-sm text-gray-600">Raised This Year</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Users size={24} className="text-blue-600 mx-auto mb-2" />
          <p className="text-lg font-bold text-gray-900">5,000+</p>
          <p className="text-sm text-gray-600">Lives Impacted</p>
        </div>
      </div>

      {/* Donation Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select Amount (CAD)
            </label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, amount: amount.toString() }))}
                  className={`p-3 rounded-lg border-2 font-semibold ${
                    formData.amount === amount.toString()
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
            />
          </div>

          {/* Donor Information */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.donorName}
              onChange={(e) => setFormData(prev => ({ ...prev, donorName: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.donorEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, donorEmail: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
              required
            />
            <textarea
              placeholder="Message (optional)"
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 text-white p-4 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard size={16} />
                Donate ${formData.amount || '0'}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Donate
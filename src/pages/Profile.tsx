import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, Edit3, Save, X } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { getProfile, updateProfile } from '../services/supabase'

const Profile: React.FC = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState({
    full_name: '',
    email: '',
    phone: '',
    bio: ''
  })
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
      } catch (error) {
        console.error('Error loading profile:', error)
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
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-gray-200 rounded-xl"></div>
          <div className="h-32 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Please sign in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            {isEditing ? <X size={20} /> : <Edit3 size={20} />}
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none disabled:bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                disabled={!isEditing}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none disabled:bg-gray-50"
                placeholder="(416) 555-0123"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
              disabled={!isEditing}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none disabled:bg-gray-50 resize-none"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          </div>

          {isEditing && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Services Enrolled</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">$250</p>
            <p className="text-sm text-gray-600">Total Donated</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
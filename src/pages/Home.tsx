import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Heart, Users, TrendingUp } from 'lucide-react'
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
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {user ? `Welcome back, ${user.name}!` : 'Welcome to TGLI'}
        </h1>
        <p className="text-gray-600">
          {user 
            ? 'Here\'s your dashboard with recent activity and quick actions.'
            : 'Empowering communities and building leaders across the GTA.'
          }
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <BookOpen size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Services</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">10K+</p>
              <p className="text-sm text-gray-600">Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Dashboard or Quick Actions */}
      {user ? (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Your Activity</h2>
          
          {/* Services Enrolled */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Services Enrolled</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Community Leadership</span>
                <span className="text-sm text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Employment Services</span>
                <span className="text-sm text-blue-600 font-medium">Completed</span>
              </div>
            </div>
          </div>

          {/* Donation History */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-3">Recent Donations</h3>
            {donations.length > 0 ? (
              <div className="space-y-2">
                {donations.slice(0, 3).map((donation: any) => (
                  <div key={donation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">${donation.amount}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(donation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No donations yet</p>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Get Started</h2>
          
          <div className="grid gap-4">
            <Link to="/programs" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Explore Programs</h3>
                  <p className="text-gray-600 text-sm">Discover our programs and services</p>
                </div>
              </div>
            </Link>
            
            <Link to="/donate" className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <Heart size={24} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Make a Donation</h3>
                  <p className="text-gray-600 text-sm">Support our community programs</p>
                </div>
              </div>
            </Link>
            
            <Link to="/signup" className="bg-red-500 text-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-lg">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Join Our Community</h3>
                  <p className="text-red-100 text-sm">Create your account today</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
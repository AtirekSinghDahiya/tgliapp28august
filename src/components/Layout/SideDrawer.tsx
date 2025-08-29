import React from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from '../../services/supabase'

interface SideDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut()
      onClose()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <img 
            src="https://www.tgli.org/TGLI_Logo.png" 
            alt="TGLI" 
            className="h-8"
          />
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            <Link to="/" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Home
            </Link>
            <Link to="/programs" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Programs
            </Link>
            <Link to="/donate" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Donate
            </Link>
            <Link to="/careers" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Careers
            </Link>
            <Link to="/get-involved" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Get Involved
            </Link>
            <Link to="/events" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              Events
            </Link>
            <Link to="/news" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              News
            </Link>
            <Link to="/about" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
              About Us
            </Link>
            
            <div className="border-t pt-4 mt-4">
              {user ? (
                <>
                  <Link to="/profile" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
                    Profile
                  </Link>
                  <button 
                    onClick={handleSignOut} 
                    className="block w-full text-left p-3 hover:bg-gray-100 rounded-lg text-red-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
                    Sign In
                  </Link>
                  <Link to="/signup" onClick={onClose} className="block p-3 hover:bg-gray-100 rounded-lg">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default SideDrawer
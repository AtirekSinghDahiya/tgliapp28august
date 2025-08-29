import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Search, Bell, User } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import SideDrawer from './SideDrawer'

const TopNavigation: React.FC = () => {
  const [showDrawer, setShowDrawer] = useState(false)
  const { user } = useAuth()

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDrawer(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={20} />
            </button>
            <Link to="/" className="flex items-center">
              <img 
                src="https://www.tgli.org/TGLI_Logo.png" 
                alt="TGLI" 
                className="h-8"
              />
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Search size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            {user ? (
              <Link to="/profile" className="p-1">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </Link>
            ) : (
              <Link to="/signin" className="p-2 hover:bg-gray-100 rounded-lg">
                <User size={20} />
              </Link>
            )}
          </div>
        </div>
      </header>

      <SideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} />
    </>
  )
}

export default TopNavigation
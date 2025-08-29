import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, Heart, Newspaper, Info } from 'lucide-react'

const BottomNavigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/programs', icon: BookOpen, label: 'Services' },
    { path: '/donate', icon: Heart, label: 'Donate' },
    { path: '/news', icon: Newspaper, label: 'News' },
    { path: '/about', icon: Info, label: 'About Us' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center p-2 min-w-0 flex-1 ${
                  isActive ? 'text-red-500' : 'text-gray-500'
                }`
              }
            >
              <Icon size={20} />
              <span className="text-xs mt-1 truncate">{item.label}</span>
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNavigation
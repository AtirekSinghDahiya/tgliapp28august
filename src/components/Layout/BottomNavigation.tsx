import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Heart, Newspaper, Info } from 'lucide-react'

const BottomNavigation: React.FC = () => {
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/programs', icon: BookOpen, label: 'Programs' },
    { path: '/donate', icon: Heart, label: 'Donate' },
    { path: '/news', icon: Newspaper, label: 'News' },
    { path: '/about', icon: Info, label: 'About Us' },
  ]

  return (
    <motion.nav 
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/50 z-40 shadow-lg"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex justify-around py-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.path}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-2 min-w-0 flex-1 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'text-red-500 bg-red-50 shadow-sm' 
                      : 'text-gray-500 hover:text-red-400 hover:bg-gray-50'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <motion.div
                      animate={isActive ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Icon size={20} />
                    </motion.div>
                    <motion.span 
                      className="text-xs mt-1 truncate"
                      animate={isActive ? { fontWeight: 600 } : { fontWeight: 400 }}
                    >
                      {item.label}
                    </motion.span>
                  </>
                )}
              </NavLink>
            </motion.div>
          )
        })}
      </div>
    </motion.nav>
  )
}

export default BottomNavigation
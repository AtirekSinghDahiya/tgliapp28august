import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, BookOpen, Heart, Newspaper, Info, Sparkles } from 'lucide-react'

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
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/30 z-40 shadow-2xl"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="flex justify-around py-3 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.path}
              initial={{ y: 60, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8,
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
              whileHover={{ y: -8, scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center p-3 min-w-0 flex-1 rounded-xl transition-all duration-300 relative ${
                    isActive 
                      ? 'text-red-500 bg-gradient-to-t from-red-50 to-red-100 shadow-lg' 
                      : 'text-gray-500 hover:text-red-400 hover:bg-gradient-to-t hover:from-gray-50 hover:to-gray-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.div
                        className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 32, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      />
                    )}
                    <motion.div
                      animate={isActive ? { 
                        scale: 1.2, 
                        y: -4,
                        rotate: [0, -5, 5, 0]
                      } : { 
                        scale: 1, 
                        y: 0,
                        rotate: 0
                      }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 17,
                        rotate: { duration: 0.6, ease: "easeInOut" }
                      }}
                      className="relative"
                    >
                      <Icon size={22} />
                      {isActive && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 400, damping: 15 }}
                        >
                          <Sparkles size={8} className="text-yellow-600" />
                        </motion.div>
                      )}
                    </motion.div>
                    <motion.span 
                      className="text-xs mt-2 truncate font-medium"
                      animate={isActive ? { 
                        fontWeight: 700,
                        scale: 1.05
                      } : { 
                        fontWeight: 500,
                        scale: 1
                      }}
                      transition={{ duration: 0.2 }}
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
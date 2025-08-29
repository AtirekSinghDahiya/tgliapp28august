import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, User, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import SearchModal from '../SearchModal/SearchModal';
import NotificationPanel from '../NotificationPanel/NotificationPanel';
import './Header.css';

const Header: React.FC = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await logout();
      console.log('User signed out successfully');
      setShowMenu(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50' 
            : 'bg-white/90 backdrop-blur-lg border-b border-gray-200/30'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.button
              className="p-2 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-red-100 transition-all duration-300"
              onClick={() => setShowMenu(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                scale: 1.08,
                rotate: 5,
                boxShadow: "0 4px 12px rgba(220, 38, 38, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <Menu size={20} className="text-gray-700" />
            </motion.button>
            
            <Link to="/" className="flex items-center gap-2">
              <motion.img 
                src="https://tgli.org/TGLI_Logo.png" 
                alt="TGLI" 
                className="h-8 w-8 rounded-full shadow-md"
                whileHover={{ 
                  scale: 1.15, 
                  rotate: 10,
                  boxShadow: "0 8px 20px rgba(220, 38, 38, 0.3)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              />
              <motion.div 
                className="hidden sm:block"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="font-bold text-gray-900 text-sm">TGLI</span>
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              className="p-2 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-blue-100 transition-all duration-300"
              onClick={() => setShowSearch(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <Search size={18} className="text-gray-700" />
            </motion.button>

            <motion.button
              className="p-2 rounded-xl bg-gray-100/80 backdrop-blur-sm hover:bg-yellow-100 transition-all duration-300 relative"
              onClick={() => setShowNotifications(true)}
              whileTap={{ scale: 0.95 }}
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 4px 12px rgba(245, 158, 11, 0.2)",
                transition: { duration: 0.3 }
              }}
            >
              <Bell size={18} className="text-gray-700" />
              {unreadCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.2 }}
                  whileHover={{ scale: 1.15 }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <Link to="/profile" className="relative">
                <motion.div 
                  className="w-9 h-9 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ 
                    scale: 1.15,
                    boxShadow: "0 8px 25px rgba(220, 38, 38, 0.4)",
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </motion.div>
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 15 }}
                />
              </Link>
            ) : (
              <motion.div
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/signin" 
                  className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Sparkles size={14} />
                  Sign In
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </motion.header>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl z-50 overflow-y-auto"
              initial={{ x: -320, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-red-500 to-red-600 text-white">
                <motion.img 
                  src="https://tgli.org/TGLI_Logo.png" 
                  alt="TGLI" 
                  className="h-10 w-10 rounded-full shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                />
                <div className="flex-1 ml-3">
                  <h3 className="font-bold text-lg">TGLI</h3>
                  <p className="text-red-100 text-sm">Leadership Institute</p>
                </div>
                <motion.button
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  onClick={() => setShowMenu(false)}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 90
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              <nav className="p-4 space-y-2">
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  <Link 
                    to="/" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 text-gray-700 hover:text-red-600"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Home
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Link 
                    to="/about" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 text-gray-700 hover:text-blue-600"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    About
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Link 
                    to="/programs" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all duration-300 text-gray-700 hover:text-green-600"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Programs
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link 
                    to="/events" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-50 hover:to-yellow-100 transition-all duration-300 text-gray-700 hover:text-yellow-600"
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    Events
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link 
                    to="/news" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-300 text-gray-700 hover:text-purple-600"
                  >
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    News
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link 
                    to="/careers" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 transition-all duration-300 text-gray-700 hover:text-orange-600"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    Careers
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <Link 
                    to="/donate" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 transition-all duration-300 text-gray-700 hover:text-pink-600"
                  >
                    <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                    Donate
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Link 
                    to="/contact" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-teal-100 transition-all duration-300 text-gray-700 hover:text-teal-600"
                  >
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    Contact
                  </Link>
                </motion.div>
                <motion.div 
                  whileHover={{ x: 8, scale: 1.02 }} 
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <Link 
                    to="/activity" 
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 text-gray-700 hover:text-indigo-600"
                  >
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    Your Activity
                  </Link>
                </motion.div>
                
                <div className="border-t border-gray-200 my-4"></div>
                
                {user ? (
                  <>
                    <motion.div 
                      whileHover={{ x: 8, scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <Link 
                        to="/profile" 
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 text-gray-700 hover:text-indigo-600"
                      >
                        <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                        Profile
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 8, scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <button 
                        onClick={handleSignOut} 
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 text-red-600 hover:text-red-700 w-full text-left"
                      >
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div 
                      whileHover={{ x: 8, scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8, duration: 0.5 }}
                    >
                      <Link 
                        to="/signin" 
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all duration-300 text-gray-700 hover:text-green-600"
                      >
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Sign In
                      </Link>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 8, scale: 1.02 }} 
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                    >
                      <Link 
                        to="/signup" 
                        onClick={() => setShowMenu(false)}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-300 text-gray-700 hover:text-blue-600"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Sign Up
                      </Link>
                    </motion.div>
                  </>
                )}
              </nav>

              {user && (
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200/50 bg-gradient-to-r from-gray-50 to-gray-100"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  <motion.div 
                    className="flex items-center gap-3"
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                      <p className="text-gray-600 text-sm truncate">{user.email}</p>
                    </div>
                    <motion.div
                      className="w-3 h-3 bg-green-400 rounded-full shadow-sm"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal 
        isOpen={showSearch} 
        onClose={() => setShowSearch(false)} 
      />

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
    </>
  );
};

export default Header;
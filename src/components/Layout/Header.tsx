import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, User } from 'lucide-react';
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
        className={`header ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="header-content">
          <div className="header-left">
            <motion.button
              className="menu-button ripple"
              onClick={() => setShowMenu(true)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(225, 29, 72, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Menu size={24} />
            </motion.button>
            
            <Link to="/" className="logo-link">
              <motion.img 
                src="https://tgli.org/TGLI_Logo.png" 
                alt="TGLI" 
                className="header-logo"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  filter: "brightness(1.1)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          <div className="header-right">
            <motion.button
              className="icon-button ripple"
              onClick={() => setShowSearch(true)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(225, 29, 72, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Search size={20} />
            </motion.button>

            <motion.button
              className="icon-button notification-button ripple"
              onClick={() => setShowNotifications(true)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(225, 29, 72, 0.1)",
                transition: { duration: 0.2 }
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span 
                  className="notification-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <Link to="/profile" className="profile-link">
                <motion.div 
                  className="profile-avatar"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(225, 29, 72, 0.3)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <User size={20} />
                  )}
                </motion.div>
              </Link>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/signin" className="login-button">
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
              className="menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMenu(false)}
            />
            <motion.div
              className="side-menu"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="menu-header">
                <motion.img 
                  src="https://tgli.org/TGLI_Logo.png" 
                  alt="TGLI" 
                  className="menu-logo"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                />
                <motion.button
                  className="close-button"
                  onClick={() => setShowMenu(false)}
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: "rgba(225, 29, 72, 0.1)",
                    rotate: 90
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </div>

              <nav className="menu-nav">
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/" onClick={() => setShowMenu(false)}>
                  Home
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/about" onClick={() => setShowMenu(false)}>
                  About
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/programs" onClick={() => setShowMenu(false)}>
                  Programs
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/news" onClick={() => setShowMenu(false)}>
                  News
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/careers" onClick={() => setShowMenu(false)}>
                  Careers
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/donate" onClick={() => setShowMenu(false)}>
                  Donate
                  </Link>
                </motion.div>
                <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/contact" onClick={() => setShowMenu(false)}>
                  Contact
                  </Link>
                </motion.div>
                
                {user ? (
                  <>
                    <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/profile" onClick={() => setShowMenu(false)}>
                      Profile
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                      <button onClick={handleSignOut} className="sign-out-button">
                      Sign Out
                      </button>
                    </motion.div>
                  </>
                ) : (
                  <>
                    <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/signin" onClick={() => setShowMenu(false)}>
                      Sign In
                      </Link>
                    </motion.div>
                    <motion.div whileHover={{ x: 10 }} whileTap={{ scale: 0.98 }}>
                      <Link to="/signup" onClick={() => setShowMenu(false)}>
                      Sign Up
                      </Link>
                    </motion.div>
                  </>
                )}
              </nav>

              {user && (
                <motion.div 
                  className="menu-user-info"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <motion.div 
                    className="user-avatar"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <User size={24} />
                    )}
                  </motion.div>
                  <div className="user-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
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
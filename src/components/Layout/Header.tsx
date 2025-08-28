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
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="header-content">
          <div className="header-left">
            <motion.button
              className="menu-button ripple"
              onClick={() => setShowMenu(true)}
              whileTap={{ scale: 0.95 }}
            >
              <Menu size={24} />
            </motion.button>
            
            <Link to="/" className="logo-link">
              <motion.img 
                src="https://www.tgli.org/TGLI_Logo.png" 
                alt="TGLI" 
                className="header-logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </Link>
          </div>

          <div className="header-right">
            <motion.button
              className="icon-button ripple"
              onClick={() => setShowSearch(true)}
              whileTap={{ scale: 0.95 }}
            >
              <Search size={20} />
            </motion.button>

            <motion.button
              className="icon-button notification-button ripple"
              onClick={() => setShowNotifications(true)}
              whileTap={{ scale: 0.95 }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <motion.span 
                  className="notification-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </motion.span>
              )}
            </motion.button>

            {user ? (
              <Link to="/profile" className="profile-link">
                <motion.div 
                  className="profile-avatar"
                  whileTap={{ scale: 0.95 }}
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <User size={20} />
                  )}
                </motion.div>
              </Link>
            ) : (
              <Link to="/login" className="login-button">
                Sign In
              </Link>
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
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="menu-header">
                <img 
                  src="https://www.tgli.org/TGLI_Logo.png" 
                  alt="TGLI" 
                  className="menu-logo"
                />
                <button
                  className="close-button"
                  onClick={() => setShowMenu(false)}
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="menu-nav">
                <Link to="/" onClick={() => setShowMenu(false)}>
                  Home
                </Link>
                <Link to="/about" onClick={() => setShowMenu(false)}>
                  About
                </Link>
                <Link to="/programs" onClick={() => setShowMenu(false)}>
                  Programs
                </Link>
                <Link to="/news" onClick={() => setShowMenu(false)}>
                  News
                </Link>
                <Link to="/careers" onClick={() => setShowMenu(false)}>
                  Careers
                </Link>
                <Link to="/donate" onClick={() => setShowMenu(false)}>
                  Donate
                </Link>
                <Link to="/contact" onClick={() => setShowMenu(false)}>
                  Contact
                </Link>
                
                {user ? (
                  <>
                    <Link to="/profile" onClick={() => setShowMenu(false)}>
                      Profile
                    </Link>
                    <button onClick={handleSignOut} className="sign-out-button">
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setShowMenu(false)}>
                      Sign In
                    </Link>
                    <Link to="/register" onClick={() => setShowMenu(false)}>
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>

              {user && (
                <div className="menu-user-info">
                  <div className="user-avatar">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                  <div className="user-details">
                    <p className="user-name">{user.name}</p>
                    <p className="user-email">{user.email}</p>
                  </div>
                </div>
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
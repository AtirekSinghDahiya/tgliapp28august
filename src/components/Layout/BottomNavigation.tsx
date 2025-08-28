import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, BookOpen, Newspaper, Briefcase, Heart } from 'lucide-react';
import './BottomNavigation.css';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/programs', icon: BookOpen, label: 'Programs' },
    { path: '/news', icon: Newspaper, label: 'News' },
    { path: '/careers', icon: Briefcase, label: 'Careers' },
    { path: '/donate', icon: Heart, label: 'Donate' },
  ];

  return (
    <motion.nav 
      className="bottom-navigation safe-area-bottom"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="nav-container">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <motion.div
                className="nav-item-content"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.1 }}
              >
                <div className="nav-icon-container">
                  <Icon size={20} className="nav-icon" />
                  {isActive && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </div>
                <span className="nav-label">{item.label}</span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
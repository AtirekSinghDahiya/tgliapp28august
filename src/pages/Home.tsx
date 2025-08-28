import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Users, 
  Calendar, 
  BookOpen, 
  Heart,
  Globe,
  Target,
  TrendingUp,
  Phone,
  User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import './Home.css';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { requestPermission } = useNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    // Request notification permission on first visit
    if (!user) {
      setTimeout(() => {
        requestPermission();
      }, 3000);
    }
  }, [user, requestPermission]);

  const stats = [
    { icon: Users, value: '10,000+', label: 'Community Members', color: '#dc2626' },
    { icon: BookOpen, value: '8', label: 'Active Programs', color: '#ea580c' },
    { icon: Globe, value: '50+', label: 'Countries Represented', color: '#d97706' },
    { icon: Target, value: '95%', label: 'Success Rate', color: '#ca8a04' },
  ];

  const featuredPrograms = [
    {
      title: 'Community Engagement',
      description: 'Build stronger communities through active participation and leadership.',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/programs',
      category: 'Leadership'
    },
    {
      title: 'Employment Services',
      description: 'Find meaningful employment opportunities and career advancement.',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/programs',
      category: 'Career'
    },
    {
      title: 'Youth Programs',
      description: 'Empowering young leaders with skills and mentorship opportunities.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      link: '/programs',
      category: 'Youth'
    },
  ];

  const quickActions = [
    { icon: Calendar, title: 'Upcoming Events', description: 'Join community events', link: '/programs', color: '#dc2626' },
    { icon: TrendingUp, title: 'Programs', description: 'Explore our offerings', link: '/programs', color: '#ea580c' },
    { icon: Phone, title: 'Get Support', description: 'Contact our team', link: '/contact', color: '#d97706' },
  ];

  // Removed unused handleNotificationTest

  const handleGetInvolved = () => {
    navigate('/programs');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img 
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop" 
            alt="Community" 
            className="hero-image"
          />
        </div>
        
        <div className="hero-content">
          <div className="container">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="hero-title">
                Empowering Communities,
                <span className="text-gradient"> Building Leaders</span>
              </h1>
              <p className="hero-description">
                Join the Toronto Global Leadership Institute and be part of a transformative 
                journey that connects, empowers, and elevates communities across the GTA.
              </p>
              
              <div className="hero-actions">
                <Link to="/programs" className="btn btn-primary">
                  <BookOpen size={20} />
                  Explore Programs
                </Link>
                <button onClick={handleGetInvolved} className="btn btn-secondary">
                  <Heart size={20} />
                  Get Involved
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section (collapsible on mobile) */}
      <section className="stats-section" aria-label="Impact stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="stat-card"
                  style={{ '--stat-color': stat.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <motion.h3 
                      className="stat-value"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Programs (card-first, concise) */}
      <section className="featured-section" aria-label="Featured programs">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Featured Programs</h2>
            <p className="section-description">
              Discover our comprehensive programs designed to empower individuals and strengthen communities.
            </p>
          </motion.div>
          
          <div className="programs-grid">
            {featuredPrograms.map((program, index) => (
              <motion.div
                key={index}
                className="program-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="program-image">
                  <img src={program.image} alt={program.title} />
                  <div className="program-category">{program.category}</div>
                  <motion.div 
                    className="program-overlay"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link to={program.link} className="program-link">
                      Learn More
                      <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
                <div className="program-content">
                  <h3 className="program-title">{program.title}</h3>
                  <p className="program-description">{program.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section" aria-label="Quick actions">
        <div className="container">
          <motion.h2 
            className="section-title text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get Started Today
          </motion.h2>
          
          <div className="actions-grid">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={action.link} 
                    className="action-card"
                    style={{ '--action-color': action.color } as React.CSSProperties}
                  >
                    <div className="action-icon">
                      <Icon size={28} />
                    </div>
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                    <ArrowRight size={20} className="action-arrow" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Welcome Message for Logged In Users */}
      {user && (
        <motion.section 
          className="welcome-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="welcome-card">
              <div className="welcome-content">
                <h3>Welcome back, {user.name}!</h3>
                <p>Continue your journey with TGLI. Check out your profile for personalized recommendations.</p>
                <Link to="/profile" className="btn btn-primary">
                  <User size={16} />
                  View Profile
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

export default Home;
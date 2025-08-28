import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Heart, 
  Globe,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react';
import './About.css';

const About: React.FC = () => {
  // Removed unused isVisible state to simplify

  const values = [
    {
      icon: Heart,
      title: 'Community First',
      description: 'We prioritize the needs and wellbeing of our community members above all else.',
      color: '#dc2626'
    },
    {
      icon: Shield,
      title: 'Integrity',
      description: 'We operate with transparency, honesty, and ethical practices in everything we do.',
      color: '#ea580c'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We embrace creative solutions and continuously evolve to better serve our community.',
      color: '#d97706'
    },
    {
      icon: Globe,
      title: 'Inclusivity',
      description: 'We welcome and celebrate diversity, ensuring everyone feels valued and included.',
      color: '#ca8a04'
    }
  ];

  const achievements = [
    { number: '10,000+', label: 'Lives Impacted', icon: Users },
    { number: '8', label: 'Core Programs', icon: Target },
    { number: '50+', label: 'Countries Represented', icon: Globe },
    { number: '95%', label: 'Success Rate', icon: TrendingUp }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Executive Director',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Leading community development initiatives for over 15 years.'
    },
    {
      name: 'Michael Chen',
      role: 'Program Director',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in youth development and leadership training programs.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Outreach Manager',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Passionate about connecting communities and building partnerships.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-background">
          <div className="hero-overlay"></div>
          <img 
            src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="About TGLI" 
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
              <h1 className="hero-title">About TGLI</h1>
              <p className="hero-description">
                Empowering communities across the Greater Toronto Area through leadership development, 
                comprehensive programs, and inclusive support services.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <motion.div 
            className="mission-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              The Toronto Global Leadership Institute is dedicated to fostering inclusive communities 
              where every individual has the opportunity to thrive. We provide comprehensive programs 
              and services that empower people to become leaders in their communities, achieve their 
              personal and professional goals, and contribute to a stronger, more connected society.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-description">
              These core values guide everything we do and shape how we serve our community.
            </p>
          </motion.div>
          
          <div className="values-grid">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="value-card"
                  style={{ '--value-color': value.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="value-icon">
                    <Icon size={28} />
                  </div>
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Impact</h2>
            <p className="section-description">
              Measuring our success through the positive changes we create in our community.
            </p>
          </motion.div>
          
          <div className="achievements-grid">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  className="achievement-card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="achievement-icon">
                    <Icon size={32} />
                  </div>
                  <motion.h3 
                    className="achievement-number"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    {achievement.number}
                  </motion.h3>
                  <p className="achievement-label">{achievement.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-description">
              Meet the dedicated professionals leading our mission to empower communities.
            </p>
          </motion.div>
          
          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-content">
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="history-section">
        <div className="container">
          <motion.div 
            className="history-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">Our Story</h2>
            <div className="history-text">
              <p>
                Founded in 2010, the Toronto Global Leadership Institute emerged from a vision to create 
                a more inclusive and empowered community in the Greater Toronto Area. What started as a 
                small grassroots initiative has grown into a comprehensive organization serving thousands 
                of community members annually.
              </p>
              <p>
                Over the years, we have expanded our programs to address the evolving needs of our diverse 
                community, from employment services and entrepreneurship support to youth development and 
                settlement services for newcomers. Our commitment to excellence and community-centered 
                approach has made us a trusted partner for individuals, families, and organizations 
                throughout the GTA.
              </p>
              <p>
                Today, TGLI continues to innovate and adapt, leveraging technology and partnerships to 
                reach more people and create greater impact. Our mobile app represents the next chapter 
                in our journey to make our services more accessible and responsive to community needs.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
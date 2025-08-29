import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram, Sparkles, Star, Heart, Users } from 'lucide-react'

const About: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Leadership Avenue', 'Toronto, ON M5V 3A8'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['Main: (416) 555-0123', 'Programs: (416) 555-0124'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@tgli.org', 'programs@tgli.org'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
      color: 'from-orange-500 to-orange-600'
    }
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/tgli', color: '#1877f2' },
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/tgli', color: '#1da1f2' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/tgli', color: '#0077b5' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/tgli', color: '#e4405f' }
  ]

  const stats = [
    { number: '500+', label: 'Community Members', icon: Users, color: 'text-blue-500' },
    { number: '12+', label: 'Active Programs', icon: Star, color: 'text-green-500' },
    { number: '1000+', label: 'Lives Impacted', icon: Heart, color: 'text-red-500' },
    { number: '25+', label: 'Events This Year', icon: Sparkles, color: 'text-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-200/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 pt-16 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <Star className="w-5 h-5 text-yellow-300" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">About TGLI</h1>
          <p className="text-blue-100">Empowering communities across the Greater Toronto Area</p>
        </motion.div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Mission */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Heart className="w-5 h-5 text-red-500" />
            Our Mission
          </motion.h2>
          <motion.p 
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            The Toronto Global Leadership Institute is dedicated to fostering inclusive communities 
            where every individual has the opportunity to thrive. We provide comprehensive programs 
            and services that empower people to become leaders in their communities, creating lasting 
            positive change for generations to come.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Star className="w-5 h-5 text-yellow-500" />
            Our Impact
          </motion.h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 rounded-xl border border-gray-200/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.8 + index * 0.1, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 150,
                  damping: 15
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 12px 30px rgba(0, 0, 0, 0.15)"
                }}
              >
                <motion.div 
                  className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 rounded-lg w-fit mx-auto mb-3 shadow-md"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                >
                  <stat.icon size={24} className={stat.color} />
                </motion.div>
                <motion.p 
                  className="text-2xl font-bold text-gray-900 mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, type: "spring", stiffness: 200, damping: 10 }}
                >
                  {stat.number}
                </motion.p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Phone className="w-5 h-5 text-green-500" />
            Contact Information
          </motion.h2>
          <div className="space-y-4">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <motion.div 
                  key={index} 
                  className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 rounded-xl p-4 border border-gray-200/50 backdrop-blur-sm"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.03,
                    x: 8,
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      className={`bg-gradient-to-r ${info.color} p-3 rounded-xl shadow-lg`}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                    >
                      <Icon size={20} className="text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm leading-relaxed">{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Sparkles className="w-5 h-5 text-purple-500" />
            Follow Us
          </motion.h2>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 p-4 rounded-xl shadow-lg border border-gray-200/50 backdrop-blur-sm"
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: 1.2 + index * 0.1, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    y: -8,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.2)",
                    backgroundColor: social.color
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} className="text-gray-600 hover:text-white transition-colors" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        {/* Map Placeholder */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ y: -4, boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)" }}
        >
          <motion.h2 
            className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <MapPin className="w-5 h-5 text-blue-500" />
            Our Location
          </motion.h2>
          <motion.div 
            className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 h-48 rounded-xl flex items-center justify-center border border-blue-200/50 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-center text-blue-600">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MapPin size={48} className="mx-auto mb-3" />
              </motion.div>
              <p className="font-semibold">Interactive map would be here</p>
              <p className="text-sm text-blue-500 mt-1">123 Leadership Avenue, Toronto</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default About
import React from 'react'
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const About: React.FC = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Leadership Avenue', 'Toronto, ON M5V 3A8']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['Main: (416) 555-0123', 'Programs: (416) 555-0124']
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@tgli.org', 'programs@tgli.org']
    },
    {
      icon: Clock,
      title: 'Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM']
    }
  ]

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/tgli' },
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/tgli' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/tgli' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/tgli' }
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">About TGLI</h1>
        <p className="text-gray-600">Empowering communities across the Greater Toronto Area</p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Our Mission</h2>
        <p className="text-gray-600 leading-relaxed">
          The Toronto Global Leadership Institute is dedicated to fostering inclusive communities 
          where every individual has the opportunity to thrive. We provide comprehensive programs 
          and services that empower people to become leaders in their communities.
        </p>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Contact Information</h2>
        {contactInfo.map((info, index) => {
          const Icon = info.icon
          return (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <Icon size={20} className="text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{info.title}</h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Social Media */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Follow Us</h2>
        <div className="flex justify-center gap-4">
          {socialLinks.map((social, index) => {
            const Icon = social.icon
            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-100 p-3 rounded-lg hover:bg-gray-200 transition-colors"
                aria-label={social.name}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={20} className="text-gray-600" />
              </motion.a>
            )
          })}
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Location</h2>
        <div className="bg-gray-100 h-48 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin size={32} className="mx-auto mb-2" />
            <p>Interactive map would be here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
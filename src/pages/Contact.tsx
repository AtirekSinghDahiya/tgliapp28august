import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  User, 
  MessageSquare, 
  Building,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { sendConfirmationEmail } from '../lib/emailService';
import { submitContactForm } from '../lib/supabase';
import './Contact.css';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  department: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitError, setSubmitError] = useState('');
  // Removed unused isVisible state

  const departments = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'programs', label: 'Programs' },
    { value: 'employment', label: 'Employment Services' },
    { value: 'business', label: 'Entrepreneurship' },
    { value: 'housing', label: 'Housing Support' },
    { value: 'youth', label: 'Youth Programs' },
    { value: 'settlement', label: 'Settlement Services' },
    { value: 'seniors', label: 'Seniors Support' },
    { value: 'volunteer', label: 'Volunteer Opportunities' },
    { value: 'partnership', label: 'Partnerships' }
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Main Office',
      details: [
        '123 Leadership Avenue',
        'Toronto, ON M5V 3A8',
        'Canada'
      ],
      action: 'Get Directions',
      actionType: 'map'
    },
    {
      icon: Phone,
      title: 'Phone',
      details: [
        'Main: (416) 555-0123',
        'Programs: (416) 555-0124',
        'Employment: (416) 555-0125'
      ],
      action: 'Call Now',
      actionType: 'phone'
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@tgli.org',
        'programs@tgli.org',
        'careers@tgli.org'
      ],
      action: 'Send Email',
      actionType: 'email'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM',
        'Saturday: 10:00 AM - 4:00 PM',
        'Sunday: Closed'
      ],
      action: 'View Calendar',
      actionType: 'calendar'
    }
  ];

  const socialLinks = [
    { icon: Facebook, name: 'Facebook', url: 'https://facebook.com/tgli', color: '#1877f2' },
    { icon: Twitter, name: 'Twitter', url: 'https://twitter.com/tgli', color: '#1da1f2' },
    { icon: Linkedin, name: 'LinkedIn', url: 'https://linkedin.com/company/tgli', color: '#0077b5' },
    { icon: Instagram, name: 'Instagram', url: 'https://instagram.com/tgli', color: '#e4405f' }
  ];

  // No-op effect removed

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Clear submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Send immediate confirmation email
      await sendConfirmationEmail({
        to: formData.email,
        name: formData.name,
        type: 'contact',
        subject: formData.subject
      });

      const { error } = await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        department: formData.department
      });

      if (error) {
        throw error;
      }
      
      setIsSubmitted(true);
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general'
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message. Please try again or contact us directly.';
      console.error('Error submitting form:', error);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactAction = (actionType: string, details: string[]) => {
    switch (actionType) {
      case 'phone':
        window.open(`tel:${details[0].split(': ')[1]}`, '_self');
        break;
      case 'email':
        window.open(`mailto:${details[0]}`, '_self');
        break;
      case 'map':
        window.open(`https://maps.google.com/?q=${encodeURIComponent(details.join(', '))}`, '_blank');
        break;
      case 'calendar':
        alert('Calendar booking system would open here');
        break;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-green-500 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle size={80} className="mx-auto" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          <button 
            className="btn btn-primary w-full"
            onClick={() => setIsSubmitted(false)}
          >
            Send Another Message
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16">
        <h1 className="text-2xl font-bold mb-2 text-center">Contact Us</h1>
        <p className="text-red-100 text-center">Get in touch with our team</p>
      </div>

      {/* Contact Cards */}
      <div className="p-4 space-y-4">
        {contactInfo.map((info, index) => {
          const Icon = info.icon;
          return (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleContactAction(info.actionType, info.details)}
            >
              <div className="flex items-center gap-4">
                <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-3 rounded-xl">
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Send us a Message</h2>
          
          {submitError && (
            <motion.div 
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle size={16} />
              {submitError}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="text-red-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.name}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Mail size={16} className="text-red-500" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.email}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="text-red-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors"
                  placeholder="(416) 555-0123"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building size={16} className="text-red-500" />
                  Department
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors"
                >
                  {departments.map(dept => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare size={16} className="text-red-500" />
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.subject ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="What is this regarding?"
                />
                {errors.subject && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.subject}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MessageSquare size={16} className="text-red-500" />
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.message ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors resize-none`}
                  placeholder="Please provide details about your inquiry..."
                  rows={4}
                />
                {errors.message && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.message}</p>}
              </div>
            </div>

            <motion.button
              type="submit"
              className={`w-full btn btn-primary text-lg py-4 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading"></div>
                  Sending...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send size={16} />
                  Send Message
                </div>
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Social Media */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                  title={social.name}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Send,
  ArrowLeft
} from 'lucide-react';
import { submitProgramApplication } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  motivation: string;
  experience: string;
  availability: string;
}

const ProgramApplication: React.FC = () => {
  const { programId } = useParams<{ programId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<ApplicationForm>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    motivation: '',
    experience: '',
    availability: ''
  });
  
  const [errors, setErrors] = useState<Partial<ApplicationForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const programs = {
    'community': 'Community Engagement',
    'employment': 'Employment Services',
    'entrepreneurship': 'Entrepreneurship',
    'housing': 'Housing Support',
    'skills': 'Skills Upgrade',
    'seniors': 'Seniors Support',
    'settlement': 'Settlement Services',
    'youth': 'Youth Programs'
  };

  const programName = programs[programId as keyof typeof programs] || 'Program';

  const validateForm = (): boolean => {
    const newErrors: Partial<ApplicationForm> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.motivation.trim()) {
      newErrors.motivation = 'Motivation is required';
    } else if (formData.motivation.trim().length < 50) {
      newErrors.motivation = 'Please provide at least 50 characters explaining your motivation';
    }
    if (!formData.availability.trim()) newErrors.availability = 'Availability is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof ApplicationForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitProgramApplication({
        user_id: user?.id,
        program_id: programId || 'unknown',
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        motivation: formData.motivation,
        experience: formData.experience,
        availability: formData.availability
      });
      
      setIsSubmitted(true);
      
      // Log confirmation for testing
      console.log('Program application submitted successfully for:', formData.email);
    } catch (error) {
      console.error('Error submitting application:', error);
      const message = error instanceof Error ? error.message : 'Failed to submit application. Please try again.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Thank you for applying to the {programName} program. We've received your application 
            and will review it within 5-7 business days.
          </p>
          <div className="space-y-3">
            <button 
              className="btn btn-primary w-full"
              onClick={() => navigate('/programs')}
            >
              View Other Programs
            </button>
            <button 
              className="btn btn-secondary w-full"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate('/programs')}
            className="p-2 rounded-lg bg-white/10 mr-4"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Apply for Program</h1>
        </div>
        <p className="text-red-100">{programName}</p>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <User size={16} className="text-red-500" />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.fullName ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.fullName}</p>}
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
                  placeholder="your.email@gmail.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.email}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Phone size={16} className="text-red-500" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="(416) 555-0123"
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.phone}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <MapPin size={16} className="text-red-500" />
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.address ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors`}
                  placeholder="Enter your full address"
                />
                {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.address}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="text-red-500" />
                  Why do you want to join this program? *
                </label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.motivation ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors resize-none`}
                  placeholder="Please explain your motivation and goals (minimum 50 characters)"
                  rows={4}
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.motivation.length}/50 minimum
                </div>
                {errors.motivation && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.motivation}</p>}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <FileText size={16} className="text-red-500" />
                  Relevant Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors resize-none"
                  placeholder="Describe any relevant experience or background"
                  rows={3}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar size={16} className="text-red-500" />
                  Availability *
                </label>
                <textarea
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className={`w-full p-4 border-2 rounded-xl text-base ${errors.availability ? 'border-red-500' : 'border-gray-200'} focus:border-red-500 focus:outline-none transition-colors resize-none`}
                  placeholder="When are you available for this program? (days, times, etc.)"
                  rows={2}
                />
                {errors.availability && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14} />{errors.availability}</p>}
              </div>
            </div>

            <motion.button
              type="submit"
              className={`w-full btn btn-primary text-lg font-semibold py-4 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="loading"></div>
                  Submitting Application...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Send size={16} />
                  Submit Application
                </div>
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProgramApplication;
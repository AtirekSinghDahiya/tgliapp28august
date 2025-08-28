import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  CreditCard, 
  DollarSign, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Gift,
  Star,
  Users,
  Target
} from 'lucide-react';
import { submitDonation } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface DonationForm {
  amount: string;
  customAmount: string;
  frequency: 'one-time' | 'monthly' | 'yearly';
  program: string;
  donorName: string;
  donorEmail: string;
  paymentMethod: 'card' | 'paypal';
}

const Donate: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<DonationForm>({
    amount: '50',
    customAmount: '',
    frequency: 'one-time',
    program: 'general',
    donorName: user?.name || '',
    donorEmail: user?.email || '',
    paymentMethod: 'card'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const presetAmounts = ['25', '50', '100', '250', '500'];
  
  const programs = [
    { value: 'general', label: 'General Fund', impact: 'Supports all TGLI programs' },
    { value: 'community', label: 'Community Engagement', impact: '$50 trains one community leader' },
    { value: 'employment', label: 'Employment Services', impact: '$100 provides job search support' },
    { value: 'youth', label: 'Youth Programs', impact: '$75 sponsors youth leadership training' },
    { value: 'settlement', label: 'Settlement Services', impact: '$150 helps one family settle' },
    { value: 'housing', label: 'Housing Support', impact: '$200 helps secure housing' }
  ];

  const getDonationAmount = () => {
    return formData.amount === 'custom' ? formData.customAmount : formData.amount;
  };

  const handleAmountChange = (amount: string) => {
    setFormData(prev => ({ ...prev, amount, customAmount: '' }));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ 
      ...prev, 
      customAmount: value, 
      amount: value ? 'custom' : '50' 
    }));
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (submitError) setSubmitError('');
  };

  const handleSubmit = async () => {
    const amount = parseFloat(getDonationAmount());
    
    if (!amount || amount < 1) {
      setSubmitError('Please enter a valid donation amount');
      return;
    }
    
    if (!formData.donorName.trim()) {
      setSubmitError('Please enter your name');
      return;
    }
    
    if (!formData.donorEmail.trim()) {
      setSubmitError('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      await submitDonation({
        user_id: user?.id,
        amount: amount,
        frequency: formData.frequency,
        program: formData.program,
        donor_name: formData.donorName,
        donor_email: formData.donorEmail,
        payment_method: formData.paymentMethod
      });
      
      setIsComplete(true);
    } catch (error: any) {
      console.error('Donation failed:', error);
      setSubmitError(error.message || 'Donation failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-red-500 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Heart size={80} className="mx-auto" />
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Your ${getDonationAmount()} {formData.frequency} donation will make a real difference 
            in our community. You'll receive a receipt via email shortly.
          </p>
          <button 
            className="btn btn-primary w-full"
            onClick={() => window.location.reload()}
          >
            Make Another Donation
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16">
        <h1 className="text-2xl font-bold mb-2 text-center">Make a Donation</h1>
        <p className="text-red-100 text-center">Support our community programs</p>
      </div>

      {/* Impact Stats */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[
            { icon: Users, value: '10,000+', label: 'Lives Impacted', color: 'bg-blue-500' },
            { icon: Target, value: '95%', label: 'Success Rate', color: 'bg-green-500' },
            { icon: Heart, value: '$2.5M', label: 'Funds Raised', color: 'bg-red-500' },
            { icon: Star, value: '25+', label: 'Programs', color: 'bg-yellow-500' }
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 shadow-lg text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <div className={`${stat.color} text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-600">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 text-center">
              {submitError}
            </div>
          )}

          {/* Frequency Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Donation Frequency</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'one-time', label: 'One-time', icon: Gift },
                { value: 'monthly', label: 'Monthly', icon: Calendar },
                { value: 'yearly', label: 'Yearly', icon: Star }
              ].map(freq => {
                const Icon = freq.icon;
                return (
                  <button
                    key={freq.value}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      formData.frequency === freq.value 
                        ? 'border-red-500 bg-red-50 text-red-600' 
                        : 'border-gray-200 bg-white text-gray-700'
                    }`}
                    onClick={() => handleInputChange('frequency', freq.value)}
                  >
                    <Icon size={20} className="mx-auto mb-1" />
                    <span className="text-sm font-medium">{freq.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Amount Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount (CAD)</label>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {presetAmounts.map(amount => (
                <button
                  key={amount}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    formData.amount === amount 
                      ? 'border-red-500 bg-red-500 text-white' 
                      : 'border-gray-200 bg-white text-gray-700'
                  }`}
                  onClick={() => handleAmountChange(amount)}
                >
                  <DollarSign size={16} className="mx-auto mb-1" />
                  ${amount}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Custom amount"
              value={formData.customAmount}
              onChange={handleCustomAmountChange}
              className={`w-full p-4 border-2 rounded-xl text-center font-semibold ${
                formData.amount === 'custom' 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-200'
              } focus:border-red-500 focus:outline-none transition-colors`}
            />
          </div>

          {/* Program Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Choose Program to Support</label>
            <div className="space-y-2">
              {programs.map(program => (
                <button
                  key={program.value}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    formData.program === program.value 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleInputChange('program', program.value)}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{program.label}</h4>
                  <p className="text-sm text-gray-600">{program.impact}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={formData.donorName}
                onChange={(e) => handleInputChange('donorName', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.donorEmail}
                onChange={(e) => handleInputChange('donorEmail', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'border-red-500 bg-red-50 text-red-600' 
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
                onClick={() => handleInputChange('paymentMethod', 'card')}
              >
                <CreditCard size={20} className="mx-auto mb-2" />
                <span className="text-sm font-medium">Credit Card</span>
              </button>
              <button
                className={`p-4 rounded-xl border-2 transition-all ${
                  formData.paymentMethod === 'paypal' 
                    ? 'border-red-500 bg-red-50 text-red-600' 
                    : 'border-gray-200 bg-white text-gray-700'
                }`}
                onClick={() => handleInputChange('paymentMethod', 'paypal')}
              >
                <Heart size={20} className="mx-auto mb-2" />
                <span className="text-sm font-medium">PayPal</span>
              </button>
            </div>
          </div>

          {/* Impact Preview */}
          <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-xl p-4 mb-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-2">Your Impact</h3>
            <div className="text-2xl font-bold text-red-600 mb-1">
              ${getDonationAmount()} {formData.frequency}
            </div>
            <p className="text-sm text-gray-600">
              Supporting: {programs.find(p => p.value === formData.program)?.label}
            </p>
          </div>

          <motion.button
            className={`w-full btn btn-primary text-lg py-4 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''}`}
            disabled={isSubmitting || !getDonationAmount() || parseFloat(getDonationAmount()) < 1}
            onClick={handleSubmit}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <div className="loading"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <Heart size={16} />
                Donate ${getDonationAmount()}
              </div>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Donate;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, Shield, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@gmail\.com$/.test(formData.email.toLowerCase())) {
      newErrors.email = 'Only Gmail addresses are allowed (@gmail.com)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.email, formData.password, `${formData.firstName} ${formData.lastName}`);
      navigate('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.';
      setErrors({ general: message });
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthLabel = () => {
    const strength = getPasswordStrength();
    if (strength <= 1) return { label: 'Weak', color: '#ef4444' };
    if (strength <= 2) return { label: 'Fair', color: '#f59e0b' };
    if (strength <= 3) return { label: 'Good', color: '#3b82f6' };
    return { label: 'Strong', color: '#10b981' };
  };

  return (
    <div className="auth-page">
      {/* Header with back button */}
      <div className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="flex items-center justify-between p-4 pt-12">
          <button 
            onClick={() => navigate('/')}
            className="p-2 rounded-lg bg-gray-100 text-gray-600"
          >
            <ArrowLeft size={20} />
          </button>
          <img 
            src="https://www.tgli.org/TGLI_Logo.png" 
            alt="TGLI" 
            className="h-8"
          />
          <div className="w-10"></div>
        </div>
      </div>

      <motion.div 
        className="auth-container pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="auth-content">
          {/* Left Side - Branding */}
          <motion.div 
            className="auth-branding"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="branding-content">
              <div className="logo-section">
                <img 
                  src="https://www.tgli.org/TGLI_Logo.png" 
                  alt="TGLI Logo" 
                  className="auth-logo"
                />
                <h1>Toronto Global Leadership Institute</h1>
              </div>
              
              <div className="branding-text">
                <h2>Join Our Community</h2>
                <p>
                  Create your account to access our programs, connect with fellow community 
                  members, and start your journey toward leadership and positive impact.
                </p>
              </div>

              <div className="features-list">
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <CheckCircle size={20} />
                  <span>Access to all programs</span>
                </motion.div>
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <CheckCircle size={20} />
                  <span>Community networking</span>
                </motion.div>
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CheckCircle size={20} />
                  <span>Personal progress tracking</span>
                </motion.div>
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <CheckCircle size={20} />
                  <span>Event notifications</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Registration Form */}
          <motion.div 
            className="auth-form-section"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="auth-form-container">
              <div className="form-header">
                <h2>Create Account</h2>
                <p>Fill in your information to get started</p>
              </div>

              {errors.general && (
                <motion.div 
                  className="error-banner"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle size={16} />
                  {errors.general}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">
                      <User size={16} />
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.firstName ? 'error' : ''}`}
                      placeholder="Enter your first name"
                      autoComplete="given-name"
                    />
                    {errors.firstName && <span className="error-message"><AlertCircle size={14} />{errors.firstName}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">
                      <User size={16} />
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`form-input ${errors.lastName ? 'error' : ''}`}
                      placeholder="Enter your last name"
                      autoComplete="family-name"
                    />
                    {errors.lastName && <span className="error-message"><AlertCircle size={14} />{errors.lastName}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    <Mail size={16} />
                    Gmail Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your @gmail.com address"
                    autoComplete="email"
                  />
                  {errors.email && <span className="error-message"><AlertCircle size={14} />{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <Lock size={16} />
                    Password
                  </label>
                  <div className="password-input">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-input ${errors.password ? 'error' : ''}`}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bar">
                        <div 
                          className="strength-fill"
                          style={{ 
                            width: `${(getPasswordStrength() / 5) * 100}%`,
                            backgroundColor: getPasswordStrengthLabel().color
                          }}
                        ></div>
                      </div>
                      <span 
                        className="strength-label"
                        style={{ color: getPasswordStrengthLabel().color }}
                      >
                        {getPasswordStrengthLabel().label}
                      </span>
                    </div>
                  )}
                  {errors.password && <span className="error-message"><AlertCircle size={14} />{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">
                    <Shield size={16} />
                    Confirm Password
                  </label>
                  <div className="password-input">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && <span className="error-message"><AlertCircle size={14} />{errors.confirmPassword}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span className="checkmark"></span>
                    I agree to the{' '}
                    <Link to="/terms" className="terms-link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="terms-link">Privacy Policy</Link>
                  </label>
                  {errors.terms && <span className="error-message"><AlertCircle size={14} />{errors.terms}</span>}
                </div>

                <motion.button
                  type="submit"
                  className={`btn btn-primary auth-submit ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="loading"></div>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="auth-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="auth-link">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="gmail-notice">
                <h4>Gmail Required</h4>
                <p>Only Gmail addresses (@gmail.com) are accepted for security purposes.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
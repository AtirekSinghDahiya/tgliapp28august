import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@gmail\.com$/.test(formData.email.toLowerCase())) {
      newErrors.email = 'Only Gmail addresses are allowed (@gmail.com)';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error: any) {
      setErrors({ general: error.message || 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
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
                <h2>Welcome Back</h2>
                <p>
                  Sign in to access your personalized dashboard, track your progress, 
                  and stay connected with our community programs.
                </p>
              </div>

              <div className="features-list">
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <User size={20} />
                  <span>Access your personal dashboard</span>
                </motion.div>
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Shield size={20} />
                  <span>Secure and private</span>
                </motion.div>
                <motion.div 
                  className="feature-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <ArrowRight size={20} />
                  <span>Quick and easy access</span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Form */}
          <motion.div 
            className="auth-form-section"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="auth-form-container">
              <div className="form-header">
                <h2>Sign In</h2>
                <p>Enter your Gmail credentials to access your account</p>
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
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && <span className="error-message"><AlertCircle size={14} />{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                    Remember me
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={16} />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="auth-footer">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="auth-link">
                    Create one here
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

export default Login;
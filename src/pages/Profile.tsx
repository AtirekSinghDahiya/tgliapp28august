import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Bell, 
  Settings, 
  Heart,
  BookOpen,
  Award,
  TrendingUp,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../contexts/NotificationContext';
import './Profile.css';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  dateOfBirth: string;
  joinDate: string;
  avatar: string;
  bio: string;
  interests: string[];
  preferences: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    programUpdates: boolean;
    eventReminders: boolean;
    newsletter: boolean;
  };
}

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications, clearNotifications } = useNotifications();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (416) 555-0123',
    address: '123 Main Street',
    city: 'Toronto',
    postalCode: 'M5V 3A8',
    dateOfBirth: '1990-05-15',
    joinDate: '2023-01-15',
    avatar: '',
    bio: 'Community leader passionate about making a positive impact in the Greater Toronto Area.',
    interests: ['Community Leadership', 'Entrepreneurship', 'Youth Mentoring', 'Social Innovation'],
    preferences: {
      emailNotifications: true,
      smsNotifications: false,
      programUpdates: true,
      eventReminders: true,
      newsletter: true
    }
  });

  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const stats = [
    { icon: BookOpen, label: 'Programs Enrolled', value: '3', color: '#3b82f6' },
    { icon: Calendar, label: 'Events Attended', value: '12', color: '#10b981' },
    { icon: Heart, label: 'Total Donations', value: '$850', color: '#ef4444' },
    { icon: Award, label: 'Certificates Earned', value: '2', color: '#f59e0b' }
  ];

  const recentActivity = [
    {
      type: 'program',
      title: 'Completed Community Leadership Workshop',
      date: '2024-01-10',
      icon: Award,
      color: '#10b981'
    },
    {
      type: 'donation',
      title: 'Donated $100 to Youth Programs',
      date: '2024-01-08',
      icon: Heart,
      color: '#ef4444'
    },
    {
      type: 'event',
      title: 'Attended Job Fair 2024',
      date: '2024-01-05',
      icon: Calendar,
      color: '#3b82f6'
    },
    {
      type: 'program',
      title: 'Enrolled in Entrepreneurship Program',
      date: '2024-01-03',
      icon: BookOpen,
      color: '#f59e0b'
    }
  ];

  const availableInterests = [
    'Community Leadership', 'Entrepreneurship', 'Youth Mentoring', 'Social Innovation',
    'Employment Services', 'Housing Support', 'Settlement Services', 'Seniors Support',
    'Volunteer Work', 'Fundraising', 'Event Planning', 'Public Speaking'
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setEditedProfile(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof UserProfile],
          [child]: value
        }
      }));
    } else {
      setEditedProfile(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setEditedProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditedProfile(prev => ({ ...prev, avatar: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadData = () => {
    const data = {
      profile,
      stats,
      recentActivity,
      notifications: notifications.slice(0, 10)
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tgli-profile-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'activity', label: 'Activity', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className={`profile-hero ${isVisible ? 'fade-in' : ''}`}>
            <div className="profile-avatar-section">
              <div className="avatar-container">
                {profile.avatar ? (
                  <img src={profile.avatar} alt="Profile" className="profile-avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    <User size={48} />
                  </div>
                )}
                {isEditing && (
                  <label className="avatar-upload">
                    <Camera size={20} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
              <div className="profile-info">
                <h1>{profile.firstName} {profile.lastName}</h1>
                <p className="profile-bio">{profile.bio}</p>
                <div className="profile-meta">
                  <div className="meta-item">
                    <Calendar size={16} />
                    <span>Joined {new Date(profile.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{profile.city}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              {!isEditing ? (
                <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="btn btn-outline" onClick={handleCancel}>
                    <X size={16} />
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="profile-stats">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className={`stat-card ${isVisible ? 'scale-in' : ''}`}
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    '--stat-color': stat.color
                  } as React.CSSProperties}
                >
                  <div className="stat-icon">
                    <Icon size={24} />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-value">{stat.value}</h3>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="profile-content">
        <div className="container">
          {/* Tab Navigation */}
          <div className="tab-navigation">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="profile-tab">
                <div className="profile-form">
                  <h2>Personal Information</h2>
                  
                  <div className="form-section">
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.firstName : profile.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.lastName : profile.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={isEditing ? editedProfile.email : profile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={isEditing ? editedProfile.phone : profile.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Address</label>
                      <input
                        type="text"
                        value={isEditing ? editedProfile.address : profile.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.city : profile.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="form-group">
                        <label>Postal Code</label>
                        <input
                          type="text"
                          value={isEditing ? editedProfile.postalCode : profile.postalCode}
                          onChange={(e) => handleInputChange('postalCode', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        value={isEditing ? editedProfile.dateOfBirth : profile.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label>Bio</label>
                      <textarea
                        value={isEditing ? editedProfile.bio : profile.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Tell us about yourself..."
                      />
                    </div>

                    <div className="form-group">
                      <label>Interests</label>
                      <div className="interests-grid">
                        {availableInterests.map(interest => (
                          <button
                            key={interest}
                            type="button"
                            className={`interest-tag ${
                              (isEditing ? editedProfile.interests : profile.interests).includes(interest) 
                                ? 'active' 
                                : ''
                            }`}
                            onClick={() => isEditing && handleInterestToggle(interest)}
                            disabled={!isEditing}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div className="activity-tab">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className={`activity-item ${isVisible ? 'slide-up' : ''}`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div 
                          className="activity-icon"
                          style={{ '--activity-color': activity.color } as React.CSSProperties}
                        >
                          <Icon size={20} />
                        </div>
                        <div className="activity-content">
                          <h4>{activity.title}</h4>
                          <p>{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="notifications-tab">
                <div className="notifications-header">
                  <h2>Notifications</h2>
                  <button className="btn btn-outline" onClick={clearNotifications}>
                    Clear All
                  </button>
                </div>
                <div className="notifications-list">
                  {notifications.length === 0 ? (
                    <div className="no-notifications">
                      <Bell size={48} />
                      <h3>No notifications</h3>
                      <p>You're all caught up!</p>
                    </div>
                  ) : (
                    notifications.map(notification => (
                      <div
                        key={notification.id}
                        className={`notification-item ${!notification.read ? 'unread' : ''}`}
                      >
                        <div className="notification-content">
                          <h4>{notification.title}</h4>
                          <p>{notification.message}</p>
                          <span className="notification-time">
                            {notification.timestamp.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="settings-tab">
                <h2>Account Settings</h2>
                
                <div className="settings-section">
                  <h3>Notification Preferences</h3>
                  <div className="settings-list">
                    {Object.entries(profile.preferences).map(([key, value]) => (
                      <div key={key} className="setting-item">
                        <div className="setting-info">
                          <h4>
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </h4>
                          <p>
                            {key === 'emailNotifications' && 'Receive notifications via email'}
                            {key === 'smsNotifications' && 'Receive notifications via SMS'}
                            {key === 'programUpdates' && 'Get updates about program changes'}
                            {key === 'eventReminders' && 'Receive reminders about upcoming events'}
                            {key === 'newsletter' && 'Subscribe to our monthly newsletter'}
                          </p>
                        </div>
                        <label className="toggle-switch">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => handleInputChange(`preferences.${key}`, e.target.checked)}
                          />
                          <span className="toggle-slider"></span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Security</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Change Password</h4>
                        <p>Update your account password</p>
                      </div>
                      <button className="btn btn-outline">
                        <Shield size={16} />
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Data & Privacy</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Download Your Data</h4>
                        <p>Download a copy of your profile and activity data</p>
                      </div>
                      <button className="btn btn-outline" onClick={downloadData}>
                        <Download size={16} />
                        Download Data
                      </button>
                    </div>
                  </div>
                </div>

                <div className="settings-section danger-zone">
                  <h3>Danger Zone</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <div className="setting-info">
                        <h4>Sign Out</h4>
                        <p>Sign out of your account</p>
                      </div>
                      <button className="btn btn-outline danger" onClick={logout}>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
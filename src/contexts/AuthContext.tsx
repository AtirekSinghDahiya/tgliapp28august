import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, signUp as supabaseSignUp, signIn as supabaseSignIn, signOut as supabaseSignOut } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            avatar: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at
          });
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || '',
            avatar: session.user.user_metadata?.avatar_url,
            created_at: session.user.created_at
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const validateGmailEmail = (email: string): boolean => {
    return email.toLowerCase().endsWith('@gmail.com');
  };

  const login = async (email: string, password: string) => {
    if (!validateGmailEmail(email)) {
      throw new Error('Only Gmail addresses are allowed. Please use a @gmail.com email address.');
    }

    setLoading(true);
    try {
      const { data, error } = await supabaseSignIn(email, password);
      if (error) throw error;
      
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          name: data.user.user_metadata?.full_name || email.split('@')[0],
          avatar: data.user.user_metadata?.avatar_url,
          created_at: data.user.created_at
        });
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    if (!validateGmailEmail(email)) {
      throw new Error('Only Gmail addresses are allowed. Please use a @gmail.com email address.');
    }

    setLoading(true);
    try {
      const { data, error } = await supabaseSignUp(email, password, name);
      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email || email,
          name: name,
          created_at: data.user.created_at
        });
      }
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabaseSignOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      // In a real app, this would update the backend
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
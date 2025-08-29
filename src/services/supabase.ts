import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Profile {
  id: string
  user_id: string
  email: string
  full_name: string
  phone?: string
  avatar_url?: string
  bio?: string
  interests?: string[]
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  category: string
  duration?: string
  location?: string
  requirements?: string[]
  active: boolean
  created_at: string
}

export interface Donation {
  id: string
  user_id?: string
  amount: number
  donor_name: string
  donor_email: string
  message?: string
  status: string
  created_at: string
}

export interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  image_url?: string
  published: boolean
  created_at: string
}

export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  job_type: string
  description: string
  requirements?: string[]
  active: boolean
  created_at: string
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  capacity?: number
  registered?: number
  category: string
  active: boolean
  created_at: string
}

// Auth functions
export const signUp = async (email: string, password: string, fullName: string) => {
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    throw new Error('Only Gmail addresses are allowed')
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      }
    }
  })
  
  if (error) throw error

  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{
        user_id: data.user.id,
        email: email,
        full_name: fullName
      }])
    
    if (profileError) {
      console.error('Error creating profile:', profileError)
    }
  }
  
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    throw new Error('Only Gmail addresses are allowed')
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Profile functions
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('user_id', userId)
    .select()
  
  return { data, error }
}

// Services functions
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('active', true)
    .order('title')
  
  return { data, error }
}

// Donations functions
export const submitDonation = async (donation: Omit<Donation, 'id' | 'created_at' | 'status'>) => {
  const { data, error } = await supabase
    .from('donations')
    .insert([{
      ...donation,
      status: 'pending'
    }])
    .select()
  
  return { data, error }
}

export const getUserDonations = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  } catch (error) {
    console.error('Error fetching donations:', error)
    return { data: null, error }
  }
}

// News functions
export const getNewsArticles = async () => {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Jobs functions
export const getJobPostings = async () => {
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Events functions
export const getEvents = async () => {
  const { data, error } = await supabase
    .from('events')
    .select('*')
    .eq('active', true)
    .order('date', { ascending: true })
  
  return { data, error }
}

// Contact form
export const submitContactForm = async (formData: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  department: string
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData])
    .select()
  
  return { data, error }
}

// Program application
export const submitProgramApplication = async (application: {
  user_id?: string
  program_id: string
  full_name: string
  email: string
  phone: string
  motivation: string
  availability: string
}) => {
  const { data, error } = await supabase
    .from('program_applications')
    .insert([{
      ...application,
      status: 'pending'
    }])
    .select()
  
  // Send confirmation email (mock implementation)
  if (!error && data) {
    console.log('Program application submitted successfully. Confirmation email would be sent to:', application.email);
    // In a real app, you would trigger an email service here
  }
  
  return { data, error }
}

// Event registration
export const submitEventRegistration = async (registration: {
  user_id?: string
  event_id: string
  full_name: string
  email: string
  phone: string
  dietary_restrictions?: string
  emergency_contact?: string
  additional_notes?: string
}) => {
  // In a real app, this would save to database
  console.log('Event registration submitted:', registration)
  
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Send confirmation email (mock implementation)
  console.log('Event registration confirmation email would be sent to:', registration.email)
  
  return { data: { id: Date.now().toString(), ...registration }, error: null }
}

// Job application
export const submitJobApplication = async (application: {
  user_id?: string
  job_id: string
  full_name: string
  email: string
  phone: string
  cover_letter: string
  experience?: string
  availability?: string
  references?: string
  linkedin_profile?: string
  portfolio_url?: string
}) => {
  // In a real app, this would save to database
  console.log('Job application submitted:', application)
  
  // Mock API delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Send confirmation email (mock implementation)
  console.log('Job application confirmation email would be sent to:', application.email)
  
  return { data: { id: Date.now().toString(), ...application }, error: null }
}
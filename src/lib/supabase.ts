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

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  department: string
  status: string
  created_at: string
}

export interface ProgramApplication {
  id: string
  user_id?: string
  program_id: string
  full_name: string
  email: string
  phone: string
  address: string
  motivation: string
  experience?: string
  availability: string
  status: string
  created_at: string
}

export interface Donation {
  id: string
  user_id?: string
  amount: number
  frequency: string
  program: string
  donor_name: string
  donor_email: string
  payment_method: string
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
  featured: boolean
  tags?: string[]
  created_at: string
  updated_at: string
}

export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  job_type: string
  salary_range?: string
  experience_level?: string
  description: string
  requirements?: string[]
  responsibilities?: string[]
  benefits?: string[]
  application_deadline?: string
  contact_email: string
  active: boolean
  urgent: boolean
  created_at: string
  updated_at: string
}

// Auth helpers with Gmail validation
export const signUp = async (email: string, password: string, fullName: string) => {
  // Validate Gmail only
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    throw new Error('Only Gmail addresses (@gmail.com) are allowed for registration.')
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

  // Create profile after successful signup
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
  // Validate Gmail only
  if (!email.toLowerCase().endsWith('@gmail.com')) {
    throw new Error('Only Gmail addresses (@gmail.com) are allowed.')
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
  return { error }
}

// Contact form submission
export const submitContactForm = async (formData: Omit<ContactSubmission, 'id' | 'created_at' | 'status'>) => {
  // Validate required fields
  if (!formData.name?.trim()) throw new Error('Name is required')
  if (!formData.email?.trim()) throw new Error('Email is required')
  if (!formData.subject?.trim()) throw new Error('Subject is required')
  if (!formData.message?.trim()) throw new Error('Message is required')
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.email)) {
    throw new Error('Please enter a valid email address')
  }

  // Sanitize inputs
  const sanitizedData = {
    name: formData.name.trim().slice(0, 100),
    email: formData.email.trim().toLowerCase().slice(0, 255),
    phone: formData.phone?.trim().slice(0, 20) || null,
    subject: formData.subject.trim().slice(0, 200),
    message: formData.message.trim().slice(0, 2000),
    department: formData.department || 'general'
  }

  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([sanitizedData])
    .select()
  
  if (error) throw error
  return { data, error }
}

// Program application submission
export const submitProgramApplication = async (applicationData: Omit<ProgramApplication, 'id' | 'created_at' | 'status'>) => {
  // Validate required fields
  if (!applicationData.full_name?.trim()) throw new Error('Full name is required')
  if (!applicationData.email?.trim()) throw new Error('Email is required')
  if (!applicationData.phone?.trim()) throw new Error('Phone number is required')
  if (!applicationData.motivation?.trim()) throw new Error('Motivation is required')
  if (!applicationData.availability?.trim()) throw new Error('Availability is required')

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(applicationData.email)) {
    throw new Error('Please enter a valid email address')
  }

  // Sanitize inputs
  const sanitizedData = {
    user_id: applicationData.user_id,
    program_id: applicationData.program_id,
    full_name: applicationData.full_name.trim().slice(0, 100),
    email: applicationData.email.trim().toLowerCase().slice(0, 255),
    phone: applicationData.phone.trim().slice(0, 20),
    address: applicationData.address.trim().slice(0, 500),
    motivation: applicationData.motivation.trim().slice(0, 2000),
    experience: applicationData.experience?.trim().slice(0, 2000) || '',
    availability: applicationData.availability.trim().slice(0, 500)
  }

  const { data, error } = await supabase
    .from('program_applications')
    .insert([sanitizedData])
    .select()
  
  if (error) throw error
  return { data, error }
}

// Donation submission
export const submitDonation = async (donationData: Omit<Donation, 'id' | 'created_at' | 'status'>) => {
  // Validate required fields
  if (!donationData.amount || donationData.amount < 1) throw new Error('Valid donation amount is required')
  if (!donationData.donor_name?.trim()) throw new Error('Donor name is required')
  if (!donationData.donor_email?.trim()) throw new Error('Donor email is required')

  // Validate amount limits
  if (donationData.amount > 100000) throw new Error('Donation amount cannot exceed $100,000')

  // Sanitize inputs
  const sanitizedData = {
    user_id: donationData.user_id,
    amount: Math.round(donationData.amount * 100) / 100, // Round to 2 decimal places
    frequency: donationData.frequency || 'one-time',
    program: donationData.program || 'general',
    donor_name: donationData.donor_name.trim().slice(0, 100),
    donor_email: donationData.donor_email.trim().toLowerCase().slice(0, 255),
    payment_method: donationData.payment_method || 'card'
  }

  const { data, error } = await supabase
    .from('donations')
    .insert([sanitizedData])
    .select()
  
  if (error) throw error
  return { data, error }
}

// Fetch news articles
export const getNewsArticles = async () => {
  const { data, error } = await supabase
    .from('news_articles')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Fetch job postings
export const getJobPostings = async () => {
  const { data, error } = await supabase
    .from('job_postings')
    .select('*')
    .eq('active', true)
    .order('urgent', { ascending: false })
    .order('created_at', { ascending: false })
  
  return { data, error }
}

// Profile operations
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const sanitizedUpdates = {
    ...updates,
    full_name: updates.full_name?.trim().slice(0, 100),
    phone: updates.phone?.trim().slice(0, 20),
    bio: updates.bio?.trim().slice(0, 500),
    updated_at: new Date().toISOString()
  }

  const { data, error } = await supabase
    .from('profiles')
    .update(sanitizedUpdates)
    .eq('user_id', userId)
    .select()
  
  if (error) throw error
  return { data, error }
}

// AI Chat helper (mock for now - can be replaced with real AI service)
export const sendChatMessage = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const responses: { [key: string]: string } = {
    programs: 'TGLI offers 8 comprehensive programs: Community Engagement, Employment Services, Entrepreneurship, Housing Support, Skills Upgrade, Seniors Support, Settlement Services, and Youth Programs. Which program would you like to know more about?',
    contact: 'You can reach TGLI at:\n📍 123 Leadership Avenue, Toronto, ON M5V 3A8\n📞 (416) 555-0123\n✉️ info@tgli.org\n\nOur office hours are Monday-Friday 9:00 AM - 6:00 PM, Saturday 10:00 AM - 4:00 PM.',
    employment: 'Our Employment Services program provides job search assistance, resume writing, interview preparation, and career counseling. We help connect job seekers with meaningful employment opportunities across the GTA.',
    youth: 'Our Youth Programs empower young people aged 16-24 with leadership development, mentorship, educational support, and career guidance. We help youth reach their full potential through comprehensive support.',
    housing: 'Our Housing Support program helps individuals and families find stable, affordable housing and provides ongoing support to maintain housing stability throughout the GTA.',
    entrepreneurship: 'Our Entrepreneurship program supports aspiring business owners with business planning, mentorship, funding guidance, and networking opportunities to launch successful ventures.',
    settlement: 'Our Settlement Services help newcomers to Canada navigate systems, access services, and build connections in their new communities with multilingual support.',
    seniors: 'Our Seniors Support program provides social activities, health resources, and community connections to help seniors maintain independence and quality of life.',
    donate: 'You can support TGLI through our donation page. We accept one-time and recurring donations to support our programs. Every contribution makes a real difference in our community.',
    apply: 'To apply for our programs, visit the Programs page and click "Apply Now" on the program you\'re interested in. You\'ll need to fill out an application form with your background and motivation.',
    careers: 'We have exciting career opportunities available! Check our Careers page for current openings in community programs, employment services, and administrative roles.',
    news: 'Stay updated with our latest news and success stories. We regularly share updates about our programs, community impact, and upcoming events.',
    default: 'I\'d be happy to help you with information about TGLI\'s programs, services, contact details, or how to get involved. What specific information are you looking for?'
  }
  
  const input = message.toLowerCase()
  
  if (input.includes('program') || input.includes('service')) {
    return responses.programs
  } else if (input.includes('contact') || input.includes('phone') || input.includes('address')) {
    return responses.contact
  } else if (input.includes('employment') || input.includes('job') || input.includes('career')) {
    return responses.employment
  } else if (input.includes('youth') || input.includes('young')) {
    return responses.youth
  } else if (input.includes('housing') || input.includes('home')) {
    return responses.housing
  } else if (input.includes('entrepreneur') || input.includes('business')) {
    return responses.entrepreneurship
  } else if (input.includes('settlement') || input.includes('newcomer')) {
    return responses.settlement
  } else if (input.includes('senior') || input.includes('elderly')) {
    return responses.seniors
  } else if (input.includes('donate') || input.includes('donation') || input.includes('give')) {
    return responses.donate
  } else if (input.includes('apply') || input.includes('application')) {
    return responses.apply
  } else if (input.includes('career') || input.includes('job')) {
    return responses.careers
  } else if (input.includes('news') || input.includes('article')) {
    return responses.news
  }
  
  return responses.default
}
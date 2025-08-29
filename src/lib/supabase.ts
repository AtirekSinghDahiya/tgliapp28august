import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Contact form submission
export const submitContactForm = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  department: string;
}) => {
  const { data, error } = await supabase
    .from('contact_submissions')
    .insert([formData])
    .select();
  
  // Send confirmation email (mock implementation)
  if (!error && data) {
    console.log('Contact form submitted successfully. Confirmation email would be sent to:', formData.email);
    // In a real app, you would trigger an email service here
  }
  
  return { data, error };
};

// Program application submission
export const submitProgramApplication = async (application: {
  user_id?: string;
  program_id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  motivation: string;
  experience?: string;
  availability: string;
}) => {
  const { data, error } = await supabase
    .from('program_applications')
    .insert([{
      ...application,
      status: 'pending'
    }])
    .select();
  
  return { data, error };
};

// Donation submission
export const submitDonation = async (donation: {
  user_id?: string;
  amount: number;
  donor_name: string;
  donor_email: string;
  message?: string;
}) => {
  const { data, error } = await supabase
    .from('donations')
    .insert([{
      ...donation,
      status: 'pending'
    }])
    .select();
  
  return { data, error };
};

// Chat message (mock implementation)
export const sendChatMessage = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock responses based on keywords
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('program') || lowerMessage.includes('service')) {
    return "We offer various programs including Community Engagement, Employment Services, Entrepreneurship, Housing Support, and Youth Programs. You can learn more about each program on our Programs page.";
  } else if (lowerMessage.includes('donate') || lowerMessage.includes('donation')) {
    return "Thank you for your interest in supporting TGLI! You can make a donation through our Donate page. Every contribution helps us serve our community better.";
  } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
    return "You can reach us through our Contact page, call us at (416) 555-0123, or email us at info@tgli.org. We're here Monday-Friday 9AM-6PM.";
  } else if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
    return "To apply for our programs, visit the Programs page and click 'Apply Now' on the program you're interested in. You'll need to provide some basic information and tell us about your motivation.";
  } else {
    return "Hello! I'm here to help you learn about TGLI's programs and services. You can ask me about our programs, how to donate, contact information, or how to apply for services.";
  }
};
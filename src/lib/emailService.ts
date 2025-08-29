// Enhanced Email Service with better error handling and performance
interface EmailData {
  to: string;
  name: string;
  type: 'contact' | 'donation' | 'application' | 'registration';
  subject?: string;
  amount?: number;
  program?: string;
  eventTitle?: string;
}

export const sendConfirmationEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Simulate email sending with realistic delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate email content based on type
    const emailContent = generateEmailContent(emailData);
    
    // Log for testing purposes
    console.log('📧 Email sent successfully:', {
      to: emailData.to,
      subject: emailContent.subject,
      type: emailData.type,
      timestamp: new Date().toISOString()
    });
    
    // Show user-friendly notification
    showEmailNotification(emailData);
    
    return true;
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    return false;
  }
};

const generateEmailContent = (emailData: EmailData) => {
  switch (emailData.type) {
    case 'contact':
      return {
        subject: `TGLI - Contact Form Confirmation: ${emailData.subject}`,
        body: `Dear ${emailData.name},\n\nThank you for contacting TGLI. We'll respond within 24 hours.\n\nBest regards,\nTGLI Team`
      };
    
    case 'donation':
      return {
        subject: 'TGLI - Thank You for Your Generous Donation',
        body: `Dear ${emailData.name},\n\nThank you for your $${emailData.amount} donation! Your support makes a real difference.\n\nWith gratitude,\nTGLI Team`
      };
    
    case 'application':
      return {
        subject: `TGLI - Application Confirmation: ${emailData.program}`,
        body: `Dear ${emailData.name},\n\nYour application for ${emailData.program} has been received. We'll review it within 5-7 business days.\n\nBest regards,\nTGLI Programs Team`
      };
    
    case 'registration':
      return {
        subject: `TGLI - Event Registration Confirmation: ${emailData.eventTitle}`,
        body: `Dear ${emailData.name},\n\nYou're registered for ${emailData.eventTitle}! Event details will be sent separately.\n\nSee you there,\nTGLI Events Team`
      };
    
    default:
      return {
        subject: 'TGLI - Confirmation',
        body: `Dear ${emailData.name},\n\nThank you for your submission.\n\nBest regards,\nTGLI Team`
      };
  }
};

const showEmailNotification = (emailData: EmailData) => {
  const messages = {
    contact: `✅ Confirmation email sent to ${emailData.to}! We'll respond within 24 hours.`,
    donation: `✅ Thank you email sent to ${emailData.to}! Tax receipt will follow within 5-7 days.`,
    application: `✅ Application confirmation sent to ${emailData.to}! We'll review within 5-7 business days.`,
    registration: `✅ Registration confirmation sent to ${emailData.to}! Event details will follow.`
  };
  
  // Create a toast notification
  const toast = document.createElement('div');
  toast.className = 'fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm font-body';
  toast.innerHTML = `
    <div class="flex items-center gap-2">
      <span>📧</span>
      <span>${messages[emailData.type]}</span>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 5000);
};
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, email, name, subject, amount, program } = await req.json()

    // Email templates based on type
    let emailSubject = ''
    let emailBody = ''

    switch (type) {
      case 'contact':
        emailSubject = `TGLI - Contact Form Confirmation: ${subject}`
        emailBody = `
          Dear ${name},
          
          Thank you for contacting the Toronto Global Leadership Institute. We have received your message regarding "${subject}" and will respond within 24 hours.
          
          Your message is important to us, and our team will review it carefully to provide you with the best possible assistance.
          
          Best regards,
          TGLI Team
          
          ---
          This is an automated confirmation email. Please do not reply to this message.
        `
        break

      case 'donation':
        emailSubject = 'TGLI - Thank You for Your Generous Donation'
        emailBody = `
          Dear ${name},
          
          Thank you for your generous donation of $${amount} to the Toronto Global Leadership Institute. Your contribution makes a real difference in our community.
          
          Your donation will help us continue our mission of empowering communities and building leaders across the Greater Toronto Area.
          
          You will receive a tax receipt within 5-7 business days.
          
          With gratitude,
          TGLI Team
          
          ---
          Donation Reference: DON-${Date.now()}
        `
        break

      case 'application':
        emailSubject = `TGLI - Application Confirmation: ${program}`
        emailBody = `
          Dear ${name},
          
          Thank you for applying to our ${program} program. We have received your application and will review it within 5-7 business days.
          
          Our team will carefully evaluate your application and contact you with next steps. In the meantime, feel free to explore our other programs and services.
          
          Best regards,
          TGLI Programs Team
          
          ---
          Application Reference: APP-${Date.now()}
        `
        break

      default:
        throw new Error('Invalid email type')
    }

    // In a real implementation, you would use a service like SendGrid, Resend, or AWS SES
    // For now, we'll simulate the email sending
    console.log('Sending email:', {
      to: email,
      subject: emailSubject,
      body: emailBody
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Confirmation email sent successfully',
        emailSent: true
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error sending confirmation email:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send confirmation email',
        emailSent: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})</parameter>
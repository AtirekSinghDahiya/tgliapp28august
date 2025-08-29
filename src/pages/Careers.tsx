import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, DollarSign, Briefcase, Mail } from 'lucide-react'
import { getJobPostings } from '../services/supabase'
import { useAuth } from '../hooks/useAuth'

const Careers: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const { data, error } = await getJobPostings()
        if (error) throw error
        
        // Fallback to mock data
        const mockJobs = [
          {
            id: '1',
            title: 'Community Program Coordinator',
            department: 'Programs',
            location: 'Toronto, ON',
            job_type: 'Full-time',
            description: 'Lead and coordinate community engagement programs, working directly with participants to ensure program success.',
            requirements: ['Bachelor\'s degree', '2+ years experience', 'Strong communication skills'],
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
          },
          {
            id: '2',
            title: 'Employment Services Specialist',
            department: 'Employment',
            location: 'Scarborough, ON',
            job_type: 'Full-time',
            description: 'Provide comprehensive employment services including job search assistance and career counseling.',
            requirements: ['HR or Career Development degree', '3+ years experience', 'Assessment skills'],
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
          }
        ]
        
        setJobs(data && data.length > 0 ? data : mockJobs)
      } catch (error) {
        console.error('Error loading jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadJobs()
  }, [])

  const handleApply = (job: any) => {
    const subject = `Application for ${job.title}`
    const body = `Dear Hiring Manager,\n\nI am interested in applying for the ${job.title} position in the ${job.department} department.\n\nI believe my skills and experience would be a great fit for this role. Please find my resume attached, and I look forward to hearing from you.\n\nBest regards`
    
    // Create mailto link
    const mailtoLink = `mailto:careers@tgli.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Try to open email client, fallback to copying email to clipboard
    try {
      window.location.href = mailtoLink
    } catch (error) {
      // Fallback: copy email address to clipboard
      navigator.clipboard.writeText('careers@tgli.org').then(() => {
        alert('Email address copied to clipboard: careers@tgli.org')
      }).catch(() => {
        alert('Please send your application to: careers@tgli.org')
      })
    }
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Career Opportunities</h1>
        <p className="text-gray-600">Join our team and make an impact in the community</p>
      </div>

      <div className="space-y-4">
        {jobs.map((job: any) => (
          <motion.div 
            key={job.id} 
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -2 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                  {job.department}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{job.job_type}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{job.description}</p>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {job.requirements?.map((req: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              onClick={() => handleApply(job)}
              className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 flex items-center justify-center gap-2 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail size={16} />
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No job openings at the moment.</p>
        </div>
      )}
    </div>
  )
}

export default Careers
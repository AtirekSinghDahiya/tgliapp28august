import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, Briefcase, Home, GraduationCap, Heart, Globe, Building, UserCheck } from 'lucide-react'
import { getServices } from '../services/supabase'

const Services: React.FC = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadServices = async () => {
      try {
        const { data, error } = await getServices()
        if (error) throw error
        
        // Fallback to mock data if no services in database
        const mockServices = [
          {
            id: '1',
            title: 'Community Engagement',
            description: 'Build stronger communities through active participation and leadership development.',
            category: 'Leadership',
            duration: '6 months',
            location: 'Toronto, ON',
            icon: 'Users'
          },
          {
            id: '2',
            title: 'Employment Services',
            description: 'Find meaningful employment opportunities and advance your career.',
            category: 'Career',
            duration: '3 months',
            location: 'Multiple locations',
            icon: 'Briefcase'
          },
          {
            id: '3',
            title: 'Housing Support',
            description: 'Access affordable housing options and housing stability support.',
            category: 'Support',
            duration: 'Ongoing',
            location: 'GTA wide',
            icon: 'Home'
          },
          {
            id: '4',
            title: 'Skills Upgrade',
            description: 'Enhance your professional skills with our training programs.',
            category: 'Education',
            duration: '4 months',
            location: 'Online & In-person',
            icon: 'GraduationCap'
          },
          {
            id: '5',
            title: 'Seniors Support',
            description: 'Comprehensive support services for seniors in our community.',
            category: 'Support',
            duration: 'Ongoing',
            location: 'Community centers',
            icon: 'Heart'
          },
          {
            id: '6',
            title: 'Settlement Services',
            description: 'Help newcomers settle and integrate into Canadian society.',
            category: 'Settlement',
            duration: '12 months',
            location: 'Settlement offices',
            icon: 'Globe'
          },
          {
            id: '7',
            title: 'Entrepreneurship',
            description: 'Start and grow your business with our comprehensive support.',
            category: 'Business',
            duration: '12 months',
            location: 'Business centers',
            icon: 'Building'
          },
          {
            id: '8',
            title: 'Youth Programs',
            description: 'Empowering young people with leadership skills and mentorship.',
            category: 'Youth',
            duration: '6-12 months',
            location: 'Youth centers',
            icon: 'UserCheck'
          }
        ]
        
        setServices(data && data.length > 0 ? data : mockServices)
      } catch (error) {
        console.error('Error loading services:', error)
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  const getIcon = (iconName: string) => {
    const icons = {
      Users, Briefcase, Home, GraduationCap, Heart, Globe, Building, UserCheck
    }
    return icons[iconName as keyof typeof icons] || Users
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Our Services</h1>
        <p className="text-gray-600">Comprehensive programs to empower your journey</p>
      </div>

      <div className="space-y-4">
        {services.map((service: any) => {
          const Icon = getIcon(service.icon)
          return (
            <Link
              key={service.id}
              to={`/apply/${service.id}`}
              className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg flex-shrink-0">
                  <Icon size={24} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{service.category}</span>
                      <span className="ml-2">{service.duration}</span>
                    </div>
                    <ArrowRight size={16} className="text-red-500" />
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Services
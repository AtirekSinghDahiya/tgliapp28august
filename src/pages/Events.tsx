import React, { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import { getEvents } from '../services/supabase'

const Events: React.FC = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const { data, error } = await getEvents()
        if (error) throw error
        
        // Fallback to mock data
        const mockEvents = [
          {
            id: '1',
            title: 'Community Leadership Workshop',
            description: 'Learn essential leadership skills for community impact.',
            date: '2024-02-15',
            time: '10:00 AM - 4:00 PM',
            location: 'TGLI Main Office',
            capacity: 50,
            registered: 32,
            category: 'Workshop'
          },
          {
            id: '2',
            title: 'Job Fair 2024',
            description: 'Connect with employers and explore career opportunities.',
            date: '2024-02-20',
            time: '9:00 AM - 5:00 PM',
            location: 'Convention Centre',
            capacity: 500,
            registered: 287,
            category: 'Career'
          }
        ]
        
        setEvents(data && data.length > 0 ? data : mockEvents)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-gray-600">Join our community events and workshops</p>
      </div>

      <div className="space-y-4">
        {events.map((event: any) => (
          <div key={event.id} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                  {event.category}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-500">
                  {new Date(event.date).getDate()}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                </p>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{event.description}</p>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={14} />
                <span>{event.registered}/{event.capacity} registered</span>
              </div>
            </div>

            <button className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600">
              Register for Event
            </button>
          </div>
        ))}
      </div>

      {events.length === 0 && (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">No upcoming events.</p>
        </div>
      )}
    </div>
  )
}

export default Events
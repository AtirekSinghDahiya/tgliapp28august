import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Filter, Search, Plus } from 'lucide-react';
import './Events.css';

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registered: number;
  category: string;
  image: string;
  requirements: string[];
  organizer: string;
}

const Events: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Community Leadership Workshop',
      description: 'Learn essential leadership skills to make a positive impact in your community.',
      date: '2024-02-15',
      time: '10:00 AM - 4:00 PM',
      location: 'TGLI Main Office, Toronto',
      capacity: 50,
      registered: 32,
      category: 'Workshop',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['Bring notebook', 'Lunch provided', 'Business casual attire'],
      organizer: 'TGLI Leadership Team'
    },
    {
      id: '2',
      title: 'Job Fair 2024',
      description: 'Connect with top employers and explore career opportunities across various industries.',
      date: '2024-02-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Metro Toronto Convention Centre',
      capacity: 500,
      registered: 287,
      category: 'Career',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['Bring multiple copies of resume', 'Professional attire', 'Business cards (optional)'],
      organizer: 'TGLI Employment Services'
    },
    {
      id: '3',
      title: 'Entrepreneurship Bootcamp',
      description: 'Intensive 3-day program for aspiring entrepreneurs to develop their business ideas.',
      date: '2024-02-25',
      time: '9:00 AM - 6:00 PM',
      location: 'Innovation Hub, Markham',
      capacity: 30,
      registered: 28,
      category: 'Business',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['Laptop required', 'Business idea pitch', 'All meals included'],
      organizer: 'TGLI Business Development'
    },
    {
      id: '4',
      title: 'Seniors Social Gathering',
      description: 'Monthly social event for seniors to connect, share stories, and enjoy activities.',
      date: '2024-02-28',
      time: '2:00 PM - 5:00 PM',
      location: 'Community Centre, Scarborough',
      capacity: 80,
      registered: 45,
      category: 'Social',
      image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['No requirements', 'Light refreshments provided', 'Comfortable clothing'],
      organizer: 'TGLI Seniors Program'
    },
    {
      id: '5',
      title: 'Youth Leadership Summit',
      description: 'Empowering young leaders with skills, networking, and mentorship opportunities.',
      date: '2024-03-05',
      time: '10:00 AM - 6:00 PM',
      location: 'University of Toronto',
      capacity: 100,
      registered: 67,
      category: 'Youth',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['Age 16-24', 'Student ID', 'Lunch included'],
      organizer: 'TGLI Youth Programs'
    },
    {
      id: '6',
      title: 'Newcomer Orientation',
      description: 'Essential information session for newcomers to Canada about services and resources.',
      date: '2024-03-10',
      time: '1:00 PM - 4:00 PM',
      location: 'TGLI Settlement Office',
      capacity: 40,
      registered: 23,
      category: 'Settlement',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600',
      requirements: ['Immigration documents', 'Translation services available', 'Information packages provided'],
      organizer: 'TGLI Settlement Services'
    }
  ]);

  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const categories = ['All', 'Workshop', 'Career', 'Business', 'Social', 'Youth', 'Settlement'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, events]);

  const handleRegister = (event: Event) => {
    if (event.registered >= event.capacity) {
      alert('Sorry, this event is full!');
      return;
    }
    alert(`Registration for "${event.title}" would be processed here.`);
  };

  const addToCalendar = (event: Event) => {
    const startDate = new Date(`${event.date}T${event.time.split(' - ')[0]}`);
    const endDate = new Date(`${event.date}T${event.time.split(' - ')[1] || event.time.split(' - ')[0]}`);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDate.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
    
    window.open(calendarUrl, '_blank');
  };

  return (
    <div className="events-page">
      <div className="events-header">
        <div className="container">
          <h1 className={`page-title ${isVisible ? 'fade-in' : ''}`}>Upcoming Events</h1>
          <p className={`page-description ${isVisible ? 'slide-up' : ''}`}>
            Join our community events, workshops, and networking opportunities designed to empower and connect.
          </p>
        </div>
      </div>

      <div className="events-content">
        <div className="container">
          {/* Controls */}
          <div className={`events-controls ${isVisible ? 'fade-in' : ''}`}>
            <div className="search-filter-section">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-section">
                <Filter size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="view-toggle">
              <button
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                List View
              </button>
              <button
                className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                onClick={() => setViewMode('calendar')}
              >
                Calendar View
              </button>
            </div>
          </div>

          {/* Events Display */}
          {viewMode === 'list' ? (
            <div className="events-grid">
              {filteredEvents.map((event, index) => (
                <div
                  key={event.id}
                  className={`event-card ${isVisible ? 'scale-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="event-image">
                    <img src={event.image} alt={event.title} />
                    <div className="event-category">{event.category}</div>
                    <div className="event-date">
                      <span className="date-day">{new Date(event.date).getDate()}</span>
                      <span className="date-month">{new Date(event.date).toLocaleDateString('en', { month: 'short' })}</span>
                    </div>
                  </div>
                  
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-description">{event.description}</p>
                    
                    <div className="event-meta">
                      <div className="meta-item">
                        <Clock size={16} />
                        <span>{event.time}</span>
                      </div>
                      <div className="meta-item">
                        <MapPin size={16} />
                        <span>{event.location}</span>
                      </div>
                      <div className="meta-item">
                        <Users size={16} />
                        <span>{event.registered}/{event.capacity} registered</span>
                      </div>
                    </div>

                    <div className="event-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">
                        {event.capacity - event.registered} spots remaining
                      </span>
                    </div>

                    <div className="event-actions">
                      <button
                        className="btn btn-outline"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                      </button>
                      <button
                        className={`btn ${event.registered >= event.capacity ? 'btn-disabled' : 'btn-primary'}`}
                        onClick={() => handleRegister(event)}
                        disabled={event.registered >= event.capacity}
                      >
                        {event.registered >= event.capacity ? 'Full' : 'Register'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="calendar-view">
              <div className="calendar-placeholder">
                <Calendar size={64} />
                <h3>Calendar View</h3>
                <p>Calendar integration would be implemented here with a proper calendar library.</p>
                <div className="calendar-events">
                  {filteredEvents.map(event => (
                    <div key={event.id} className="calendar-event-item">
                      <strong>{new Date(event.date).toLocaleDateString()}</strong> - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {filteredEvents.length === 0 && (
            <div className="no-results">
              <p>No events found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={() => setSelectedEvent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedEvent.title}</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedEvent(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
              
              <div className="modal-details">
                <div className="event-info-grid">
                  <div className="info-item">
                    <strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}
                  </div>
                  <div className="info-item">
                    <strong>Time:</strong> {selectedEvent.time}
                  </div>
                  <div className="info-item">
                    <strong>Location:</strong> {selectedEvent.location}
                  </div>
                  <div className="info-item">
                    <strong>Organizer:</strong> {selectedEvent.organizer}
                  </div>
                  <div className="info-item">
                    <strong>Capacity:</strong> {selectedEvent.capacity} people
                  </div>
                  <div className="info-item">
                    <strong>Registered:</strong> {selectedEvent.registered} people
                  </div>
                </div>

                <h3>About This Event</h3>
                <p>{selectedEvent.description}</p>

                <h3>Requirements & Information</h3>
                <ul>
                  {selectedEvent.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <div className="modal-actions">
                  <button
                    className="btn btn-outline"
                    onClick={() => addToCalendar(selectedEvent)}
                  >
                    <Plus size={16} />
                    Add to Calendar
                  </button>
                  <button
                    className={`btn ${selectedEvent.registered >= selectedEvent.capacity ? 'btn-disabled' : 'btn-primary'}`}
                    onClick={() => handleRegister(selectedEvent)}
                    disabled={selectedEvent.registered >= selectedEvent.capacity}
                  >
                    {selectedEvent.registered >= selectedEvent.capacity ? 'Event Full' : 'Register Now'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Clock, MapPin, ArrowRight } from 'lucide-react';
import './Programs.css';

interface Program {
  id: string;
  title: string;
  description: string;
  fullDescription: string;
  eligibility: string[];
  duration: string;
  location: string;
  category: string;
  image: string;
  applicationDeadline: string;
  contactEmail: string;
  requirements: string[];
}

const Programs: React.FC = () => {
  const navigate = useNavigate();
  const [programs] = useState<Program[]>([
    {
      id: 'community-engagement',
      title: 'Community Engagement',
      description: 'Build stronger communities through active participation and leadership development.',
      fullDescription: 'Our Community Engagement program empowers individuals to become active leaders in their communities. Through workshops, mentorship, and hands-on projects, participants develop the skills needed to create positive change.',
      eligibility: ['18+ years old', 'Resident of GTA', 'Commitment to community service'],
      duration: '6 months',
      location: 'Toronto, ON',
      category: 'Leadership',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
      contactEmail: 'community@tgli.org',
      requirements: ['High school diploma', 'Letter of motivation', 'Two references']
    },
    {
      id: 'employment',
      title: 'Employment Services',
      description: 'Find meaningful employment opportunities and advance your career with our comprehensive support.',
      fullDescription: 'Our Employment Services program provides job search assistance, resume writing, interview preparation, and career counseling to help you find meaningful employment.',
      eligibility: ['Job seekers', 'Career changers', 'Recent graduates'],
      duration: '3 months',
      location: 'Multiple locations',
      category: 'Career',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 21 days from now
      contactEmail: 'employment@tgli.org',
      requirements: ['Resume', 'Cover letter', 'Career assessment']
    },
    {
      id: 'business',
      title: 'Entrepreneurship',
      description: 'Start and grow your business with our comprehensive entrepreneurship support program.',
      fullDescription: 'Our Entrepreneurship program provides aspiring business owners with the tools, knowledge, and network needed to launch successful ventures.',
      eligibility: ['Business idea', '21+ years old', 'Commitment to program'],
      duration: '12 months',
      location: 'Toronto, ON',
      category: 'Business',
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 45 days from now
      contactEmail: 'business@tgli.org',
      requirements: ['Business plan', 'Financial projections', 'Market research']
    },
    {
      id: 'housing',
      title: 'Housing Support',
      description: 'Access affordable housing options and housing stability support services.',
      fullDescription: 'Our Housing Support program helps individuals and families find stable, affordable housing and provides ongoing support to maintain housing stability.',
      eligibility: ['Low to moderate income', 'Housing need', 'GTA resident'],
      duration: 'Ongoing',
      location: 'GTA wide',
      category: 'Support',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: 'Rolling admissions',
      contactEmail: 'housing@tgli.org',
      requirements: ['Income verification', 'Housing application', 'References']
    },
    {
      id: 'youth',
      title: 'Youth Programs',
      description: 'Empowering young people with leadership skills, mentorship, and career guidance.',
      fullDescription: 'Our Youth Programs provide young people aged 16-24 with leadership development, mentorship, educational support, and career guidance to help them reach their full potential.',
      eligibility: ['16-24 years old', 'GTA resident', 'Commitment to growth'],
      duration: '6-12 months',
      location: 'Youth centers',
      category: 'Youth',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: '2024-05-15',
      contactEmail: 'youth@tgli.org',
      requirements: ['Age verification', 'Parent/guardian consent (if under 18)', 'Goal setting session']
    },
    {
      id: 'skills',
      title: 'Skills Upgrade',
      description: 'Enhance your professional skills and stay competitive in today\'s job market.',
      fullDescription: 'Our Skills Upgrade program offers training in digital literacy, technical skills, and professional development to help you advance your career and adapt to changing workplace demands.',
      eligibility: ['18+ years old', 'Basic literacy', 'Commitment to learning'],
      duration: '3-6 months',
      location: 'Training centers',
      category: 'Career',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: '2024-03-30',
      contactEmail: 'skills@tgli.org',
      requirements: ['Skills assessment', 'Learning plan', 'Time commitment']
    },
    {
      id: 'seniors',
      title: 'Seniors Support',
      description: 'Comprehensive support services for seniors to maintain independence and quality of life.',
      fullDescription: 'Our Seniors Support program provides health and wellness services, social activities, technology training, and assistance with daily living to help seniors thrive in their communities.',
      eligibility: ['55+ years old', 'GTA resident', 'Need for support services'],
      duration: 'Ongoing',
      location: 'Senior centers',
      category: 'Support',
      image: 'https://images.pexels.com/photos/3768131/pexels-photo-3768131.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: 'Rolling admissions',
      contactEmail: 'seniors@tgli.org',
      requirements: ['Age verification', 'Health assessment', 'Support needs evaluation']
    },
    {
      id: 'settlement',
      title: 'Settlement Services',
      description: 'Help newcomers to Canada integrate successfully into their new communities.',
      fullDescription: 'Our Settlement Services program assists newcomers with language training, credential recognition, cultural orientation, and community connections to facilitate successful integration into Canadian society.',
      eligibility: ['Newcomer to Canada', 'Permanent resident or citizen', 'Need for settlement support'],
      duration: '6-12 months',
      location: 'Settlement offices',
      category: 'Support',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=600',
      applicationDeadline: 'Rolling admissions',
      contactEmail: 'settlement@tgli.org',
      requirements: ['Immigration documents', 'Language assessment', 'Orientation session']
    }
  ]);

  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>(programs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const categories = ['All', 'Leadership', 'Career', 'Business', 'Support', 'Youth'];

  useEffect(() => {
    let filtered = programs;

    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(program => program.category === selectedCategory);
    }

    setFilteredPrograms(filtered);
  }, [searchTerm, selectedCategory, programs]);

  const handleApplyNow = (program: Program) => {
    if (user) {
      navigate(`/apply/${program.id}`);
    } else {
      // Redirect to login if not authenticated
      navigate('/signin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16">
        <h1 className="text-2xl font-bold mb-2 text-center">Our Programs</h1>
        <p className="text-red-100 text-center">Discover programs designed to empower you</p>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search programs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === category 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Grid */}
      <div className="px-4 space-y-4">
        {filteredPrograms.map((program, index) => (
          <motion.div
            key={program.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-48 overflow-hidden">
              <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3">
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {program.category}
                </span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{program.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{program.description}</p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-red-500" />
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={12} className="text-red-500" />
                  <span>{program.location}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  className="flex-1 btn btn-secondary text-sm py-3"
                  onClick={() => setSelectedProgram(program)}
                >
                  Learn More
                </button>
                <button
                  className="flex-1 btn btn-primary text-sm py-3"
                  onClick={() => handleApplyNow(program)}
                >
                  Apply Now
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPrograms.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No programs found matching your criteria.</p>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedProgram(null)}>
          <motion.div 
            className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{selectedProgram.title}</h2>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[80vh] p-6">
              <img src={selectedProgram.image} alt={selectedProgram.title} className="w-full h-48 object-cover rounded-xl mb-4" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Program Overview</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedProgram.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Eligibility Requirements</h3>
                  <ul className="space-y-1">
                    {selectedProgram.eligibility.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Clock size={20} className="mx-auto text-red-500 mb-1" />
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{selectedProgram.duration}</p>
                  </div>
                  <div className="text-center">
                    <MapPin size={20} className="mx-auto text-red-500 mb-1" />
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-gray-900">{selectedProgram.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  className="w-full btn btn-primary text-lg py-4"
                  onClick={() => handleApplyNow(selectedProgram)}
                >
                  Apply for this Program
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Programs;
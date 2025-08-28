import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Clock, DollarSign, Briefcase, ArrowRight, Mail, AlertTriangle } from 'lucide-react';
import { getJobPostings } from '../lib/supabase';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  job_type: string;
  salary_range?: string;
  experience_level?: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  application_deadline?: string;
  contact_email: string;
  active: boolean;
  urgent: boolean;
  created_at: string;
  updated_at: string;
}

const Careers: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const { data, error } = await getJobPostings();
      if (error) throw error;
      
      // Fallback to mock data if no jobs in database
      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'Community Program Coordinator',
          department: 'Programs',
          location: 'Toronto, ON',
          job_type: 'Full-time',
          salary_range: '$45,000 - $55,000',
          experience_level: '2-3 years',
          description: 'Lead and coordinate community engagement programs, working directly with participants to ensure program success and community impact.',
          requirements: [
            'Bachelor\'s degree in Social Work, Community Development, or related field',
            '2+ years experience in community programming',
            'Strong communication and interpersonal skills',
            'Bilingual (English/French) preferred'
          ],
          responsibilities: [
            'Coordinate and deliver community engagement programs',
            'Build relationships with community partners',
            'Monitor program outcomes and prepare reports',
            'Facilitate workshops and training sessions'
          ],
          benefits: [
            'Comprehensive health and dental coverage',
            'Professional development opportunities',
            'Flexible work arrangements',
            'Pension plan'
          ],
          application_deadline: '2024-03-15',
          contact_email: 'careers@tgli.org',
          active: true,
          urgent: false,
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          title: 'Employment Services Specialist',
          department: 'Employment',
          location: 'Scarborough, ON',
          job_type: 'Full-time',
          salary_range: '$50,000 - $60,000',
          experience_level: '3-5 years',
          description: 'Provide comprehensive employment services including job search assistance, resume writing, interview preparation, and career counseling.',
          requirements: [
            'Bachelor\'s degree in Human Resources or Career Development',
            '3+ years experience in employment services',
            'Knowledge of labor market trends',
            'Strong assessment and counseling skills'
          ],
          responsibilities: [
            'Conduct employment assessments',
            'Provide job search workshops',
            'Build relationships with employers',
            'Maintain accurate client records'
          ],
          benefits: [
            'Competitive salary and benefits',
            'Professional development budget',
            'Flexible work schedule',
            'Health and wellness programs'
          ],
          application_deadline: '2024-02-28',
          contact_email: 'employment@tgli.org',
          active: true,
          urgent: true,
          created_at: '2024-01-12T00:00:00Z',
          updated_at: '2024-01-12T00:00:00Z'
        }
      ];

      setJobs(data && data.length > 0 ? data : mockJobs);
      setFilteredJobs(data && data.length > 0 ? data : mockJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const handleApply = (job: Job) => {
    const subject = `Application for ${job.title}`;
    const body = `Dear Hiring Manager,\n\nI am interested in applying for the ${job.title} position at TGLI.\n\nBest regards`;
    window.open(`mailto:${job.contact_email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-500 text-white p-6 pt-16">
        <h1 className="text-2xl font-bold mb-2 text-center">Career Opportunities</h1>
        <p className="text-red-100 text-center">Join our team and make an impact</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Jobs */}
      <div className="px-4 space-y-4">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-medium">
                  {job.department}
                </span>
              </div>
              {job.urgent && (
                <span className="bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Urgent
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-red-500" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-red-500" />
                <span>{job.job_type}</span>
              </div>
              {job.salary_range && (
                <div className="flex items-center gap-1">
                  <DollarSign size={14} className="text-red-500" />
                  <span>{job.salary_range}</span>
                </div>
              )}
              {job.experience_level && (
                <div className="flex items-center gap-1">
                  <Briefcase size={14} className="text-red-500" />
                  <span>{job.experience_level}</span>
                </div>
              )}
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>

            <div className="flex items-center justify-between">
              {job.application_deadline && (
                <span className="text-xs text-orange-600 font-medium">
                  Deadline: {new Date(job.application_deadline).toLocaleDateString()}
                </span>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApply(job);
                }}
                className="btn btn-primary text-sm py-2 px-4"
              >
                Apply
                <ArrowRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No positions found</h3>
          <p className="text-gray-500">No jobs match your current search criteria.</p>
        </div>
      )}

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedJob(null)}>
          <motion.div 
            className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">{selectedJob.title}</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[80vh] p-6">
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <MapPin size={20} className="mx-auto text-red-500 mb-1" />
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{selectedJob.location}</p>
                </div>
                <div className="text-center">
                  <Clock size={20} className="mx-auto text-red-500 mb-1" />
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-semibold text-gray-900">{selectedJob.job_type}</p>
                </div>
                {selectedJob.salary_range && (
                  <div className="text-center">
                    <DollarSign size={20} className="mx-auto text-red-500 mb-1" />
                    <p className="text-xs text-gray-500">Salary</p>
                    <p className="font-semibold text-gray-900">{selectedJob.salary_range}</p>
                  </div>
                )}
                {selectedJob.experience_level && (
                  <div className="text-center">
                    <Briefcase size={20} className="mx-auto text-red-500 mb-1" />
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900">{selectedJob.experience_level}</p>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                  <p className="text-gray-600 leading-relaxed">{selectedJob.description}</p>
                </div>

                {selectedJob.requirements && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Requirements</h3>
                    <ul className="space-y-2">
                      {selectedJob.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          {requirement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedJob.benefits && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
                    <ul className="space-y-2">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  className="w-full btn btn-primary text-lg py-4"
                  onClick={() => handleApply(selectedJob)}
                >
                  <Mail size={16} />
                  Apply for this Position
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Careers;
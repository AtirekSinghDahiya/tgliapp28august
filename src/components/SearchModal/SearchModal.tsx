import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  type: 'program' | 'page' | 'news';
  description: string;
  url: string;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Community Programs',
    'Employment Services',
    'Donate'
  ]);

  const allContent: SearchResult[] = [
    {
      id: '1',
      title: 'Community Engagement',
      type: 'program',
      description: 'Build stronger communities through active participation',
      url: '/programs'
    },
    {
      id: '2',
      title: 'Employment Services',
      type: 'program',
      description: 'Find meaningful employment opportunities',
      url: '/programs'
    },
    {
      id: '3',
      title: 'About Us',
      type: 'page',
      description: 'Learn about TGLI mission and values',
      url: '/about'
    },
    {
      id: '4',
      title: 'Donate',
      type: 'page',
      description: 'Support our community programs',
      url: '/donate'
    },
    {
      id: '5',
      title: 'Careers',
      type: 'page',
      description: 'Join our team and make an impact',
      url: '/careers'
    },
    {
      id: '6',
      title: 'Events',
      type: 'page',
      description: 'Upcoming community events and workshops',
      url: '/events'
    }
  ];

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = allContent.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    handleSearch(result.title);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
        <motion.div
          className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Search Header */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-200">
            <Search size={20} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search programs, pages, and more..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 text-lg outline-none"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchTerm.trim() ? (
              results.length > 0 ? (
                <div className="p-4 space-y-2">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={result.url}
                        onClick={() => handleResultClick(result)}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors group"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-600">{result.description}</p>
                          <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {result.type}
                          </span>
                        </div>
                        <ArrowRight size={16} className="text-gray-400 group-hover:text-red-600 transition-colors" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Search size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No results found for "{searchTerm}"</p>
                </div>
              )
            ) : (
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock size={16} />
                  Recent Searches
                </h3>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SearchModal;
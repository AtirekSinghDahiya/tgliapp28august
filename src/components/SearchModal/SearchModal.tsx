import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SearchModal.css';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const popularSearches = [
    'Community Programs',
    'Leadership Training',
    'Employment Services',
    'Youth Programs',
    'Settlement Services',
    'Entrepreneurship',
    'Housing Support',
    'Volunteer Opportunities'
  ];

  const searchResults = [
    { title: 'Community Engagement Program', type: 'Program', url: '/programs' },
    { title: 'Leadership Workshop', type: 'Event', url: '/programs' },
    { title: 'Employment Services', type: 'Program', url: '/programs' },
    { title: 'Contact Us', type: 'Page', url: '/contact' },
    { title: 'About TGLI', type: 'Page', url: '/about' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const saved = localStorage.getItem('tgli_recent_searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = searchResults
        .filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase())
        )
        .map(item => item.title)
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const updated = [searchQuery, ...recentSearches.filter(s => s !== searchQuery)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('tgli_recent_searches', JSON.stringify(updated));

    // Navigate to search results (for now, go to programs)
    navigate('/programs');
    onClose();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(query);
    }
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('tgli_recent_searches');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="search-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="search-modal"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="search-header">
              <div className="search-input-container">
                <Search size={20} className="search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search programs, events, and more..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="search-input"
                />
                <button className="close-search" onClick={onClose}>
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="search-content">
              {query.length === 0 ? (
                <>
                  {recentSearches.length > 0 && (
                    <div className="search-section">
                      <div className="section-header">
                        <h3>
                          <Clock size={16} />
                          Recent Searches
                        </h3>
                        <button onClick={clearRecentSearches} className="clear-button">
                          Clear
                        </button>
                      </div>
                      <div className="search-items">
                        {recentSearches.map((search, index) => (
                          <motion.button
                            key={index}
                            className="search-item"
                            onClick={() => handleSearch(search)}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Clock size={16} />
                            {search}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="search-section">
                    <div className="section-header">
                      <h3>
                        <TrendingUp size={16} />
                        Popular Searches
                      </h3>
                    </div>
                    <div className="search-items">
                      {popularSearches.map((search, index) => (
                        <motion.button
                          key={index}
                          className="search-item"
                          onClick={() => handleSearch(search)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <TrendingUp size={16} />
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="search-section">
                  <div className="section-header">
                    <h3>Search Results</h3>
                  </div>
                  <div className="search-items">
                    {suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          className="search-item"
                          onClick={() => handleSearch(suggestion)}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Search size={16} />
                          {suggestion}
                        </motion.button>
                      ))
                    ) : (
                      <div className="no-results">
                        <p>No results found for "{query}"</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
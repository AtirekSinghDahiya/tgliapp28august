import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Share2, Bookmark, Clock, User } from 'lucide-react';
import { getNewsArticles } from '../lib/supabase';

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  published: boolean;
  featured: boolean;
  tags?: string[];
  created_at: string;
  updated_at: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const { data, error } = await getNewsArticles();
      if (error) throw error;
      
      // Fallback to mock data if no articles in database
      const mockArticles: NewsArticle[] = [
        {
          id: '1',
          title: 'TGLI Launches New Community Leadership Initiative',
          excerpt: 'Empowering local leaders with comprehensive training and mentorship programs to drive positive change in their communities.',
          content: 'The Toronto Global Leadership Institute is proud to announce the launch of our new Community Leadership Initiative, designed to empower emerging leaders across the Greater Toronto Area. This comprehensive program combines theoretical knowledge with practical application, providing participants with the tools they need to create meaningful change in their communities.',
          author: 'Sarah Johnson',
          category: 'Programs',
          image_url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
          published: true,
          featured: true,
          tags: ['Leadership', 'Community', 'Training'],
          created_at: '2024-01-15T00:00:00Z',
          updated_at: '2024-01-15T00:00:00Z'
        },
        {
          id: '2',
          title: 'Record-Breaking Job Fair Connects 500+ Job Seekers',
          excerpt: 'Our annual job fair exceeded expectations, facilitating meaningful connections between employers and talented individuals.',
          content: 'This year\'s TGLI Job Fair was our most successful yet, with over 500 job seekers connecting with 75+ employers from various industries. The event featured workshops on resume writing, interview skills, and networking strategies.',
          author: 'Michael Chen',
          category: 'Employment',
          image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
          published: true,
          featured: true,
          tags: ['Employment', 'Job Fair', 'Career'],
          created_at: '2024-01-12T00:00:00Z',
          updated_at: '2024-01-12T00:00:00Z'
        },
        {
          id: '3',
          title: 'Youth Leadership Summit Inspires Next Generation',
          excerpt: 'Young leaders from across the GTA gathered to share ideas, build networks, and develop skills for positive community impact.',
          content: 'The annual Youth Leadership Summit brought together over 150 young leaders aged 16-24 for a day of inspiration, learning, and networking. Participants engaged in workshops on social innovation, community organizing, and leadership development.',
          author: 'Jessica Park',
          category: 'Youth',
          image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
          published: true,
          featured: false,
          tags: ['Youth', 'Leadership', 'Summit'],
          created_at: '2024-01-05T00:00:00Z',
          updated_at: '2024-01-05T00:00:00Z'
        }
      ];

      setArticles(data && data.length > 0 ? data : mockArticles);
      setFilteredArticles(data && data.length > 0 ? data : mockArticles);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (article.tags && article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [searchTerm, articles]);

  const handleBookmark = (articleId: string) => {
    setBookmarkedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleShare = (article: NewsArticle) => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`${article.title} - ${window.location.href}`);
      alert('Article link copied to clipboard!');
    }
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
        <h1 className="text-2xl font-bold mb-2 text-center">Latest News</h1>
        <p className="text-red-100 text-center">Stay updated with TGLI stories</p>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-base focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Articles */}
      <div className="px-4 space-y-4">
        {filteredArticles.map((article, index) => (
          <motion.div
            key={article.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedArticle(article)}
          >
            {article.image_url && (
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image_url} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </div>
                {article.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            )}
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              
              {article.tags && (
                <div className="flex gap-2 mb-4 flex-wrap">
                  {article.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookmark(article.id);
                    }}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Bookmark 
                      size={16} 
                      fill={bookmarkedArticles.includes(article.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(article);
                    }}
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found matching your search.</p>
        </div>
      )}

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setSelectedArticle(null)}>
          <motion.div 
            className="bg-white rounded-t-3xl w-full max-h-[90vh] overflow-hidden" 
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg bg-gray-100 text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="overflow-y-auto max-h-[80vh]">
              {selectedArticle.image_url && (
                <img 
                  src={selectedArticle.image_url} 
                  alt={selectedArticle.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <h1 className="text-xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
                
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>By {selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{new Date(selectedArticle.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-4 font-medium">{selectedArticle.excerpt}</p>
                  <p className="text-gray-600 leading-relaxed">{selectedArticle.content}</p>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <button
                    className="flex-1 btn btn-secondary"
                    onClick={() => handleBookmark(selectedArticle.id)}
                  >
                    <Bookmark 
                      size={16} 
                      fill={bookmarkedArticles.includes(selectedArticle.id) ? 'currentColor' : 'none'}
                    />
                    {bookmarkedArticles.includes(selectedArticle.id) ? 'Bookmarked' : 'Bookmark'}
                  </button>
                  <button
                    className="flex-1 btn btn-primary"
                    onClick={() => handleShare(selectedArticle)}
                  >
                    <Share2 size={16} />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default News;
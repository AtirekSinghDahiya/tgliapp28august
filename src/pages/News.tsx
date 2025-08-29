import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, User, Sparkles, Star, TrendingUp, Calendar } from 'lucide-react'
import { getNewsArticles } from '../services/supabase'

const News: React.FC = () => {
  const [articles, setArticles] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const { data, error } = await getNewsArticles()
        if (error) throw error
        
        // Fallback to mock data
        const mockArticles = [
          {
            id: '1',
            title: 'TGLI Launches New Community Leadership Initiative',
            excerpt: 'Empowering local leaders with comprehensive training and mentorship programs designed to create lasting community impact.',
            author: 'Sarah Johnson',
            category: 'Programs',
            image_url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
          },
          {
            id: '2',
            title: 'Record-Breaking Job Fair Connects 500+ Job Seekers',
            excerpt: 'Our annual job fair exceeded expectations with meaningful connections between employers and talented job seekers.',
            author: 'Michael Chen',
            category: 'Employment',
            image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
          },
          {
            id: '3',
            title: 'Youth Leadership Summit Inspires Next Generation',
            excerpt: 'Young leaders gathered to share ideas and build networks for community impact, creating tomorrow\'s change-makers.',
            author: 'Jessica Park',
            category: 'Youth',
            image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 1 week ago
          },
          {
            id: '4',
            title: 'New Entrepreneurship Program Launches This Fall',
            excerpt: 'Supporting aspiring business owners with mentorship, funding opportunities, and comprehensive business development resources.',
            author: 'David Rodriguez',
            category: 'Business',
            image_url: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
          }
        ]
        
        setArticles(data && data.length > 0 ? data : mockArticles)
      } catch (error) {
        console.error('Error loading articles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const filteredArticles = articles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    const colors = {
      'Programs': 'from-blue-500 to-blue-600',
      'Employment': 'from-green-500 to-green-600',
      'Youth': 'from-purple-500 to-purple-600',
      'Business': 'from-orange-500 to-orange-600',
      'Community': 'from-red-500 to-red-600'
    }
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600'
  }

  const handleReadMore = (article: any) => {
    // Navigate to full article page
    navigate(`/news/${article.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-200/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
        
        <div className="animate-pulse space-y-6 relative z-10 pt-16">
          <div className="h-20 bg-gray-200 rounded-2xl"></div>
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-200/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white p-6 pt-16 relative z-10">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          >
            <TrendingUp className="w-6 h-6 text-yellow-300" />
            <Star className="w-5 h-5 text-yellow-300" />
          </motion.div>
          <h1 className="text-2xl font-bold mb-2">Latest News</h1>
          <p className="text-purple-100">Stay updated with TGLI stories and announcements</p>
        </motion.div>
      </div>

      <div className="p-4 space-y-6 relative z-10">
        {/* Search */}
        <motion.div 
          className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-2xl border border-white/30"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          whileHover={{ y: -2, boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)" }}
        >
          <div className="relative">
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              whileHover={{ scale: 1.1, color: "#8b5cf6" }}
            >
              <Search size={20} />
            </motion.div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none bg-white/50 backdrop-blur-sm transition-all duration-300"
            />
          </div>
        </motion.div>

        {/* Articles */}
        <div className="space-y-6">
          {filteredArticles.map((article: any, index: number) => (
            <motion.div 
              key={article.id} 
              className="bg-white/95 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/30"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                scale: 1.02
              }}
              whileTap={{ scale: 0.98 }}
            >
              {article.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <motion.img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute top-4 left-4">
                    <motion.span 
                      className={`bg-gradient-to-r ${getCategoryColor(article.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {article.category}
                    </motion.span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
              )}
              <div className="p-6">
                <motion.h3 
                  className="font-bold text-gray-900 mb-3 text-lg leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                >
                  {article.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  {article.excerpt}
                </motion.p>
                <motion.div 
                  className="flex items-center justify-between text-sm text-gray-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-1.5 rounded-lg">
                        <User size={12} className="text-blue-600" />
                      </div>
                      <span className="font-medium">{article.author}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-gradient-to-r from-green-100 to-green-200 p-1.5 rounded-lg">
                        <Clock size={12} className="text-green-600" />
                      </div>
                      <span>{new Date(article.created_at).toLocaleDateString()}</span>
                    </motion.div>
                  </div>
                  <motion.button
                    className="text-purple-500 font-semibold hover:text-purple-600 transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReadMore(article)}
                  >
                    Read More
                    <Sparkles size={14} />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <motion.div 
            className="text-center py-16 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Calendar size={64} className="mx-auto text-gray-400 mb-4" />
            </motion.div>
            <p className="text-gray-500 text-lg">No articles found matching your search.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default News
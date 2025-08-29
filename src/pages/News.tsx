import React, { useState, useEffect } from 'react'
import { Search, Clock, User } from 'lucide-react'
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
            excerpt: 'Empowering local leaders with comprehensive training and mentorship programs.',
            author: 'Sarah Johnson',
            category: 'Programs',
            image_url: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '2024-01-15T00:00:00Z'
          },
          {
            id: '2',
            title: 'Record-Breaking Job Fair Connects 500+ Job Seekers',
            excerpt: 'Our annual job fair exceeded expectations with meaningful connections.',
            author: 'Michael Chen',
            category: 'Employment',
            image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '2024-01-12T00:00:00Z'
          },
          {
            id: '3',
            title: 'Youth Leadership Summit Inspires Next Generation',
            excerpt: 'Young leaders gathered to share ideas and build networks for community impact.',
            author: 'Jessica Park',
            category: 'Youth',
            image_url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400',
            created_at: '2024-01-05T00:00:00Z'
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

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Latest News</h1>
        <p className="text-gray-600">Stay updated with TGLI stories and announcements</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
        />
      </div>

      {/* Articles */}
      <div className="space-y-4">
        {filteredArticles.map((article: any) => (
          <div key={article.id} className="bg-white rounded-xl overflow-hidden shadow-sm">
            {article.image_url && (
              <img 
                src={article.image_url} 
                alt={article.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                  {article.category}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
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
            </div>
          </div>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No articles found.</p>
        </div>
      )}
    </div>
  )
}

export default News
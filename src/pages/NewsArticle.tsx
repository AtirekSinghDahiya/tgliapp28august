import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Clock, Share2, Bookmark, Sparkles } from 'lucide-react'

const NewsArticle: React.FC = () => {
  const { articleId } = useParams()
  const navigate = useNavigate()

  // Mock article data - in real app, fetch from database
  const articles = {
    '1': {
      title: 'TGLI Launches New Community Leadership Initiative',
      author: 'Sarah Johnson',
      category: 'Programs',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishDate: '2024-03-15',
      readTime: '5 min read',
      content: `
        <p>The Toronto Global Leadership Institute is proud to announce the launch of our groundbreaking Community Leadership Initiative, designed to empower local leaders with comprehensive training and mentorship programs.</p>
        
        <p>This innovative program addresses the growing need for effective community leadership in the Greater Toronto Area. Through a combination of workshops, one-on-one mentoring, and hands-on community projects, participants will develop the skills necessary to create lasting positive change in their neighborhoods.</p>
        
        <h3>Program Highlights</h3>
        <p>The Community Leadership Initiative features several key components:</p>
        <ul>
          <li><strong>Leadership Workshops:</strong> Monthly sessions covering essential leadership skills including communication, conflict resolution, and strategic planning.</li>
          <li><strong>Mentorship Program:</strong> Pairing participants with experienced community leaders for personalized guidance and support.</li>
          <li><strong>Community Projects:</strong> Hands-on opportunities to apply learned skills through real community improvement initiatives.</li>
          <li><strong>Networking Events:</strong> Regular gatherings to build connections and share experiences with fellow participants.</li>
        </ul>
        
        <p>"We believe that strong communities are built by strong leaders," said Dr. Maria Rodriguez, TGLI's Executive Director. "This initiative will provide individuals with the tools and confidence they need to make a meaningful difference in their communities."</p>
        
        <h3>Application Process</h3>
        <p>The program is open to residents of the Greater Toronto Area who demonstrate a commitment to community service and leadership potential. Applications are now being accepted through our website, with the first cohort beginning in April 2024.</p>
        
        <p>Interested candidates should submit an application including a personal statement outlining their community involvement and leadership goals. Selected participants will be notified by March 30th.</p>
        
        <p>For more information about the Community Leadership Initiative or to apply, visit our programs page or contact us directly at programs@tgli.org.</p>
      `
    },
    '2': {
      title: 'Record-Breaking Job Fair Connects 500+ Job Seekers',
      author: 'Michael Chen',
      category: 'Employment',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      publishDate: '2024-03-10',
      readTime: '4 min read',
      content: `
        <p>TGLI's annual job fair exceeded all expectations this year, connecting over 500 job seekers with potential employers in what organizers are calling the most successful event to date.</p>
        
        <p>The event, held at the Metro Toronto Convention Centre, featured 75 employers from various industries including healthcare, technology, finance, and manufacturing. Job seekers had the opportunity to meet directly with hiring managers, submit resumes, and in many cases, participate in on-the-spot interviews.</p>
        
        <h3>Success Stories</h3>
        <p>The impact of the job fair was immediate and significant. Preliminary results show:</p>
        <ul>
          <li>Over 200 on-site interviews conducted</li>
          <li>150+ job offers extended within the first week</li>
          <li>85% of participants reported making meaningful connections</li>
          <li>Average salary range of positions offered: $45,000 - $75,000</li>
        </ul>
        
        <p>"I came to the job fair feeling discouraged after months of online applications," shared participant Jennifer Walsh. "Within two hours, I had three interviews scheduled and received a job offer the next day. This event changed my life."</p>
        
        <h3>Employer Participation</h3>
        <p>The strong employer turnout reflected the current job market's demand for skilled workers. Major participants included:</p>
        <ul>
          <li>Sunnybrook Health Sciences Centre</li>
          <li>TD Bank Group</li>
          <li>Shopify</li>
          <li>City of Toronto</li>
          <li>Various local small and medium enterprises</li>
        </ul>
        
        <p>"The quality of candidates at TGLI's job fair is consistently high," noted Rebecca Thompson, HR Director at a participating tech company. "We've hired several excellent employees through this event over the years."</p>
        
        <p>Planning for next year's job fair is already underway, with organizers aiming to expand the event to accommodate even more participants and employers.</p>
      `
    }
  }

  const article = articles[articleId as keyof typeof articles]

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <button 
            onClick={() => navigate('/news')}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Back to News
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-200/30 rounded-full"
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

      {/* Header */}
      <motion.div 
        className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 p-4 pt-12 relative z-10"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        <div className="flex items-center gap-4">
          <motion.button 
            onClick={() => navigate('/news')} 
            className="p-2 hover:bg-purple-100 rounded-xl transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              News Article
            </h1>
            <p className="text-sm text-gray-600">{article.category}</p>
          </div>
        </div>
      </motion.div>

      <div className="p-4 relative z-10 pb-24">
        <motion.article 
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 max-w-4xl mx-auto overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
        >
          {/* Hero Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <motion.img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {article.category}
              </span>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Article Header */}
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-1.5 rounded-lg">
                    <User size={14} className="text-blue-600" />
                  </div>
                  <span>By {article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-1.5 rounded-lg">
                    <Clock size={14} className="text-green-600" />
                  </div>
                  <span>{new Date(article.publishDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {article.readTime}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <motion.button
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium hover:from-blue-200 hover:to-blue-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={16} />
                  Share
                </motion.button>
                <motion.button
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-4 py-2 rounded-lg font-medium hover:from-purple-200 hover:to-purple-300 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark size={16} />
                  Save
                </motion.button>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div 
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                lineHeight: '1.7',
                fontSize: '1.1rem',
                color: '#374151'
              }}
            />

            {/* Article Footer */}
            <motion.div 
              className="mt-8 pt-6 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{article.author}</p>
                    <p className="text-sm text-gray-600">TGLI Staff Writer</p>
                  </div>
                </div>
                
                <motion.button
                  onClick={() => navigate('/news')}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={16} />
                  Back to News
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </div>
  )
}

export default NewsArticle
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Zap } from 'lucide-react';
import { sendChatMessage } from '../../lib/supabase';
import './AIChat.css';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '✨ Hello! I\'m your TGLI AI assistant. I can help you with programs, services, applications, and more. What would you like to know?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendChatMessage(inputValue);
      
      setTimeout(() => {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          isBot: true,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 via-red-600 to-red-500 text-white shadow-2xl flex items-center justify-center relative overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        whileHover={{ 
          scale: 1.15, 
          boxShadow: "0 20px 40px rgba(220, 38, 38, 0.5)",
          y: -5
        }}
        animate={isOpen ? { 
          rotate: 180,
          background: "linear-gradient(135deg, #dc2626, #b91c1c)"
        } : { 
          rotate: 0,
          background: "linear-gradient(135deg, #ef4444, #dc2626)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div
          animate={isOpen ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <MessageCircle size={26} />
        </motion.div>
        <motion.div
          animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          <X size={26} />
        </motion.div>
        
        {/* Floating particles around button */}
        {!isOpen && (
          <>
            <motion.div
              className="absolute w-1 h-1 bg-yellow-300 rounded-full"
              animate={{
                x: [0, 15, -15, 0],
                y: [0, -15, 15, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute w-1 h-1 bg-blue-300 rounded-full"
              animate={{
                x: [0, -20, 20, 0],
                y: [0, 20, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-modal"
            initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, rotateY: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 flex items-center justify-between">
              <motion.div 
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles size={18} className="text-yellow-300" />
                </motion.div>
                <h3 className="font-semibold text-sm">TGLI AI Assistant</h3>
              </motion.div>
              <motion.button 
                className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center" 
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.15, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto space-y-2 h-64" style={{ maxHeight: '16rem' }}>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`max-w-[85%] p-2.5 rounded-xl text-sm leading-relaxed ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800 border border-gray-200' 
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white ml-auto shadow-md'
                  }`}
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 250,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  {message.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="max-w-[85%] p-2.5 rounded-xl bg-gray-100 text-gray-800 border border-gray-200"
                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <div className="flex items-center gap-1">
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="chat-input"
                />
                <motion.button 
                  className="chat-send-button" 
                  onClick={handleSendMessage}
                  whileHover={{ 
                    scale: 1.1, 
                    boxShadow: "0 6px 16px rgba(220, 38, 38, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isTyping}
                >
                  <motion.div
                    animate={isTyping ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isTyping ? <Zap size={16} /> : <Send size={16} />}
                  </motion.div>
                </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
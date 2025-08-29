import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
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
      text: 'Hello! I\'m here to help you learn about TGLI\'s programs and services. How can I assist you today?',
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
    <div className="chatbot-container">
      <motion.button
        className="chatbot-button"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.85 }}
        whileHover={{ 
          scale: 1.1, 
          boxShadow: "0 15px 35px rgba(225, 29, 72, 0.4)",
          y: -3
        }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-modal"
            initial={{ opacity: 0, scale: 0.7, y: 50, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 50, rotateX: -15 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="chatbot-header">
              <h3>🤖 TGLI Assistant</h3>
              <motion.button 
                className="chatbot-close" 
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={16} />
              </motion.button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`chatbot-message ${message.isBot ? 'bot' : 'user'}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  {message.text}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  className="chatbot-message bot"
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Ask me anything about TGLI..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
              />
              <motion.button 
                className="chatbot-send" 
                onClick={handleSendMessage}
                whileHover={{ 
                  scale: 1.1, 
                  boxShadow: "0 8px 25px rgba(225, 29, 72, 0.4)",
                  rotate: 5
                }}
                whileTap={{ scale: 0.9 }}
                disabled={isTyping}
              >
                <Send size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIChat;
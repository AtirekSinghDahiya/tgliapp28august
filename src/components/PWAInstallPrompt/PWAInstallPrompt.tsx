import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X } from 'lucide-react';
import { usePWA } from '../../contexts/PWAContext';
import './PWAInstallPrompt.css';

const PWAInstallPrompt: React.FC = () => {
  const { showInstallPrompt, installApp, dismissInstallPrompt } = usePWA();

  return (
    <AnimatePresence>
      {showInstallPrompt && (
        <motion.div
          className="pwa-install-prompt"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="prompt-content">
            <div className="prompt-icon">
              <img 
                src="https://www.tgli.org/TGLI_Logo.png" 
                alt="TGLI" 
                className="app-icon"
              />
            </div>
            <div className="prompt-text">
              <h3>Install TGLI App</h3>
              <p>Get quick access to programs, events, and community resources</p>
            </div>
            <div className="prompt-actions">
              <motion.button
                className="btn btn-primary install-button"
                onClick={installApp}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Install
              </motion.button>
              <motion.button
                className="dismiss-button"
                onClick={dismissInstallPrompt}
                whileTap={{ scale: 0.95 }}
              >
                <X size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PWAInstallPrompt;
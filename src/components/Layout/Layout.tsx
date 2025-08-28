import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import PWAInstallPrompt from '../PWAInstallPrompt/PWAInstallPrompt';
import PullToRefresh from '../PullToRefresh/PullToRefresh';
import AIChat from '../AIChat/AIChat';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const handleRefresh = async () => {
    // Simulate refresh action
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <PullToRefresh onRefresh={handleRefresh}>
        <motion.main 
          className="pb-24 pt-16 safe-area-top safe-area-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.main>
      </PullToRefresh>
      <BottomNavigation />
      <PWAInstallPrompt />
      <AIChat />
    </div>
  );
};

export default Layout;
import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import './PullToRefresh.css';

interface PullToRefreshProps {
  children: React.ReactNode;
  onRefresh: () => Promise<void>;
  threshold?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({ 
  children, 
  onRefresh, 
  threshold = 80 
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  
  const y = useMotionValue(0);
  const rotate = useTransform(y, [0, threshold], [0, 180]);
  const opacity = useTransform(y, [0, threshold / 2, threshold], [0, 0.5, 1]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (window.scrollY > 0) return;
    startY.current = e.touches[0].clientY;
    setIsPulling(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isPulling || window.scrollY > 0) return;
    
    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    
    if (deltaY > 0) {
      e.preventDefault();
      const pullDistance = Math.min(deltaY * 0.5, threshold * 1.5);
      y.set(pullDistance);
    }
  }, [isPulling, threshold, y]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling) return;
    
    setIsPulling(false);
    const pullDistance = y.get();
    
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error('Refresh failed:', error);
      } finally {
        setIsRefreshing(false);
      }
    }
    
    y.set(0);
  }, [isPulling, threshold, y, onRefresh, isRefreshing]);

  return (
    <div 
      ref={containerRef}
      className="pull-to-refresh-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="refresh-indicator"
        style={{ 
          y,
          opacity: isPulling || isRefreshing ? opacity : 0
        }}
      >
        <motion.div
          className={`refresh-icon ${isRefreshing ? 'spinning' : ''}`}
          style={{ rotate: isRefreshing ? 0 : rotate }}
        >
          <RefreshCw size={20} />
        </motion.div>
        <span className="refresh-text">
          {isRefreshing ? 'Refreshing...' : 'Pull to refresh'}
        </span>
      </motion.div>
      
      <motion.div
        className="content-container"
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default PullToRefresh;
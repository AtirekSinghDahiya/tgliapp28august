import React from 'react';
import { motion } from 'framer-motion';
import './SegmentedControl.css';

interface SegmentedControlProps {
  tabs: string[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ tabs, value, onChange }) => {
  return (
    <div className="segmented-control" role="tablist" aria-label="Home sections">
      <div className="segmented-track">
        {tabs.map((tab) => {
          const isActive = tab === value;
          return (
            <button
              key={tab}
              role="tab"
              aria-selected={isActive}
              className={`segment ${isActive ? 'active' : ''}`}
              onClick={() => onChange(tab)}
            >
              <span className="segment-label">{tab}</span>
              {isActive && (
                <motion.div
                  className="segment-indicator"
                  layoutId="segmentIndicator"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SegmentedControl;


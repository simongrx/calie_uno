'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface RutasTabsProps {
  tabs: Tab[];
  tabActivo: string;
  onChange: (id: string) => void;
}

export const RutasTabs: React.FC<RutasTabsProps> = ({ tabs, tabActivo, onChange }) => {
  return (
    <div
      className="flex gap-1 p-1 rounded-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300"
          style={
            tabActivo === tab.id
              ? {
                  color: 'white',
                  background: 'rgba(255, 41, 0, 0.25)',
                  border: '1px solid rgba(255, 41, 0, 0.4)',
                  boxShadow: '0 4px 16px rgba(255, 41, 0, 0.15)',
                }
              : { color: 'rgba(255,255,255,0.5)' }
          }
        >
          {tabActivo === tab.id && (
            <motion.div
              layoutId="tabIndicator"
              className="absolute inset-0 rounded-xl"
              style={{ background: 'rgba(255, 41, 0,0.1)' }}
              transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10">{tab.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default RutasTabs;

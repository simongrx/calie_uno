'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className = '',
  once = true,
  amount = 0.2,
}) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once, amount });

  // Variantes de entrada basadas en dirección
  const getInitialVariant = () => {
    const baseVariant = { opacity: 0 };
    switch (direction) {
      case 'up':
        return { ...baseVariant, y: 30 };
      case 'down':
        return { ...baseVariant, y: -30 };
      case 'left':
        return { ...baseVariant, x: 30 };
      case 'right':
        return { ...baseVariant, x: -30 };
      default:
        return baseVariant;
    }
  };

  const getAnimateVariant = () => {
    return {
      opacity: 1,
      y: direction === 'up' || direction === 'down' ? 0 : undefined,
      x: direction === 'left' || direction === 'right' ? 0 : undefined,
    };
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialVariant()}
      animate={inView ? getAnimateVariant() : getInitialVariant()}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

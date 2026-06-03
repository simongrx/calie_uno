'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

type RevealType = 'horizontal' | 'vertical' | 'fade';

interface RevealTextProps {
  children: ReactNode;
  type?: RevealType;
  delay?: number;
  className?: string;
}

const variants: Record<RevealType, Variants> = {
  horizontal: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  vertical: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

export const RevealText = ({
  children,
  type = 'vertical',
  delay = 0,
  className,
}: RevealTextProps) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={variants[type]}
      transition={{ duration: 0.8, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RevealText;

'use client';

import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export interface ParallaxImageProps {
  src: string;
  alt: string;
  offset?: number;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  offset = 50,
  className = '',
  containerClassName = '',
  width = 1200,
  height = 600,
  priority = false,
  objectFit = 'cover',
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      <motion.div style={{ y }} className="relative w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className={`${className} object-${objectFit}`}
          style={{ objectFit }}
        />
      </motion.div>

      {/* Overlay opcional para mejorar contraste de texto */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300" />
    </div>
  );
};

export default ParallaxImage;

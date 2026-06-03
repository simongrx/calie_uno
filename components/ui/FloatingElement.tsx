'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface FloatingElementProps {
  /** Color base de la forma (hex o rgba) */
  color?: string;
  /** Tamaño en px */
  size?: number;
  /** Clases de posición Tailwind (ej: "top-10 right-20") */
  position?: string;
  /** Desfase de la animación continua */
  delay?: number;
  /** Intensidad del parallax (px de desplazamiento) */
  parallax?: number;
}

/**
 * Forma decorativa abstracta (blob difuminado) con parallax suave + drift.
 * Respeta prefers-reduced-motion. Puramente decorativa (pointer-events-none).
 */
export const FloatingElement = ({
  color = 'rgba(255, 41, 0, 0.25)',
  size = 220,
  position = 'top-10 right-10',
  delay = 0,
  parallax = 80,
}: FloatingElementProps) => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : parallax]);

  return (
    <motion.div
      aria-hidden
      style={{
        y,
        width: size,
        height: size,
        background: color,
        willChange: 'transform, opacity',
      }}
      animate={
        reduce
          ? undefined
          : { x: [0, 20, -20, 0], opacity: [0.35, 0.6, 0.35] }
      }
      transition={{ duration: 9, delay, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none absolute ${position} -z-0 rounded-full blur-3xl`}
    />
  );
};

export default FloatingElement;

'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * Fondo global fijo cuyo color transiciona suavemente con el scroll de la página.
 * Se renderiza una vez detrás de todo el contenido (las secciones usan bg transparente).
 * Paleta intencionalmente oscura (navy) para mantener legibilidad y estética.
 */
export const AnimatedBackground = () => {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ['#0A1636', '#101a3a', '#16182c', '#101633', '#0A1636'],
  );

  return (
    <motion.div
      aria-hidden
      style={{ backgroundColor: reduce ? '#0A1636' : backgroundColor }}
      className="fixed inset-0 -z-10"
    />
  );
};

export default AnimatedBackground;

'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

function FloatChar({
  char,
  distance,
  progress,
}: {
  char: string;
  distance: number;
  progress: MotionValue<number>;
}) {
  // Los caracteres arrancan dispersos (según su distancia al centro) y convergen
  // a su lugar a medida que el título entra en pantalla.
  const x = useTransform(progress, [0, 0.5], [distance * 42, 0]);
  const rotateX = useTransform(progress, [0, 0.5], [distance * 45, 0]);
  const opacity = useTransform(progress, [0, 0.35], [0.15, 1]);

  return (
    <motion.span className="inline-block" style={{ x, rotateX, opacity }}>
      {char === ' ' ? ' ' : char}
    </motion.span>
  );
}

/**
 * Título que se "arma" letra por letra con el scroll (efecto Skiper31 / CharacterV1),
 * adaptado a framer-motion y al scroll nativo (sin Lenis).
 */
export function ScrollFloatText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  });

  const chars = Array.from(text);
  const center = (chars.length - 1) / 2;

  return (
    <span ref={ref} className={className} style={{ display: 'inline-block', perspective: '600px' }}>
      {chars.map((c, i) => (
        <FloatChar key={i} char={c} distance={i - center} progress={scrollYProgress} />
      ))}
    </span>
  );
}

export default ScrollFloatText;

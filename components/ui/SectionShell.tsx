'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionShellProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Costura: opacidad + blur ligados al scroll de la propia sección, para disolver
   * suavemente al entrar y salir (evita cortes secos entre secciones). Desactivar
   * en secciones con `position: sticky` interno (un `filter` en el ancestro lo rompe).
   */
  seam?: boolean;
}

/**
 * Envuelve una sección y aplica una "costura" de scroll (fade + blur en los bordes)
 * para que la transición entre secciones se sienta fluida. Reutilizable en cualquier
 * página. Respeta `prefers-reduced-motion` (sin blur, solo un fade suave).
 */
export function SectionShell({ children, className, seam = true }: SectionShellProps) {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Nítida y opaca en el centro del recorrido; se difumina solo en los bordes.
  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.86, 1], [0, 1, 1, 0]);
  const filter = useTransform(
    scrollYProgress,
    [0, 0.14, 0.86, 1],
    reduced
      ? ['blur(0px)', 'blur(0px)', 'blur(0px)', 'blur(0px)']
      : ['blur(7px)', 'blur(0px)', 'blur(0px)', 'blur(7px)']
  );

  if (!seam) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{ opacity, filter, willChange: 'opacity, filter' }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default SectionShell;

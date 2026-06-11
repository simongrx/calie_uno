'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFloatText } from '@/components/ui/scroll-float-text';

export interface SectionTitleProps {
  titulo: string;
  subtitulo?: string;
  alineacion?: 'left' | 'center' | 'right';
  conLinea?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  titulo,
  subtitulo,
  alineacion = 'center',
  conLinea = true,
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const containerAlignment = {
    left: 'items-start',
    center: 'items-center',
    right: 'items-end',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.5 }}
      className={`flex flex-col ${containerAlignment[alineacion]} gap-4 ${className}`}
    >
      {/* Línea decorativa */}
      {conLinea && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className={`spotlight-card h-0.5 bg-gradient-brand rounded-full ${alineacion === 'center' ? 'w-16' : 'w-12'}`}
          style={{ originX: alineacion === 'right' ? 1 : 0 }}
        />
      )}

      {/* Título — Molle */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className={`text-3xl sm:text-4xl lg:text-5xl text-brand-orange ${alignmentClass[alineacion]}`}
        style={{ fontFamily: 'Molle, cursive', fontStyle: 'italic', fontWeight: 400 }}
      >
        <ScrollFloatText text={titulo} />
      </motion.h2>

      {/* Subtítulo — Outfit */}
      {subtitulo && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`text-base sm:text-lg text-slate-400 max-w-2xl px-4 sm:px-0 ${alignmentClass[alineacion]}`}
          style={{ fontFamily: 'Outfit, sans-serif' }}
        >
          {subtitulo}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;

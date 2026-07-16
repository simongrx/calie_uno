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

      {/* Título — CaliEnamora (TTF de marca), 3× y con tamaños variables por letra (playful).
          El tamaño va inline (clamp) para ganar al override de h2 sin capa en globals.css. */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className={`text-brand-orange ${alignmentClass[alineacion]}`}
        style={{
          fontFamily: "'CaliEnamora', cursive",
          fontWeight: 400,
          fontSize: 'clamp(1.75rem, 5.5vw, 4.5rem)',
          lineHeight: 0.9,
        }}
      >
        <ScrollFloatText text={titulo} className="ce-title-playful" />
      </motion.h2>

      {/* Subtítulo — Stack Sans Text, blanco */}
      {subtitulo && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`text-base sm:text-lg text-white max-w-2xl px-4 sm:px-0 ${alignmentClass[alineacion]}`}
          style={{ fontFamily: "'Stack Sans Text', sans-serif" }}
        >
          {subtitulo}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;

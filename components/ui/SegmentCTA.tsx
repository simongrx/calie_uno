'use client';
import React from 'react';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ScrollFloatText } from '@/components/ui/scroll-float-text';

export interface SegmentAccion {
  label: string;
  href: string;
  /** 'primary' = gradiente de marca (relleno) · 'ghost' = vidrio con borde */
  variante?: 'primary' | 'ghost';
  /** Texto pequeño opcional bajo el label */
  descripcion?: string;
}

export interface SegmentCTAProps {
  titulo: string;
  subtitulo?: string;
  acciones: SegmentAccion[];
  className?: string;
  /** Clase de color del título (default rojo de marca). */
  tituloColorClass?: string;
  /** font-size del título (default clamp normal). */
  tituloFontSize?: string;
  /** Card de vidrio detrás del contenido (para legibilidad sobre fondos con imagen/video). */
  conFondo?: boolean;
}

const fondoCardStyle: React.CSSProperties = {
  background: 'rgba(10, 22, 54, 0.6)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
};

const ghostStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 30px rgba(0,0,0,0.25)',
};

const primaryStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255, 41, 0,0.95), rgba(204, 33, 0,0.95))',
  border: '1px solid rgba(255, 100, 60, 0.4)',
  boxShadow: '0 10px 34px rgba(255, 41, 0,0.28)',
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Bloque CTA de fin de página para segmentar/derivar al usuario a otra página.
 * Se usa en Inicio (2 acciones), Turista (→ /corporativa) y Corporativa (→ /turista).
 */
export const SegmentCTA: React.FC<SegmentCTAProps> = ({
  titulo,
  subtitulo,
  acciones,
  className = '',
  tituloColorClass = 'text-brand-orange',
  tituloFontSize = 'clamp(1.5rem, 4vw, 3rem)',
  conFondo = false,
}) => {
  return (
    <section className={`section bg-transparent relative overflow-hidden ${className}`}>
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className={`mx-auto flex max-w-4xl flex-col items-center text-center ${
            conFondo ? 'rounded-[2rem] px-8 py-12 sm:px-14 sm:py-14' : ''
          }`}
          style={conFondo ? fondoCardStyle : undefined}
        >
          <motion.h2
            variants={itemVariants}
            className={tituloColorClass}
            style={{
              fontFamily: "'CaliEnamora', cursive",
              fontWeight: 400,
              fontSize: tituloFontSize,
              lineHeight: 0.9,
            }}
          >
            <ScrollFloatText text={titulo} className="ce-title-playful" />
          </motion.h2>

          {subtitulo && (
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-base text-white sm:text-lg"
              style={{ fontFamily: "'Stack Sans Text', sans-serif" }}
            >
              {subtitulo}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            className="mt-10 flex w-full flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap"
          >
            {acciones.map((accion) => {
              const isPrimary = (accion.variante ?? 'primary') === 'primary';
              return (
                <motion.div
                  key={accion.href + accion.label}
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:max-w-xs"
                >
                  <Link
                    href={accion.href}
                    className="group flex h-full flex-col items-center justify-center gap-1 rounded-2xl px-8 py-5 text-center font-semibold text-white transition-all duration-300"
                    style={isPrimary ? primaryStyle : ghostStyle}
                  >
                    <span className="inline-flex items-center gap-2 text-base sm:text-lg">
                      {accion.label}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    {accion.descripcion && (
                      <span className="text-xs font-normal text-white">{accion.descripcion}</span>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SegmentCTA;

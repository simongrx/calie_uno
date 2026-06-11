'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { PilarType } from '@/types';
import { GradientText } from '@/components/ui/GradientText';
import { RevealText } from '@/components/ui/RevealText';
import { FloatingElement } from '@/components/ui/FloatingElement';

interface PilarInfo {
  id: PilarType;
  nombre: string;
  descripcion: string;
  stat: string;
  icono: React.ReactNode;
  gradient: string;
  glow: string;
  /** Clases de span para el bento asimétrico */
  span: string;
  large?: boolean;
}

const iconoCultura = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);
const iconoNaturaleza = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const iconoGastronomia = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {/* Tenedor */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 2v7c0 1.1.9 2 2 2a2 2 0 0 0 2-2V2" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 2v20" />
    {/* Cuchillo */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);
const iconoBienestar = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const pilares: PilarInfo[] = [
  {
    id: 'cultura',
    nombre: 'Cultura',
    descripcion:
      'Museos, galerías, arquitectura colonial y eventos que celebran la identidad del Valle.',
    stat: '50+ eventos',
    icono: iconoCultura,
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    glow: 'rgba(139, 92, 246, 0.45)',
    span: 'md:col-span-2 md:row-span-2 lg:col-span-2 lg:row-span-2',
    large: true,
  },
  {
    id: 'naturaleza',
    nombre: 'Naturaleza',
    descripcion: 'Paisajes, cascadas y rutas ecológicas en plena biodiversidad.',
    stat: '15 rutas',
    icono: iconoNaturaleza,
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    glow: 'rgba(16, 185, 129, 0.45)',
    span: '',
  },
  {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    descripcion: 'Sabores auténticos del Pacífico en restaurantes y mercados locales.',
    stat: '45 restaurantes',
    icono: iconoGastronomia,
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    glow: 'rgba(239, 68, 68, 0.45)',
    span: '',
  },
  {
    id: 'bienestar',
    nombre: 'Bienestar',
    descripcion: 'Yoga, meditación, spas naturales y experiencias de bienestar integral.',
    stat: '20+ opciones',
    icono: iconoBienestar,
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    glow: 'rgba(6, 182, 212, 0.45)',
    span: 'md:col-span-3 lg:col-span-2',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const PilaresSection: React.FC = () => {
  return (
    <section id="pilares" className="section bg-transparent relative overflow-hidden">
      {/* Formas decorativas flotantes (sutiles) */}
      <FloatingElement color="rgba(139, 92, 246, 0.18)" size={240} position="top-24 right-10" delay={0} parallax={70} />
      <FloatingElement color="rgba(6, 182, 212, 0.16)" size={200} position="bottom-20 left-8" delay={2} parallax={-60} />

      <div className="container-custom relative z-10">
        {/* Título con reveal */}
        <RevealText type="vertical" className="mb-12 text-center sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white">
            Los 4 Pilares de <GradientText variant="brand">Cali Enamora</GradientText>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:text-lg">
            Cada pilar representa una dimensión única de la experiencia turística que ofrecemos.
          </p>
        </RevealText>

        {/* Bento grid asimétrico */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid auto-rows-[232px] grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4"
        >
          {pilares.map((pilar) => (
            <motion.a
              key={pilar.id}
              href="#rutas"
              variants={itemVariants}
              whileHover={{ scale: 1.02, boxShadow: `0 24px 60px ${pilar.glow}` }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{ backgroundImage: pilar.gradient, willChange: 'transform' }}
              className={`spotlight-card group relative flex flex-col overflow-hidden rounded-2xl p-5 text-center text-white shadow-lg sm:p-6 ${pilar.span}`}
            >
              {/* Ícono decorativo de fondo */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 opacity-10 transition-opacity duration-300 group-hover:opacity-20">
                <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full">{pilar.icono}</div>
              </div>

              {/* Contenido centrado */}
              <div className="relative flex min-h-0 flex-1 flex-col items-center justify-center">
                <div className="spotlight-card mb-3 inline-flex rounded-xl bg-white/15 p-2.5 backdrop-blur-sm [&>svg]:h-7 [&>svg]:w-7">
                  {pilar.icono}
                </div>
                <h3 className={`mb-2 font-bold ${pilar.large ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
                  {pilar.nombre}
                </h3>
                <p className={`mx-auto leading-snug text-white/90 ${pilar.large ? 'max-w-md text-base' : 'max-w-[15rem] text-sm'}`}>
                  {pilar.descripcion}
                </p>
              </div>

              {/* Footer: stat + explorar */}
              <div className="relative mt-auto flex items-center justify-between gap-2 pt-3">
                <span className="spotlight-card rounded-full bg-white/15 px-5 py-1.5 text-sm font-semibold backdrop-blur-sm">
                  {pilar.stat}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  Explorar
                  <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PilaresSection;

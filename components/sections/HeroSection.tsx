'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Typewriter } from '@/components/ui/Typewriter';
import Image from 'next/image';

// ============================================
// AJUSTES DE POSICIÓN - MODIFICA AQUÍ
// ============================================

const LOGO_TOP    = 'top-32';
const LOGO_LEFT   = 'left-1/2';
const LOGO_OFFSET = '-translate-x-1/2';
const LOGO_SIZE   = 'h-24 sm:h-28 md:h-32';

// Posición del texto y botones (en px, sin límite)
const TEXTO_TOP_PX = 630;

// ============================================

export const HeroSection: React.FC = () => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-cali.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`absolute z-20 ${LOGO_TOP} ${LOGO_LEFT} ${LOGO_OFFSET}`}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20CaliE-OCQi041dgJdYAvK07Eyaa6DieRdlH5.png"
            alt="Cali Enamora"
            width={500}
            height={250}
            className={`${LOGO_SIZE} w-auto drop-shadow-2xl`}
            priority
          />
        </motion.div>
      </motion.div>

      {/* Título + Botones */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
        style={{ top: `${TEXTO_TOP_PX}px` }}
        className="absolute z-20 left-1/2 -translate-x-1/2 text-center text-white w-full max-w-3xl px-4"
      >
        {/* Typewriter */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-gradient-brand text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
            <Typewriter
              textos={[
                'Descubre Cali',
                'Vive el Valle',
                'Enamórate',
              ]}
              velocidad={80}
              pausaDespues={2000}
              repetir={true}
            />
          </h1>
        </motion.div>

        {/* Botones Glassmorphism */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          {/* Botón primario */}
          <motion.a
            href="#rutas"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-base sm:text-lg text-white overflow-hidden group"
            style={{
              padding: '10px 25px',
              background: 'rgba(255, 41, 0, 0.25)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 41, 0, 0.5)',
              boxShadow: '0 8px 32px rgba(255, 41, 0, 0.2)',
            }}
          >
            {/* Brillo hover */}
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <span className="relative">Explora Nuestras Rutas</span>
            <svg className="w-5 h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>

          {/* Botón secundario */}
          <motion.a
            href="#eventos"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-base sm:text-lg text-white overflow-hidden group"
            style={{
              padding: '10px 25px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
            }}
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            <span className="relative">Ver Eventos</span>
            <svg className="w-5 h-5 relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator — flecha rebotando */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
      >
        <span className="text-white/50 text-xs font-medium tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-6 h-6 text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
        >
          <svg
            className="w-6 h-6 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 rounded-full bg-brand-orange/30 blur-3xl z-10"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-56 h-56 rounded-full bg-brand-yellow/25 blur-3xl z-10"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
    </section>
  );
};

export default HeroSection;

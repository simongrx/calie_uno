'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

// Niveles de participación (placeholder editable), en orden ascendente de compromiso.
const niveles = [
  {
    nivel: 1,
    nombre: 'Asociados',
    resumen: 'La base del movimiento',
    descripcion:
      'Personas y organizaciones que se vinculan a Cali Enamora, participan en las actividades y ayudan a difundir el proyecto en su comunidad.',
    participa: 'Únete, participa y multiplica el mensaje.',
    icono: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 100-8 4 4 0 000 8z',
    escala: 0.94,
    glow: 'rgba(255,255,255,0.10)',
  },
  {
    nivel: 2,
    nombre: 'Aliados',
    resumen: 'Quienes construyen con nosotros',
    descripcion:
      'Empresas, entidades y academia que aportan recursos, servicios o conocimiento para diseñar y operar rutas, eventos y experiencias.',
    participa: 'Suma tu marca, tus servicios o tu talento.',
    icono: 'M13 10V3L4 14h7v7l9-11h-7z',
    escala: 0.97,
    glow: 'rgba(255,41,0,0.22)',
  },
  {
    nivel: 3,
    nombre: 'Benefactores',
    resumen: 'Quienes lo hacen posible',
    descripcion:
      'Donantes que sostienen económicamente el proyecto y garantizan su impacto social y ambiental a largo plazo en el Valle del Cauca.',
    participa: 'Conviértete en benefactor a través de tu donación.',
    icono: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    escala: 1,
    glow: 'rgba(255,41,0,0.4)',
  },
];

/**
 * Estructura jerárquica de participación: Asociados → Aliados → Benefactores.
 * Presenta los tres niveles como una escalera ascendente que desemboca en la donación.
 */
export const EstructuraApoyoSection: React.FC = () => {
  return (
    <section className="section bg-transparent relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionTitle
          titulo="Formas de hacer parte"
          subtitulo="Hay muchas maneras de sumarte a Cali Enamora. Cada nivel de participación fortalece el proyecto."
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        <div className="mx-auto flex max-w-5xl flex-col items-stretch gap-5 lg:flex-row lg:items-end">
          {niveles.map((n, i) => (
            <motion.div
              key={n.nombre}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="spotlight-card relative flex flex-1 flex-col rounded-3xl p-7"
              style={{
                background: 'rgba(10, 22, 54, 0.55)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 0 60px ${n.glow}`,
                // Escalonado visual ascendente en desktop.
                transformOrigin: 'bottom',
              }}
            >
              {/* Número de nivel */}
              <span
                className="absolute right-5 top-5 text-5xl font-black leading-none text-white/10"
                aria-hidden
              >
                {n.nivel}
              </span>

              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-brand-orange"
                style={{ background: 'rgba(255,41,0,0.14)' }}
              >
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d={n.icono} />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white">{n.nombre}</h3>
              <p className="text-gradient-brand mt-0.5 text-sm font-semibold">{n.resumen}</p>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-white">{n.descripcion}</p>

              <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-white">
                {n.participa}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#donar"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 41, 0,0.95), rgba(204, 33, 0,0.95))',
              boxShadow: '0 10px 34px rgba(255, 41, 0,0.28)',
            }}
          >
            Quiero ser benefactor
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EstructuraApoyoSection;

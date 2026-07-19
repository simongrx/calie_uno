'use client';

import React, { useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
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
    glow: 'rgba(255,41,0,0.4)',
  },
];

type Nivel = (typeof niveles)[number];

// Sub-tramo de scroll [inicio, fin] en el que se revela cada nivel.
const REVEAL: [number, number][] = [
  [0.05, 0.25],
  [0.33, 0.53],
  [0.61, 0.81],
];

const cardStyle = (glow: string): React.CSSProperties => ({
  background: 'rgba(10, 22, 54, 0.55)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: `0 8px 32px rgba(0,0,0,0.35), inset 0 0 60px ${glow}`,
  transformOrigin: 'bottom',
});

/* Contenido visual de una card de nivel (compartido por pinned y estático). */
function NivelCardContent({ n }: { n: Nivel }) {
  return (
    <>
      <span className="absolute right-5 top-5 text-5xl font-black leading-none text-white/10" aria-hidden>
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
      <p className="mt-5 border-t border-white/10 pt-4 text-sm font-medium text-white">{n.participa}</p>
    </>
  );
}

function CtaBenefactor() {
  return (
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
  );
}

/* Card de nivel que aparece (pop) cuando el scroll cruza su umbral. */
function PinnedNivelCard({ n, revealed }: { n: Nivel; revealed: boolean }) {
  return (
    <motion.div
      className="flex flex-1"
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 60, scale: revealed ? 1 : 0.92 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="spotlight-card relative flex w-full flex-col rounded-3xl p-7"
        style={cardStyle(n.glow)}
      >
        <NivelCardContent n={n} />
      </div>
    </motion.div>
  );
}

/* Punto de progreso (uno por nivel). */
function ProgressDot({ active }: { active: boolean }) {
  return (
    <motion.span
      className="block size-2.5 rounded-full"
      animate={{ scale: active ? 1.3 : 1, backgroundColor: active ? '#FF2900' : 'rgba(255,255,255,0.25)' }}
      transition={{ duration: 0.3 }}
    />
  );
}

/* Versión desktop pinned: los 3 niveles se construyen uno a uno al hacer scroll. */
function EstructuraPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // La línea conectora (transform) sí es fiable ligada a scroll.
  const lineScaleX = useTransform(progress, [0.05, 0.85], [0, 1]);

  // El revelado de cards se maneja por estado discreto (el opacity ligado a scroll
  // no actualiza de forma fiable en esta versión de framer; `animate` sí).
  const [step, setStep] = useState(-1);
  const [showCta, setShowCta] = useState(false);
  useMotionValueEvent(progress, 'change', (p) => {
    let s = -1;
    REVEAL.forEach(([a], i) => {
      if (p >= a + 0.03) s = i;
    });
    setStep((prev) => (prev === s ? prev : s));
    const cta = p >= 0.84;
    setShowCta((prev) => (prev === cta ? prev : cta));
  });

  return (
    <section ref={sectionRef} className="relative hidden lg:block" style={{ height: '300vh' }}>
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden">
        <div className="container-custom relative z-10 w-full py-20">
          <SectionTitle
            titulo="Formas de hacer parte"
            subtitulo="Hay muchas maneras de sumarte a Cali Enamora. Cada nivel de participación fortalece el proyecto."
            alineacion="center"
            conLinea={true}
            className="mb-14"
          />

          <div className="relative mx-auto max-w-5xl">
            {/* Línea conectora que se dibuja */}
            <motion.div
              aria-hidden
              className="absolute inset-x-0 bottom-3 h-px origin-left"
              style={{
                scaleX: lineScaleX,
                background: 'linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,41,0,0.6))',
              }}
            />
            <div className="flex items-end gap-5">
              {niveles.map((n, i) => (
                <PinnedNivelCard key={n.nombre} n={n} revealed={i <= step} />
              ))}
            </div>
          </div>

          {/* Progreso + CTA */}
          <div className="mt-10 flex flex-col items-center gap-6">
            <div className="flex items-center gap-2.5">
              {niveles.map((n, i) => (
                <ProgressDot key={n.nombre} active={i <= step} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: showCta ? 1 : 0, y: showCta ? 0 : 24 }}
              transition={{ duration: 0.5 }}
            >
              <CtaBenefactor />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Versión estática apilada (móvil y reduced-motion). */
function EstructuraStatic({ className = '' }: { className?: string }) {
  return (
    <section className={`section bg-transparent relative overflow-hidden ${className}`}>
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
              style={cardStyle(n.glow)}
            >
              <NivelCardContent n={n} />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <CtaBenefactor />
        </div>
      </div>
    </section>
  );
}

/**
 * Estructura jerárquica de participación: Asociados → Aliados → Benefactores.
 * En desktop es un "momento" pinned donde los tres niveles se construyen uno a uno
 * al hacer scroll; en móvil / reduced-motion cae a la versión estática apilada.
 */
export const EstructuraApoyoSection: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  return (
    <>
      {!reduced && <EstructuraPinned />}
      <EstructuraStatic className={reduced ? '' : 'lg:hidden'} />
    </>
  );
};

export default EstructuraApoyoSection;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import {
  ContainerScroll,
  ContainerSticky,
  useContainerScrollContext,
} from '@/components/ui/process-timeline';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

// Hitos del origen de Cali-e (placeholder editable).
const hitos = [
  {
    anio: '2021',
    titulo: 'Una idea que enamora',
    texto:
      'Un grupo de vallecaucanos apasionados por su tierra se propone mostrar el Valle del Cauca desde una mirada distinta: auténtica, sostenible y con las comunidades en el centro.',
  },
  {
    anio: '2022',
    titulo: 'De la idea a la corporación',
    texto:
      'Nace formalmente Cali Enamora como corporación ciudadana, articulando aliados públicos, privados y académicos alrededor de cuatro pilares.',
  },
  {
    anio: '2023',
    titulo: 'Primeras rutas y experiencias',
    texto:
      'Diseñamos las primeras rutas experienciales junto a guías locales, restaurantes y gestores culturales, generando empleo e ingresos en el territorio.',
  },
  {
    anio: 'Hoy',
    titulo: 'Un movimiento en crecimiento',
    texto:
      'Cali Enamora es una plataforma viva que conecta viajeros, comunidades y benefactores para seguir transformando el turismo de la región.',
  },
];

type Hito = (typeof hitos)[number];

const TITULO = 'Cómo nació Cali Enamora';
const SUBTITULO =
  'La historia de un proyecto que convierte el amor por el Valle del Cauca en oportunidades reales';

/* Contenido de una tarjeta de hito (compartido por pinned y carrusel). */
function HitoCard({ hito }: { hito: Hito }) {
  return (
    <div className="spotlight-card h-full rounded-2xl p-6" style={glassCard}>
      <span className="text-gradient-brand text-sm font-extrabold uppercase tracking-wide">
        {hito.anio}
      </span>
      <h3 className="mt-1 text-lg font-bold text-white">{hito.titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white">{hito.texto}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Riel horizontal: se desplaza con el scroll dentro de la sección    */
/* fija (pinned). Sólo transforms ligados a scroll (fiables); el hito */
/* activo se resuelve con estado discreto.                            */
/* ---------------------------------------------------------------- */
function OrigenTrack() {
  const { scrollYProgress } = useContainerScrollContext();
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxShift, setMaxShift] = useState(0);
  const [active, setActive] = useState(0);

  // Cuánto hay que desplazar el riel para que se vea completo.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      setMaxShift(Math.max(0, el.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const xRaw = useTransform(scrollYProgress, [0.1, 0.92], [0, -maxShift]);
  const x = useSpring(xRaw, { stiffness: 120, damping: 30, mass: 0.4 });

  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.92], [0, 1]);
  const barScaleX = useTransform(scrollYProgress, [0.1, 0.92], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const t = (p - 0.1) / (0.92 - 0.1);
    const i = Math.min(hitos.length - 1, Math.max(0, Math.floor(t * hitos.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  return (
    <div className="relative flex h-full flex-col justify-center">
      <div className="container-custom">
        <SectionTitle
          titulo={TITULO}
          subtitulo={SUBTITULO}
          alineacion="center"
          conLinea={true}
          className="mb-12"
        />
      </div>

      {/* Riel */}
      <motion.div
        ref={trackRef}
        style={{ x }}
        className="relative flex w-max items-center gap-10 px-[12vw] will-change-transform"
      >
        {/* Línea conectora que se dibuja */}
        <motion.div
          aria-hidden
          className="absolute inset-x-[12vw] top-1/2 h-px origin-left"
          style={{
            scaleX: lineScaleX,
            background: 'linear-gradient(90deg, rgba(255,41,0,0.6), rgba(255,255,255,0.08))',
          }}
        />

        {hitos.map((hito, i) => (
          <motion.div
            key={hito.anio}
            className="relative w-[min(80vw,460px)] shrink-0"
            animate={{
              scale: active === i ? 1 : 0.94,
              opacity: active === i ? 1 : 0.6,
            }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Punto sobre la línea */}
            <motion.span
              aria-hidden
              className="absolute -top-[7px] left-8 h-3.5 w-3.5 rounded-full border-2 border-white/30"
              animate={{
                backgroundColor: active === i ? '#ff2900' : 'rgba(255,255,255,0.25)',
                boxShadow: active === i ? '0 0 14px rgba(255,41,0,0.6)' : '0 0 0 rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.35 }}
            />
            <div className="pt-8">
              <HitoCard hito={hito} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Progreso */}
      <div className="container-custom mt-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 overflow-hidden bg-white/15">
            <motion.div
              style={{ scaleX: barScaleX, transformOrigin: 'left' }}
              className="h-full w-full bg-brand-orange"
            />
          </div>
          <span className="font-mono text-sm tabular-nums text-white/70">
            {String(active + 1).padStart(2, '0')} / {String(hitos.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}

/* Versión desktop: sección alta + stage fijo con el riel horizontal. */
function OrigenPinned() {
  return (
    <ContainerScroll className="relative hidden h-[280vh] lg:block">
      <ContainerSticky className="h-screen">
        <OrigenTrack />
      </ContainerSticky>
    </ContainerScroll>
  );
}

/* Versión móvil / reduced-motion: carrusel horizontal con scroll-snap. */
function OrigenCarousel({ className = '' }: { className?: string }) {
  return (
    <section className={`section bg-transparent ${className}`}>
      <div className="container-custom">
        <SectionTitle
          titulo={TITULO}
          subtitulo={SUBTITULO}
          alineacion="center"
          conLinea={true}
          className="mb-10"
        />
      </div>

      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-85vw)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Hitos de Cali Enamora"
      >
        {hitos.map((hito) => (
          <li key={hito.anio} className="w-[80vw] shrink-0 snap-center">
            <HitoCard hito={hito} />
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * "Cómo nació Cali-e" — timeline horizontal. En desktop la sección queda fija
 * y el riel se desplaza lateralmente con el scroll; en móvil / reduced-motion
 * cae a un carrusel con scroll-snap.
 */
export const OrigenSection: React.FC = () => {
  const reduced = useReducedMotion() ?? false;
  return (
    <>
      {!reduced && <OrigenPinned />}
      <OrigenCarousel className={reduced ? '' : 'lg:hidden'} />
    </>
  );
};

export default OrigenSection;

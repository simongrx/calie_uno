'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useTransform, useMotionValueEvent, LayoutGroup, type MotionValue } from 'framer-motion';
import {
  ContainerScroll,
  ContainerSticky,
  useContainerScrollContext,
} from '@/components/ui/process-timeline';
import { ImageTrail } from '@/components/ui/image-trail';

const PHRASE =
  'Nuestro valle es un mapa de sabores que se baila con el paladar y se vive en experiencias inolvidables.';

// Palabras clave que sobreviven al desvanecido y forman el título.
const KEY_SABORES = 6; // "sabores"
const KEY_EXPERIENCIAS = 17; // "experiencias"

const words = PHRASE.split(' ');

// Imágenes del trail (mezcla de galería + restaurantes; existen en public/images).
const trailImages = [
  '/images/galeria/gastronomia/foto-1.webp',
  '/images/restaurantes/restaurante-1.webp',
  '/images/galeria/gastronomia/foto-3.webp',
  '/images/galeria/cultura/foto-2.webp',
  '/images/restaurantes/restaurante-3.webp',
  '/images/galeria/naturaleza/foto-1.webp',
  '/images/galeria/gastronomia/foto-5.webp',
  '/images/restaurantes/restaurante-2.webp',
  '/images/galeria/bienestar/foto-2.webp',
  '/images/galeria/gastronomia/foto-2.webp',
  '/images/galeria/cultura/foto-4.webp',
  '/images/restaurantes/restaurante-4.webp',
];

const tituloFont: React.CSSProperties = {
  fontFamily: "'CaliEnamora', cursive",
  fontWeight: 400,
  lineHeight: 1.02,
  letterSpacing: '-0.01em',
};

function Word({
  children,
  opacity,
}: {
  children: React.ReactNode;
  opacity: MotionValue<number>;
}) {
  return (
    <motion.span style={{ opacity, display: 'inline-block' }} className="mx-[0.14em]">
      {children}
    </motion.span>
  );
}

function Stage({ stageRef }: { stageRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress: p } = useContainerScrollContext();

  // Fase 1 portada → Fase 2 desvanecer no-clave + poner rojas las clave.
  const nonKeyOpacity = useTransform(p, [0.12, 0.4], [1, 0]);
  const keyColor = useTransform(p, [0.12, 0.32], ['#ffffff', '#FF2900']);

  // Morph (disparado) y botón.
  const [morphed, setMorphed] = useState(false);
  const [showCta, setShowCta] = useState(false);
  useMotionValueEvent(p, 'change', (v) => {
    setMorphed(v > 0.48);
    setShowCta(v > 0.62);
  });

  return (
    <div className="absolute inset-0">
      {/* Trail de imágenes (sigue el cursor) — detrás del texto */}
      <div className="absolute inset-0 z-0">
        <ImageTrail containerRef={stageRef} interval={90} rotationRange={18}>
          {trailImages.map((src, i) => (
            <div
              key={i}
              className="h-24 w-28 overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl sm:h-28 sm:w-36"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
            </div>
          ))}
        </ImageTrail>
      </div>

      {/* Texto centrado: frase → título */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-10 px-6 text-center">
        <LayoutGroup>
          {!morphed ? (
            <div
              className="max-w-5xl text-white"
              style={{ ...tituloFont, fontSize: 'clamp(1.6rem, 3.4vw, 3rem)' }}
            >
              {words.map((w, i) => {
                if (i === KEY_SABORES || i === KEY_EXPERIENCIAS) {
                  return (
                    <motion.span
                      key={i}
                      layout
                      layoutId={i === KEY_SABORES ? 'w-sabores' : 'w-experiencias'}
                      style={{ color: keyColor, display: 'inline-block' }}
                      className="mx-[0.14em]"
                      transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
                    >
                      {w}
                    </motion.span>
                  );
                }
                return (
                  <Word key={i} opacity={nonKeyOpacity}>
                    {w}
                  </Word>
                );
              })}
            </div>
          ) : (
            <div
              className="flex flex-wrap items-center justify-center gap-x-[0.28em] uppercase text-brand-orange"
              style={{ ...tituloFont, fontSize: 'clamp(3rem, 9vw, 8rem)' }}
            >
              <motion.span
                layout
                layoutId="w-sabores"
                style={{ display: 'inline-block' }}
                transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
              >
                sabores
              </motion.span>
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="text-white"
                style={{ display: 'inline-block' }}
              >
                y
              </motion.span>
              <motion.span
                layout
                layoutId="w-experiencias"
                style={{ display: 'inline-block' }}
                transition={{ layout: { duration: 0.6, ease: 'easeInOut' } }}
              >
                experiencias
              </motion.span>
            </div>
          )}
        </LayoutGroup>

        {/* Descripción breve bajo el título (entra junto al CTA) */}
        <motion.p
          initial={false}
          animate={showCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: showCta ? 0.08 : 0 }}
          className="-mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/80 sm:text-base"
        >
          Del fogón de leña a la cocina de autor: restaurantes, mercados y planes
          que se saborean y se recuerdan.
        </motion.p>

        {/* Botón CTA (aparece cuando el título ya está formado) */}
        <motion.div
          initial={false}
          animate={showCta ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={showCta ? 'pointer-events-auto' : 'pointer-events-none'}
        >
          <Link
            href="/sabores"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 41, 0,0.95), rgba(204, 33, 0,0.95))',
              boxShadow: '0 12px 34px rgba(255, 41, 0,0.3)',
            }}
          >
            Descubrir más
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export const SaboresExperienciasHero: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <ContainerScroll id="sabores-hero" className="relative h-[380vh] bg-transparent">
      <ContainerSticky ref={stageRef} className="h-screen">
        <Stage stageRef={stageRef} />
      </ContainerSticky>
    </ContainerScroll>
  );
};

export default SaboresExperienciasHero;

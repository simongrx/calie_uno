'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { PilarType } from '@/types';
import { ScrollFloatText } from '@/components/ui/scroll-float-text';
import {
  ContainerScroll,
  ContainerSticky,
  useContainerScrollContext,
} from '@/components/ui/process-timeline';
import { SegmentCTA, type SegmentAccion } from '@/components/ui/SegmentCTA';

interface PilarInfo {
  id: PilarType;
  nombre: string;
  descripcion: string;
  stat: string;
  imagen: string;
  gradient: string;
  glow: string;
}

const pilares: PilarInfo[] = [
  {
    id: 'cultura',
    nombre: 'Cultura',
    descripcion:
      'Museos, galerías, arquitectura colonial y eventos que celebran la identidad viva del Valle del Cauca.',
    stat: '50+ eventos',
    imagen: '/images/pilares/cultura.png',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
    glow: 'rgba(139, 92, 246, 0.5)',
  },
  {
    id: 'naturaleza',
    nombre: 'Naturaleza',
    descripcion:
      'Paisajes, cascadas y rutas ecológicas en plena biodiversidad del suroccidente colombiano.',
    stat: '15 rutas',
    imagen: '/images/pilares/naturaleza.webp',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
    glow: 'rgba(16, 185, 129, 0.5)',
  },
  {
    id: 'gastronomia',
    nombre: 'Gastronomía',
    descripcion:
      'Sabores auténticos del Pacífico en restaurantes, mercados y cocinas tradicionales locales.',
    stat: '45 restaurantes',
    imagen: '/images/pilares/gastronomia.jpg',
    gradient: 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
    glow: 'rgba(239, 68, 68, 0.5)',
  },
  {
    id: 'bienestar',
    nombre: 'Bienestar',
    descripcion:
      'Yoga, meditación, termales y experiencias de bienestar integral para reconectar cuerpo y mente.',
    stat: '20+ opciones',
    imagen: '/images/pilares/bienestar.jpg',
    gradient: 'linear-gradient(135deg, #06B6D4 0%, #0E7490 100%)',
    glow: 'rgba(6, 182, 212, 0.5)',
  },
];

interface PilaresSectionProps {
  ctaTitulo?: string;
  ctaSubtitulo?: string;
  ctaAcciones?: SegmentAccion[];
}

const DEFAULT_CTA: Required<PilaresSectionProps> = {
  ctaTitulo: '¿Cómo quieres vivirlo?',
  ctaSubtitulo:
    'Elige tu camino: descubre el Valle como viajero o súmate al movimiento que lo hace posible.',
  ctaAcciones: [
    { label: 'Quiero ser turista', href: '/turista', variante: 'primary', descripcion: 'Rutas, sabores, eventos y más' },
    { label: 'Quiero hacer parte', href: '/corporativa', variante: 'ghost', descripcion: 'Asóciate, alíate o dona' },
  ],
};

function PilarCard({
  pilar,
  index,
  y,
}: {
  pilar: PilarInfo;
  index: number;
  y: MotionValue<string>;
}) {
  return (
    <motion.div
      style={{ y, zIndex: 10 + index, boxShadow: `0 30px 80px -24px ${pilar.glow}` }}
      className="absolute inset-0 overflow-hidden rounded-[1.75rem] border border-white/12 will-change-transform"
    >
      <Image
        src={pilar.imagen}
        alt={pilar.nombre}
        fill
        sizes="(max-width: 768px) 92vw, 46vw"
        className="object-cover"
      />
      {/* Degradado para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636]/94 via-[#0A1636]/45 to-[#0A1636]/20" />

      {/* Número */}
      <span
        className="absolute left-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundImage: pilar.gradient }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Contenido inferior */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-7">
        <h3
          className="text-white"
          style={{
            fontFamily: "'CaliEnamora', cursive",
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
            lineHeight: 0.9,
          }}
        >
          <ScrollFloatText text={pilar.nombre} className="ce-title-playful" />
        </h3>
        <p
          className="max-w-md text-sm leading-relaxed text-white sm:text-base"
          style={{ fontFamily: "'Stack Sans Text', sans-serif" }}
        >
          {pilar.descripcion}
        </p>
        <span className="w-fit rounded-full bg-white/14 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm sm:text-sm">
          {pilar.stat}
        </span>
      </div>
    </motion.div>
  );
}

function StageInner({ cta }: { cta: Required<PilaresSectionProps> }) {
  const { scrollYProgress: rawP } = useContainerScrollContext();

  // REVEAL: el stage entra desde la derecha sobre el intro fijo (primer tramo).
  const enterX = useTransform(rawP, [0, 0.1], ['100%', '0%']);

  // REMAP: las fases internas arrancan en 0 justo al terminar el reveal (~solape 100vh
  // sobre rango 800vh ≈ 0.125). Así internalP=0 = portada exacta (nítido, sin cards).
  const p = useTransform(rawP, [0.14, 1], [0, 1]);

  // Video: nítido en portada → blur al entrar cards → nítido de nuevo en la CTA.
  const videoFilter = useTransform(
    p,
    [0.18, 0.32, 0.86, 0.94],
    ['blur(0px)', 'blur(14px)', 'blur(14px)', 'blur(0px)']
  );
  const videoScale = useTransform(p, [0.18, 0.32, 0.86, 0.94], [1, 1.06, 1.06, 1]);
  const overlayOpacity = useTransform(p, [0.18, 0.32, 0.86, 0.94], [0.12, 0.5, 0.5, 0.3]);

  // Título de pilares: del centro a la izquierda (grande), persiste hasta el outro.
  const titleX = useTransform(p, [0.18, 0.32], ['0vw', '-26vw']);
  const titleOpacity = useTransform(p, [0.78, 0.86], [1, 0]);

  // Cards: suben desde abajo en su sub-rango; reposo con desfase por índice (pila).
  const rest = (i: number) => `${(i - (pilares.length - 1)) * 5}%`; // card0 más arriba, última centrada
  const cardY0 = useTransform(p, [0.22, 0.33], ['150%', rest(0)]);
  const cardY1 = useTransform(p, [0.37, 0.48], ['150%', rest(1)]);
  const cardY2 = useTransform(p, [0.52, 0.63], ['150%', rest(2)]);
  const cardY3 = useTransform(p, [0.66, 0.77], ['150%', rest(3)]);
  const cardsY = [cardY0, cardY1, cardY2, cardY3];
  // Cards y título desaparecen del todo (0.86) ANTES de que entre la CTA (0.88).
  const cardsOpacity = useTransform(p, [0.78, 0.86], [1, 0]);

  // CTA: fade-in al final (tras 0.86) sobre el video nítido → sin traslape con cards.
  const ctaOpacity = useTransform(p, [0.88, 0.97], [0, 1]);
  const ctaPointer = useTransform(ctaOpacity, (o) => (o > 0.6 ? 'auto' : 'none'));

  return (
    <motion.div style={{ x: enterX }} className="absolute inset-0 will-change-transform">
      {/* Video de fondo */}
      <motion.video
        style={{ filter: videoFilter, scale: videoScale }}
        className="absolute inset-0 z-0 h-full w-full object-cover will-change-transform"
        src="/videos/pilares-web.mp4"
        poster="/images/pilares/poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* Oscurecido */}
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 z-[1] bg-[#0A1636]" />

      {/* Título de pilares (centro → izquierda) */}
      <motion.div
        style={{ opacity: titleOpacity }}
        className="pointer-events-none absolute inset-0 z-[5] flex items-center justify-center px-6 sm:px-10"
      >
        <motion.div style={{ x: titleX }} className="text-left">
          <h2
            className="text-white"
            style={{
              fontFamily: "'CaliEnamora', cursive",
              fontWeight: 400,
              fontSize: 'clamp(2.6rem, 10vw, 8.5rem)',
              lineHeight: 0.74,
              marginBottom: 0,
            }}
          >
            <ScrollFloatText text="Nuestros Pilares" className="ce-title-playful" />
          </h2>
          {/* mx-auto: el logo es display:block, así queda centrado respecto al <h2> */}
          <Image
            src="/recursos/logotipo-negativo-corazon.svg"
            alt="Cali Enamora"
            width={296}
            height={247}
            className="mt-3 h-auto w-[clamp(11rem,26vw,22rem)] mx-auto"
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* Cards (suben desde abajo, apiladas a la derecha) */}
      <motion.div
        style={{ opacity: cardsOpacity }}
        className="absolute inset-0 z-[10] flex items-center justify-center px-4 sm:justify-end sm:px-10 md:pr-16"
      >
        <div className="relative h-[60vh] w-[92vw] max-w-[640px] sm:w-[46vw]">
          {pilares.map((pilar, i) => (
            <PilarCard key={pilar.id} pilar={pilar} index={i} y={cardsY[i]} />
          ))}
        </div>
      </motion.div>

      {/* CTA final (fade-in sobre video nítido) */}
      <motion.div
        style={{ opacity: ctaOpacity, pointerEvents: ctaPointer }}
        className="absolute inset-0 z-[20] flex items-center justify-center"
      >
        <SegmentCTA
          titulo={cta.ctaTitulo}
          subtitulo={cta.ctaSubtitulo}
          acciones={cta.ctaAcciones}
          tituloColorClass="text-white"
          tituloFontSize="clamp(3rem, 8vw, 6rem)"
          conFondo
        />
      </motion.div>
    </motion.div>
  );
}

export const PilaresSection: React.FC<PilaresSectionProps> = (props) => {
  const cta: Required<PilaresSectionProps> = {
    ctaTitulo: props.ctaTitulo ?? DEFAULT_CTA.ctaTitulo,
    ctaSubtitulo: props.ctaSubtitulo ?? DEFAULT_CTA.ctaSubtitulo,
    ctaAcciones: props.ctaAcciones ?? DEFAULT_CTA.ctaAcciones,
  };
  return (
    <ContainerScroll id="pilares" className="relative z-10 h-[900vh] -mt-[100vh] bg-transparent">
      <ContainerSticky className="h-screen">
        <StageInner cta={cta} />
      </ContainerSticky>
    </ContainerScroll>
  );
};

export default PilaresSection;

'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion';
import { Clock, MapPin, Route as RouteIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SweepButton } from '@/components/ui/sweep-button';
import { RutasWebGLOverlay } from '@/components/ui/rutas-webgl-overlay';

export interface PilarInfo {
  id: string;
  label: string;
  img: string;
  color: string;
  nombre: string;
  descripcion: string;
  meta: string[];
  href: string;
}

const META_ICON = [Clock, MapPin, RouteIcon];

/* Capa de imagen full-bleed con crossfade + Ken Burns (zoom/parallax) por scroll. */
function ImageLayer({
  index,
  total,
  progress,
  pilar,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  pilar: PilarInfo;
}) {
  const seg = 1 / total;
  const s = index * seg;
  const opacity = useTransform(
    progress,
    [s - 0.07, s + 0.03, s + seg - 0.03, s + seg + 0.07],
    [0, 1, 1, 0]
  );
  const scale = useTransform(progress, [s - 0.07, s + seg + 0.07], [1.2, 1.02]);
  const y = useTransform(progress, [s - 0.07, s + seg + 0.07], ['-3%', '3%']);

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale, y }} className="absolute inset-0 will-change-transform">
        <Image
          src={pilar.img}
          alt={pilar.nombre}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* Info contenida dentro de la imagen, con reveal por scroll. */
function InfoLayer({
  index,
  total,
  progress,
  pilar,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  pilar: PilarInfo;
}) {
  const seg = 1 / total;
  const s = index * seg;
  const opacity = useTransform(
    progress,
    [s + 0.005, s + 0.05, s + seg - 0.06, s + seg - 0.005],
    [0, 1, 1, 0]
  );
  const y = useTransform(progress, [s, s + 0.07], [56, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
    >
      <div className="container-custom pb-28 sm:pb-32">
        <span
          className="mb-4 inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold text-white"
          style={{ background: `${pilar.color}33`, border: `1px solid ${pilar.color}99` }}
        >
          {pilar.label}
        </span>
        <h2 className="mb-0 max-w-3xl text-4xl text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-6xl xl:text-[72px] xl:leading-[1.02]">
          {pilar.nombre}
        </h2>
        <p className="mt-4 max-w-xl text-base text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-lg">
          {pilar.descripcion}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-base text-white/75">
          {pilar.meta.map((m, i) => {
            const Icon = META_ICON[i % META_ICON.length];
            return (
              <span key={m} className="inline-flex items-center gap-1.5">
                <Icon aria-hidden className="size-5" style={{ color: pilar.color }} />
                {m}
              </span>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export function RutasScrollHero({ pilares }: { pilares: PilarInfo[] }) {
  const total = pilares.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(p * total)));
    setActive((prev) => (prev === i ? prev : i));
  });

  const barScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const handleSelect = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: Math.max(0, top + ((i + 0.5) / total) * range), behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 sm:-mt-24"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#0A1636]">
        {/* Imágenes full-bleed */}
        {pilares.map((p, i) => (
          <ImageLayer key={p.id} index={i} total={total} progress={scrollYProgress} pilar={p} />
        ))}

        {/* Gradado para legibilidad + profundidad */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A1636] via-[#0A1636]/30 to-[#0A1636]/55" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: 'inset 0 0 220px 60px rgba(0,0,0,0.55)' }}
        />

        {/* Shader WebGL (luz reactiva al scroll) */}
        <RutasWebGLOverlay className="pointer-events-none absolute inset-0 h-full w-full opacity-60 mix-blend-screen" />

        {/* Grano */}
        <div className="ce-grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" />

        {/* Nav superior: eyebrow + pestañas + barra de progreso */}
        <div className="absolute inset-x-0 top-0 z-30">
          <div className="container-custom flex flex-col gap-4 pt-24 sm:pt-28">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
              Rutas por pilar
            </span>
            <div className="flex flex-wrap gap-2">
              {pilares.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(i)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-semibold backdrop-blur transition-colors',
                    active === i
                      ? 'text-white'
                      : 'border-white/15 bg-white/5 text-white/70 hover:text-white'
                  )}
                  style={
                    active === i
                      ? { borderColor: `${p.color}aa`, background: `${p.color}26` }
                      : undefined
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="h-0.5 w-full max-w-xs overflow-hidden rounded-full bg-white/15">
              <motion.div
                style={{ scaleX: barScaleX, transformOrigin: 'left' }}
                className="h-full w-full bg-brand-orange"
              />
            </div>
          </div>
        </div>

        {/* Info dentro de la imagen (cambia por pilar) */}
        {pilares.map((p, i) => (
          <InfoLayer key={p.id} index={i} total={total} progress={scrollYProgress} pilar={p} />
        ))}

        {/* CTA persistente */}
        <div className="absolute inset-x-0 bottom-0 z-30">
          <div className="container-custom flex items-center justify-between pb-9 sm:pb-12">
            <span className="hidden text-sm text-white/55 sm:block">
              {active + 1} / {total} · {pilares[active]?.label}
            </span>
            <SweepButton href="/rutas">Ver todas las rutas</SweepButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RutasScrollHero;

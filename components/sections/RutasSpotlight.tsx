'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface RutaSpotlightItem {
  id: string;
  nombre: string;
  descripcionCorta: string;
  imagenUrl: string;
  pilar: string;
}

export interface RutasSpotlightProps {
  /** Frase grande de la primera pantalla (antes del scroll). */
  intro: React.ReactNode;
  /** Subtítulo fijo, siempre visible durante el recorrido. */
  eyebrow?: string;
  rutas: RutaSpotlightItem[];
  className?: string;
}

const EYEBROW_DEFAULT = 'Rutas que enamoran';
const AUTOPLAY_MS = 2500;

const PILAR_COLOR: Record<string, string> = {
  cultura: '#8B5CF6',
  naturaleza: '#10B981',
  gastronomia: '#EF4444',
  bienestar: '#06B6D4',
};
const PILAR_LABEL: Record<string, string> = {
  cultura: 'Cultura',
  naturaleza: 'Naturaleza',
  gastronomia: 'Gastronomía',
  bienestar: 'Bienestar',
};
const pilarColor = (p: string) => PILAR_COLOR[p] ?? '#FF2900';
const pilarLabel = (p: string) => PILAR_LABEL[p] ?? p;
const pad2 = (n: number) => String(n).padStart(2, '0');

// Divide "Ruta Histórica del Centro" -> { top: 'Ruta', rest: 'Histórica del Centro' }
function splitNombre(nombre: string) {
  const m = nombre.match(/^(rutas?)\s+(.+)$/i);
  return m ? { top: 'Rutas', rest: m[2] } : { top: 'Rutas', rest: nombre };
}

// Dimensiones de la tira de tarjetas (px).
const CARD_W = 210;
const CARD_GAP = 18;
const CARD_STEP = CARD_W + CARD_GAP;

const GRID_BG =
  'absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]';

const FONT_TTF = "'CaliEnamora', cursive";

/* Subtítulo fijo "RUTAS QUE ENAMORAN" — TTF de marca, en rojo, grande. */
function FixedEyebrow({ text }: { text: string }) {
  return (
    <span
      className="text-brand-orange"
      style={{ fontFamily: FONT_TTF, fontWeight: 400, fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', lineHeight: 1 }}
    >
      {text}
    </span>
  );
}

/* CTA llamativo hacia el módulo de todas las rutas. */
function AllRoutesCTA({ href = '/rutas' }: { href?: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-yellow px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-[#1a0d00] shadow-[0_0_28px_rgba(255,41,0,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,41,0,0.65)]"
    >
      Ver todas las rutas
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------------------------------------------------------------- */
/* Frase de entrada (pantalla 1). Se encoge/rota al hacer scroll y   */
/* el panel de rutas sube por encima revelándola.                    */
/* ---------------------------------------------------------------- */
function FraseIntro({
  progress,
  intro,
  reduced,
}: {
  progress: MotionValue<number>;
  intro: React.ReactNode;
  reduced: boolean;
}) {
  const scale = useTransform(progress, [0, 0.12], reduced ? [1, 1] : [1, 0.85]);
  const rotate = useTransform(progress, [0, 0.12], reduced ? [0, 0] : [0, -4]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1636] to-[#11204a] text-white"
    >
      <div className={GRID_BG} />
      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <p
          className="max-w-5xl text-balance text-3xl leading-[1.18] text-white sm:text-5xl 2xl:text-6xl"
          style={{ fontFamily: FONT_TTF, fontWeight: 400 }}
        >
          {intro}
        </p>
        <span className="mt-12 inline-flex animate-bounce flex-col items-center gap-1 text-sm font-semibold uppercase tracking-[0.3em] text-white">
          Desliza
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </div>
    </motion.section>
  );
}

/* Tarjeta individual de la tira (derecha). */
function StripCard({
  ruta,
  active,
  passed,
  onSelect,
}: {
  ruta: RutaSpotlightItem;
  active: boolean;
  passed: boolean;
  onSelect: () => void;
}) {
  const color = pilarColor(ruta.pilar);
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      aria-label={`Ver ${ruta.nombre}`}
      tabIndex={passed ? -1 : 0}
      className={cn(
        'group relative shrink-0 overflow-hidden rounded-2xl text-left ring-1 transition-all duration-500',
        passed
          ? 'pointer-events-none opacity-0'
          : active
            ? 'ring-2 ring-white/90 shadow-2xl'
            : 'ring-white/10 opacity-80 hover:opacity-100'
      )}
      style={{ width: CARD_W, aspectRatio: '3 / 4' }}
    >
      <Image
        src={ruta.imagenUrl}
        alt=""
        fill
        sizes="210px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
      {active && <span className="absolute left-0 top-0 h-full w-1" style={{ background: color }} />}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-white/70">
          {pilarLabel(ruta.pilar)}
        </span>
        <span className="block text-sm font-bold uppercase leading-tight text-white">{ruta.nombre}</span>
      </div>
    </button>
  );
}

/* ---------------------------------------------------------------- */
/* Panel dinámico (desktop): hero con autoplay cada 1.5s.            */
/* ---------------------------------------------------------------- */
function RoutesAuto({
  rutas,
  eyebrow,
  reduced,
}: {
  rutas: RutaSpotlightItem[];
  eyebrow: string;
  reduced: boolean;
}) {
  const total = rutas.length;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  // Autoplay: avanza de ruta estrictamente cada AUTOPLAY_MS. El intervalo NO
  // depende de `active` para no reiniciarse en cada tick (cadencia fija). Sólo
  // corre cuando la sección está en pantalla (y no en modo reduced-motion).
  useEffect(() => {
    if (reduced || !inView) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % total), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reduced, inView, total]);

  // Sólo animar cuando la sección está visible.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.35),
      { threshold: [0, 0.35, 0.7] }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  const goTo = (i: number) => setActive(((i % total) + total) % total);

  const ruta = rutas[active];
  const { top: titleTop, rest: titleRest } = splitNombre(ruta.nombre);
  const fade = reduced ? { duration: 0.15 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

  // Transición de salida (scroll-down): el panel se difumina hacia el navy antes
  // de Sabores. exitP=0 mientras el panel está en pantalla; →1 al salir por arriba.
  const { scrollYProgress: exitP } = useScroll({
    target: sectionRef,
    offset: ['end end', 'end start'],
  });
  const exitOpacity = useTransform(exitP, [0, 0.4, 1], [1, 1, 0]);
  const exitBlur = useTransform(
    exitP,
    [0.25, 1],
    reduced ? ['blur(0px)', 'blur(0px)'] : ['blur(0px)', 'blur(16px)']
  );

  return (
    <section ref={sectionRef} className="relative hidden h-screen lg:block">
      <motion.div
        style={{ opacity: exitOpacity, filter: exitBlur, willChange: 'opacity, filter' }}
        className="absolute inset-0 overflow-hidden rounded-t-[2.5rem] bg-[#06060e] ring-1 ring-white/10"
      >
        {/* Fondo full-bleed (crossfade + zoom sutil por ruta activa) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={ruta.id}
            initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={reduced ? { duration: 0.15 } : { duration: 0.6, ease: 'easeOut' }}
            className="absolute inset-0 will-change-transform"
            aria-hidden
          >
            <Image src={ruta.imagenUrl} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </AnimatePresence>

        {/* Overlays de legibilidad */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06060e]/80 via-transparent to-[#06060e]/40" />
        <div className="ce-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

        {/* Contenido */}
        <div className="container-custom relative z-10 h-full">
          {/* Fila superior: subtítulo fijo + botón de la ruta específica */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 pt-24 sm:pt-28">
            <FixedEyebrow text={eyebrow} />
            <Link
              href={`/rutas/${ruta.id}`}
              className="group inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/5 py-2 pl-2 pr-5 backdrop-blur transition-colors hover:bg-white/10"
            >
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange text-white transition-transform duration-300 group-hover:scale-110">
                <MapPin className="size-4" />
              </span>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
                Descubrir ruta
              </span>
            </Link>
          </div>

          {/* Bloque de texto (izquierda) — crossfade rápido por ruta activa */}
          <div className="absolute left-0 top-1/2 w-full max-w-2xl -translate-y-1/2">
            <span
              className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em]"
              style={{ color: pilarColor(ruta.pilar) }}
            >
              <span className="h-px w-8" style={{ background: pilarColor(ruta.pilar) }} />
              {pilarLabel(ruta.pilar)}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={ruta.id}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -14 }}
                transition={fade}
              >
                <span
                  className="block text-white/90"
                  style={{ fontFamily: FONT_TTF, fontSize: 'clamp(1.75rem, 3vw, 3rem)', lineHeight: 1 }}
                >
                  {titleTop}
                </span>
                <h2
                  className="mb-0 text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)]"
                  style={{ fontSize: 'clamp(3.5rem, 8.5vw, 9rem)', lineHeight: 0.9 }}
                >
                  {titleRest}
                </h2>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                  {ruta.descripcionCorta}
                </p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8">
              <AllRoutesCTA />
            </div>
          </div>

          {/* Tira de tarjetas (derecha) */}
          <div className="absolute left-[55%] right-[-40vw] top-[54%] z-20 -translate-y-1/2">
            <motion.div
              className="flex"
              style={{ gap: CARD_GAP }}
              animate={{ x: -active * CARD_STEP }}
              transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 140, damping: 24 }}
            >
              {rutas.map((r, i) => (
                <StripCard
                  key={r.id}
                  ruta={r}
                  active={active === i}
                  passed={i < active}
                  onSelect={() => goTo(i)}
                />
              ))}
            </motion.div>
          </div>

          {/* Barra inferior: flechas + progreso de autoplay + índice */}
          <div className="absolute inset-x-0 bottom-0 z-30 flex items-center gap-8 pb-10 sm:pb-14">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => goTo(active - 1)}
                aria-label="Ruta anterior"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(active + 1)}
                aria-label="Ruta siguiente"
                className="flex size-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>

            <div className="hidden h-px flex-1 overflow-hidden bg-white/20 sm:block">
              {reduced ? (
                <div
                  className="h-full bg-brand-orange"
                  style={{ width: `${((active + 1) / total) * 100}%` }}
                />
              ) : (
                <motion.div
                  key={active}
                  className="h-full w-full origin-left bg-brand-orange"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: !inView ? 0 : 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
                />
              )}
            </div>

            <div className="flex items-baseline gap-1 text-white">
              <span className="text-5xl font-light leading-none tabular-nums">{pad2(active + 1)}</span>
              <span className="text-sm text-white/50">/ {pad2(total)}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Fallback móvil: carrusel horizontal con scroll-snap.              */
/* ---------------------------------------------------------------- */
function RoutesCarousel({ rutas, eyebrow }: { rutas: RutaSpotlightItem[]; eyebrow: string }) {
  return (
    <section className="relative overflow-hidden rounded-t-[2rem] bg-[#06060e] py-14 ring-1 ring-white/10 lg:hidden">
      <div className="container-custom mb-6 flex flex-col gap-4">
        <FixedEyebrow text={eyebrow} />
        <AllRoutesCTA />
      </div>

      <ul
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[max(1rem,calc((100vw-85vw)/2))] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Rutas que enamoran"
      >
        {rutas.map((ruta) => {
          const color = pilarColor(ruta.pilar);
          const { top: titleTop, rest: titleRest } = splitNombre(ruta.nombre);
          return (
            <li
              key={ruta.id}
              className="relative aspect-[3/4] w-[80vw] shrink-0 snap-center overflow-hidden rounded-3xl ring-1 ring-white/10"
            >
              <Image src={ruta.imagenUrl} alt="" fill sizes="80vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <span className="absolute left-0 top-6 h-10 w-1" style={{ background: color }} />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/70">
                  {pilarLabel(ruta.pilar)}
                </span>
                <span className="block text-white/90" style={{ fontFamily: FONT_TTF, fontSize: '1.5rem', lineHeight: 1 }}>
                  {titleTop}
                </span>
                <h3
                  className="text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
                  style={{ fontFamily: FONT_TTF, fontSize: 'clamp(2.25rem, 11vw, 3.5rem)', lineHeight: 0.95, textTransform: 'uppercase' }}
                >
                  {titleRest}
                </h3>
                <p className="mt-2 text-sm text-white/85">{ruta.descripcionCorta}</p>
                <Link
                  href={`/rutas/${ruta.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-white"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-brand-orange">
                    <MapPin className="size-4" />
                  </span>
                  Descubrir
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Componente principal.                                             */
/* ---------------------------------------------------------------- */
export function RutasSpotlight({
  intro,
  eyebrow = EYEBROW_DEFAULT,
  rutas,
  className,
}: RutasSpotlightProps) {
  const reduced = useReducedMotion() ?? false;
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className={cn('relative', className)}>
      <FraseIntro progress={scrollYProgress} intro={intro} reduced={reduced} />
      <RoutesAuto rutas={rutas} eyebrow={eyebrow} reduced={reduced} />
      <RoutesCarousel rutas={rutas} eyebrow={eyebrow} />
    </div>
  );
}

export default RutasSpotlight;

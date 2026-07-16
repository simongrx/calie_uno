import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AnimatedMarqueeHeroProps {
  tagline?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  images: string[];
  className?: string;
}

const COL_COUNT = 4;
const COL_DURATIONS = ['34s', '28s', '40s', '30s'];

/**
 * Hero con un marquee de imágenes en columnas inclinadas que se desplazan en
 * vertical (sentidos alternos) como telón de fondo, y el contenido centrado
 * por encima. Adaptado a la marca Cali Enamora.
 */
export function AnimatedMarqueeHero({
  tagline,
  title,
  description,
  ctaText,
  ctaHref = '#',
  images,
  className,
}: AnimatedMarqueeHeroProps) {
  // Reparte las imágenes en columnas (round-robin).
  const columns: string[][] = Array.from({ length: COL_COUNT }, (_, c) =>
    images.filter((_, i) => i % COL_COUNT === c)
  );

  return (
    <section className={cn('relative w-full overflow-hidden', className)}>
      {/* ── Telón de fondo: marquee inclinado ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="flex gap-4 sm:gap-6 [transform:rotate(-10deg)_scale(1.4)]">
          {columns.map((col, ci) => {
            const items = [...col, ...col];
            return (
              <div
                key={ci}
                className="flex flex-col gap-4 sm:gap-6 animate-marquee-vcol"
                style={
                  {
                    '--duration': COL_DURATIONS[ci % COL_DURATIONS.length],
                    animationDirection: ci % 2 === 1 ? 'reverse' : 'normal',
                  } as React.CSSProperties
                }
              >
                {items.map((src, i) => (
                  <div
                    key={`${ci}-${i}`}
                    className="relative h-44 w-60 overflow-hidden rounded-2xl ring-1 ring-white/10 sm:h-56 sm:w-80"
                  >
                    <Image
                      src={src}
                      fill
                      sizes="(max-width: 640px) 240px, 320px"
                      className="object-cover"
                      alt=""
                    />
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Capa de oscurecido para legibilidad */}
      <div className="absolute inset-0 bg-[#0A1636]/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A1636] via-[#0A1636]/40 to-[#0A1636]" />

      {/* ── Contenido ── */}
      <div className="container-custom relative z-10 flex min-h-[92vh] flex-col items-center justify-center py-24 text-center">
        {tagline && (
          <span
            className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/85 sm:text-sm"
            style={{
              background: 'rgba(255, 41, 0, 0.18)',
              border: '1px solid rgba(255, 41, 0, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
            }}
          >
            ✦ {tagline}
          </span>
        )}

        <h2
          className="max-w-5xl text-balance text-brand-orange"
          style={{
            fontFamily: "'CaliEnamora', cursive",
            fontWeight: 400,
            fontSize: 'clamp(1.75rem, 5.5vw, 4.5rem)',
            lineHeight: 0.9,
          }}
        >
          {title}
        </h2>

        {description && (
          <p className="mt-6 max-w-2xl text-balance text-lg text-white sm:text-xl">
            {description}
          </p>
        )}

        {ctaText && (
          <div className="mt-9">
            <Link href={ctaHref} className="sweep-btn group/sweep">
              <span className="relative z-10 inline-flex items-center gap-2">
                {ctaText}
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover/sweep:translate-x-1" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default AnimatedMarqueeHero;

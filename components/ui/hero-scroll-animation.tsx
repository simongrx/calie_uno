'use client';

import { useScroll, useTransform, motion, type MotionValue } from 'framer-motion';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export interface HeroScrollItem {
  img: string;
  label: string;
  href: string;
}

export interface HeroScrollAnimationProps {
  /** Frase grande de la primera pantalla (antes del scroll). */
  intro: React.ReactNode;
  eyebrow?: string;
  /** Título de la segunda pantalla. */
  title: React.ReactNode;
  description?: React.ReactNode;
  items: HeroScrollItem[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const GRID_BG =
  'absolute inset-0 bg-[linear-gradient(to_right,#ffffff14_1px,transparent_1px),linear-gradient(to_bottom,#ffffff14_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]';

function IntroSection({
  scrollYProgress,
  intro,
}: {
  scrollYProgress: MotionValue<number>;
  intro: React.ReactNode;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0A1636] to-[#11204a] text-white"
    >
      <div className={GRID_BG} />
      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <p
          className="max-w-5xl text-balance text-3xl leading-[1.18] text-white sm:text-5xl 2xl:text-6xl"
          style={{ fontFamily: "'CaliEnamora', cursive", fontWeight: 400 }}
        >
          {intro}
        </p>
        <span className="mt-12 inline-flex animate-bounce flex-col items-center gap-1 text-sm font-semibold uppercase tracking-[0.3em] text-white/55">
          Desliza
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </div>
    </motion.section>
  );
}

function RutasSection({
  scrollYProgress,
  eyebrow,
  title,
  description,
  items,
  ctaText,
  ctaHref = '#',
}: {
  scrollYProgress: MotionValue<number>;
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  items: HeroScrollItem[];
  ctaText?: string;
  ctaHref?: string;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="relative min-h-screen overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-[#06060e] to-[#0A1636] text-white ring-1 ring-white/10"
    >
      <div className={GRID_BG} />
      <div className="container-custom relative z-10 flex min-h-screen flex-col justify-center py-20">
        {eyebrow && (
          <span className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-brand-orange">
            {eyebrow}
          </span>
        )}
        <h2 className="mb-4 max-w-4xl text-balance text-4xl text-white sm:text-5xl xl:text-6xl">
          {title}
        </h2>
        {description && (
          <p className="mb-10 max-w-2xl text-base text-white/65 sm:text-lg">{description}</p>
        )}

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10"
            >
              <Image
                src={item.img}
                alt={item.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <span className="absolute bottom-4 left-4 text-lg font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                {item.label}
              </span>
              <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white/10 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          ))}
        </div>

        {ctaText && (
          <div className="mt-10">
            <Link href={ctaHref} className="sweep-btn group/sweep">
              <span className="relative z-10 inline-flex items-center gap-2">
                {ctaText}
                <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover/sweep:translate-x-1" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
}

export function HeroScrollAnimation({
  intro,
  eyebrow,
  title,
  description,
  items,
  ctaText,
  ctaHref,
  className,
}: HeroScrollAnimationProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <div ref={container} className={`relative ${className ?? ''}`}>
      <IntroSection scrollYProgress={scrollYProgress} intro={intro} />
      <RutasSection
        scrollYProgress={scrollYProgress}
        eyebrow={eyebrow}
        title={title}
        description={description}
        items={items}
        ctaText={ctaText}
        ctaHref={ctaHref}
      />
    </div>
  );
}

export default HeroScrollAnimation;

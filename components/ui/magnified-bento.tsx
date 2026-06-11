'use client';

import React from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagnifiedBentoProps {
  title: string;
  description: string;
  rows: string[][];
  className?: string;
}

const PillIcon = ({ className }: { className?: string }) => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 17l6-6 4 4 7-8" />
    <path d="M14 7h6v6" />
  </svg>
);

/**
 * Bento con "lupa" arrastrable: filas de etiquetas se desplazan en bucle y,
 * bajo la lente, se revela una versión magnificada/resaltada (en rojo de marca).
 * Adaptado a framer-motion + SVG inline (sin @hugeicons) y al tema oscuro del sitio.
 */
export function MagnifiedBento({ title, description, rows, className }: MagnifiedBentoProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lensX = useMotionValue(0);
  const lensY = useMotionValue(0);

  const clipPath = useMotionTemplate`circle(32px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px))`;
  const inverseMask = useMotionTemplate`radial-gradient(circle 32px at calc(50% + ${lensX}px - 10px) calc(50% + ${lensY}px - 10px), transparent 100%, black 100%)`;

  const renderRows = (reveal: boolean) =>
    rows.map((row, ri) => (
      <motion.div
        key={`${reveal ? 'r' : 'b'}-${ri}`}
        className="flex w-max gap-3"
        animate={{ x: ri % 2 === 0 ? ['0%', '-33.333%'] : ['-33.333%', '0%'] }}
        transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
      >
        {[...row, ...row, ...row].map((label, i) =>
          reveal ? (
            <div
              key={i}
              className="ml-6 flex w-fit scale-125 items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-xs"
              style={{ background: '#0A1636', borderColor: 'rgba(255,41,0,0.45)' }}
            >
              <PillIcon className="text-brand-orange" />
              <span className="font-semibold text-brand-orange">{label}</span>
            </div>
          ) : (
            <div
              key={i}
              className="flex w-fit items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/55 backdrop-blur-sm"
            >
              <PillIcon />
              <span>{label}</span>
            </div>
          )
        )}
      </motion.div>
    ));

  return (
    <div
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 p-2 shadow-2xl',
        className
      )}
      style={{ background: 'rgba(10,22,54,0.55)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}
    >
      <div ref={containerRef} className="relative w-full flex-1 overflow-hidden rounded-2xl bg-white/[0.03]" style={{ minHeight: 150 }}>
        <div className="relative flex h-full w-full flex-col items-center justify-center">
          {/* capa base */}
          <motion.div style={{ WebkitMaskImage: inverseMask, maskImage: inverseMask }} className="flex h-full w-full flex-col justify-center gap-3">
            {renderRows(false)}
          </motion.div>

          {/* capa revelada (bajo la lupa) */}
          <motion.div className="pointer-events-none absolute inset-0 z-10 flex select-none flex-col justify-center gap-3" style={{ clipPath }}>
            {renderRows(true)}
          </motion.div>

          {/* lupa arrastrable */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 cursor-grab drop-shadow-xl active:cursor-grabbing"
            drag
            dragMomentum={false}
            dragConstraints={containerRef}
            style={{ x: lensX, y: lensY }}
          >
            <div className="relative">
              <MagnifyingLens size={84} />
              <div className="pointer-events-none absolute left-[6px] top-[6px] h-[56px] w-[56px] rounded-full bg-white/10" />
            </div>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/5 bg-gradient-to-r from-[#0A1636] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-1/5 bg-gradient-to-l from-[#0A1636] to-transparent" />
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-bold tracking-tight text-white">{title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/60">{description}</p>
      </div>
    </div>
  );
}

export default MagnifiedBento;

const MagnifyingLens = ({ size = 92 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M365.424 335.392L342.24 312.192L311.68 342.736L334.88 365.936L365.424 335.392Z" fill="#B0BDC6" />
    <path d="M358.08 342.736L334.88 319.552L319.04 335.392L342.24 358.584L358.08 342.736Z" fill="#DFE9EF" />
    <path d="M352.368 321.808L342.752 312.192L312.208 342.752L321.824 352.36L352.368 321.808Z" fill="#B0BDC6" />
    <path d="M332 332C260 404 142.4 404 69.6001 332C-2.3999 260 -2.3999 142.4 69.6001 69.6C141.6 -3.20003 259.2 -2.40002 332 69.6C404.8 142.4 404.8 260 332 332ZM315.2 87.2C252 24 150.4 24 88.0001 87.2C24.8001 150.4 24.8001 252 88.0001 314.4C151.2 377.6 252.8 377.6 315.2 314.4C377.6 252 377.6 150.4 315.2 87.2Z" fill="#DFE9EF" />
    <path d="M319.2 319.2C254.4 384 148.8 384 83.2001 319.2C18.4001 254.4 18.4001 148.8 83.2001 83.2C148 18.4 253.6 18.4 319.2 83.2C384 148.8 384 254.4 319.2 319.2ZM310.4 92C250.4 32 152 32 92.0001 92C32.0001 152 32.0001 250.4 92.0001 310.4C152 370.4 250.4 370.4 310.4 310.4C370.4 250.4 370.4 152 310.4 92Z" fill="#7A858C" />
    <path d="M484.104 428.784L373.8 318.472L318.36 373.912L428.672 484.216L484.104 428.784Z" fill="#333333" />
    <path d="M471.664 441.224L361.344 330.928L330.8 361.48L441.12 471.76L471.664 441.224Z" fill="#575B5E" />
    <path d="M495.2 423.2C504 432 432.8 504 423.2 495.2L417.6 489.6C408.8 480.8 480 408.8 489.6 417.6L495.2 423.2Z" fill="#B0BDC6" />
    <path d="M483.2 435.2C492 444 444.8 492 435.2 483.2L429.6 477.6C420.8 468.8 468 420.8 477.6 429.6L483.2 435.2Z" fill="#DFE9EF" />
  </svg>
);

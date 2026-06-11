'use client';

import React from 'react';

export interface MarqueeStat {
  num: string;
  label: string;
}

/**
 * Marquee horizontal infinito (dos pistas) con estadísticas de marca.
 * Pausa al pasar el cursor (.marquee-band:hover en globals).
 */
export function Marquee({ items }: { items: MarqueeStat[] }) {
  const content = items.map((it, i) => (
    <span key={i} className="mx-5 inline-flex items-baseline gap-2 sm:mx-8">
      <strong className="text-gradient-brand text-2xl font-extrabold sm:text-3xl">{it.num}</strong>
      <span className="text-base text-white/65 sm:text-xl">{it.label}</span>
      <span className="ml-5 text-brand-orange sm:ml-8" aria-hidden>
        ✦
      </span>
    </span>
  ));

  return (
    <div
      className="marquee-band relative flex w-full overflow-x-hidden border-y"
      style={{
        borderColor: 'rgba(255, 41, 0, 0.25)',
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2D3561 100%)',
      }}
    >
      <div className="animate-marquee whitespace-nowrap py-6 sm:py-8">{content}</div>
      <div className="animate-marquee2 absolute top-0 whitespace-nowrap py-6 sm:py-8" aria-hidden>
        {content}
      </div>
    </div>
  );
}

export default Marquee;

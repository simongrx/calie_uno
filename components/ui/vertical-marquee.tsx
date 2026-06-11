'use client';

import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface VerticalMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
}

/**
 * Marquee vertical infinito con foco en el centro: los ítems cercanos al centro
 * se ven nítidos y los lejanos se atenúan. Dos copias apiladas → loop sin saltos.
 */
export function VerticalMarquee({ items, speed = 26, className }: VerticalMarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    let raf = 0;
    const tick = () => {
      const rect = c.getBoundingClientRect();
      const cy = rect.top + rect.height / 2;
      c.querySelectorAll<HTMLElement>('.marquee-item').forEach((el) => {
        const r = el.getBoundingClientRect();
        const d = Math.abs(cy - (r.top + r.height / 2));
        const nd = Math.min(d / (rect.height / 2), 1);
        el.style.opacity = (1 - nd * 0.8).toFixed(3);
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const copy = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 flex-col animate-marquee-vertical">
      {items.map((t, i) => (
        <div
          key={i}
          className="marquee-item text-gradient-brand mx-auto max-w-[16rem] px-4 py-4 text-center text-lg font-bold leading-tight tracking-tight sm:max-w-[22rem] sm:text-2xl lg:text-3xl"
        >
          {t}
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn('flex flex-col overflow-hidden', className)}
      style={{ '--duration': `${speed}s` } as React.CSSProperties}
    >
      {copy(false)}
      {copy(true)}
    </div>
  );
}

export default VerticalMarquee;

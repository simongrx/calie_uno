'use client';

import { useEffect } from 'react';

/**
 * Un ÚNICO listener global de puntero (con delegación).
 * Para la(s) `.spotlight-card` bajo el cursor calcula la posición del puntero
 * RELATIVA a cada card (--mx/--my en px). Así el glow se alinea siempre, aunque
 * la card tenga backdrop-filter o transform (que rompen background-attachment:fixed).
 * También escribe --xp en :root para variar levemente el tono.
 */
export function SpotlightProvider() {
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    let last: PointerEvent | null = null;

    const apply = () => {
      raf = 0;
      const e = last;
      if (!e) return;

      root.style.setProperty('--xp', (e.clientX / window.innerWidth).toFixed(3));

      const target = e.target as Element | null;
      let el: Element | null = target?.closest?.('.spotlight-card') ?? null;
      while (el) {
        const r = el.getBoundingClientRect();
        const s = (el as HTMLElement).style;
        s.setProperty('--mx', (e.clientX - r.left).toFixed(1) + 'px');
        s.setProperty('--my', (e.clientY - r.top).toFixed(1) + 'px');
        el = el.parentElement ? el.parentElement.closest('.spotlight-card') : null;
      }
    };

    const onMove = (e: PointerEvent) => {
      last = e;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}

export default SpotlightProvider;

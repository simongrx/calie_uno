'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export interface RingImage {
  id: string;
  src: string;
  alt: string;
  rotation: number;
}

/**
 * Rueda de imágenes que gira en círculo (rodea el contenido central).
 * El radio se autoajusta al tamaño del contenedor. Perspectiva 3D según el cursor.
 */
export function ImageRing({ images }: { images: RingImage[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [angles, setAngles] = useState<number[]>([]);
  const [radius, setRadius] = useState(240);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  // Expansión por scroll: 0 = imágenes agrupadas en el centro, 1 = rueda completa.
  const [progress, setProgress] = useState(0);

  // Posiciones iniciales repartidas en el círculo
  useEffect(() => {
    setAngles(images.map((_, i) => i * (360 / images.length)));
  }, [images.length]);

  // Rotación continua
  useEffect(() => {
    const id = setInterval(() => {
      setAngles((prev) => prev.map((a) => (a + 0.25) % 360));
    }, 40);
    return () => clearInterval(id);
  }, []);

  // Radio responsivo según el contenedor
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setRadius((Math.min(r.width, r.height) / 2) * 0.82);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Progreso de expansión según la posición de la sección en el viewport:
  // 0 cuando el centro de la rueda está en el borde inferior, 1 cuando llega al centro.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const compute = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const p = Math.max(0, Math.min(1, (vh - center) / (vh * 0.5)));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const px = (mouse.x - 0.5) * 18;
  const py = (mouse.y - 0.5) * 18;

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="absolute inset-0 flex items-center justify-center [perspective:1200px]"
    >
      {images.map((img, i) => {
        const a = (angles[i] || 0) * (Math.PI / 180);
        const rr = radius * progress; // radio expandido por scroll
        const x = Math.cos(a) * rr;
        const y = Math.sin(a) * rr;
        return (
          <div
            key={img.id}
            className="absolute h-28 w-20 transition-transform duration-200 ease-linear sm:h-40 sm:w-28 lg:h-44 lg:w-32"
            style={{
              transform: `translate(${x}px, ${y}px) rotateX(${py}deg) rotateY(${px}deg) rotateZ(${img.rotation}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl transition-transform duration-300 hover:scale-110">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="140px"
                className="object-contain p-3"
              />
              {/* Brillo en hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageRing;

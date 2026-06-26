import React from 'react';
import { AnimatedMarqueeHero } from '@/components/ui/hero-3';
import { getEventos } from '@/lib/data';

// Imágenes de eventos reales + algunas de la galería para enriquecer el marquee.
const GALERIA_EXTRA = [
  '/images/galeria/cultura/foto-1.webp',
  '/images/galeria/gastronomia/foto-2.webp',
  '/images/galeria/naturaleza/foto-1.webp',
  '/images/galeria/bienestar/foto-3.webp',
  '/images/galeria/cultura/foto-4.webp',
  '/images/galeria/gastronomia/foto-5.webp',
  '/images/galeria/naturaleza/foto-3.webp',
  '/images/galeria/bienestar/foto-1.webp',
];

export function EventosMarqueeSection() {
  const images = [...getEventos().map((e) => e.imagen), ...GALERIA_EXTRA];

  return (
    <AnimatedMarqueeHero
      tagline="Agenda cultural del Valle"
      title={
        <>
          Vive los eventos
          <br />
          que laten en Cali
        </>
      }
      description="Del Petronio Álvarez a la Feria de Cali: festivales, música, sabor y cultura viva durante todo el año en el Valle del Cauca."
      ctaText="Ver todos los eventos"
      ctaHref="/eventos"
      images={images}
    />
  );
}

export default EventosMarqueeSection;

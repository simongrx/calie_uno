'use client';

import React from 'react';
import { aliados } from '@/data/aliados';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ImageRing, type RingImage } from '@/components/ui/image-ring';
import { VerticalMarquee } from '@/components/ui/vertical-marquee';

// Rotaciones variadas para que las tarjetas de la rueda no se vean uniformes.
const ROTACIONES = [-15, -8, 5, 12, -12, 8, -10, 6, -6, 10, -14, 9];

const ringImages: RingImage[] = aliados.map((a, i) => ({
  id: a.id,
  src: a.logo,
  alt: a.nombre,
  rotation: ROTACIONES[i % ROTACIONES.length],
}));

const nombres = aliados.map((a) => a.nombre);

export const AliadosSection: React.FC = () => {
  return (
    <section id="aliados" className="section bg-transparent relative overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          titulo="Nuestros Aliados"
          subtitulo="Instituciones y organizaciones que hacen posible el turismo sostenible en el Valle del Cauca"
          alineacion="center"
          conLinea={true}
          className="mb-10 sm:mb-14"
        />

        {/* Rueda de logos girando alrededor del marquee de nombres */}
        <div className="relative mx-auto h-[460px] w-full max-w-md sm:h-[600px] sm:max-w-2xl lg:h-[680px]">
          {/* Texto central — DETRÁS de la rueda (z-0 crea su propio contexto
              de apilamiento para que las vignettes no tapen las imágenes). */}
          <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
            <div className="relative h-[280px] w-[260px] sm:h-[380px] sm:w-[400px]">
              <VerticalMarquee items={nombres} speed={28} className="h-full" />
              {/* Vignettes para desvanecer arriba/abajo */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-[#0A1636] via-[#0A1636]/70 to-transparent sm:h-28" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-[#0A1636] via-[#0A1636]/70 to-transparent sm:h-28" />
            </div>
          </div>

          {/* Rueda de logos — DELANTE del texto */}
          <div className="absolute inset-0 z-10">
            <ImageRing images={ringImages} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AliadosSection;

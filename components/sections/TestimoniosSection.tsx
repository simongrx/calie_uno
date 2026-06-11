'use client';

import React from 'react';
import { testimonios } from '@/data/testimonios';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { TestimonialsColumn } from '@/components/ui/testimonials-columns-1';

// Mapeo de nuestros datos reales al formato del componente de columnas.
const items = testimonios.map((t) => ({
  text: `"${t.comentario}"`,
  image: t.avatar,
  name: t.nombre,
  role: `${t.bandera} ${t.pais}`,
}));

const firstColumn = items.slice(0, 4);
const secondColumn = items.slice(4, 8);
const thirdColumn = items.slice(8, 12);

const maskStyle: React.CSSProperties = {
  maskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)',
};

export const TestimoniosSection: React.FC = () => {
  return (
    <section id="testimonios" className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Lo Que Dicen Nuestros Visitantes"
          subtitulo="Experiencias auténticas de turistas que han explorado nuestro valle"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        <div
          className="flex max-h-[740px] justify-center gap-6 overflow-hidden"
          style={maskStyle}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;

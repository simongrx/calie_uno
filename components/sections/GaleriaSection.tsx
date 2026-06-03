'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { galeria } from '@/data/galeria';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { PilarType } from '@/types';
import Image from 'next/image';

const pilarLabels: Record<PilarType, string> = {
  cultura: 'Cultura',
  naturaleza: 'Naturaleza',
  gastronomia: 'Gastronomía',
  bienestar: 'Bienestar',
};

const glassActive = {
  background: 'rgba(255, 41, 0, 0.2)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 41, 0, 0.5)',
  boxShadow: '0 8px 24px rgba(255, 41, 0, 0.2)',
};

const glassInactive = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const collagePattern: [number, number][] = [
  [2, 2],
  [1, 1],
  [1, 2],
  [1, 1],
  [2, 1],
  [1, 1],
];

export const GaleriaSection: React.FC = () => {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);
  const [imagenAmpliada, setImagenAmpliada] = useState<string | null>(null);

  const galeriaFiltrada = pilarFiltro
    ? galeria.filter((img) => img.pilar === pilarFiltro)
    : galeria;

  const pilares: PilarType[] = [
    'cultura',
    'naturaleza',
    'gastronomia',
    'bienestar',
  ];

  return (
    <section id="galeria" className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Galería de Momentos"
          subtitulo="Explora los momentos más hermosos del Valle del Cauca"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-5 mb-8 sm:mb-10"
        >
          <motion.button
            onClick={() => setPilarFiltro(null)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="min-w-[240px] min-h-[86px] px-10 py-5 rounded-2xl font-semibold text-white"
            style={pilarFiltro === null ? glassActive : glassInactive}
          >
            Ver Todo
          </motion.button>

          {pilares.map((pilar) => (
            <motion.button
              key={pilar}
              onClick={() => setPilarFiltro(pilar)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[200px] min-h-[86px] px-10 py-5 rounded-2xl font-semibold text-white"
              style={pilarFiltro === pilar ? glassActive : glassInactive}
            >
              {pilarLabels[pilar]}
            </motion.button>
          ))}
        </motion.div>

        {/* separación real */}
        <div className="h-8 sm:h-10" />

        {/* COLLAGE */}
        <div
          className="mb-12"
          style={{
            columnCount: 3,
            columnGap: '18px',
          }}
        >
          {galeriaFiltrada.map((imagen, index) => {
            const [colSpan, rowSpan] =
              collagePattern[index % collagePattern.length];

            const height =
              rowSpan === 2
                ? '420px'
                : colSpan === 2
                ? '260px'
                : '200px';

            return (
              <motion.div
                key={imagen.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setImagenAmpliada(imagen.src)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group inline-block w-full mb-[18px]"
                style={{
                  breakInside: 'avoid',
                  height,
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Image
                  src={imagen.src}
                  alt={imagen.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-bold text-sm mb-1">
                      {imagen.titulo}
                    </h3>
                    <PilarBadge
                      pilar={imagen.pilar}
                      tamaño="sm"
                      showLabel={true}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* LIGHTBOX */}
        {imagenAmpliada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setImagenAmpliada(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full"
            >
              <Image
                src={imagenAmpliada}
                alt="Imagen ampliada"
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GaleriaSection;
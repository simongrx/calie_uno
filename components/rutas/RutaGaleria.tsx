'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface RutaGaleriaProps {
  imagenes: string[];
  nombreRuta: string;
}

// Patrón de collage para la galería
const collageSizes: [number, number][] = [
  [2, 2],
  [1, 1],
  [1, 2],
  [1, 1],
  [2, 1],
  [1, 1],
];

export const RutaGaleria: React.FC<RutaGaleriaProps> = ({ imagenes, nombreRuta }) => {
  const [imagenAmpliada, setImagenAmpliada] = useState<number | null>(null);

  if (imagenes.length === 0) {
    return (
      <div className="text-center py-16">
        <svg className="w-12 h-12 text-white/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-white/40">No hay imágenes disponibles para esta ruta</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid collage */}
      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '180px' }}
      >
        {imagenes.map((src, index) => {
          const [colSpan, rowSpan] = collageSizes[index % collageSizes.length];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setImagenAmpliada(index)}
              className="spotlight-card relative rounded-xl overflow-hidden cursor-pointer group"
              style={{
                gridColumn: `span ${colSpan}`,
                gridRow: `span ${rowSpan}`,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Image src={src} alt={`${nombreRuta} - foto ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(255, 41, 0,0.8)', backdropFilter: 'blur(8px)' }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.div>
              </div>
              {/* Número */}
              <div className="absolute bottom-2 right-2 text-xs text-white/60 font-medium"
                style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', padding: '2px 8px', borderRadius: '20px' }}>
                {index + 1}/{imagenes.length}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {imagenAmpliada !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
            onClick={() => setImagenAmpliada(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imagenes[imagenAmpliada]}
                alt={`${nombreRuta} - foto ${imagenAmpliada + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl"
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
              />

              {/* Controles */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="spotlight-card text-white/60 text-sm px-5 py-1 rounded-full"
                  style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                  {imagenAmpliada + 1} / {imagenes.length}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setImagenAmpliada(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Prev / Next */}
              {imagenAmpliada > 0 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setImagenAmpliada(imagenAmpliada - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255, 41, 0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 41, 0,0.5)' }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              )}
              {imagenAmpliada < imagenes.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setImagenAmpliada(imagenAmpliada + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255, 41, 0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 41, 0,0.5)' }}
                >
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RutaGaleria;

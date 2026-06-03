'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PilarType } from '@/types';
import dynamic from 'next/dynamic';

const MapaInteractivo = dynamic(
  () => import('@/components/mapa/MapaInteractivo'),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full h-96 rounded-2xl animate-pulse"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      />
    ),
  }
);

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

export const MapaSection: React.FC = () => {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);
  const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];

  return (
    // relative + z-10 crea un contexto de apilamiento que contiene los
    // z-index internos de Leaflet (hasta ~1000) por debajo del header (z-50).
    <section className="section bg-[#0A1636] relative z-10">
      <div className="container-custom">
        <SectionTitle
          titulo="Mapa Interactivo"
          subtitulo="Explora visualmente todas nuestras rutas y puntos de interés en el Valle del Cauca"
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
          className="flex flex-wrap justify-center gap-4 sm:gap-5 mb-8 sm:mb-10"
        >
          <motion.button
            onClick={() => setPilarFiltro(null)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="min-w-[190px] min-h-[72px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
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
              className="min-w-[190px] min-h-[72px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
              style={pilarFiltro === pilar ? glassActive : glassInactive}
            >
              {pilarLabels[pilar]}
            </motion.button>
          ))}
        </motion.div>

        {/* Mapa */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden shadow-xl h-96 sm:h-[500px] lg:h-[600px]"
        >
          <MapaInteractivo pilarFiltro={pilarFiltro} />
        </motion.div>
      </div>
    </section>
  );
};

export default MapaSection;
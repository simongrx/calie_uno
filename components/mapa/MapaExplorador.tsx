'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { PilarType } from '@/types';

const MapaInteractivo = dynamic(() => import('@/components/mapa/MapaInteractivo'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
  ),
});

const pilarLabels: Record<PilarType, string> = {
  cultura: 'Cultura',
  naturaleza: 'Naturaleza',
  gastronomia: 'Gastronomía',
  bienestar: 'Bienestar',
};

const glassActive: React.CSSProperties = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};
const glassInactive: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px rgba(0,0,0,0.22)',
};
const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];

export function MapaExplorador() {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);

  return (
    <>
      {/* Filtros por pilar */}
      <div className="mb-8 flex flex-wrap justify-center gap-3 sm:gap-4">
        <motion.button
          onClick={() => setPilarFiltro(null)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex min-h-[48px] min-w-[140px] items-center justify-center rounded-2xl px-6 text-sm font-semibold text-white transition-all duration-300 sm:text-base"
          style={pilarFiltro === null ? glassActive : glassInactive}
        >
          Todo el mapa
        </motion.button>
        {pilares.map((pilar) => (
          <motion.button
            key={pilar}
            onClick={() => setPilarFiltro(pilar)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex min-h-[48px] min-w-[140px] items-center justify-center rounded-2xl px-6 text-sm font-semibold text-white transition-all duration-300 sm:text-base"
            style={pilarFiltro === pilar ? glassActive : glassInactive}
          >
            {pilarLabels[pilar]}
          </motion.button>
        ))}
      </div>

      {/* Mapa */}
      <div
        className="relative h-[60vh] min-h-[420px] w-full overflow-hidden rounded-3xl sm:h-[70vh]"
        style={glassCard}
      >
        <MapaInteractivo key={pilarFiltro ?? 'all'} pilarFiltro={pilarFiltro} />
      </div>
    </>
  );
}

export default MapaExplorador;

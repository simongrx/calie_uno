'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruta, PilarType } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];

export function RutasCatalogo({ rutas }: { rutas: Ruta[] }) {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);
  const rutasFiltradas = pilarFiltro ? rutas.filter((r) => r.pilar === pilarFiltro) : rutas;

  return (
    <>
      {/* Filtros */}
      <div className="mb-8 flex flex-wrap justify-center gap-4 sm:mb-10 sm:gap-6">
        <motion.button
          onClick={() => setPilarFiltro(null)}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex min-h-[56px] min-w-[160px] items-center justify-center rounded-2xl px-7 text-base font-semibold text-white transition-all duration-300"
          style={pilarFiltro === null ? glassActive : glassInactive}
        >
          Todas las Rutas
        </motion.button>
        {pilares.map((pilar) => (
          <motion.button
            key={pilar}
            onClick={() => setPilarFiltro(pilar)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex min-h-[56px] min-w-[160px] items-center justify-center rounded-2xl px-7 text-base font-semibold text-white transition-all duration-300"
            style={pilarFiltro === pilar ? glassActive : glassInactive}
          >
            {pilarLabels[pilar]}
          </motion.button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pilarFiltro ?? 'all'}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -20 }}
          className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {rutasFiltradas.map((ruta) => (
            <motion.div key={ruta.id} variants={itemVariants} whileHover={{ y: -8 }} className="h-full">
              <Link
                href={`/rutas/${ruta.id}`}
                className="spotlight-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
                style={glassCard}
              >
                {/* Imagen */}
                <div className="relative h-48 flex-shrink-0 overflow-hidden sm:h-56">
                  <Image
                    src={ruta.imagenCover}
                    alt={ruta.nombre}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 transition-colors duration-300 group-hover:bg-black/50" />
                  <div className="absolute right-4 top-4 z-10">
                    <PilarBadge pilar={ruta.pilar} tamaño="sm" showLabel={false} />
                  </div>
                  <div
                    className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-sm font-medium text-white/90"
                    style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '20px' }}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {ruta.duracion}
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-grow flex-col p-5 sm:p-6">
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white sm:text-xl">{ruta.nombre}</h3>
                  <p className="mb-4 line-clamp-3 flex-grow text-sm text-white/60">{ruta.descripcion}</p>
                  <div className="mb-5 flex gap-4 text-xs text-white/40">
                    <span>{ruta.puntos.length} paradas</span>
                    <span className="capitalize">{ruta.dificultad}</span>
                    {ruta.distancia && <span>{ruta.distancia}</span>}
                  </div>
                  <span
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300 group-hover:brightness-110"
                    style={glassActive}
                  >
                    Descubre más
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {rutasFiltradas.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-white/50">No hay rutas disponibles para este pilar</p>
        </div>
      )}
    </>
  );
}

export default RutasCatalogo;

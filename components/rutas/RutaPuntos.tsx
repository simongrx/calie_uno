'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PuntoRuta } from '@/types';
import Image from 'next/image';

interface RutaPuntosProps {
  puntos: PuntoRuta[];
}

const tipoConfig = {
  parada: {
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Parada',
    color: 'text-blue-400',
    bg: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.3)',
  },
  foto: {
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
    label: 'Foto',
    color: 'text-purple-400',
    bg: 'rgba(139,92,246,0.15)',
    border: 'rgba(139,92,246,0.3)',
  },
  experiencia: {
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    label: 'Experiencia',
    color: 'text-orange-400',
    bg: 'rgba(249,115,22,0.15)',
    border: 'rgba(249,115,22,0.3)',
  },
};

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

export const RutaPuntos: React.FC<RutaPuntosProps> = ({ puntos }) => {
  const [puntoActivo, setPuntoActivo] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {puntos.map((punto, index) => {
        const config = tipoConfig[punto.tipo];
        const isOpen = puntoActivo === punto.id;

        return (
          <motion.div
            key={punto.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl overflow-hidden cursor-pointer group"
            style={glassCard}
            onClick={() => setPuntoActivo(isOpen ? null : punto.id)}
          >
            {/* Imagen */}
            <div className="relative h-44 overflow-hidden">
              <Image
                src={punto.imagen}
                alt={punto.nombre}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Número */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ background: 'rgba(249,115,22,0.7)', backdropFilter: 'blur(8px)' }}>
                {index + 1}
              </div>

              {/* Tipo badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ background: config.bg, border: `1px solid ${config.border}`, backdropFilter: 'blur(8px)' }}>
                <svg className={`w-3 h-3 ${config.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={config.icon} />
                </svg>
                <span className={config.color}>{config.label}</span>
              </div>

              {/* Duración */}
              {punto.duracion && (
                <div className="absolute bottom-4 right-4 flex items-center gap-1 text-white/80 text-xs"
                  style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '4px 8px', borderRadius: '20px' }}>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {punto.duracion}
                </div>
              )}
            </div>

            {/* Contenido */}
            <div className="p-4 sm:p-5">
              <h4 className="text-base font-bold text-white mb-1">{punto.nombre}</h4>
              <p className="text-sm text-white/60 mb-3">{punto.descripcion}</p>

              {/* Expandible */}
              <AnimatePresence>
                {isOpen && punto.detalles && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 mt-3 text-sm text-white/70 leading-relaxed"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      {punto.detalles}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button className="flex items-center gap-1 text-xs text-orange-400 mt-2 hover:text-orange-300 transition-colors">
                {isOpen ? 'Ver menos' : 'Ver más'}
                <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RutaPuntos;

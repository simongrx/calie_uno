'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ruta } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';
import Image from 'next/image';

interface RutaCardProps {
  ruta: Ruta;
  onClick?: () => void;
  destacada?: boolean;
}

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const glassBtn = {
  background: 'rgba(255, 41, 0, 0.2)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 41, 0, 0.45)',
  boxShadow: '0 4px 16px rgba(255, 41, 0, 0.15)',
};

const dificultadColor = {
  facil: 'text-green-400',
  moderado: 'text-yellow-400',
  dificil: 'text-red-400',
};

const dificultadLabel = {
  facil: 'Fácil',
  moderado: 'Moderado',
  dificil: 'Difícil',
};

export const RutaCard: React.FC<RutaCardProps> = ({ ruta, onClick, destacada = false }) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden cursor-pointer group flex flex-col h-full"
      style={glassCard}
      onClick={onClick}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden flex-shrink-0 ${destacada ? 'h-64 sm:h-72' : 'h-48 sm:h-56'}`}>
        <Image
          src={ruta.imagenCover}
          alt={ruta.nombre}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badge pilar */}
        <div className="absolute top-4 left-4 z-10">
          <PilarBadge pilar={ruta.pilar} tamaño="sm" showLabel={false} />
        </div>

        {/* Duración encima de la imagen */}
        <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {ruta.duracion}
        </div>

        {/* Dificultad */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${dificultadColor[ruta.dificultad as keyof typeof dificultadColor]}`}
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}>
            {dificultadLabel[ruta.dificultad as keyof typeof dificultadLabel] ?? ruta.dificultad}
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">
          {ruta.nombre}
        </h3>

        <p className="text-sm text-white mb-4 line-clamp-3 flex-grow leading-relaxed">
          {ruta.descripcion}
        </p>

        {/* Info row */}
        <div className="flex items-center gap-4 mb-5 text-xs text-white">
          {ruta.distancia && (
            <div className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {ruta.distancia}
            </div>
          )}
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {ruta.puntos.length} paradas
          </div>
          {ruta.precioAproximado && (
            <div className="flex items-center gap-1 ml-auto text-red-500">
              {ruta.precioAproximado}
            </div>
          )}
        </div>

        {/* Botón */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 px-6 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300"
          style={glassBtn}
        >
          <span>Ver Ruta Completa</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RutaCard;

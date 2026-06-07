'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';
import { Restaurante } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const glassActive: React.CSSProperties = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Estrellas = ({ rating }: { rating: number }) => (
  <span className="inline-flex items-center gap-1 text-sm font-semibold text-white">
    <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
    {rating.toFixed(1)}
  </span>
);

interface RestauranteCardProps {
  restaurante: Restaurante;
}

export const RestauranteCard: React.FC<RestauranteCardProps> = ({ restaurante }) => {
  const [preview, setPreview] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      onHoverStart={() => setPreview(true)}
      onHoverEnd={() => setPreview(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={glassCard}
    >
      {/* ---------- Card base ---------- */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden sm:h-56">
        <Image
          src={restaurante.imagen}
          alt={restaurante.nombre}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
          {restaurante.trending && (
            <div
              className="animate-pulse rounded-full px-5 py-1 text-xs font-bold text-white"
              style={{ background: 'rgba(255, 41, 0,0.8)', backdropFilter: 'blur(8px)' }}
            >
              Trending
            </div>
          )}
          {restaurante.nuevo && (
            <div
              className="rounded-full px-5 py-1 text-xs font-bold text-white"
              style={{ background: 'rgba(59,130,246,0.8)', backdropFilter: 'blur(8px)' }}
            >
              Nuevo
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-grow flex-col p-6 text-center sm:p-7">
        <div className="mb-3 flex justify-center">
          <PilarBadge pilar={restaurante.pilar} tamaño="sm" showLabel={true} />
        </div>
        <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{restaurante.nombre}</h3>
        <p className="mb-4 line-clamp-2 flex-grow text-sm text-white/60">{restaurante.descripcion}</p>
        <motion.a
          href={restaurante.enlaceReserva || '#'}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300"
          style={glassActive}
        >
          Reservar
        </motion.a>
      </div>

      {/* ---------- Preview en hover ---------- */}
      <AnimatePresence>
        {preview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="absolute inset-0 z-20 flex flex-col justify-center gap-3 p-6 text-center sm:p-7"
            style={{ background: 'rgba(10, 22, 54, 0.93)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
          >
            <div className="flex justify-center">
              <PilarBadge pilar={restaurante.pilar} tamaño="sm" showLabel={true} />
            </div>

            <h3 className="text-xl font-bold text-white">{restaurante.nombre}</h3>

            {/* Meta: rating · precio · barrio */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-white/70">
              <Estrellas rating={restaurante.rating} />
              <span className="font-semibold text-white/90">{restaurante.precioPromedio}</span>
              <span className="inline-flex items-center gap-1">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {restaurante.barrio}
              </span>
            </div>

            {/* Plato insignia */}
            <div>
              <p className="text-[11px] uppercase tracking-wider text-white/40">Plato insignia</p>
              <p className="font-semibold text-brand-red">{restaurante.platoInsignia}</p>
            </div>

            {/* Especialidades */}
            <div className="flex flex-wrap justify-center gap-2">
              {restaurante.especialidad.slice(0, 4).map((esp) => (
                <span
                  key={esp}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white/80"
                >
                  {esp}
                </span>
              ))}
            </div>

            {/* Horario y teléfono */}
            <div className="flex flex-col items-center gap-1 text-xs text-white/50">
              {restaurante.horario && (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {restaurante.horario}
                </span>
              )}
              {restaurante.telefono && (
                <span className="inline-flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {restaurante.telefono}
                </span>
              )}
            </div>

            <motion.a
              href={restaurante.enlaceReserva || '#'}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-all duration-300"
              style={glassActive}
            >
              Reservar
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RestauranteCard;

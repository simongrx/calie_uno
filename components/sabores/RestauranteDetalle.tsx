'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Restaurante } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};
const glassBtn: React.CSSProperties = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};

const Estrellas = ({ rating }: { rating: number }) => (
  <span className="inline-flex items-center gap-1 text-base font-semibold text-white">
    <svg className="h-5 w-5 fill-current text-yellow-400" viewBox="0 0 24 24">
      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.98 11.1c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
    {rating.toFixed(1)}
  </span>
);

const IconRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-brand-orange [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
    <div>
      <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white/85">{value}</p>
    </div>
  </div>
);

export function RestauranteDetalle({ restaurante }: { restaurante: Restaurante }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header con imagen */}
      <div className="relative mb-6 h-72 overflow-hidden rounded-2xl sm:h-96">
        <Image src={restaurante.imagen} alt={restaurante.nombre} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636] via-black/40 to-transparent" />
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          {restaurante.trending && (
            <span className="animate-pulse rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: 'rgba(255, 41, 0,0.8)', backdropFilter: 'blur(8px)' }}>Trending</span>
          )}
          {restaurante.nuevo && (
            <span className="rounded-full px-4 py-1 text-xs font-bold text-white" style={{ background: 'rgba(59,130,246,0.8)', backdropFilter: 'blur(8px)' }}>Nuevo</span>
          )}
        </div>
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="mb-3"><PilarBadge pilar={restaurante.pilar} tamaño="sm" showLabel /></div>
          <h1 className="mb-2 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl lg:text-5xl">{restaurante.nombre}</h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white">
            <Estrellas rating={restaurante.rating} />
            <span className="font-semibold text-white/90">{restaurante.precioPromedio}</span>
            <span className="inline-flex items-center gap-1">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {restaurante.barrio}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Descripción + plato insignia */}
        <div className="space-y-6 lg:col-span-2">
          <div className="spotlight-card rounded-2xl p-6 sm:p-8" style={glassCard}>
            <h3 className="mb-3 text-lg font-bold text-white">Sobre el lugar</h3>
            <p className="leading-relaxed text-white">{restaurante.descripcion}</p>
          </div>

          <div className="spotlight-card rounded-2xl p-6 sm:p-8" style={glassCard}>
            <p className="text-xs uppercase tracking-wider text-white/40">Plato insignia</p>
            <p className="mt-1 text-xl font-bold text-brand-orange">{restaurante.platoInsignia}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {restaurante.especialidad.map((esp) => (
                <span key={esp} className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white">{esp}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="spotlight-card rounded-2xl p-6" style={glassCard}>
            <h3 className="mb-4 text-lg font-bold text-white">Información</h3>
            <div className="space-y-4">
              {restaurante.horario && (
                <IconRow icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} label="Horario" value={restaurante.horario} />
              )}
              {restaurante.telefono && (
                <IconRow icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>} label="Teléfono" value={restaurante.telefono} />
              )}
              <IconRow icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>} label="Barrio" value={restaurante.barrio} />
            </div>
          </div>

          <motion.a
            href={restaurante.enlaceReserva || '/#contacto'}
            target={restaurante.enlaceReserva ? '_blank' : undefined}
            rel={restaurante.enlaceReserva ? 'noopener noreferrer' : undefined}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full px-6 py-4 text-center font-bold text-white"
            style={glassBtn}
          >
            Reservar
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default RestauranteDetalle;

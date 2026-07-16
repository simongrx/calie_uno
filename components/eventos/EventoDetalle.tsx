'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Evento } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { LiveBadge } from '@/components/ui/LiveBadge';

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

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
function fechaLarga(iso: string): string {
  const p = iso?.split('-');
  if (!p || p.length < 3) return iso ?? '';
  const [y, m, d] = p.map(Number);
  if (!y || !m || !d) return iso;
  return `${String(d).padStart(2, '0')} ${MESES[m - 1]} ${y}`;
}

const IconRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex items-start gap-3">
    <span className="mt-0.5 text-brand-orange [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
    <div>
      <p className="text-xs uppercase tracking-wider text-white/40">{label}</p>
      <p className="text-sm font-semibold text-white/85">{value}</p>
    </div>
  </div>
);

export function EventoDetalle({ evento }: { evento: Evento }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Header con imagen */}
      <div className="relative mb-6 h-72 overflow-hidden rounded-2xl sm:h-96">
        <Image src={evento.imagen} alt={evento.nombre} fill sizes="100vw" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636] via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="mb-3 flex items-center gap-2">
            <PilarBadge pilar={evento.pilar} tamaño="sm" showLabel />
            {evento.enVivo && <LiveBadge tipo="vivo" pulsante />}
          </div>
          <h1 className="mb-2 text-3xl font-bold text-white drop-shadow-lg sm:text-4xl lg:text-5xl">{evento.nombre}</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Descripción */}
        <div className="space-y-6 lg:col-span-2">
          <div className="spotlight-card rounded-2xl p-6 sm:p-8" style={glassCard}>
            <h3 className="mb-3 text-lg font-bold text-white">Sobre el evento</h3>
            <p className="leading-relaxed text-white">{evento.descripcion}</p>

            {evento.tags?.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {evento.tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs capitalize text-white">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="spotlight-card rounded-2xl p-6" style={glassCard}>
            <h3 className="mb-4 text-lg font-bold text-white">Detalles</h3>
            <div className="space-y-4">
              <IconRow
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
                label="Fecha"
                value={fechaLarga(evento.fechaInicio)}
              />
              {evento.hora && (
                <IconRow
                  icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  label="Hora"
                  value={evento.hora}
                />
              )}
              <IconRow
                icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                label="Ubicación"
                value={evento.ubicacion}
              />
              {evento.precio && (
                <IconRow
                  icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 10v-1m0-8c1.11 0 2.08.402 2.599 1M12 8c-1.11 0-2.08.402-2.599 1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                  label="Precio"
                  value={evento.precio}
                />
              )}
              {typeof evento.cuposDisponibles === 'number' && (
                <IconRow
                  icon={<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                  label="Cupos disponibles"
                  value={String(evento.cuposDisponibles)}
                />
              )}
            </div>
          </div>

          <motion.a
            href={evento.enlace || '/#contacto'}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="block w-full px-6 py-4 text-center font-bold text-white"
            style={glassBtn}
          >
            {evento.enVivo ? 'Ver en vivo' : 'Quiero asistir'}
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

export default EventoDetalle;

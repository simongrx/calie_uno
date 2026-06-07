'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Evento, PilarType } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';

const pilarHex: Record<PilarType, string> = {
  cultura: '#8B5CF6',
  naturaleza: '#10B981',
  gastronomia: '#EF4444',
  bienestar: '#06B6D4',
};

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

function formatFecha(iso: string): { dia: string; mes: string; anio: string } | null {
  const parts = iso?.split('-');
  if (!parts || parts.length < 3) return null;
  const [y, m, d] = parts.map(Number);
  if (!y || !m || !d || m < 1 || m > 12) return null;
  return { dia: String(d).padStart(2, '0'), mes: MESES[m - 1], anio: String(y) };
}

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

interface EventosTimelineProps {
  eventos: Evento[];
}

export const EventosTimeline: React.FC<EventosTimelineProps> = ({ eventos }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="relative"
    >
      {/* Línea vertical de la timeline */}
      <motion.div
        aria-hidden
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute left-[22px] top-2 bottom-2 w-[2px] origin-top sm:left-7"
        style={{ background: 'linear-gradient(to bottom, #FF2900, rgba(255,41,0,0.35) 70%, transparent)' }}
      />

      <div className="space-y-7 sm:space-y-9">
        {eventos.map((evento) => {
          const hex = pilarHex[evento.pilar];
          const fecha = formatFecha(evento.fechaInicio);
          return (
            <motion.div key={evento.id} variants={itemVariants} className="relative pl-14 sm:pl-20">
              {/* Nodo */}
              <span className="absolute left-[22px] top-6 z-10 flex -translate-x-1/2 items-center justify-center sm:left-7">
                <span
                  className="absolute h-5 w-5 animate-ping rounded-full"
                  style={{ background: hex, opacity: 0.35 }}
                />
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/80"
                  style={{ background: hex, boxShadow: `0 0 12px ${hex}` }}
                />
              </span>

              {/* Tarjeta del evento */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-2xl sm:flex-row"
                style={glassCard}
              >
                {/* Thumbnail */}
                <div className="relative h-40 w-full flex-shrink-0 overflow-hidden sm:h-auto sm:w-44 md:w-52">
                  <Image
                    src={evento.imagen}
                    alt={evento.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, 208px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="absolute left-3 top-3 z-10">
                    <PilarBadge pilar={evento.pilar} tamaño="sm" showLabel={false} />
                  </div>
                </div>

                {/* Contenido */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  {/* Fecha destacada */}
                  <div className="mb-2 flex items-center gap-3">
                    {fecha ? (
                      <span
                        className="inline-flex items-baseline gap-1 rounded-lg px-3 py-1 text-sm font-bold"
                        style={{ background: `${hex}26`, color: '#fff', border: `1px solid ${hex}66` }}
                      >
                        <span className="text-lg leading-none">{fecha.dia}</span>
                        <span className="uppercase">{fecha.mes}</span>
                        <span className="text-white/60">{fecha.anio}</span>
                      </span>
                    ) : (
                      <span className="text-sm font-semibold text-white/80">{evento.fechaInicio}</span>
                    )}
                    {evento.hora && (
                      <span className="inline-flex items-center gap-1 text-xs text-white/50">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {evento.hora}
                      </span>
                    )}
                  </div>

                  <h4 className="mb-1.5 text-lg font-bold text-white sm:text-xl">{evento.nombre}</h4>
                  <p className="mb-3 line-clamp-2 flex-grow text-sm text-white/60">{evento.descripcion}</p>

                  <div className="mb-4 flex items-center gap-2 text-sm text-white/50">
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="line-clamp-1">{evento.ubicacion}</span>
                  </div>

                  <motion.a
                    href={evento.enlace || '#'}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-300 sm:w-auto sm:self-start"
                    style={glassActive}
                  >
                    Más Información
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EventosTimeline;

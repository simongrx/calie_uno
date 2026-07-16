'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Evento, PilarType } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { EventosTimeline } from '@/components/eventos/EventosTimeline';
import { RevealText } from '@/components/ui/RevealText';

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
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];

export function EventosCatalogo({ eventos }: { eventos: Evento[] }) {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);
  const eventosFiltrados = pilarFiltro ? eventos.filter((e) => e.pilar === pilarFiltro) : eventos;
  const enVivo = eventosFiltrados.filter((e) => e.enVivo);
  const proximos = eventosFiltrados.filter((e) => !e.enVivo);
  const filtroKey = pilarFiltro ?? 'todos';

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
          Todos los Eventos
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

      {/* En vivo */}
      {enVivo.length > 0 && (
        <div className="mb-12 sm:mb-16">
          <RevealText type="horizontal">
            <h3 className="mb-8 flex items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
              <span className="inline-block h-3 w-3 animate-pulse rounded-full bg-red-500" />
              En Vivo Ahora
            </h3>
          </RevealText>
          <motion.div
            key={`vivo-${filtroKey}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {enVivo.map((evento) => (
              <motion.div key={evento.id} variants={itemVariants} whileHover={{ y: -8 }} className="h-full">
                <Link
                  href={`/eventos/${evento.id}`}
                  className="spotlight-card group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
                  style={glassCard}
                >
                  <div className="relative h-48 flex-shrink-0 overflow-hidden sm:h-56">
                    <Image src={evento.imagen} alt={evento.nombre} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute right-4 top-4 z-10"><LiveBadge tipo="vivo" pulsante /></div>
                    <div className="absolute left-4 top-4 z-10"><PilarBadge pilar={evento.pilar} tamaño="sm" showLabel={false} /></div>
                  </div>
                  <div className="flex flex-grow flex-col p-6 text-center sm:p-7">
                    <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">{evento.nombre}</h3>
                    <p className="mb-4 line-clamp-2 flex-grow text-sm text-white">{evento.descripcion}</p>
                    <div className="mb-5 space-y-1 text-sm text-white">
                      <p>{evento.ubicacion}</p>
                      <p>{evento.fechaInicio}</p>
                    </div>
                    <span className="inline-flex w-full items-center justify-center rounded-xl px-6 py-3 font-semibold text-white" style={glassActive}>
                      Ver en vivo
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Próximos (timeline) */}
      {proximos.length > 0 && (
        <div>
          <RevealText type="fade">
            <h3 className="mb-8 text-2xl font-bold text-white sm:text-3xl">Próximos Eventos</h3>
          </RevealText>
          <EventosTimeline key={`prox-${filtroKey}`} eventos={proximos} />
        </div>
      )}

      {eventosFiltrados.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-lg text-white">No hay eventos disponibles para este pilar</p>
        </div>
      )}
    </>
  );
}

export default EventosCatalogo;

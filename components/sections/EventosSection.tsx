'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { eventos } from '@/data/eventos';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { RevealText } from '@/components/ui/RevealText';
import { EventosTimeline } from '@/components/eventos/EventosTimeline';
import { PilarType } from '@/types';
import Image from 'next/image';

const pilarLabels: Record<PilarType, string> = {
  cultura: 'Cultura',
  naturaleza: 'Naturaleza',
  gastronomia: 'Gastronomía',
  bienestar: 'Bienestar',
};

const glassActive = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};

const glassInactive = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px rgba(0,0,0,0.22)',
};

const glassCard = {
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

export const EventosSection: React.FC = () => {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);

  const eventosFiltrados = pilarFiltro ? eventos.filter((e) => e.pilar === pilarFiltro) : eventos;
  const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];
  const eventosEnVivo = eventosFiltrados.filter((e) => e.enVivo);
  const proximosEventos = eventosFiltrados.filter((e) => !e.enVivo);
  const filtroKey = pilarFiltro ?? 'todos';

  return (
    <section id="eventos" className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Eventos en Vivo"
          subtitulo="Descubre los eventos más emocionantes del Valle del Cauca"
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
          className="flex flex-wrap justify-center gap-5 sm:gap-6 mb-8 sm:mb-10"
        >
          <motion.button
            onClick={() => setPilarFiltro(null)}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="min-w-[200px] min-h-[82px] px-10 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
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
              className="min-w-[200px] min-h-[82px] px-10 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
              style={pilarFiltro === pilar ? glassActive : glassInactive}
            >
              {pilarLabels[pilar]}
            </motion.button>
          ))}
        </motion.div>

        {/* Eventos en Vivo */}
        {eventosEnVivo.length > 0 && (
          <div className="mb-12 sm:mb-16">
            <RevealText type="horizontal">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="spotlight-card w-3 h-3 rounded-full bg-red-500 animate-pulse inline-block" />
                En Vivo Ahora
              </h3>
            </RevealText>

            <motion.div
              key={`vivo-${filtroKey}`}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
            >
              {eventosEnVivo.map((evento) => (
                <motion.div
                  key={evento.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="spotlight-card rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full"
                  style={glassCard}
                >
                  <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                    <Image src={evento.imagen} alt={evento.nombre} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-4 right-4 z-10"><LiveBadge tipo="vivo" pulsante={true} /></div>
                    <div className="absolute top-4 left-4 z-10"><PilarBadge pilar={evento.pilar} tamaño="sm" showLabel={false} /></div>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-grow text-center">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{evento.nombre}</h3>
                    <p className="text-sm text-white mb-4 line-clamp-2 flex-grow">{evento.descripcion}</p>
                    <div className="space-y-2 mb-5 text-sm text-white">
                      <div className="flex items-center justify-center gap-2">
                        <span>{evento.ubicacion}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <span>{evento.fechaInicio}</span>
                      </div>
                    </div>
                    <motion.a href={evento.enlace || '#'} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                      className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300"
                      style={glassActive}>
                      Ver En Vivo
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Próximos Eventos */}
        {proximosEventos.length > 0 && (
          <div>
            <RevealText type="fade">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                Próximos Eventos
              </h3>
            </RevealText>

            <EventosTimeline key={`prox-${filtroKey}`} eventos={proximosEventos} />
          </div>
        )}

        {eventosFiltrados.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-white text-lg">No hay eventos disponibles para este pilar</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EventosSection;

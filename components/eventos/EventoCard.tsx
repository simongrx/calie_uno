'use client';
 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Evento } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { LiveBadge } from '@/components/ui/LiveBadge';
import { EventosCountdown } from '@/components/eventos/EventoCountdown';
import Image from 'next/image';
 
interface EventosCardProps {
  evento: Evento;
  variante?: 'compacta' | 'completa';
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
 
const glassBtnSecondary = {
  background: 'rgba(255, 255, 255, 0.07)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
};
 
function formatearFecha(fechaStr: string): string {
  const fecha = new Date(fechaStr + 'T00:00:00');
  return fecha.toLocaleDateString('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
 
function formatearRango(inicio: string, fin: string): string {
  const i = new Date(inicio + 'T00:00:00');
  const f = new Date(fin + 'T00:00:00');
  if (inicio === fin) return formatearFecha(inicio);
  return `${i.getDate()} - ${f.getDate()} de ${f.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}`;
}
 
export const EventosCard: React.FC<EventosCardProps> = ({ evento, variante = 'completa' }) => {
  const [expandido, setExpandido] = useState(false);
  const esCompacta = variante === 'compacta';
 
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden flex flex-col h-full group"
      style={glassCard}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden flex-shrink-0 ${esCompacta ? 'h-40' : 'h-52 sm:h-60'}`}>
        <Image
          src={evento.imagen}
          alt={evento.nombre}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
 
        {/* Badges superiores */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <PilarBadge pilar={evento.pilar} tamaño="sm" showLabel={false} />
          {evento.enVivo && <LiveBadge tipo="vivo" pulsante={true} />}
          {evento.proximoProximo && !evento.enVivo && <LiveBadge tipo="imperdible" pulsante={false} />}
        </div>
 
        {/* Precio */}
        {evento.precio && (
          <div className="absolute top-4 right-4 z-10 px-5 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: 'rgba(255, 41, 0,0.75)', backdropFilter: 'blur(8px)' }}>
            {evento.precio}
          </div>
        )}
 
        {/* Fecha sobre imagen */}
        <div className="absolute bottom-4 left-4 z-10">
          <p className="text-white/90 text-xs font-medium">
            {formatearRango(evento.fechaInicio, evento.fechaFin)}
          </p>
          {evento.hora && (
            <p className="text-white/60 text-xs">{evento.hora}</p>
          )}
        </div>
      </div>
 
      {/* Contenido */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
 
        {/* Título */}
        <h3 className={`font-bold text-white mb-2 line-clamp-2 ${esCompacta ? 'text-base' : 'text-lg sm:text-xl'}`}>
          {evento.nombre}
        </h3>
 
        {/* Descripción */}
        <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-grow leading-relaxed">
          {evento.descripcion}
        </p>
 
        {/* Ubicación */}
        <div className="flex items-center gap-2 text-xs text-white/50 mb-4">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{evento.ubicacion}</span>
        </div>
 
        {/* Countdown si no es variante compacta */}
        {!esCompacta && (
          <div className="mb-4">
            <EventosCountdown fechaInicio={evento.fechaInicio} enVivo={evento.enVivo} />
          </div>
        )}
 
        {/* Cupos */}
        {evento.cuposDisponibles !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-white/50 mb-1">
              <span>Cupos disponibles</span>
              <span className="text-red-500 font-semibold">{evento.cuposDisponibles.toLocaleString()}</span>
            </div>
            <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #FF2900, #fbbf24)',
                  width: `${Math.min((evento.cuposDisponibles / 10000) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
 
        {/* Expandible — más info */}
        <AnimatePresence>
          {expandido && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-4"
            >
              <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {/* Tags */}
                {evento.tags.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Categorías</p>
                    <div className="flex flex-wrap gap-2">
                      {evento.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full text-white/60"
                          style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
 
                {/* Fechas detalladas */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs text-white/40 mb-1">Inicio</p>
                    <p className="text-xs text-white/80 font-medium">{formatearFecha(evento.fechaInicio)}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <p className="text-xs text-white/40 mb-1">Cierre</p>
                    <p className="text-xs text-white/80 font-medium">{formatearFecha(evento.fechaFin)}</p>
                  </div>
                </div>
 
                {/* Horario */}
                {evento.hora && (
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Apertura: {evento.hora}</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
 
        {/* Botón ver más */}
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-xs text-red-500 hover:text-red-400 transition-colors flex items-center gap-1 mb-4"
        >
          {expandido ? 'Ver menos' : 'Más información'}
          <svg className={`w-3 h-3 transition-transform ${expandido ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
 
        {/* CTAs */}
        <div className="flex gap-3 mt-auto">
          {evento.enlace && (
            <motion.a
              href={evento.enlace}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300"
              style={glassBtn}
            >
              {evento.enVivo ? 'Ver En Vivo' : 'Ver Evento'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          )}
          <motion.a
            href="#contacto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="py-3 px-4 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all duration-300"
            style={glassBtnSecondary}
          >
            Reservar
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};
 
export default EventosCard;
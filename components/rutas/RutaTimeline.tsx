'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PuntoRuta } from '@/types';
import Image from 'next/image';

interface RutaTimelineProps {
  puntos: PuntoRuta[];
  duracionTotal: string;
}

const tipoIcon: Record<string, string> = {
  parada: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
  foto: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
  experiencia: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
};

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

export const RutaTimeline: React.FC<RutaTimelineProps> = ({ puntos, duracionTotal }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8 p-4 rounded-2xl" style={glassCard}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)' }}>
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs text-white/40 uppercase tracking-wider">Duración total</p>
          <p className="text-white font-bold">{duracionTotal}</p>
        </div>
        <div className="ml-auto text-sm text-white/50">
          {puntos.length} paradas
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Línea vertical */}
        <div className="absolute left-6 top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, rgba(249,115,22,0.6), rgba(249,115,22,0.1))' }} />

        <div className="space-y-6">
          {puntos.map((punto, index) => (
            <motion.div
              key={punto.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative flex gap-6"
            >
              {/* Nodo */}
              <div className="relative z-10 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(249,115,22,0.2)',
                    border: '2px solid rgba(249,115,22,0.6)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={tipoIcon[punto.tipo] ?? tipoIcon.parada} />
                  </svg>
                </motion.div>
                {/* Número */}
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'rgba(249,115,22,0.9)' }}>
                  {index + 1}
                </div>
              </div>

              {/* Contenido */}
              <div className="flex-1 pb-2">
                <div className="grid sm:grid-cols-3 gap-4 p-5 rounded-2xl group hover:border-orange-500/30 transition-all duration-300"
                  style={glassCard}>
                  {/* Imagen */}
                  <div className="relative h-28 sm:h-full rounded-xl overflow-hidden">
                    <Image src={punto.imagen} alt={punto.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Info */}
                  <div className="sm:col-span-2">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-white">{punto.nombre}</h4>
                      {punto.duracion && (
                        <span className="text-xs text-orange-400 font-semibold ml-2 flex-shrink-0">{punto.duracion}</span>
                      )}
                    </div>
                    <p className="text-sm text-white/60 mb-3 leading-relaxed">{punto.descripcion}</p>
                    {punto.detalles && (
                      <p className="text-xs text-white/40 leading-relaxed">{punto.detalles}</p>
                    )}
                    <span className="inline-block mt-3 text-xs px-2.5 py-1 rounded-full capitalize"
                      style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)', color: 'rgba(249,115,22,0.9)' }}>
                      {punto.tipo}
                    </span>
                  </div>
                </div>

                {/* Conector entre paradas */}
                {index < puntos.length - 1 && (
                  <div className="flex items-center gap-2 mt-3 ml-2">
                    <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span className="text-xs text-white/30">Continúa a {puntos[index + 1]?.nombre}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* Final */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: puntos.length * 0.1 }}
            viewport={{ once: true }}
            className="relative flex gap-6 items-center"
          >
            <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
              style={{ background: 'rgba(34,197,94,0.2)', border: '2px solid rgba(34,197,94,0.5)' }}>
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-green-400">Fin del recorrido</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RutaTimeline;

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Ruta } from '@/types';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { RutasTabs } from '@/components/rutas/RutasTabs';
import { RutaPuntos } from '@/components/rutas/RutaPuntos';
import { RutaGaleria } from '@/components/rutas/RutaGaleria';
import { RutaTimeline } from '@/components/rutas/RutaTimeline';
import Image from 'next/image';

// Mapa interactivo (Leaflet) — solo cliente, centrado en esta ruta.
const MapaInteractivo = dynamic(() => import('@/components/mapa/MapaInteractivo'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse" style={{ background: 'rgba(255,255,255,0.05)' }} />
  ),
});

interface RutaDetalleProps {
  ruta: Ruta;
  onClose?: () => void;
}

type TabId = 'info' | 'puntos' | 'mapa' | 'timeline' | 'galeria';

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

const glassBtn = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};

const dificultadColor: Record<string, string> = {
  facil: 'text-green-400',
  moderado: 'text-yellow-400',
  dificil: 'text-red-400',
};

export const RutaDetalle: React.FC<RutaDetalleProps> = ({ ruta, onClose }) => {
  const [tabActivo, setTabActivo] = useState<TabId>('info');

  const tabs = [
    { id: 'info' as TabId, label: 'Información' },
    { id: 'puntos' as TabId, label: 'Paradas' },
    { id: 'mapa' as TabId, label: 'Mapa' },
    { id: 'timeline' as TabId, label: 'Itinerario' },
    { id: 'galeria' as TabId, label: 'Galería' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto"
      id={`ruta-${ruta.id}`}
    >
      {/* Header con imagen */}
      <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden mb-6">
        <Image src={ruta.imagenCover} alt={ruta.nombre} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636] via-black/40 to-transparent" />

        {/* Botón cerrar */}
        {onClose && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}

        {/* Info sobre la imagen */}
        <div className="absolute bottom-6 left-6 right-6 z-10">
          <div className="mb-3">
            <PilarBadge pilar={ruta.pilar} tamaño="sm" showLabel={true} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {ruta.nombre}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {ruta.duracion}
            </span>
            {ruta.distancia && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {ruta.distancia}
              </span>
            )}
            <span className={`font-semibold ${dificultadColor[ruta.dificultad] ?? 'text-white'}`}>
              {ruta.dificultad}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <RutasTabs tabs={tabs} tabActivo={tabActivo} onChange={(id) => setTabActivo(id as TabId)} />

      {/* Contenido según tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tabActivo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mt-6"
        >
          {/* Info */}
          {tabActivo === 'info' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Descripción */}
              <div className="lg:col-span-2 space-y-10">
                <div className="p-8 rounded-2xl" style={glassCard}>
                  <h3 className="text-lg font-bold text-white mb-3">Sobre esta ruta</h3>
                  <p className="text-white/70 leading-relaxed">{ruta.descripcionLarga}</p>
                </div>

                {/* Objetivo */}
                <div className="p-8 rounded-2xl" style={glassCard}>
                  <h3 className="text-lg font-bold text-white mb-3">Objetivo</h3>
                  <p className="text-white/70 leading-relaxed">{ruta.objetivo}</p>
                </div>

                {/* Recomendaciones */}
                <div className="p-8 rounded-2xl" style={glassCard}>
                  <h3 className="text-lg font-bold text-white mb-4">Recomendaciones</h3>
                  <ul className="space-y-3">
                    {ruta.recomendaciones.map((rec, i) => (
                      <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="flex items-start gap-3 text-white/70 text-sm">
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {rec}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Detalles rápidos */}
                <div className="p-6 rounded-2xl" style={glassCard}>
                  <h3 className="text-lg font-bold text-white mb-4">Detalles</h3>
                  <div className="space-y-4">
                    {[
                      { icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Duración', value: ruta.duracion },
                      { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Dificultad', value: ruta.dificultad },
                      ...(ruta.distancia ? [{ icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z', label: 'Distancia', value: ruta.distancia }] : []),
                      ...(ruta.mejorHora ? [{ icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707', label: 'Mejor hora', value: ruta.mejorHora }] : []),
                      ...(ruta.precioAproximado ? [{ icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', label: 'Precio aprox.', value: ruta.precioAproximado }] : []),
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                        <div>
                          <p className="text-xs text-white/40">{item.label}</p>
                          <p className="text-sm font-semibold text-white/80 capitalize">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Incluye */}
                {ruta.incluye && ruta.incluye.length > 0 && (
                  <div className="p-6 rounded-2xl" style={glassCard}>
                    <h3 className="text-lg font-bold text-white mb-4">Incluye</h3>
                    <ul className="space-y-2">
                      {ruta.incluye.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                          <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <motion.a href="#contacto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="block w-full py-4 px-6 rounded-xl font-bold text-white text-center transition-all duration-300"
                  style={glassBtn}>
                  Reservar esta Ruta
                </motion.a>
              </div>
            </div>
          )}

          {tabActivo === 'puntos' && <RutaPuntos puntos={ruta.puntos} />}
          {tabActivo === 'mapa' && (
            <div
              className="relative isolate h-[440px] overflow-hidden rounded-2xl sm:h-[540px]"
              style={glassCard}
            >
              <MapaInteractivo key={ruta.id} rutaId={ruta.id} />
            </div>
          )}
          {tabActivo === 'timeline' && <RutaTimeline puntos={ruta.puntos} duracionTotal={ruta.duracion} />}
          {tabActivo === 'galeria' && <RutaGaleria imagenes={ruta.galeria} nombreRuta={ruta.nombre} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default RutaDetalle;



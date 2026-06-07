'use client';
 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ruta, PilarType } from '@/types';
import { rutas } from '@/data/rutas';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { RutaDetalle } from '@/components/rutas/RutaDetalle';
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
 
export const RutasSection: React.FC = () => {
  const [pilarFiltro, setPilarFiltro] = useState<PilarType | null>(null);
  const [rutaSeleccionada, setRutaSeleccionada] = useState<Ruta | null>(null);
 
  const rutasFiltradas = pilarFiltro ? rutas.filter((r) => r.pilar === pilarFiltro) : rutas;
  const pilares: PilarType[] = ['cultura', 'naturaleza', 'gastronomia', 'bienestar'];
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
 
  const abrirRuta = (ruta: Ruta) => {
    setRutaSeleccionada(ruta);
    // Scroll al top del modal
    setTimeout(() => {
      document.getElementById('ruta-detalle-modal')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };
 
  const cerrarRuta = () => {
    setRutaSeleccionada(null);
    // Volver a la sección de rutas
    document.getElementById('rutas')?.scrollIntoView({ behavior: 'smooth' });
  };
 
  return (
    <section id="rutas" className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Rutas Turísticas"
          subtitulo="Explora nuestras experiencias únicas diseñadas para cada pilar"
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
            className="min-w-[180px] min-h-[56px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
            style={pilarFiltro === null ? glassActive : glassInactive}
          >
            Todas las Rutas
          </motion.button>
 
          {pilares.map((pilar) => (
            <motion.button
              key={pilar}
              onClick={() => setPilarFiltro(pilar)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[180px] min-h-[56px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 text-base flex items-center justify-center"
              style={pilarFiltro === pilar ? glassActive : glassInactive}
            >
              {pilarLabels[pilar]}
            </motion.button>
          ))}
        </motion.div>
 
        {/* Grid de Rutas */}
        <AnimatePresence mode="wait">
          {!rutaSeleccionada ? (
            <motion.div
              key={pilarFiltro ?? 'all'}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {rutasFiltradas.map((ruta) => (
                <ScrollReveal key={ruta.id} direction="up" delay={0.1} className="h-full">
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="h-full rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col"
                    style={glassCard}
                  >
                    {/* Imagen */}
                    <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                      <Image
                        src={ruta.imagenCover}
                        alt={ruta.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300" />
                      <div className="absolute top-4 right-4 z-10">
                        <PilarBadge pilar={ruta.pilar} tamaño="sm" showLabel={false} />
                      </div>
                      {/* Duración encima imagen */}
                      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-white/90 text-sm font-medium"
                        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: '20px' }}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {ruta.duracion}
                      </div>
                    </div>
 
                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{ruta.nombre}</h3>
                      <p className="text-sm text-white/60 mb-4 flex-grow line-clamp-3">{ruta.descripcion}</p>
 
                      <div className="flex gap-4 mb-5 text-xs text-white/40">
                        <span>{ruta.puntos.length} paradas</span>
                        <span className="capitalize">{ruta.dificultad}</span>
                        {ruta.distancia && <span>{ruta.distancia}</span>}
                      </div>
 
                      <motion.button
                        onClick={() => abrirRuta(ruta)}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300"
                        style={glassActive}
                      >
                        <span>Descubre más</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </motion.div>
          ) : (
            // Vista de detalle
            <motion.div
              key="detalle"
              id="ruta-detalle-modal"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              
              {/* Botón volver */}
              <motion.button
                onClick={cerrarRuta}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver a todas las rutas
              </motion.button>
              
              <RutaDetalle ruta={rutaSeleccionada} onClose={cerrarRuta} />
            </motion.div>
          )}
        </AnimatePresence>
 
        {!rutaSeleccionada && rutasFiltradas.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <p className="text-white/50 text-lg">No hay rutas disponibles para este pilar</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
 
export default RutasSection;
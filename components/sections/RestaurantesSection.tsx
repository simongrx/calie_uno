'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurantes, planesExperiencia } from '@/data/restaurantes';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

type TabType = 'restaurantes' | 'planes';

const glassActive = {
  background: 'rgba(249, 115, 22, 0.2)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(249, 115, 22, 0.5)',
  boxShadow: '0 8px 24px rgba(249, 115, 22, 0.2)',
};

const glassInactive = {
  background: 'rgba(255, 255, 255, 0.06)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

export const RestaurantesSection: React.FC = () => {
  const [tabActivo, setTabActivo] = useState<TabType>('restaurantes');
  const [filtroRating, setFiltroRating] = useState<number>(0);

  const restaurantesFiltrados = restaurantes.filter(
    (r) => r.rating >= (filtroRating || 0)
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="section bg-[#0A1636]">
      <div className="container-custom">
        <SectionTitle
          titulo="Sabores y Experiencias"
          subtitulo="Descubre los mejores restaurantes, planes y experiencias gastronómicas del momento"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        {/* Tabs superiores */}
        <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
          {(['restaurantes', 'planes'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setTabActivo(tab)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="min-w-[240px] min-h-[82px] px-10 rounded-2xl font-semibold text-white transition-all duration-300 relative flex items-center justify-center text-base"
              style={tabActivo === tab ? glassActive : glassInactive}
            >
              {tab === 'restaurantes'
                ? 'Restaurantes'
                : 'Planes Especiales'}
            </motion.button>
          ))}
        </div>

        {/* Separación Tabs -> Filtros/Grid */}
        <div className="h-5 sm:h-6" />

        <AnimatePresence mode="wait">

          {/* ================= RESTAURANTES ================= */}
          {tabActivo === 'restaurantes' && (
            <motion.div
              key="restaurantes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >

              {/* Filtros estrellas */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap justify-center gap-5 sm:gap-6"
              >
                {[0, 4, 4.5, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    onClick={() => setFiltroRating(rating)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="min-w-[90px] min-h-[62px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 text-base"
                    style={
                      filtroRating === rating
                        ? glassActive
                        : glassInactive
                    }
                  >
                    {rating === 0 ? (
                      'Todos'
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {rating}+
                      </>
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Separación Filtros -> Grid */}
              <div className="h-8 sm:h-10" />

              {/* Grid restaurantes */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              >
                {restaurantesFiltrados.map((restaurante) => (
                  <ScrollReveal key={restaurante.id} direction="up">
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full"
                      style={glassCard}
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden flex-shrink-0">
                        <Image
                          src={restaurante.imagen}
                          alt={restaurante.nombre}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />

                        <div className="absolute inset-0 bg-black/40" />

                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                          {restaurante.trending && (
                            <div
                              className="text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse"
                              style={{
                                background: 'rgba(249,115,22,0.8)',
                                backdropFilter: 'blur(8px)',
                              }}
                            >
                              Trending
                            </div>
                          )}

                          {restaurante.nuevo && (
                            <div
                              className="text-white px-3 py-1 rounded-full text-xs font-bold"
                              style={{
                                background: 'rgba(59,130,246,0.8)',
                                backdropFilter: 'blur(8px)',
                              }}
                            >
                              Nuevo
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <div className="mb-3">
                          <PilarBadge
                            pilar={restaurante.pilar}
                            tamaño="sm"
                            showLabel={true}
                          />
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {restaurante.nombre}
                        </h3>

                        <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-grow">
                          {restaurante.descripcion}
                        </p>

                        <motion.a
                          href={restaurante.enlaceReserva || '#'}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300"
                          style={glassActive}
                        >
                          Reservar
                        </motion.a>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ================= PLANES ================= */}
          {tabActivo === 'planes' && (
            <motion.div
              key="planes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >

              {/* Separación Tabs -> Grid */}
              <div className="h-4 sm:h-8" />

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
              >
                {planesExperiencia.map((plan) => (
                  <ScrollReveal key={plan.id} direction="up">
                    <motion.div
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      className="rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full"
                      style={glassCard}
                    >
                      <div className="relative h-48 sm:h-56 overflow-hidden">
                        <Image
                          src={plan.imagen}
                          alt={plan.nombre}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                          {plan.nombre}
                        </h3>

                        <p className="text-sm text-white/60 mb-4 flex-grow">
                          {plan.descripcion}
                        </p>

                        <motion.a
                          href="#contacto"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300"
                          style={glassActive}
                        >
                          Solicitar Plan
                        </motion.a>
                      </div>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RestaurantesSection;
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { restaurantes, planesExperiencia } from '@/data/restaurantes';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RestauranteCard } from '@/components/restaurantes/RestauranteCard';
import Image from 'next/image';

type TabType = 'restaurantes' | 'planes';

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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const RestaurantesSection: React.FC = () => {
  const [tabActivo, setTabActivo] = useState<TabType>('restaurantes');
  const [filtroRating, setFiltroRating] = useState<number>(0);

  const restaurantesFiltrados = restaurantes.filter(
    (r) => r.rating >= (filtroRating || 0)
  );

  return (
    <section className="section bg-transparent">
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
              {tab === 'restaurantes' ? 'Restaurantes' : 'Planes Especiales'}
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
              <div className="flex flex-wrap justify-center gap-5 sm:gap-6 mb-8 sm:mb-10">
                {[0, 4, 4.5, 5].map((rating) => (
                  <motion.button
                    key={rating}
                    onClick={() => setFiltroRating(rating)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="min-w-[90px] min-h-[62px] px-8 rounded-2xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 text-base"
                    style={filtroRating === rating ? glassActive : glassInactive}
                  >
                    {rating === 0 ? (
                      'Todos'
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        {rating}+
                      </>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Grid restaurantes — remonta al cambiar el filtro para reanimar */}
              {restaurantesFiltrados.length > 0 ? (
                <motion.div
                  key={`restaurantes-${filtroRating}`}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                >
                  {restaurantesFiltrados.map((restaurante) => (
                    <RestauranteCard key={restaurante.id} restaurante={restaurante} />
                  ))}
                </motion.div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-white text-lg">
                    No hay restaurantes con esa calificación.
                  </p>
                  <motion.button
                    onClick={() => setFiltroRating(0)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-5 inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-white"
                    style={glassActive}
                  >
                    Ver todos
                  </motion.button>
                </div>
              )}
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
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
              >
                {planesExperiencia.map((plan) => (
                  <motion.div
                    key={plan.id}
                    variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="spotlight-card rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col h-full"
                    style={glassCard}
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={plan.imagen}
                        alt={plan.nombre}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-6 sm:p-7 flex flex-col flex-grow text-center">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                        {plan.nombre}
                      </h3>

                      <p className="text-sm text-white mb-4 flex-grow">
                        {plan.descripcion}
                      </p>

                      <motion.a
                        href="/contacto"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full inline-flex items-center justify-center py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300"
                        style={glassActive}
                      >
                        Solicitar Plan
                      </motion.a>
                    </div>
                  </motion.div>
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

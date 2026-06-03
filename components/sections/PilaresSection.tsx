'use client';
 
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PilarBadge } from '@/components/ui/PilarBadge';
import { PilarType } from '@/types';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Image from 'next/image';
 
interface PilarInfo {
  id: PilarType;
  nombre: string;
  descripcion: string;
  descripcionLarga: string;
  icono: React.ReactNode;
  color: string;
  imagen: string;
  caracteristicas: string[];
}
 
const iconoCultura = (
  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
  </svg>
);
const iconoNaturaleza = (
  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const iconoGastronomia = (
  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);
const iconoBienestar = (
  <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
 
export const PilaresSection: React.FC = () => {
  const [pilarSeleccionado, setPilarSeleccionado] = useState<PilarType>('cultura');
 
  const pilares: PilarInfo[] = [
    {
      id: 'cultura',
      nombre: 'Cultura',
      descripcion: 'Historia, arte y tradición',
      descripcionLarga: 'Descubre el rico patrimonio cultural de Cali y el Valle del Cauca. Desde la arquitectura colonial hasta el arte contemporáneo, nuestras rutas culturales te permiten conectar con la identidad y el espíritu de nuestra región.',
      icono: iconoCultura,
      color: 'bg-pilar-cultura-primary',
      imagen: '/images/pilares/cultura.jpg',
      caracteristicas: ['Patrimonio Histórico', 'Museos y Galerías', 'Arquitectura Colonial', 'Eventos Culturales'],
    },
    {
      id: 'naturaleza',
      nombre: 'Naturaleza',
      descripcion: 'Paisajes y biodiversidad',
      descripcionLarga: 'Explora los ecosistemas únicos del Valle del Cauca. Desde cascadas cristalinas hasta bosques tropicales, nuestras rutas ecológicas te acercan a la naturaleza mientras promueven la conservación y el turismo sostenible.',
      icono: iconoNaturaleza,
      color: 'bg-pilar-naturaleza-primary',
      imagen: '/images/pilares/naturaleza.jpg',
      caracteristicas: ['Senderismo', 'Cascadas', 'Biodiversidad', 'Conservación'],
    },
    {
      id: 'gastronomia',
      nombre: 'Gastronomía',
      descripcion: 'Sabores y experiencias culinarias',
      descripcionLarga: 'Degusta los sabores auténticos del Pacífico colombiano. Nuestras rutas gastronómicas te llevan a mercados locales, restaurantes tradicionales y experiencias culinarias que cuentan la historia de nuestro territorio.',
      icono: iconoGastronomia,
      color: 'bg-pilar-gastronomia-primary',
      imagen: '/images/pilares/gastronomia.jpg',
      caracteristicas: ['Comida Local', 'Mercados Tradicionales', 'Talleres Gastronómicos', 'Restaurantes Auténticos'],
    },
    {
      id: 'bienestar',
      nombre: 'Bienestar',
      descripcion: 'Relajación y salud integral',
      descripcionLarga: 'Rejuvenece cuerpo y mente en nuestras rutas de bienestar. Yoga, meditación, spas naturales y termas geotérmicas te invitan a encontrar equilibrio y paz en un ambiente de armonía natural.',
      icono: iconoBienestar,
      color: 'bg-pilar-bienestar-primary',
      imagen: '/images/pilares/bienestar.jpg',
      caracteristicas: ['Yoga y Meditación', 'Spas Naturales', 'Bienestar Integral', 'Retiros Espirituales'],
    },
  ];
 
  const pilarActual = pilares.find((p) => p.id === pilarSeleccionado)!;

  // Color de cada pilar (design system) para acentos y glow
  const colorHex: Record<PilarType, string> = {
    cultura: '#8B5CF6',
    naturaleza: '#10B981',
    gastronomia: '#EF4444',
    bienestar: '#06B6D4',
  };
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
 
  return (
    <section className="section bg-[#0A1636]">
      <div className="container-custom">
        <SectionTitle
          titulo="Nuestros 4 Pilares"
          subtitulo="Descubre las cuatro dimensiones que conforman nuestra propuesta de turismo sostenible"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />
 
        {/* Botones filtro — más separados del detalle */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20 sm:mb-24 items-stretch"
        >
          {pilares.map((pilar) => {
            const activo = pilarSeleccionado === pilar.id;
            const hex = colorHex[pilar.id];
            return (
              <motion.button
                key={pilar.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPilarSeleccionado(pilar.id)}
                className="relative rounded-2xl transition-all duration-300 overflow-hidden group text-center flex flex-col items-center justify-center gap-3 px-4 py-6 min-h-[200px]"
                style={
                  activo
                    ? {
                        background: `linear-gradient(135deg, ${hex}33 0%, ${hex}14 100%)`,
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: `1px solid ${hex}80`,
                        boxShadow: `0 8px 32px ${hex}3D, 0 0 24px ${hex}40`,
                      }
                    : {
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }
                }
              >
                {/* Acento superior con el color del pilar */}
                <span
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
                  style={{ background: hex, opacity: activo ? 1 : 0 }}
                />
                <div
                  className="transition-transform duration-300 group-hover:scale-110"
                  style={{ color: hex }}
                >
                  {pilar.icono}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{pilar.nombre}</h3>
                <p className={`text-sm leading-relaxed max-w-[220px] ${activo ? 'text-white/80' : 'text-white/50'}`}>
                  {pilar.descripcion}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
 
        {/* Detalle del pilar */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pilarSeleccionado}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-[430px]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl group"
            >
              <Image src={pilarActual.imagen} alt={pilarActual.nombre} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(135deg, ${colorHex[pilarActual.id]}40 0%, rgba(0,0,0,0.35) 100%)` }}
              />
            </motion.div>
 
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{pilarActual.nombre}</h2>
              <p className="text-lg text-white/70 mb-6 leading-relaxed">{pilarActual.descripcionLarga}</p>
              <div className="mb-10">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Características:
                </h3>

                <div className="flex flex-wrap gap-2">
                  {pilarActual.caracteristicas.map((caracteristica) => (
                    <span
                      key={caracteristica}
                      className="inline-flex items-center rounded-full px-5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors"
                      style={{
                        background: `${colorHex[pilarActual.id]}1F`,
                        border: `1px solid ${colorHex[pilarActual.id]}59`,
                      }}
                    >
                      {caracteristica}
                    </span>
                  ))}
                </div>
              </div>
              <motion.a
                href="#rutas"
                whileHover={{ scale: 1.00, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="btn-glass-primary"
              >
                <span>Explorar Rutas</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
 
export default PilaresSection;
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonios } from '@/data/testimonios';
import { SectionTitle } from '@/components/ui/SectionTitle';

const glassCard = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

export const TestimoniosSection: React.FC = () => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % testimonios.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [autoplay]);

  const testimonio = testimonios[indiceActual];

  return (
    <section id="testimonios" className="section bg-[#0A1636]">
      <div className="container-custom">
        <SectionTitle
          titulo="Lo Que Dicen Nuestros Visitantes"
          subtitulo="Experiencias auténticas de turistas que han explorado nuestro valle"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        {/* CARRUSEL */}
        <motion.div
          className="relative mb-10 sm:mb-12"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonio.id}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl px-8 sm:px-12 py-10 sm:py-12 min-h-[320px] flex items-center"
              style={glassCard}
            >
              <div className="grid lg:grid-cols-[180px_minmax(0,1fr)] gap-10 lg:gap-12 w-full items-center">
                {/* AVATAR */}
                <div className="flex justify-center">
                  <div
                    className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden"
                    style={{
                      border: '2px solid rgba(249,115,22,0.4)',
                      boxShadow: '0 0 24px rgba(249,115,22,0.2)',
                    }}
                  >
                    <img
                      src={testimonio.avatar}
                      alt={testimonio.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* CONTENIDO */}
                <div className="flex flex-col justify-center w-full min-w-0 px-1 sm:px-2 lg:px-0">
                  {/* estrellas */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonio.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-white/20'
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    {testimonio.nombre}
                  </h3>

                  <div className="text-white/50 mb-5">
                    {testimonio.bandera} {testimonio.pais}
                  </div>

                  {/* TEXTO CON ANCHO MÁXIMO PARA QUE CORTE ANTES */}
                  <div className="max-w-[44ch] sm:max-w-[52ch]">
                    <p className="text-white/70 italic leading-relaxed text-sm sm:text-base break-words">
                      "{testimonio.comentario}"
                    </p>
                  </div>

                  {testimonio.rutaVisitada && (
                    <div
                      className="mt-5 inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white"
                      style={{
                        background: 'rgba(249,115,22,0.2)',
                        border: '1px solid rgba(249,115,22,0.4)',
                      }}
                    >
                      Visitó: {testimonio.rutaVisitada.replace(/-/g, ' ')}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* BOTONES MÁS ADENTRO */}
          <button
            onClick={() =>
              setIndiceActual(
                (prev) => (prev - 1 + testimonios.length) % testimonios.length
              )
            }
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10"
            style={{
              background: 'rgba(249,115,22,0.3)',
              border: '1px solid rgba(249,115,22,0.5)',
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() =>
              setIndiceActual((prev) => (prev + 1) % testimonios.length)
            }
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center z-10"
            style={{
              background: 'rgba(249,115,22,0.3)',
              border: '1px solid rgba(249,115,22,0.5)',
            }}
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>

        {/* SEPARADOR */}
        <div className="h-10 sm:h-12" />

        {/* INDICADORES */}
        <div className="flex justify-center gap-2">
          {testimonios.map((_, index) => (
            <button
              key={index}
              onClick={() => setIndiceActual(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === indiceActual
                  ? 'w-8 bg-orange-400'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimoniosSection;
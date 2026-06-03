'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { aliados } from '@/data/aliados';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import Image from 'next/image';

export const AliadosSection: React.FC = () => {
  const categorias = ['gobierno', 'academia', 'empresa', 'ong'] as const;

  const aliadosPorCategoria = categorias.map((cat) => ({
    categoria: cat,
    aliados: aliados.filter((a) => a.categoria === cat),
  }));

  const categoryLabels: Record<string, string> = {
    gobierno: 'Gobierno',
    academia: 'Academia',
    empresa: 'Empresa',
    ong: 'ONG',
  };

  // Iconos SVG por categoría
  const categoryIcons: Record<string, React.ReactNode> = {
    gobierno: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
    academia: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    empresa: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    ong: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
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
    <section id="aliados" className="section">
      <div className="container-custom">
        <SectionTitle
          titulo="Nuestros Aliados"
          subtitulo="Instituciones y organizaciones que hacen posible el turismo sostenible en el Valle del Cauca"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        <div className="space-y-10">
          {aliadosPorCategoria.map(({ categoria, aliados: aliadosCat }) => (
            aliadosCat.length > 0 && (
              <ScrollReveal key={categoria}>
                {/* Cabecera de categoría */}
                <div className="flex items-center gap-3 mb-5 px-1">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg text-red-500"
                    style={{ background: 'rgba(255, 41, 0,0.12)', border: '1px solid rgba(255, 41, 0,0.2)' }}>
                    {categoryIcons[categoria]}
                  </div>
                  <h3 className="text-base font-semibold text-white/80 tracking-wide uppercase"
                    style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '0.08em' }}>
                    {categoryLabels[categoria]}
                  </h3>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* Grid de aliados */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
                >
                  {aliadosCat.map((aliado) => (
                    <motion.div
                      key={aliado.id}
                      variants={itemVariants}
                      whileHover={{ y: -4, scale: 1.02 }}
                      className="group flex flex-col items-center justify-center gap-3 rounded-xl py-4 px-3 text-center transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        minHeight: '100px',
                      }}
                    >
                      {/* Logo */}
                      <div className="relative w-14 h-10 flex-shrink-0">
                        <Image
                          src={aliado.logo}
                          alt={aliado.nombre}
                          fill
                          className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                        />
                      </div>

                      {/* Nombre */}
                      <p className="text-xs font-medium text-white/60 group-hover:text-white/90 transition-colors duration-300 leading-tight"
                        style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {aliado.nombre}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </ScrollReveal>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default AliadosSection;

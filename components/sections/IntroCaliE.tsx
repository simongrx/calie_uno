'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};

// Puntos clave que resumen "qué es Cali-e" (placeholder editable).
const claves = [
  {
    titulo: 'Turismo con propósito',
    descripcion:
      'Conectamos viajeros con experiencias auténticas del Valle del Cauca alrededor de cultura, naturaleza, gastronomía y bienestar.',
    icono: 'M12 21c4.97-4.13 8-7.63 8-11a8 8 0 10-16 0c0 3.37 3.03 6.87 8 11z M12 11a2 2 0 100-4 2 2 0 000 4z',
  },
  {
    titulo: 'Impacto en la comunidad',
    descripcion:
      'Cada ruta, sabor y evento impulsa la economía local: empleos, saberes y comunidades fortalecidas.',
    icono: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 100-8 4 4 0 000 8z',
  },
  {
    titulo: 'Una plataforma, dos caminos',
    descripcion:
      'Si quieres viajar, te esperan nuestras rutas y experiencias. Si quieres sumar, hazte parte como asociado, aliado o benefactor.',
    icono: 'M8 7h12m0 0l-4-4m4 4l-4 4m4 6H4m0 0l4 4m-4-4l4-4',
  },
];

/**
 * Bloque de introducción "¿Qué es Cali-e?" para la página de Inicio.
 * Copy condensado de NosotrosSection, orientado a público general antes de segmentar.
 */
export const IntroCaliE: React.FC = () => {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="¿Qué es Cali-e?"
          subtitulo="Una corporación ciudadana que enamora al mundo del Valle del Cauca a través del turismo experiencial y sostenible"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-white sm:text-xl">
            <span className="font-semibold text-white">Cali Enamora</span> nace para mostrar el
            Valle del Cauca como un destino vivo, diverso y sostenible. Unimos a viajeros,
            comunidades, empresas y aliados alrededor de un mismo propósito: crear experiencias
            que generen valor cultural, social y ambiental para la región.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 sm:gap-8">
          {claves.map((clave, i) => (
            <motion.div
              key={clave.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="spotlight-card flex flex-col rounded-2xl p-7"
              style={glassCard}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-brand-orange"
                style={{ background: 'rgba(255,41,0,0.12)' }}
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d={clave.icono} />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{clave.titulo}</h3>
              <p className="text-sm leading-relaxed text-white">{clave.descripcion}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntroCaliE;

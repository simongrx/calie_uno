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

// Hitos del origen de Cali-e (placeholder editable).
const hitos = [
  {
    anio: '2021',
    titulo: 'Una idea que enamora',
    texto:
      'Un grupo de vallecaucanos apasionados por su tierra se propone mostrar el Valle del Cauca desde una mirada distinta: auténtica, sostenible y con las comunidades en el centro.',
  },
  {
    anio: '2022',
    titulo: 'De la idea a la corporación',
    texto:
      'Nace formalmente Cali Enamora como corporación ciudadana, articulando aliados públicos, privados y académicos alrededor de cuatro pilares.',
  },
  {
    anio: '2023',
    titulo: 'Primeras rutas y experiencias',
    texto:
      'Diseñamos las primeras rutas experienciales junto a guías locales, restaurantes y gestores culturales, generando empleo e ingresos en el territorio.',
  },
  {
    anio: 'Hoy',
    titulo: 'Un movimiento en crecimiento',
    texto:
      'Cali Enamora es una plataforma viva que conecta viajeros, comunidades y benefactores para seguir transformando el turismo de la región.',
  },
];

/**
 * "Cómo nació Cali-e" — narrativa de origen en formato timeline vertical.
 * Copy placeholder listo para reemplazar por la historia real.
 */
export const OrigenSection: React.FC = () => {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Cómo nació Cali Enamora"
          subtitulo="La historia de un proyecto que convierte el amor por el Valle del Cauca en oportunidades reales"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Línea vertical */}
          <div
            className="absolute left-4 top-2 bottom-2 w-px sm:left-1/2"
            style={{ background: 'linear-gradient(180deg, rgba(255,41,0,0.5), rgba(255,255,255,0.08))' }}
          />

          <div className="flex flex-col gap-8">
            {hitos.map((hito, i) => (
              <motion.div
                key={hito.anio}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative pl-12 sm:w-1/2 sm:pl-0 ${
                  i % 2 === 0 ? 'sm:self-start sm:pr-10 sm:text-right' : 'sm:self-end sm:pl-10'
                }`}
              >
                {/* Punto */}
                <span
                  className={`absolute left-2.5 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white/30 sm:left-auto ${
                    i % 2 === 0 ? 'sm:-right-[7px]' : 'sm:-left-[7px]'
                  }`}
                  style={{ background: '#ff2900', boxShadow: '0 0 14px rgba(255,41,0,0.6)' }}
                />
                <div className="spotlight-card rounded-2xl p-6" style={glassCard}>
                  <span className="text-gradient-brand text-sm font-extrabold uppercase tracking-wide">
                    {hito.anio}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-white">{hito.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white">{hito.texto}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrigenSection;

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
};
const glassActive: React.CSSProperties = {
  background: 'rgba(255, 41, 0, 0.26)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
};

const valores = [
  {
    titulo: 'Sostenibilidad',
    descripcion:
      'Cada experiencia se diseña para proteger los ecosistemas y dejar una huella positiva en el territorio.',
    icono: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 0c3 4 3 14 0 20m0-20c-3 4-3 14 0 20',
  },
  {
    titulo: 'Comunidad',
    descripcion:
      'Trabajamos de la mano con las comunidades locales: sus saberes, su gente y su economía son el corazón de cada ruta.',
    icono: 'M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1a4 4 0 100-8 4 4 0 000 8z',
  },
  {
    titulo: 'Autenticidad',
    descripcion:
      'Mostramos el Valle del Cauca real: su cultura viva, su biodiversidad y sus sabores, sin artificios.',
    icono: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
  },
  {
    titulo: 'Impacto',
    descripcion:
      'Medimos lo que hacemos: empleos, ingresos y comunidades fortalecidas a través del turismo responsable.',
    icono: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
  },
];

const stats = [
  { num: '342', label: 'Empleos creados' },
  { num: '12', label: 'Comunidades aliadas' },
  { num: '15K+', label: 'Turistas al año' },
  { num: '100%', label: 'Turismo sostenible' },
];

export const NosotrosSection: React.FC = () => {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Quiénes Somos"
          subtitulo="Una plataforma de turismo experiencial que enamora a Cali y el Valle del Cauca con el mundo"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="text-lg leading-relaxed text-white/70 sm:text-xl">
            <span className="font-semibold text-white">Cali Enamora</span> nace para mostrar el
            Valle del Cauca como un destino vivo, diverso y sostenible. Conectamos viajeros con
            experiencias auténticas alrededor de cuatro pilares —cultura, naturaleza, gastronomía y
            bienestar— mientras impulsamos a las comunidades que hacen única a nuestra región.
          </p>
        </motion.div>

        {/* Misión / Visión */}
        <div className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8">
          {[
            {
              titulo: 'Nuestra Misión',
              texto:
                'Transformar la forma de viajar por el Valle del Cauca creando experiencias responsables que generen valor económico, social y ambiental para sus comunidades.',
            },
            {
              titulo: 'Nuestra Visión',
              texto:
                'Ser la plataforma referente de turismo sostenible del suroccidente colombiano, reconocida por enamorar al mundo de Cali y su región.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.titulo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="spotlight-card rounded-2xl p-8"
              style={glassCard}
            >
              <h3 className="mb-3 text-2xl font-bold text-white">{item.titulo}</h3>
              <p className="leading-relaxed text-white/65">{item.texto}</p>
            </motion.div>
          ))}
        </div>

        {/* Valores */}
        <h3 className="mb-8 text-center text-2xl font-bold text-white sm:text-3xl">
          Nuestros Valores
        </h3>
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((valor, i) => (
            <motion.div
              key={valor.titulo}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="spotlight-card flex flex-col rounded-2xl p-6"
              style={glassCard}
            >
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={glassActive}
              >
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={valor.icono} />
                </svg>
              </div>
              <h4 className="mb-2 text-lg font-bold text-white">{valor.titulo}</h4>
              <p className="text-sm leading-relaxed text-white/60">{valor.descripcion}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="spotlight-card rounded-2xl p-6 text-center"
              style={glassCard}
            >
              <div className="mb-1 text-3xl font-extrabold text-white sm:text-4xl">{stat.num}</div>
              <div className="text-sm text-white/55">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={glassActive}
          >
            Hablemos de tu próxima experiencia
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NosotrosSection;

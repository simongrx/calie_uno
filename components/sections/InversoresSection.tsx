'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MagnifiedBento } from '@/components/ui/magnified-bento';

const glassCard: React.CSSProperties = {
  background: 'rgba(10, 22, 54, 0.55)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

// Iconos SVG inline (sin dependencias)
const icoInfra = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V8m4 13V8m6 13V8m4 13V8M3 8l9-5 9 5" /></svg>
);
const icoExp = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l1.5 4L11 8.5 6.5 10 5 14l-1.5-4L-1 8.5 3.5 7 5 3zM17 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" /></svg>
);
const icoPlataforma = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25V21m6-3.75V21M4.5 3h15a1.5 1.5 0 011.5 1.5v10A1.5 1.5 0 0119.5 16h-15A1.5 1.5 0 013 14.5v-10A1.5 1.5 0 014.5 3z" /></svg>
);
const icoCapacit = (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0v7m-5-9.2v4.2c0 1.1 2.24 2 5 2s5-.9 5-2v-4.2" /></svg>
);

const lineas = [
  { titulo: 'Infraestructura', roi: '+400%', plazo: '24-36 meses', icon: icoInfra },
  { titulo: 'Experiencias', roi: '+300%', plazo: '12-18 meses', icon: icoExp },
  { titulo: 'Plataforma Digital', roi: '+250%', plazo: '18-24 meses', icon: icoPlataforma },
  { titulo: 'Capacitación', roi: '+150%', plazo: '6-12 meses', icon: icoCapacit },
];

const temas = [
  ['Experiencias Inmersivas', 'Plataforma Digital', 'Infraestructura', 'Capacitación'],
  ['Eco-hospedajes', 'Bienestar', 'Cultura', 'Gastronomía'],
  ['Tecnología', 'Sostenibilidad', 'Empleo Local', 'Comunidades'],
];

function StatBox({ num, label }: { num: string; label: string }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="spotlight-card col-span-1 flex flex-col justify-center rounded-3xl p-5 text-center"
      style={glassCard}
    >
      <span className="text-gradient-brand text-3xl font-extrabold sm:text-4xl">{num}</span>
      <p className="mt-1.5 text-xs leading-snug text-white/60 sm:text-sm">{label}</p>
    </motion.div>
  );
}

export const InversoresSection: React.FC = () => {
  return (
    <section className="section bg-transparent relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionTitle
          titulo="Oportunidades de Inversión"
          subtitulo="Una iniciativa de impacto con retorno financiero sostenible en el turismo experiencial del Valle"
          alineacion="center"
          conLinea={true}
          className="mb-10 sm:mb-14"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid auto-rows-[164px] grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4"
        >
          {/* Lente interactivo — Focos de inversión (grande) */}
          <motion.div variants={itemVariants} className="col-span-2 row-span-2">
            <MagnifiedBento
              title="Focos de Inversión"
              description="Arrastra la lupa para explorar las áreas donde construimos valor."
              rows={temas}
              className="h-full"
            />
          </motion.div>

          {/* +12% crecimiento (ancho) */}
          <motion.div
            variants={itemVariants}
            className="spotlight-card col-span-2 flex flex-col justify-center rounded-3xl p-6"
            style={glassCard}
          >
            <span className="text-gradient-brand text-4xl font-extrabold sm:text-5xl">+12%</span>
            <p className="mt-2 text-sm text-white/70">Crecimiento anual del turismo experiencial global</p>
          </motion.div>

          {/* Stats */}
          <StatBox num="2M+" label="Turistas/año en la región" />
          <StatBox num="100%" label="Enfoque sostenible" />

          {/* 4 líneas de inversión */}
          {lineas.map((l) => (
            <motion.div
              key={l.titulo}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="spotlight-card group col-span-1 flex flex-col justify-between rounded-3xl p-5"
              style={glassCard}
            >
              <div className="flex items-start justify-between">
                <span
                  className="inline-flex rounded-xl p-2 text-brand-orange transition-transform duration-300 group-hover:scale-110 [&>svg]:h-5 [&>svg]:w-5"
                  style={{ background: 'rgba(255,41,0,0.12)' }}
                >
                  {l.icon}
                </span>
                <span className="text-gradient-brand text-2xl font-extrabold sm:text-3xl">{l.roi}</span>
              </div>
              <div>
                <h4 className="text-sm font-bold leading-snug text-white sm:text-base">{l.titulo}</h4>
                <p className="mt-1 text-xs text-white/45">ROI estimado · {l.plazo}</p>
              </div>
            </motion.div>
          ))}

          {/* 85% demanda */}
          <StatBox num="85%" label="Demanda turística insatisfecha" />

          {/* CTA */}
          <motion.div
            variants={itemVariants}
            className="spotlight-card col-span-2 flex flex-col items-start justify-center gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between lg:col-span-3"
            style={glassCard}
          >
            <div>
              <h4 className="text-lg font-bold text-white sm:text-xl">Impacto real, potencial global</h4>
              <p className="mt-1 max-w-xl text-sm text-white/60">
                Un modelo turístico rentable, escalable y con impacto social positivo a largo plazo.
              </p>
            </div>
            <motion.a
              href="#contacto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-glass-primary shrink-0"
            >
              Conversemos
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default InversoresSection;

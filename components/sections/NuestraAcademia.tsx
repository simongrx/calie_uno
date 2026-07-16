'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

// ============================================
// Estilos glass (mismo lenguaje visual del resto de secciones)
// ============================================
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

const glassInactive: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.08)',
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '9999px',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 8px 22px rgba(0,0,0,0.22)',
};

// Carta destacada (fase activa del modelo): acento rojo de marca + glow
const glassFaseActiva: React.CSSProperties = {
  background: 'rgba(255, 41, 0, 0.16)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 41, 0, 0.55)',
  boxShadow: '0 0 40px rgba(255, 41, 0, 0.28), 0 8px 32px rgba(0, 0, 0, 0.35)',
};

// ============================================
// Iconos (SVG inline, estilo del proyecto: stroke currentColor, 1.5)
// ============================================
const svgProps = {
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  viewBox: '0 0 24 24',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const iconLibro = (
  <svg {...svgProps}><path d="M12 6.5C12 5.12 10.88 4 9.5 4H4v13h6c1.1 0 2 .9 2 2m0-14.5V19m0-12.5C12 5.12 13.12 4 14.5 4H20v13h-6c-1.1 0-2 .9-2 2" /></svg>
);
const iconMaletin = (
  <svg {...svgProps}><path d="M4 7h16v12H4z" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M4 12h16" /></svg>
);
const iconBombilla = (
  <svg {...svgProps}><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.4c.5.5 1 1.4 1 2.6h6c0-1.2.5-2.1 1-2.6A6 6 0 0 0 12 3z" /></svg>
);
const iconRed = (
  <svg {...svgProps}><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="19" r="2.5" /><circle cx="19" cy="19" r="2.5" /><path d="M10.3 6.8 6.7 16.4M13.7 6.8l3.6 9.6" /></svg>
);
const iconCohete = (
  <svg {...svgProps}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 8-10c1.5 0 3 1.5 3 3a22 22 0 0 1-10 8z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
);
const iconObjetivo = (
  <svg {...svgProps}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="0.6" /></svg>
);
const iconPilares = (
  <svg {...svgProps}><path d="M3 21h18M5 21V8m4 13V8m6 13V8m4 13V8M3 8l9-5 9 5" /></svg>
);
const iconModelo = (
  <svg {...svgProps}><path d="M3 17l6-6 4 4 7-8" /><path d="M14 7h6v6" /></svg>
);
const iconFlecha = (
  <svg {...svgProps} strokeWidth={2}><path d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
);

// ============================================
// Datos tipados
// ============================================
interface QuickCard {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

interface Pilar {
  titulo: string;
  descripcion: string;
  icono: React.ReactNode;
}

interface Fase {
  numero: number;
  titulo: string;
  descripcion: string;
  activa?: boolean;
}

interface Metrica {
  valor: string;
  label: string;
}

type TabId = 'pilares' | 'modelo' | 'impacto';

const quickCards: QuickCard[] = [
  { titulo: 'Propósito', descripcion: 'Desarrollar capacidades en el ecosistema turístico-cultural', icono: iconObjetivo },
  { titulo: '5 Pilares', descripcion: 'Formación, empresarial, innovación, articulación, escalamiento', icono: iconPilares },
  { titulo: 'Modelo', descripcion: 'Activación → Desarrollo → Escalamiento', icono: iconModelo },
];

const pilares: Pilar[] = [
  { titulo: 'Formación y profesionalización', descripcion: 'Del ecosistema turístico-cultural', icono: iconLibro },
  { titulo: 'Fortalecimiento empresarial', descripcion: 'Desarrollo de experiencias diferenciadas', icono: iconMaletin },
  { titulo: 'Innovación y transformación', descripcion: 'Sostenibilidad y transformación digital', icono: iconBombilla },
  { titulo: 'Articulación territorial', descripcion: 'Conectando actores y territorios', icono: iconRed },
  { titulo: 'Escalamiento y posicionamiento', descripcion: 'Nacional e internacional', icono: iconCohete },
];

const fases: Fase[] = [
  { numero: 1, titulo: 'Activación', descripcion: 'Nivelación, diagnóstico y fortalecimiento base' },
  { numero: 2, titulo: 'Desarrollo', descripcion: 'Especialización, mentorías y diseño de experiencias', activa: true },
  { numero: 3, titulo: 'Escalamiento', descripcion: 'Comercialización, aceleración e internacionalización' },
];

const metricas: Metrica[] = [
  { valor: '100+', label: 'Actores fortalecidos' },
  { valor: '∞', label: 'Nuevas oportunidades de negocio' },
  { valor: '📈', label: 'Mayor competitividad territorial' },
  { valor: '✓', label: 'Experiencias turísticas diferenciadas' },
];

const tabs: { id: TabId; label: string }[] = [
  { id: 'pilares', label: 'Pilares' },
  { id: 'modelo', label: 'Modelo de Evolución' },
  { id: 'impacto', label: 'Impacto' },
];

// ============================================
// Variantes de animación (consistentes con el resto de secciones)
// ============================================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};
const fadeContent: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

interface NuestraAcademiaProps {
  className?: string;
}

export const NuestraAcademia: React.FC<NuestraAcademiaProps> = ({ className = '' }) => {
  const [tabActivo, setTabActivo] = useState<TabId>('pilares');

  return (
    <section id="academia" className={`section bg-transparent relative overflow-hidden ${className}`}>
      <div className="container-custom">
        {/* ============ HERO ============ */}
        <SectionTitle
          titulo="Academia Cali Enamora"
          subtitulo="La Academia Cali Enamora es el eje de formación, fortalecimiento empresarial y transferencia de conocimiento de la corporación. Su propósito es desarrollar capacidades en los actores del ecosistema turístico y cultural del Valle del Cauca, impulsando experiencias sostenibles, innovación territorial y modelos de negocio escalables."
          alineacion="center"
          conLinea
          className="mb-12 sm:mb-16"
        />

        {/* ============ QUICK CARDS ============ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mb-14 grid grid-cols-1 gap-6 sm:mb-16 md:grid-cols-3"
        >
          {quickCards.map((card) => (
            <motion.div
              key={card.titulo}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="spotlight-card flex flex-col items-center rounded-2xl p-6 text-center transition-colors duration-300 sm:p-7"
              style={glassCard}
            >
              <div className="spotlight-card mb-4 inline-flex rounded-xl p-3 text-brand-orange [&>svg]:h-8 [&>svg]:w-8" style={{ background: 'rgba(255, 41, 0, 0.12)' }}>
                {card.icono}
              </div>
              <h3 className="mb-2 text-lg font-bold text-white">{card.titulo}</h3>
              <p className="text-sm text-white">{card.descripcion}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ============ TABS ============ */}
        <div className="mb-8 flex flex-wrap justify-center gap-4 sm:mb-10 sm:gap-6">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setTabActivo(tab.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="min-h-[56px] rounded-2xl px-7 text-base font-semibold text-white transition-all duration-300"
              style={tabActivo === tab.id ? glassActive : glassInactive}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* ============ CONTENIDO DE TABS ============ */}
        <AnimatePresence mode="wait">
          {/* ---- TAB: PILARES ---- */}
          {tabActivo === 'pilares' && (
            <motion.div key="pilares" variants={fadeContent} initial="hidden" animate="visible" exit="exit">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5"
              >
                {pilares.map((pilar) => (
                  <motion.div
                    key={pilar.titulo}
                    variants={itemVariants}
                    whileHover={{ y: -6 }}
                    className="spotlight-card group flex h-full flex-col items-center rounded-2xl border border-transparent p-6 text-center transition-all duration-300 hover:border-[rgba(255,41,0,0.4)] hover:shadow-[0_0_40px_rgba(255,41,0,0.18)]"
                    style={glassCard}
                  >
                    <div className="spotlight-card mb-4 inline-flex rounded-xl p-3 text-brand-orange transition-transform duration-300 group-hover:scale-110 [&>svg]:h-7 [&>svg]:w-7" style={{ background: 'rgba(255, 41, 0, 0.12)' }}>
                      {pilar.icono}
                    </div>
                    <h4 className="mb-2 text-base font-bold leading-snug text-white">{pilar.titulo}</h4>
                    <p className="text-sm text-white">{pilar.descripcion}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ---- TAB: MODELO ---- */}
          {tabActivo === 'modelo' && (
            <motion.div
              key="modelo"
              variants={fadeContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col items-stretch gap-4 md:flex-row md:items-stretch md:gap-2"
            >
              {fases.map((fase, i) => (
                <React.Fragment key={fase.titulo}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="spotlight-card flex flex-1 flex-col items-center rounded-2xl p-7 text-center transition-all duration-300"
                    style={fase.activa ? glassFaseActiva : glassCard}
                  >
                    <span
                      className="spotlight-card mb-4 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white"
                      style={fase.activa ? { background: '#FF2900' } : { background: 'rgba(255,255,255,0.1)' }}
                    >
                      {fase.numero}
                    </span>
                    <h4 className="mb-2 text-xl font-bold text-white">{fase.titulo}</h4>
                    <p className="text-sm text-white">{fase.descripcion}</p>
                    {fase.activa && (
                      <span className="spotlight-card mt-4 rounded-full px-4 py-1 text-xs font-semibold text-brand-orange" style={{ background: 'rgba(255,41,0,0.18)' }}>
                        Fase activa
                      </span>
                    )}
                  </motion.div>

                  {/* Conector entre fases (solo desktop) */}
                  {i < fases.length - 1 && (
                    <div className="hidden items-center justify-center px-1 text-brand-orange md:flex [&>svg]:h-7 [&>svg]:w-7">
                      {iconFlecha}
                    </div>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          )}

          {/* ---- TAB: IMPACTO ---- */}
          {tabActivo === 'impacto' && (
            <motion.div key="impacto" variants={fadeContent} initial="hidden" animate="visible" exit="exit">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {metricas.map((m) => (
                  <motion.div
                    key={m.label}
                    variants={itemVariants}
                    whileHover={{ scale: 1.04, y: -4 }}
                    className="spotlight-card flex flex-col items-center justify-center rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,41,0,0.18)]"
                    style={glassCard}
                  >
                    <span className="text-gradient-brand mb-2 text-4xl font-extrabold sm:text-5xl">{m.valor}</span>
                    <p className="text-sm text-white">{m.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ============ CTA ============ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="spotlight-card mt-16 flex flex-col items-center rounded-2xl p-8 text-center sm:mt-20 sm:p-12"
          style={glassCard}
        >
          <h3 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
            ¿Listo para transformar tu negocio?
          </h3>
          <p className="mb-7 max-w-2xl text-base text-white">
            Únete a más de 100 actores que ya fortalecen sus capacidades con la Academia Cali Enamora
          </p>
          <motion.a
            href="/contacto"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-glass-primary"
          >
            Conoce nuestros programas
            <span className="[&>svg]:h-4 [&>svg]:w-4">{iconFlecha}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default NuestraAcademia;

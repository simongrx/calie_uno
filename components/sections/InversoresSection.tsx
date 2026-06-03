'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const glassCard = {
  background: 'rgba(10, 22, 54, 0.55)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
};

export const InversoresSection: React.FC = () => {
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

  const oportunidades = [
    {
      id: 'experiencias',
      titulo: 'Experiencias Inmersivas',
      descripcion:
        'Desarrollo de rutas premium y experiencias personalizadas de alto valor',
      roi: '+300%',
      plazo: '12-18 meses',
    },
    {
      id: 'tecnologia',
      titulo: 'Plataforma Digital',
      descripcion:
        'App móvil y web con reservas, pagos y recomendaciones en tiempo real',
      roi: '+250%',
      plazo: '18-24 meses',
    },
    {
      id: 'infraestructura',
      titulo: 'Infraestructura Turística',
      descripcion:
        'Eco-hospedajes, centros de bienestar y espacios culturales sostenibles',
      roi: '+400%',
      plazo: '24-36 meses',
    },
    {
      id: 'capacitacion',
      titulo: 'Capacitación y Empleo',
      descripcion:
        'Programas de formación turística y generación de empleo local sostenible',
      roi: '+150%',
      plazo: '6-12 meses',
    },
  ];

  return (
    <section className="section bg-[#0A1636] relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* TITULO */}
        <SectionTitle
          titulo="Oportunidades de Inversión"
          subtitulo="Sé parte de una iniciativa de impacto con retorno financiero sostenible"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />

        {/* CONTENEDOR PRINCIPAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl py-10 px-6 sm:px-10 lg:px-14 mb-14 sm:mb-20 max-w-7xl mx-auto"
          style={glassCard}
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
            {/* IZQUIERDA */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="w-full max-w-xl text-right px-4 sm:px-8 py-4">
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6 leading-tight">
                  Turismo Experiencial es el Futuro
                </h3>

                <p className="text-sm sm:text-base text-white/75 mb-8 leading-relaxed ml-auto max-w-lg">
                  El mercado global de turismo experiencial crece a +12% anual.
                  Cali y el Valle del Cauca poseen los activos culturales,
                  gastronómicos y naturales para convertirse en destino de clase mundial.
                </p>

                <ul className="space-y-4">
                  {[
                    'Mercado regional de 2M+ de turistas anuales',
                    'Infraestructura aeroportuaria de clase mundial',
                    'Comunidades comprometidas con sostenibilidad',
                    'Diversidad única de experiencias',
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="text-white/80 leading-relaxed text-sm sm:text-base"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>

            {/* DERECHA */}
            <div className="w-full flex justify-center">
              <div
                className="rounded-3xl py-10 px-6 sm:px-10 w-full max-w-2xl"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <h4 className="text-2xl font-bold text-red-400 mb-8 text-center">
                  Números que Hablan
                </h4>

                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-white/80">
                        Demanda Turística
                      </span>

                      <span className="text-red-500 font-bold">
                        85%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-white/80">
                        Potencial de Crecimiento
                      </span>

                      <span className="text-red-500 font-bold">
                        +300%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="font-semibold text-white/80">
                        Sostenibilidad
                      </span>

                      <span className="text-red-500 font-bold">
                        100%
                      </span>
                    </div>

                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SEPARADOR */}
        <div className="h-14 sm:h-20" />

        {/* TITULO */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16">
          Líneas de Inversión Prioritarias
        </h3>

        {/* GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-24 max-w-6xl mx-auto"
        >
          {oportunidades.map((oportunidad) => (
            <ScrollReveal key={oportunidad.id} direction="up">
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="rounded-3xl min-h-[320px] px-8 sm:px-12 py-12 transition-all duration-300 flex items-center justify-center text-center"
                style={glassCard}
              >
                <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
                  <h4 className="text-2xl font-bold text-red-400 mb-6 leading-snug">
                    {oportunidad.titulo}
                  </h4>

                  <p className="text-white/70 leading-relaxed text-sm sm:text-base mb-10">
                    {oportunidad.descripcion}
                  </p>

                  <div className="grid grid-cols-2 gap-8 pt-6 border-t border-white/10 w-full">
                    <div className="text-center">
                      <p className="text-sm text-red-400 mb-2">
                        ROI Estimado
                      </p>

                      <p className="text-2xl font-bold text-red-500">
                        {oportunidad.roi}
                      </p>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-red-400 mb-2">
                        Plazo
                      </p>

                      <p className="text-base font-semibold text-white">
                        {oportunidad.plazo}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </motion.div>

        {/* SEPARADOR */}
        <div className="h-16 sm:h-24" />

        {/* TITULO */}
        <h3 className="text-2xl sm:text-3xl font-bold text-center text-white mb-12 sm:mb-16">
          Por Qué Invertir en Cali Enamora
        </h3>

        {/* CAJA UNICA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-3xl py-12 px-8 sm:px-14 text-center max-w-6xl mx-auto"
          style={glassCard}
        >
        <div className="w-full flex flex-col items-center justify-center text-center px-4 sm:px-10">            
            <h4 className="text-2xl sm:text-3xl font-bold text-red-400 mb-8">
              Un Proyecto con Impacto Real y Potencial Global
            </h4>

              <p className="text-white/75 leading-relaxed text-sm sm:text-lg text-center max-w-5xl">              
              Cali Enamora representa una oportunidad estratégica para invertir en el
              crecimiento del turismo experiencial del Valle del Cauca, integrando
              innovación, cultura, sostenibilidad y desarrollo económico. Nuestro enfoque
              conecta comunidades locales, experiencias auténticas y tecnología para
              construir un modelo turístico rentable, escalable y con impacto social
              positivo a largo plazo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InversoresSection;
'use client';
 
import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
 
interface StatItem {
  valor: number;
  sufijo: string;
  label: string;
  color: 'orange' | 'purple' | 'green' | 'red' | 'blue';
}

export const ImpactBar: React.FC = () => {
  const stats: StatItem[] = [
    {
      valor: 50,
      sufijo: '+',
      label: 'Rutas Turísticas',
      color: 'green',
    },
    {
      valor: 200,
      sufijo: '+',
      label: 'Aliados Estratégicos',
      color: 'purple',
    },
    {
      valor: 15,
      sufijo: 'K+',
      label: 'Turistas Anuales',
      color: 'red',
    },
    {
      valor: 4,
      sufijo: '',
      label: 'Pilares Principales',
      color: 'blue',
    },
  ];
 
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
 
  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };
 
  return (
    <section className="relative py-8 sm:py-10 lg:py-12 bg-gradient-premium-dark border-y border-white/10">
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:40px_40px]" />
      </div>
      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch"
        >
          {stats.map((stat, index) => (
            <motion.div key={stat.label} variants={itemVariants} whileHover={{ y: -8 }} className="text-center py-4 flex flex-col justify-center h-full">
              <div className="mb-2 sm:mb-3">
                <AnimatedCounter valor={stat.valor} sufijo={stat.sufijo} duracion={2500} tamaño="xl" color={stat.color} />
              </div>
              <p className="text-sm sm:text-base font-semibold text-white/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <motion.div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-white/10 blur-3xl" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} />
      <motion.div className="absolute bottom-0 right-0 w-40 h-40 rounded-full bg-white/10 blur-3xl" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 5, repeat: Infinity, delay: 1 }} />
    </section>
  );
};
 
export default ImpactBar;
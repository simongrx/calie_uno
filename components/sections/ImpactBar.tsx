'use client';

import React from 'react';
import { Marquee, type MarqueeStat } from '@/components/ui/marquee';

// Datos originales + extras (empleos, ingreso, comunidades, crecimiento, etc.)
const stats: MarqueeStat[] = [
  { num: '50+', label: 'Rutas Turísticas' },
  { num: '200+', label: 'Aliados Estratégicos' },
  { num: '15K+', label: 'Turistas Anuales' },
  { num: '4', label: 'Pilares' },
  { num: '342', label: 'Empleos Creados' },
  { num: '$2.3M', label: 'Ingreso Generado' },
  { num: '12', label: 'Comunidades' },
  { num: '+12%', label: 'Crecimiento Anual' },
  { num: '2M+', label: 'Turistas en la Región' },
  { num: '100%', label: 'Sostenible' },
];

export const ImpactBar: React.FC = () => {
  return <Marquee items={stats} />;
};

export default ImpactBar;

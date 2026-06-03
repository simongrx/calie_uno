'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type GradientColor = 'cultura' | 'naturaleza' | 'gastronomia' | 'bienestar';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
  gradientColor?: GradientColor;
  hover?: boolean;
}

/* Mapas con clases literales para que el scanner de Tailwind las detecte */
const gradientBg: Record<GradientColor, string> = {
  cultura: 'bg-gradient-cultura',
  naturaleza: 'bg-gradient-naturaleza',
  gastronomia: 'bg-gradient-gastronomia',
  bienestar: 'bg-gradient-bienestar',
};

const gradientGlow: Record<GradientColor, string> = {
  cultura: 'hover:shadow-glow-purple',
  naturaleza: 'hover:shadow-glow-green',
  gastronomia: 'hover:shadow-glow-red',
  bienestar: 'hover:shadow-glow-cyan',
};

export const Card = ({
  children,
  variant = 'default',
  className,
  gradientColor = 'cultura',
  hover = true,
}: CardProps) => {
  const baseClass = cn(
    'rounded-xl overflow-hidden p-6',
    hover && 'transition-all duration-300 ease-out-quart hover:scale-[1.02]',
  );

  const variants: Record<NonNullable<CardProps['variant']>, string> = {
    default: cn(
      baseClass,
      'bg-white/[0.03] border border-white/10 shadow-md backdrop-blur-md',
      hover && 'hover:bg-white/[0.06] hover:border-white/20 hover:shadow-lg',
    ),
    glass: cn(
      baseClass,
      'bg-white/10 border border-white/20 backdrop-blur-lg',
      hover && 'hover:bg-white/15 hover:border-white/30',
    ),
    gradient: cn(
      baseClass,
      gradientBg[gradientColor],
      'text-white',
      hover && gradientGlow[gradientColor],
    ),
  };

  return <div className={cn(variants[variant], className)}>{children}</div>;
};

export default Card;

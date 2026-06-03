'use client';

import { PilarType } from '@/types';

export interface PilarBadgeProps {
  pilar: PilarType;
  tamaño?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  onClick?: () => void;
  className?: string;
}

const pilarConfig = {
  cultura: {
    label: 'Cultura',
    icon: '🎭',
    bgColor: 'bg-pilar-cultura-secondary',
    textColor: 'text-pilar-cultura-primary',
    borderColor: 'border-pilar-cultura-primary',
    hoverColor: 'hover:bg-pilar-cultura-light',
  },
  naturaleza: {
    label: 'Naturaleza',
    icon: '🌿',
    bgColor: 'bg-pilar-naturaleza-secondary',
    textColor: 'text-pilar-naturaleza-primary',
    borderColor: 'border-pilar-naturaleza-primary',
    hoverColor: 'hover:bg-pilar-naturaleza-light',
  },
  gastronomia: {
    label: 'Gastronomía',
    icon: '🍽️',
    bgColor: 'bg-pilar-gastronomia-secondary',
    textColor: 'text-pilar-gastronomia-primary',
    borderColor: 'border-pilar-gastronomia-primary',
    hoverColor: 'hover:bg-pilar-gastronomia-light',
  },
  bienestar: {
    label: 'Bienestar',
    icon: '💆',
    bgColor: 'bg-pilar-bienestar-secondary',
    textColor: 'text-pilar-bienestar-primary',
    borderColor: 'border-pilar-bienestar-primary',
    hoverColor: 'hover:bg-pilar-bienestar-light',
  },
};

const sizeConfig = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base',
};

export const PilarBadge: React.FC<PilarBadgeProps> = ({
  pilar,
  tamaño = 'md',
  showLabel = true,
  onClick,
  className = '',
}) => {
  const config = pilarConfig[pilar];
  const size = sizeConfig[tamaño];

  return (
    <div
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 rounded-full font-semibold
        border-2 transition-all duration-300 cursor-pointer
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        ${config.hoverColor} ${size} ${className}
        ${onClick ? 'hover:scale-105 active:scale-95' : ''}
      `}
    >
      <span>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </div>
  );
};

export default PilarBadge;

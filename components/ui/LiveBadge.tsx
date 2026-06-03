'use client';

export type LiveBadgeType = 'vivo' | 'trending' | 'nuevo' | 'imperdible';

export interface LiveBadgeProps {
  tipo: LiveBadgeType;
  pulsante?: boolean;
  className?: string;
}

const badgeConfig = {
  vivo: {
    label: '🔴 EN VIVO',
    bgColor: 'bg-red-500',
    textColor: 'text-white',
    icon: '🔴',
  },
  trending: {
    label: '🔥 TRENDING',
    bgColor: 'bg-orange-500',
    textColor: 'text-white',
    icon: '🔥',
  },
  nuevo: {
    label: '✨ NUEVO',
    bgColor: 'bg-blue-500',
    textColor: 'text-white',
    icon: '✨',
  },
  imperdible: {
    label: '⭐ IMPERDIBLE',
    bgColor: 'bg-yellow-500',
    textColor: 'text-white',
    icon: '⭐',
  },
};

export const LiveBadge: React.FC<LiveBadgeProps> = ({
  tipo,
  pulsante = true,
  className = '',
}) => {
  const config = badgeConfig[tipo];

  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
        text-xs sm:text-sm font-bold ${config.bgColor} ${config.textColor}
        ${pulsante ? 'animate-pulse' : ''}
        ${className}
      `}
    >
      <span className={pulsante ? 'animate-bounce' : ''}>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
};

export default LiveBadge;

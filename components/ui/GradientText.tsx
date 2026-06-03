'use client';

import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  /** Color inicial personalizado (sobreescribe `variant`) */
  from?: string;
  /** Color final personalizado (sobreescribe `variant`) */
  to?: string;
  className?: string;
  variant?: 'brand' | 'cultura' | 'naturaleza' | 'gastronomia' | 'bienestar';
}

const variantClasses: Record<NonNullable<GradientTextProps['variant']>, string> = {
  brand: 'text-gradient-brand',
  cultura: 'text-gradient-cultura',
  naturaleza: 'text-gradient-naturaleza',
  gastronomia: 'text-gradient-gastronomia',
  bienestar: 'text-gradient-bienestar',
};

export const GradientText = ({
  children,
  from,
  to,
  className,
  variant = 'brand',
}: GradientTextProps) => {
  const useCustom = Boolean(from && to);

  return (
    <span
      className={cn(
        'inline-block bg-clip-text',
        !useCustom && variantClasses[variant],
        className,
      )}
      style={
        useCustom
          ? {
              backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }
          : undefined
      }
    >
      {children}
    </span>
  );
};

export default GradientText;

'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export interface AnimatedCounterProps {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  duracion?: number;
  label?: string;
  tamaño?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'orange' | 'purple' | 'green' | 'red' | 'blue';
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  valor,
  sufijo = '',
  prefijo = '',
  duracion = 2000,
  label,
  tamaño = 'md',
  color = 'orange',
}) => {
  const [numeroActual, setNumeroActual] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!inView) return;

    const startTime = Date.now();
    let animationId: number;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duracion, 1);

      // Easing function para animación más suave
      const eased = 1 - Math.pow(1 - progress, 3);
      const nuevoNumero = Math.round(eased * valor);

      setNumeroActual(nuevoNumero);

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, [inView, valor, duracion]);

  // Tamaños
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-5xl',
    xl: 'text-6xl',
  };

  // Colores
  const colorClasses = {
    orange: 'text-brand-orange',
    purple: 'text-pilar-cultura-primary',
    green: 'text-pilar-naturaleza-primary',
    red: 'text-pilar-gastronomia-primary',
    blue: 'text-pilar-bienestar-primary',
  };

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center gap-2"
    >
      <div className={`font-bold ${sizeClasses[tamaño]} ${colorClasses[color]}`}>
        {prefijo}
        {numeroActual.toLocaleString('es-CO')}
        {sufijo}
      </div>
      {label && (
        <p className="text-sm sm:text-base text-gray-600 font-medium text-center">
          {label}
        </p>
      )}
    </div>
  );
};

export default AnimatedCounter;

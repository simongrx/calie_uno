'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Liquid, type Colors } from '@/components/ui/button-1';

// Paleta líquida adaptada a la marca (naranja / rojo / ámbar, con brillos blancos).
const BRAND_COLORS: Colors = {
  color1: '#FFFFFF',
  color2: '#FF2900',
  color3: '#FF7A3C',
  color4: '#FFF7F2',
  color5: '#FFF1E8',
  color6: '#FFB066',
  color7: '#C21A00',
  color8: '#FF3D00',
  color9: '#FF6A00',
  color10: '#FBBF24',
  color11: '#E01E00',
  color12: '#FFD9B0',
  color13: '#FF1500',
  color14: '#FFC98A',
  color15: '#FFCFA0',
  color16: '#B81500',
  color17: '#FF8A3C',
};

export interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export function LiquidButton({ children, href, onClick, className }: LiquidButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const layers = (
    <>
      {/* halo difuso exterior */}
      <div className="absolute left-1/2 top-[8.57%] h-[128.57%] w-[112.81%] -translate-x-1/2 opacity-70 blur-[19px]">
        <span className="absolute inset-0 rounded-2xl bg-[#d9d9d9] blur-[6.5px]" />
        <div className="relative h-full w-full overflow-hidden rounded-2xl">
          <Liquid isHovered={isHovered} colors={BRAND_COLORS} />
        </div>
      </div>

      {/* base oscura difusa */}
      <div className="absolute left-1/2 top-1/2 h-[112.85%] w-[92.23%] -translate-x-1/2 -translate-y-[40%] rounded-2xl bg-[#1a0600] blur-[7.3px]" />

      {/* cuerpo principal */}
      <div className="relative h-full w-full overflow-hidden rounded-2xl">
        <span className="absolute inset-0 rounded-2xl bg-[#d9d9d9]" />
        <span className="absolute inset-0 rounded-2xl bg-black" />
        <Liquid isHovered={isHovered} colors={BRAND_COLORS} />
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={`absolute inset-0 rounded-2xl border-[3px] border-solid border-white/60 mix-blend-overlay ${
              i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'
            }`}
          />
        ))}
        {/* brillo cálido inferior */}
        <span className="absolute left-1/2 top-1/2 h-[42.85%] w-[70.8%] -translate-x-1/2 -translate-y-[40%] rounded-2xl bg-[#601a00] blur-[15px]" />
      </div>

      {/* etiqueta */}
      <span className="absolute inset-0 z-10 flex items-center justify-center gap-2.5 whitespace-nowrap px-6 text-lg font-semibold tracking-wide text-white transition-colors duration-300 group-hover:text-amber-100">
        {children}
        <ArrowRight className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </>
  );

  const cls = `group relative inline-block h-[3.4em] w-[270px] ${className ?? ''}`;

  if (href) {
    return (
      <Link
        href={href}
        className={cls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {layers}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={cls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {layers}
    </button>
  );
}

export default LiquidButton;

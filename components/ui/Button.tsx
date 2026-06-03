'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const baseStyles = cn(
  'inline-flex items-center justify-center gap-2 font-semibold',
  'rounded-lg transition-all duration-300 ease-out-quart',
  'hover:scale-105 active:scale-95',
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
);

const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: cn(
    'bg-brand-orange text-white shadow-md',
    'hover:bg-[#E67D2D] hover:shadow-glow-orange hover:animate-glow-pulse',
  ),
  secondary: cn(
    'bg-neutral-200 text-neutral-900',
    'hover:bg-neutral-300',
  ),
  glass: cn(
    'bg-white/10 text-white border border-white/20 backdrop-blur-sm',
    'hover:bg-white/15 hover:border-white/30',
  ),
  outline: cn(
    'border-2 border-brand-orange text-brand-orange',
    'hover:bg-brand-orange/10',
  ),
};

const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  disabled,
  type = 'button',
}: ButtonProps) => {
  const buttonClass = cn(baseStyles, variants[variant], sizes[size], className);

  if (href && !disabled) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={buttonClass}>
      {children}
    </button>
  );
};

export default Button;

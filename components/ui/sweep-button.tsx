import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SweepButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Botón discreto (ghost) que al pasar el cursor se rellena con un barrido de
 * gradiente de marca animado. Solo CSS (clase .sweep-btn en globals).
 */
export function SweepButton({ children, href, onClick, className }: SweepButtonProps) {
  const inner = (
    <span className="relative z-10 inline-flex items-center gap-2">
      {children}
      <ArrowRight className="size-4 shrink-0 transition-transform duration-300 group-hover/sweep:translate-x-1" />
    </span>
  );
  const cls = cn('sweep-btn group/sweep', className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

export default SweepButton;

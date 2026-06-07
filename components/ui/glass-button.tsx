'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

const glassButtonVariants = cva(
  'glass-button relative isolate cursor-pointer rounded-full transition-all',
  {
    variants: {
      size: {
        default: 'text-base font-semibold',
        sm: 'text-sm font-semibold',
        lg: 'text-lg font-semibold',
        icon: 'h-11 w-11',
      },
      tone: {
        primary: 'glass-button--primary',
        neutral: 'glass-button--neutral',
      },
    },
    defaultVariants: {
      size: 'default',
      tone: 'primary',
    },
  }
);

const glassButtonTextVariants = cva(
  'glass-button-text relative block select-none tracking-tight',
  {
    variants: {
      size: {
        default: 'px-6 py-3.5',
        sm: 'px-4 py-2.5',
        lg: 'px-8 py-4',
        icon: 'flex h-11 w-11 items-center justify-center',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, tone, contentClassName, ...props }, ref) => {
    return (
      <div className={cn('glass-button-wrap cursor-pointer rounded-full', className)}>
        <button className={cn(glassButtonVariants({ size, tone }))} ref={ref} {...props}>
          <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>
            {children}
          </span>
        </button>
        <div className="glass-button-shadow rounded-full" />
      </div>
    );
  }
);
GlassButton.displayName = 'GlassButton';

export { GlassButton, glassButtonVariants };

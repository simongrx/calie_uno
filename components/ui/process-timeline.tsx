'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { cn } from '@/lib/utils';

/**
 * Timeline con cards que entran desde la derecha y se apilan horizontalmente.
 * Adaptado a nuestro stack (framer-motion + marca). `useMeasure` va inline
 * (ResizeObserver) para no añadir deps. Se añadió la prop `range` a ProcessCard
 * para ubicar la animación de las cards dentro de un sub-tramo del scroll.
 */

// ── useMeasure inline ──────────────────────────────────────────────
function useMeasure() {
  const [el, setEl] = React.useState<HTMLElement | null>(null);
  const [rect, setRect] = React.useState<{ width: number | null; height: number | null }>({
    width: null,
    height: null,
  });
  React.useEffect(() => {
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setRect({ width, height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);
  return [setEl, rect] as const;
}

const processCardVariants = cva('flex overflow-hidden', {
  variants: {
    variant: {
      brand: 'text-white border border-white/12 bg-[rgba(10,22,54,0.55)] backdrop-blur-xl',
      light: 'shadow bg-white text-slate-900 border border-slate-200',
    },
    size: {
      sm: 'min-w-[25%] max-w-[25%]',
      md: 'min-w-[50%] max-w-[50%]',
      lg: 'min-w-[75%] max-w-[75%]',
      xl: 'min-w-full max-w-full',
    },
  },
  defaultVariants: {
    variant: 'brand',
    size: 'md',
  },
});

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}
interface ProcessCardProps
  extends HTMLMotionProps<'div'>,
    VariantProps<typeof processCardVariants> {
  itemsLength: number;
  index: number;
  /** Sub-tramo del scroll [inicio, fin] donde animan las cards (default [0,1]). */
  range?: [number, number];
}

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(
  undefined
);
export function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error('useContainerScrollContext must be used within a ContainerScroll Component');
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={cn('relative min-h-[120vh]', className)} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('sticky left-0 top-0 w-full overflow-hidden', className)}
    {...props}
  />
));
ContainerSticky.displayName = 'ContainerSticky';

export const ProcessCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props} />
));
ProcessCardTitle.displayName = 'ProcessCardTitle';

export const ProcessCardBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-8 p-6', className)} {...props} />
));
ProcessCardBody.displayName = 'ProcessCardBody';

export const ProcessCard: React.FC<ProcessCardProps> = ({
  className,
  style,
  variant,
  size,
  itemsLength,
  index,
  range,
  ...props
}) => {
  const { scrollYProgress } = useContainerScrollContext();
  const rStart = range ? range[0] : 0;
  const rEnd = range ? range[1] : 1;
  const span = rEnd - rStart;
  const start = rStart + (index / itemsLength) * span;
  const end = start + (1 / itemsLength) * span;

  // Ancho de viewport SSR-safe (evita `window` en render del servidor).
  const [innerWidth, setInnerWidth] = React.useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  React.useEffect(() => {
    const onResize = () => setInnerWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const [ref, { width }] = useMeasure();

  const x = useTransform(
    scrollYProgress,
    [start, end],
    [innerWidth, -((width ?? 0) * index) + 64 * index]
  );
  return (
    <motion.div
      ref={ref}
      style={{ x: index > 0 ? x : 0, ...style }}
      className={cn(processCardVariants({ variant, size }), className)}
      {...props}
    />
  );
};
ProcessCard.displayName = 'ProcessCard';

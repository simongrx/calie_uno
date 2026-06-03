# 💻 GUÍA DE IMPLEMENTACIÓN TÉCNICA - CALI ENAMORA

Ejemplos de código listos para copiar/adaptar. Este documento acompaña al DESIGN_SYSTEM.md

---

## 1. ACTUALIZAR TAILWIND CONFIG

```javascript
// tailwind.config.js - CAMBIOS PRINCIPALES

const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF8C42',      // ← CAMBIAR de #F97316
          yellow: '#FBBF24',
          light: '#FEF3C7',
          dark: '#B45309',
        },
        pilar: {
          cultura: {
            primary: '#8B5CF6',    // ← CAMBIAR de #7C3AED
            secondary: '#EDE9FE',
            light: '#F5F3FF',      // ← NUEVO
            dark: '#6D28D9',
          },
          naturaleza: {
            primary: '#10B981',    // ← CAMBIAR de #059669
            secondary: '#D1FAE5',
            light: '#ECFDF5',
            dark: '#047857',       // ← CAMBIAR de #065F46
          },
          gastronomia: {
            primary: '#EF4444',    // ← CAMBIAR de #DC2626
            secondary: '#FEE2E2',
            light: '#FEF2F2',
            dark: '#DC2626',
          },
          bienestar: {
            primary: '#06B6D4',    // ← CAMBIAR de #0891B2
            secondary: '#CFFAFE',
            light: '#ECFDFD',
            dark: '#0891B2',
          },
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#0A1636',
        },
      },

      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },

      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #FF8C42 0%, #FBBF24 100%)',
        'gradient-cultura': 'linear-gradient(135deg, #8B5CF6 0%, #EDE9FE 100%)',
        'gradient-naturaleza': 'linear-gradient(135deg, #10B981 0%, #ECFDF5 100%)',
        'gradient-gastronomia': 'linear-gradient(135deg, #EF4444 0%, #FEE2E2 100%)',
        'gradient-bienestar': 'linear-gradient(135deg, #06B6D4 0%, #ECFDFD 100%)',
        'gradient-premium-dark': 'linear-gradient(135deg, #1A1A2E 0%, #2D3561 100%)',
      },

      boxShadow: {
        // ... mantener existentes y agregar:
        'glow-orange': '0 0 20px rgb(255 140 66 / 0.4)',
        'glow-orange-lg': '0 0 40px rgb(255 140 66 / 0.6)',
        'glow-purple': '0 0 20px rgb(139 92 246 / 0.4)',
        'glow-green': '0 0 20px rgb(16 185 129 / 0.4)',
        'glow-red': '0 0 20px rgb(239 68 68 / 0.4)',
        'glow-cyan': '0 0 20px rgb(6 182 212 / 0.4)',
      },

      animation: {
        // Mantener existentes y agregar:
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },

      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgb(255 140 66 / 0.4)' },
          '50%': { boxShadow: '0 0 40px rgb(255 140 66 / 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  // ... resto de config
};
```

---

## 2. COMPONENTES BASE

### Button.tsx (Variantes)
```typescript
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
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  disabled,
}: ButtonProps) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-300 ease-out-quart',
    'rounded-lg',
    'hover:scale-105 active:scale-95',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  );

  const variants = {
    primary: cn(
      baseStyles,
      'bg-brand-orange text-white',
      'hover:bg-[#E67D2D] shadow-md hover:shadow-glow-orange',
      'hover:animate-glow-pulse'
    ),
    secondary: cn(
      baseStyles,
      'bg-neutral-200 text-neutral-900',
      'hover:bg-neutral-300 dark:bg-neutral-700 dark:text-white'
    ),
    glass: cn(
      baseStyles,
      'glass bg-white/10 text-white border border-white/20',
      'hover:bg-white/15 hover:border-white/30',
      'backdrop-blur-sm'
    ),
    outline: cn(
      baseStyles,
      'border-2 border-brand-orange text-brand-orange',
      'hover:bg-brand-orange/10'
    ),
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const buttonClass = cn(variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
    >
      {children}
    </button>
  );
};
```

### GradientText.tsx
```typescript
'use client';

import { cn } from '@/lib/utils';

interface GradientTextProps {
  children: React.ReactNode;
  from?: string;
  to?: string;
  className?: string;
  variant?: 'brand' | 'cultura' | 'naturaleza' | 'gastronomia' | 'bienestar';
}

export const GradientText = ({
  children,
  from,
  to,
  className,
  variant = 'brand',
}: GradientTextProps) => {
  const variantClasses = {
    brand: 'text-gradient-brand',
    cultura: 'text-gradient-cultura',
    naturaleza: 'text-gradient-naturaleza',
    gastronomia: 'text-gradient-gastronomia',
    bienestar: 'text-gradient-bienestar',
  };

  return (
    <span
      className={cn(
        'bg-clip-text',
        variantClasses[variant],
        className
      )}
      style={
        from && to
          ? {
              backgroundImage: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
            }
          : {}
      }
    >
      {children}
    </span>
  );
};
```

### ScrollReveal.tsx (Wrapper para Scroll Animations)
```typescript
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  type?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  type = 'fade',
  delay = 0,
  className,
}: ScrollRevealProps) => {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants[type]}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

### Card.tsx
```typescript
'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
  gradientColor?: 'cultura' | 'naturaleza' | 'gastronomia' | 'bienestar';
  hover?: boolean;
}

export const Card = ({
  children,
  variant = 'default',
  className,
  gradientColor = 'cultura',
  hover = true,
}: CardProps) => {
  const gradients = {
    cultura: 'gradient-cultura',
    naturaleza: 'gradient-naturaleza',
    gastronomia: 'gradient-gastronomia',
    bienestar: 'gradient-bienestar',
  };

  const baseClass = cn(
    'rounded-xl overflow-hidden',
    hover && 'transition-all duration-300 hover:scale-105',
  );

  const variants = {
    default: cn(
      baseClass,
      'bg-white dark:bg-neutral-800 shadow-md',
      hover && 'hover:shadow-lg'
    ),
    glass: cn(
      baseClass,
      'glass bg-white/10 backdrop-blur-lg border border-white/20',
      hover && 'hover:bg-white/15 hover:border-white/30'
    ),
    gradient: cn(
      baseClass,
      `bg-${gradients[gradientColor]}`,
      'text-white',
      hover && `hover:shadow-glow-${gradientColor}`
    ),
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
};
```

---

## 3. SECCIÓN HERO MEJORADA

```typescript
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';
import { ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const subtitleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  };

  const decorativeVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0A1636] via-[#1A2A4E] to-[#0A1636] pt-20">
      
      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-hero rounded-full blur-3xl opacity-10"
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-cultura rounded-full blur-3xl opacity-10"
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative container-custom h-screen flex items-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center">
          
          {/* Left Content */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={{
              animate: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            className="space-y-6"
          >
            <motion.h1
              variants={titleVariants}
              transition={{ duration: 0.6, delay: 0 }}
              className="text-6xl lg:text-7xl font-black font-heading leading-tight"
            >
              <GradientText variant="brand">Cali Enamora</GradientText>
              <br />
              <span className="text-white">El corazón del turismo</span>
            </motion.h1>

            <motion.p
              variants={subtitleVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-neutral-300 max-w-lg leading-relaxed"
            >
              Descubre experiencias culturales, gastronómicas y naturales que te enamorarán del Valle del Cauca.
            </motion.p>

            <motion.div
              variants={subtitleVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex gap-4 pt-4"
            >
              <Button variant="primary" size="lg">
                Explorar experiencias
              </Button>
              <Button variant="glass" size="lg">
                Conocer más
              </Button>
            </motion.div>

            {/* Stats Preview */}
            <motion.div
              variants={subtitleVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-8 pt-12"
            >
              {[
                { number: '120+', label: 'Experiencias' },
                { number: '45+', label: 'Restaurantes' },
                { number: '15', label: 'Rutas' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl font-bold text-brand-orange">{stat.number}</p>
                  <p className="text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            variants={decorativeVariants}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-96 lg:h-full hidden lg:block"
          >
            {/* Placeholder para imagen/video */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-brand-orange/20 to-brand-yellow/20 flex items-center justify-center">
                <span className="text-neutral-400">Imagen Hero</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-brand-orange" />
        </motion.div>

      </div>

    </section>
  );
};
```

---

## 4. IMPACT BAR CON CONTADORES

```typescript
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const ImpactBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 120, label: 'Experiencias', pilar: 'cultura' },
    { number: 45, label: 'Restaurantes', pilar: 'gastronomia' },
    { number: 15, label: 'Rutas turísticas', pilar: 'naturaleza' },
    { number: 8500, label: 'Visitantes anuales', pilar: 'bienestar' },
  ];

  const pillarColors = {
    cultura: '#8B5CF6',
    naturaleza: '#10B981',
    gastronomia: '#EF4444',
    bienestar: '#06B6D4',
  };

  return (
    <motion.section
      ref={ref}
      className="sticky top-0 z-40 w-full bg-gradient-premium-dark py-8"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2 cursor-default"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Contador Animado */}
              <Counter
                from={0}
                to={stat.number}
                duration={2}
                isVisible={isVisible}
                color={pillarColors[stat.pilar as keyof typeof pillarColors]}
              />
              
              <p className="text-sm lg:text-base text-neutral-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Componente Contador
const Counter = ({
  from,
  to,
  duration,
  isVisible,
  color,
}: {
  from: number;
  to: number;
  duration: number;
  isVisible: boolean;
  color: string;
}) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(from + (to - from) * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, from, to, duration]);

  return (
    <p
      className="text-3xl lg:text-4xl font-bold"
      style={{ color }}
    >
      {count.toLocaleString()}+
    </p>
  );
};
```

---

## 5. PILARES EN BENTO CARDS

```typescript
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export const PilaresSection = () => {
  const pilares = [
    {
      id: 'cultura',
      title: 'Cultura',
      description: 'Sumérgete en la riqueza cultural del Valle con museos, galerías y eventos que celebran la identidad local.',
      color: 'cultura',
      stats: '50+ eventos',
    },
    {
      id: 'naturaleza',
      title: 'Naturaleza',
      description: 'Descubre paisajes, cascadas y rutas ecológicas en medio de la biodiversidad del Valle.',
      color: 'naturaleza',
      stats: '15 rutas',
    },
    {
      id: 'gastronomia',
      title: 'Gastronomía',
      description: 'Prueba los sabores únicos de Cali en restaurantes, mercados y experiencias culinarias',
      color: 'gastronomia',
      stats: '45 restaurantes',
    },
    {
      id: 'bienestar',
      title: 'Bienestar',
      description: 'Relájate y rejuvenécete con spa, yoga y experiencias de bienestar integral.',
      color: 'bienestar',
      stats: '20+ opciones',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="container-custom">
        
        {/* Header */}
        <motion.div
          className="text-center mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl lg:text-6xl font-bold font-heading mb-4">
            Los 4 Pilares de
            <br />
            <GradientText variant="brand">Cali Enamora</GradientText>
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            Cada pilar representa una dimensión única de la experiencia turística que ofrecemos.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {pilares.map((pilar) => (
            <motion.div
              key={pilar.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                variant="gradient"
                gradientColor={pilar.color as any}
                className="h-full p-8 flex flex-col justify-between relative overflow-hidden group"
              >
                {/* Ícono Decorativo de Fondo */}
                <div
                  className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                  }}
                />

                <div>
                  <h3 className="text-3xl font-bold mb-3">{pilar.title}</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    {pilar.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold opacity-75">
                    {pilar.stats}
                  </span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
```

---

## 6. RUTAS - HORIZONTAL SCROLL

```typescript
'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const RutasSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const rutas = [
    {
      id: 1,
      name: 'Ruta Cultural del Centro',
      distance: '5 km',
      duration: '3h',
      rating: 4.8,
      image: 'placeholder',
    },
    // ... más rutas
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 400;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="container-custom">
        
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-2">
              Rutas Turísticas
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              Explora los mejores recorridos del Valle
            </p>
          </div>

          {/* Scroll Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="p-2 rounded-full border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Scroll Container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {rutas.map((ruta, i) => (
            <motion.div
              key={ruta.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 w-96 group"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300">
                
                {/* Imagen */}
                <div className="relative h-48 bg-gradient-to-br from-brand-orange/30 to-brand-yellow/30 overflow-hidden">
                  <div className="absolute inset-0 group-hover:scale-110 transition duration-300 bg-cover bg-center" />
                </div>

                {/* Info */}
                <div className="p-6 bg-white dark:bg-neutral-800">
                  <h3 className="text-xl font-bold mb-2">{ruta.name}</h3>
                  <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    <span>{ruta.distance} • {ruta.duration}</span>
                    <span>⭐ {ruta.rating}</span>
                  </div>
                  <button className="w-full py-2 bg-brand-orange text-white rounded-lg font-semibold hover:bg-[#E67D2D] transition">
                    Explorar
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
```

---

## 7. VARIABLES DE FRAMER MOTION REUTILIZABLES

```typescript
// lib/animations.ts

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 30 },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 30 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const floatingAnimation = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const glowPulseAnimation = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 140, 66, 0.4)',
      '0 0 40px rgba(255, 140, 66, 0.8)',
      '0 0 20px rgba(255, 140, 66, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};
```

---

## 8. CHECKLIST DE IMPLEMENTACIÓN

```
FASE 1 - ESTRUCTURA BASE:
- [ ] Tailwind config actualizado con nuevos colores
- [ ] Componentes base creados (Button, Card, GradientText)
- [ ] ScrollReveal wrapper funcional
- [ ] Hero section implementado
- [ ] Impact bar con contadores

FASE 2 - CONTENIDO:
- [ ] Pilares en bento cards
- [ ] Rutas horizontal scroll
- [ ] Mapa interactivo
- [ ] Eventos grid/timeline
- [ ] Restaurantes cards

FASE 3 - PULIDO:
- [ ] Galerías masonry
- [ ] Testimonios carousel
- [ ] Scroll effects avanzados
- [ ] Responsivo completo
- [ ] Performance optimization
```

---

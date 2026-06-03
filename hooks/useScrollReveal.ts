'use client';

import { useRef, useEffect, useState } from 'react';
import { useAnimation, useInView, type Variants } from 'framer-motion';

// Define local MarginType since it's not exported from framer-motion
type MarginType = string | { top?: string; bottom?: string; left?: string; right?: string };

const DEFAULT_MARGIN: MarginType = '0px';

export interface UseScrollRevealOptions {
  threshold?: number;
  margin?: MarginType;
  once?: boolean;
  delay?: number;
}

// ...existing code...

/**
 * Hook para animar elementos cuando entran en el viewport
 * Utiliza Framer Motion y Intersection Observer
 */
export const useScrollReveal = (
  variants: Variants,
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true,
    delay = 0
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    let timeout: number | undefined;

    if (inView) {
      if (delay > 0) {
        timeout = window.setTimeout(() => {
          controls.start('visible');
        }, delay);
      } else {
        controls.start('visible');
      }
    } else if (!once) {
      controls.start('hidden');
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [inView, controls, once, delay]);

  return {
    ref,
    controls,
    initial: 'hidden',
    animate: controls,
    variants
  };
};

/**
 * Hook para animar elementos con stagger (entrada escalonada)
 */
export const useScrollRevealStagger = (
  variants: Variants,
  staggerDelay: number = 0.1,
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  return {
    ref,
    containerControls: controls,
    containerVariants: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.1
        }
      }
    },
    itemVariants: variants
  };
};

/**
 * Hook para detectar si un elemento está visible en el viewport
 */
export const useIsInViewport = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = false
  } = options;

  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  return {
    ref,
    inView
  };
};

/**
 * Hook para animar número contador cuando entra en el viewport
 */
export const useCounterOnScroll = (
  finalValue: number,
  duration: number = 2,
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true
  } = options;

  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        x: finalValue,
        transition: { duration, ease: 'easeOut' }
      });
    }
  }, [inView, controls, finalValue, duration]);

  return {
    ref,
    controls,
    initialX: 0
  };
};

/**
 * Hook para progresiva revelación de múltiples elementos
 */
export const useSequentialReveal = (
  elementCount: number,
  delayBetween: number = 0.1,
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true
  } = options;

  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      const sequence = async () => {
        for (let i = 0; i < elementCount; i++) {
          await controls.start({ opacity: 1, y: 0 });
          await new Promise(resolve => setTimeout(resolve, delayBetween * 1000));
        }
      };
      sequence();
    }
  }, [inView, controls, elementCount, delayBetween]);

  return {
    ref,
    controls,
    elementCount
  };
};

/**
 * Hook para efecto parallax al hacer scroll
 */
export const useParallaxScroll = (offset: number = 50) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const scrollY = window.scrollY;
      const elementRect = element.getBoundingClientRect();
      const elementScrolled = scrollY + elementRect.top;

      const parallaxValue = (scrollY - elementScrolled) * (offset / 100);

      controls.set({ y: parallaxValue });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset, controls]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para animar elemento basado en posición de scroll
 */
export const useScrollPosition = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return {
    ref,
    controls,
    inView
  };
};

/**
 * Hook para animar elemento con efecto fade in al hacer scroll
 */
export const useFadeInOnScroll = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true,
    delay = 0
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    let timeout: number | undefined;

    if (inView) {
      timeout = window.setTimeout(() => {
        controls.start({
          opacity: 1,
          transition: { duration: 0.6, ease: 'easeOut' }
        });
      }, delay);
    } else if (!once) {
      controls.start({ opacity: 0 });
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [inView, controls, delay, once]);

  return {
    ref,
    controls,
    initial: { opacity: 0 }
  };
};

/**
 * Hook para animar elemento con efecto slide in al hacer scroll
 */
export const useSlideInOnScroll = (
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true,
    delay = 0
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 };
      case 'down':
        return { opacity: 0, y: -30 };
      case 'left':
        return { opacity: 0, x: 30 };
      case 'right':
        return { opacity: 0, x: -30 };
    }
  };

  const getAnimatePosition = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
        return { opacity: 1, x: 0 };
    }
  };

  useEffect(() => {
    let timeout: number | undefined;

    if (inView) {
      timeout = window.setTimeout(() => {
        controls.start({
          ...getAnimatePosition(),
          transition: { duration: 0.6, ease: 'easeOut' }
        });
      }, delay);
    } else if (!once) {
      controls.start(getInitialPosition());
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [inView, controls, delay, once]);

  return {
    ref,
    controls,
    initial: getInitialPosition()
  };
};

/**
 * Hook para animar elemento con efecto scale in al hacer scroll
 */
export const useScaleInOnScroll = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true,
    delay = 0
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    let timeout: number | undefined;

    if (inView) {
      timeout = window.setTimeout(() => {
        controls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 0.5, ease: 'easeOut' }
        });
      }, delay);
    } else if (!once) {
      controls.start({ opacity: 0, scale: 0.8 });
    }

    return () => {
      if (timeout) {
        window.clearTimeout(timeout);
      }
    };
  }, [inView, controls, delay, once]);

  return {
    ref,
    controls,
    initial: { opacity: 0, scale: 0.8 }
  };
};

/**
 * Hook para observar múltiples elementos
 */
export const useMultipleScrollReveal = (
  count: number,
  options: UseScrollRevealOptions = {}
) => {
  const refs = Array(count)
    .fill(null)
    .map(() => useRef(null));
  
  const inViews = refs.map(ref =>
    useInView(ref, {
      once: options.once !== false,
      amount: options.threshold || 0.2,
      margin: (options.margin || DEFAULT_MARGIN) as any
    })
  );

  return {
    refs,
    inViews,
    allVisible: inViews.every(view => view)
  };
};

/**
 * Hook para efecto de texto que se revela línea por línea
 */
export const useTextRevealOnScroll = (options: UseScrollRevealOptions = {}) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [inView, controls, once]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return {
    ref,
    controls,
    containerVariants,
    lineVariants,
    initial: 'hidden'
  };
};

/**
 * Hook para efecto de progreso/barra al hacer scroll
 */
export const useScrollProgress = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, { once: false, amount: 0 });

  useEffect(() => {
    if (!inView) return;

    const handleScroll = () => {
      const element = ref.current as HTMLElement | null;
      if (!element) return;

      const elementTop = element.offsetTop;
      const elementHeight = element.offsetHeight;
      const scrollTop = window.scrollY;

      const progress = Math.min(
        (scrollTop - elementTop + window.innerHeight) / (elementHeight + window.innerHeight),
        1
      );

      controls.set({ scaleX: Math.max(0, progress) });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [inView, controls]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para animar elementos con diferentes delays
 */
export const useStaggeredReveal = (
  itemCount: number,
  baseDelay: number = 0.05,
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.2,
    margin = DEFAULT_MARGIN,
    once = true
  } = options;

  const ref = useRef(null);
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  const getItemVariants = (index: number) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
        delay: inView ? index * baseDelay : 0
      }
    }
  });

  return {
    ref,
    inView,
    getItemVariants,
    itemCount
  };
};

/**
 * Hook para animar elemento cuando está en el centro del viewport
 */
export const useCenterViewportAnimation = (
  options: UseScrollRevealOptions = {}
) => {
  const {
    threshold = 0.5,
    margin = DEFAULT_MARGIN,
    once = false
  } = options;

  const ref = useRef(null);
  const controls = useAnimation();
  const inView = useInView(ref, {
    once,
    amount: threshold,
    margin: margin as any
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [inView, controls]);

  return {
    ref,
    controls,
    inView,
    initial: 'hidden'
  };
};

/**
 * Hook para efecto de espejo al hacer scroll
 */
export const useMirrorScrollAnimation = (intensity: number = 1) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;

      controls.set({
        opacity: Math.max(0, Math.min(1, scrollPercentage)),
        scale: 0.8 + scrollPercentage * 0.2 * intensity
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, intensity]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para detectar cuando un elemento alcanza el top del viewport
 */
export const useStickToTop = () => {
  const ref = useRef(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();

      setIsStuck(rect.top <= 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    ref,
    isStuck
  };
};

/**
 * Hook para animaciones basadas en scroll velocity
 */
export const useScrollVelocity = () => {
  const ref = useRef(null);
  const controls = useAnimation();
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollY = window.scrollY;
      const deltaTime = currentTime - lastTime.current;
      const deltaScroll = currentScrollY - lastScrollY.current;

      const velocity = deltaTime > 0 ? deltaScroll / deltaTime : 0;

      controls.set({
        scale: 1 + Math.min(Math.abs(velocity) * 0.01, 0.1)
      });

      lastScrollY.current = currentScrollY;
      lastTime.current = currentTime;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para crear efecto de parallax más avanzado
 */
export const useAdvancedParallax = (
  intensity: number = 0.5,
  invert: boolean = false
) => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const scrollY = window.scrollY;
      const elementTop = element.offsetTop;

      const distance = scrollY - elementTop;
      const parallaxValue = distance * intensity * (invert ? -1 : 1);

      controls.set({ y: parallaxValue });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, intensity, invert]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para animar basado en distancia del cursor
 */
export const useMouseFollowAnimation = () => {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const element = ref.current as HTMLElement;
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = (e.clientX - centerX) * 0.1;
      const distY = (e.clientY - centerY) * 0.1;

      controls.set({
        x: distX,
        y: distY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [controls]);

  return {
    ref,
    controls
  };
};

/**
 * Hook para transiciones suaves entre estados
 */
export const useSmoothTransition = (
  enterVariants: Variants,
  exitVariants: Variants,
  isActive: boolean
) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isActive) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isActive, controls]);

  return {
    controls,
    variants: {
      ...enterVariants,
      ...exitVariants
    }
  };
};

/**
 * Hook para resetear animación
 */
export const useAnimationReset = (dependency: any[] = []) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start('hidden');
    setTimeout(() => {
      controls.start('visible');
    }, 10);
  }, dependency);

  return controls;
};

/**
 * Hook personalizado para controlar animaciones manualmente
 */
export const useManualAnimation = () => {
  const controls = useAnimation();

  const play = async (variants: Variants, variantKey: string = 'visible') => {
    await controls.start(variantKey);
  };

  const stop = () => {
    controls.stop();
  };

  const reset = (variants: Variants) => {
    controls.set(variants.hidden || {});
  };

  return {
    controls,
    play,
    stop,
    reset
  };
};

// EXPORT COMO OBJETO
export const scrollRevealHooks = {
  useScrollReveal,
  useScrollRevealStagger,
  useIsInViewport,
  useCounterOnScroll,
  useSequentialReveal,
  useParallaxScroll,
  useScrollPosition,
  useFadeInOnScroll,
  useSlideInOnScroll,
  useScaleInOnScroll,
  useMultipleScrollReveal,
  useTextRevealOnScroll,
  useScrollProgress,
  useStaggeredReveal,
  useCenterViewportAnimation,
  useMirrorScrollAnimation,
  useScrollVelocity,
  useAdvancedParallax,
  useMouseFollowAnimation,
  useSmoothTransition,
  useAnimationReset,
  useManualAnimation
};

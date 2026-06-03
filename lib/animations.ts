// ============================================
// VARIANTES Y CONFIGURACIONES DE ANIMACIONES
// ============================================

import { Variants } from 'framer-motion';

// ANIMACIONES DE ENTRADA
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// ANIMACIONES DE SALIDA
export const fadeOutVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 0,
    transition: { duration: 0.5 }
  }
};

export const slideOutUpVariants: Variants = {
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.5, ease: 'easeIn' }
  }
};

// ANIMACIONES DE HOVER
export const hoverScaleVariants: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const hoverLiftVariants: Variants = {
  rest: { y: 0, boxShadow: '0px 2px 8px rgba(0,0,0,0.1)' },
  hover: {
    y: -8,
    boxShadow: '0px 12px 24px rgba(0,0,0,0.15)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const hoverColorVariants: Variants = {
  rest: { color: '#000000' },
  hover: {
    color: '#F97316',
    transition: { duration: 0.3 }
  }
};

// ANIMACIONES DE ROTACIÓN
export const rotateVariants: Variants = {
  rest: { rotate: 0 },
  hover: {
    rotate: 360,
    transition: { duration: 0.8, ease: 'linear' }
  }
};

export const spinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: { duration: 2, repeat: Infinity, ease: 'linear' }
  }
};

// ANIMACIONES DE PULSACIÓN
export const pulseVariants: Variants = {
  animate: {
    opacity: [1, 0.7, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

export const pulseLiveVariants: Variants = {
  animate: {
    scale: [1, 1.1, 1],
    opacity: [1, 0.8, 1],
    transition: { duration: 1.5, repeat: Infinity }
  }
};

// ANIMACIONES DE CONTENEDORES
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const containerFastVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// ANIMACIONES DE ELEMENTOS HIJO
export const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const childSlideVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// ANIMACIONES DE TAB
export const tabContentVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

// ANIMACIONES DE MODAL
export const modalBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const modalContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// ANIMACIONES DE CARRUSEL
export const carouselSlideVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: -100, transition: { duration: 0.5 } }
};

// ANIMACIONES DE PARALLAX
export const parallaxVariants = (offset: number = 50) => ({
  hidden: { y: 0 },
  visible: { y: offset }
});

// ANIMACIONES DE FLOTACIÓN
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const floatSlowVariants: Variants = {
  animate: {
    y: [0, -15, 0],
    transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' }
  }
};

// ANIMACIONES DE GRADIENTE
export const gradientVariants: Variants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: { duration: 8, repeat: Infinity, ease: 'easeInOut' }
  }
};

// ANIMACIONES DE BOUNCE
export const bounceVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 0.6, repeat: Infinity, ease: 'easeInOut' }
  }
};

export const bounceHeavyVariants: Variants = {
  animate: {
    y: [0, -20, 0],
    transition: { duration: 0.8, repeat: Infinity, ease: 'easeInOut' }
  }
};

// ANIMACIONES DE SHAKE
export const shakeVariants: Variants = {
  animate: {
    x: [-5, 5, -5, 5, 0],
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

// ANIMACIONES DE TEXTO
export const textRevealVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export const textAnimateCharVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.3
    }
  })
};

// ANIMACIONES DE PÁGINA
export const pageEnterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

export const pageExitVariants: Variants = {
  exit: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
};

// ANIMACIONES DE BOTONES
export const buttonVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
};

export const buttonPressVariants: Variants = {
  rest: {
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    y: 0
  },
  hover: {
    boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
    y: -2
  },
  tap: {
    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
    y: 0
  }
};

// ANIMACIONES DE IMAGEN
export const imageHoverVariants: Variants = {
  rest: { scale: 1, filter: 'brightness(1)' },
  hover: {
    scale: 1.08,
    filter: 'brightness(1.1)',
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

export const imageFadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// ANIMACIONES DE TARJETA
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  hover: {
    y: -8,
    boxShadow: '0px 20px 40px rgba(0,0,0,0.1)',
    transition: { duration: 0.3 }
  }
};

export const cardGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// ANIMACIONES DE BARRA DE PROGRESO
export const progressBarVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: (custom: number) => ({
    scaleX: custom,
    transition: { duration: 1.5, ease: 'easeOut' }
  })
};

// ANIMACIONES DE NOTIFICACIÓN
export const notificationVariants: Variants = {
  hidden: { opacity: 0, y: -20, x: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// ANIMACIONES DE BREADCRUMB
export const breadcrumbVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

// ANIMACIONES DE ACORDEÓN
export const accordionItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const accordionContentVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// ANIMACIONES DE HERO
export const heroImageVariants: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: 1.05,
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  }
};

export const heroTextVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

// ANIMACIONES DE LISTA
export const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const listItemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

// ANIMACIONES DE ICONO
export const iconSpinVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  }
};

export const iconBounceVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
};

// ANIMACIONES DE NÚMERO
export const numberCountVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// ANIMACIONES DE BANNER
export const bannerVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// CONFIGURACIONES COMPARTIDAS
export const transitionFast = {
  duration: 0.2,
  ease: 'easeOut'
};

export const transitionNormal = {
  duration: 0.3,
  ease: 'easeOut'
};

export const transitionSlow = {
  duration: 0.5,
  ease: 'easeOut'
};

export const transitionVerySlow = {
  duration: 0.8,
  ease: 'easeOut'
};

// EASINGS PERSONALIZADOS
export const easeCustom = {
  easeOutQuart: [0.165, 0.84, 0.44, 1],
  easeOutQuint: [0.23, 1, 0.320, 1],
  easeOutExpo: [0.19, 1, 0.22, 1],
  easeOutCirc: [0.075, 0.82, 0.165, 1],
  easeInOutQuart: [0.77, 0, 0.175, 1],
  easeInOutQuint: [0.86, 0, 0.07, 1],
  easeInOutExpo: [1, 0, 0, 1],
  easeInOutCirc: [0.6, 0.04, 0.98, 0.335]
};

// PRESETS DE ANIMACIONES COMBINADAS
export const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

export const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export const zoomOutVariants: Variants = {
  hidden: { opacity: 1, scale: 1 },
  visible: {
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5, ease: 'easeIn' }
  }
};

// ANIMACIONES DE ENTRADA CON DELAY
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// ANIMACIONES DE FLIP/FLIP-BACK
export const flipVariants: Variants = {
  rest: { rotateY: 0 },
  hover: {
    rotateY: 180,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

// ANIMACIÓN DE GIRO 3D
export const rotate3DVariants: Variants = {
  rest: { rotateX: 0, rotateY: 0, rotateZ: 0 },
  hover: {
    rotateX: 10,
    rotateY: 10,
    transition: { duration: 0.4 }
  }
};

// ANIMACIONES DE SKEW
export const skewVariants: Variants = {
  rest: { skewX: 0, skewY: 0 },
  hover: {
    skewX: -5,
    skewY: 5,
    transition: { duration: 0.3 }
  }
};

// CONFIGURACIÓN PARA INTERSECTION OBSERVER
export const viewportOptions = {
  once: true,
  amount: 0.2
};

export const viewportOptionsMore = {
  once: true,
  amount: 0.5
};

export const viewportOptionsFull = {
  once: true,
  amount: 1
};

// MAPEO DE VARIANTES POR TIPO
export const variantesAnimacion = {
  fadeIn: fadeInVariants,
  slideUp: slideUpVariants,
  slideDown: slideDownVariants,
  slideLeft: slideLeftVariants,
  slideRight: slideRightVariants,
  scaleIn: scaleInVariants,
  zoomIn: zoomInVariants,
  fadeInUp: fadeInUpVariants,
  fadeInDown: fadeInDownVariants,
  fadeInLeft: fadeInLeftVariants,
  fadeInRight: fadeInRightVariants
};

// FUNCIÓN HELPER PARA OBTENER VARIANTE
export const obtenerVariante = (tipo: keyof typeof variantesAnimacion): Variants => {
  return variantesAnimacion[tipo] || fadeInVariants;
};

// DURACIÓN DE ANIMACIONES EN MS
export const duracionesAnimacion = {
  instant: 0,
  rapido: 150,
  normal: 300,
  lento: 500,
  muyLento: 800,
  extremadamenteLento: 1200
};

// PRESETS PARA SECCIONES
export const sectionEnterVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.5
    }
  }
};

export const sectionChildVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

// ANIMACIÓN PARA TOOLTIP
export const tooltipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

// ANIMACIÓN PARA DROPDOWN
export const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

// ANIMACIÓN PARA SIDEBAR
export const sidebarVariants: Variants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    x: -300,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// ANIMACIÓN PARA DRAWER
export const drawerVariants: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// ANIMACIÓN PARA POPOVER
export const popoverVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.15, ease: 'easeIn' }
  }
};

// TRANSICIONES DE RUTA (para Next.js)
export const routeTransitionVariants: Variants = {
  hidden: { opacity: 0 },
  enter: {
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' }
  }
};

// FUNCIÓN PARA CREAR VARIANTE PERSONALIZADA
export const crearVariantePersonalizada = (
  tipoEntrada: 'fade' | 'slide' | 'zoom' = 'fade',
  direccion: 'up' | 'down' | 'left' | 'right' = 'up',
  duracion: number = 0.5
): Variants => {
  const baseVariants: { [key: string]: any } = {
    fade: { opacity: 0 },
    slide: { 
      opacity: 0,
      [direccion === 'up' || direccion === 'down' ? 'y' : 'x']: 
        direccion === 'up' || direccion === 'left' ? 30 : -30
    },
    zoom: { opacity: 0, scale: 0.8 }
  };

  return {
    hidden: baseVariants[tipoEntrada],
    visible: {
      opacity: 1,
      ...(tipoEntrada === 'slide' && { 
        [direccion === 'up' || direccion === 'down' ? 'y' : 'x']: 0 
      }),
      ...(tipoEntrada === 'zoom' && { scale: 1 }),
      transition: { duration: duracion, ease: 'easeOut' }
    }
  };
};

// EXPORT DE TODO COMO OBJETO
export default {
  fadeInVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleInVariants,
  containerVariants,
  cardVariants,
  buttonVariants,
  imageHoverVariants,
  sectionEnterVariants,
  variantesAnimacion,
  duracionesAnimacion,
  easeCustom
};

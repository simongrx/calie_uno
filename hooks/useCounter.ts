'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface UseCounterOptions {
  duracion?: number; // en milisegundos
  incremento?: number;
  formato?: (valor: number) => string;
  onComplete?: () => void;
}

/**
 * Hook para animar un contador de número
 */
export const useCounter = (
  valorFinal: number,
  options: UseCounterOptions = {}
) => {
  const {
    duracion = 2000,
    incremento = 1,
    formato = (v) => v.toString(),
    onComplete
  } = options;

  const [valor, setValor] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const iniciarConteo = useCallback(() => {
    setIsAnimating(true);
    const pasos = Math.ceil(valorFinal / incremento);
    const intervalo = Math.max(1, duracion / pasos);
    let contador = 0;

    intervalRef.current = setInterval(() => {
      contador++;
      const nuevoValor = Math.min(contador * incremento, valorFinal);
      setValor(nuevoValor);

      if (nuevoValor >= valorFinal) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setIsAnimating(false);
        onComplete?.();
      }
    }, intervalo);
  }, [valorFinal, incremento, duracion, onComplete]);

  const detener = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      setIsAnimating(false);
    }
  }, []);

  const reiniciar = useCallback(() => {
    detener();
    setValor(0);
  }, [detener]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    valor,
    valorFormateado: formato(valor),
    isAnimating,
    iniciarConteo,
    detener,
    reiniciar,
    progreso: (valor / valorFinal) * 100
  };
};

/**
 * Hook para contador que se inicia cuando entra en viewport
 */
export const useCounterOnView = (
  valorFinal: number,
  options: UseCounterOptions & { threshold?: number } = {}
) => {
  const {
    duracion = 2000,
    incremento = 1,
    formato = (v) => v.toString(),
    onComplete,
    threshold = 0.2
  } = options;

  const [valor, setValor] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);

          const pasos = Math.ceil(valorFinal / incremento);
          const intervalo = Math.max(1, duracion / pasos);
          let contador = 0;

          intervalRef.current = setInterval(() => {
            contador++;
            const nuevoValor = Math.min(contador * incremento, valorFinal);
            setValor(nuevoValor);

            if (nuevoValor >= valorFinal) {
              clearInterval(intervalRef.current as NodeJS.Timeout);
              onComplete?.();
            }
          }, intervalo);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [valorFinal, incremento, duracion, onComplete, threshold, hasStarted]);

  return {
    ref,
    valor,
    valorFormateado: formato(valor),
    progreso: (valor / valorFinal) * 100
  };
};

/**
 * Hook para contador con easing
 */
export const useCounterWithEasing = (
  valorFinal: number,
  duracion: number = 2000,
  easing: 'linear' | 'easeOut' | 'easeIn' | 'easeInOut' = 'easeOut'
) => {
  const [valor, setValor] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationIdRef = useRef<number | null>(null);

  const easingFunctions = {
    linear: (t: number) => t,
    easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
    easeIn: (t: number) => t * t * t,
    easeInOut: (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  };

  const iniciar = useCallback(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duracion, 1);
      const easedProgress = easingFunctions[easing](progress);
      const nuevoValor = Math.round(easedProgress * valorFinal);

      setValor(nuevoValor);

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);
  }, [valorFinal, duracion, easing]);

  useEffect(() => {
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return {
    valor,
    iniciar,
    progreso: (valor / valorFinal) * 100
  };
};

/**
 * Hook para contador regresivo
 */
export const useCountDown = (
  tiempoInicial: number, // en segundos
  onFinish?: () => void
) => {
  const [segundos, setSegundos] = useState(tiempoInicial);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const iniciar = useCallback(() => {
    setIsActive(true);
  }, []);

  const pausar = useCallback(() => {
    setIsActive(false);
  }, []);

  const reiniciar = useCallback(() => {
    setSegundos(tiempoInicial);
    setIsActive(false);
  }, [tiempoInicial]);

  useEffect(() => {
    if (!isActive || segundos <= 0) return;

    intervalRef.current = setInterval(() => {
      setSegundos((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          onFinish?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onFinish]);

  const formatearTiempo = (secs: number) => {
    const horas = Math.floor(secs / 3600);
    const minutos = Math.floor((secs % 3600) / 60);
    const segs = secs % 60;

    if (horas > 0) {
      return `${horas.toString().padStart(2, '0')}:${minutos
        .toString()
        .padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
    }

    return `${minutos.toString().padStart(2, '0')}:${segs
      .toString()
      .padStart(2, '0')}`;
  };

  return {
    segundos,
    tiempoFormateado: formatearTiempo(segundos),
    isActive,
    iniciar,
    pausar,
    reiniciar,
    progreso: ((tiempoInicial - segundos) / tiempoInicial) * 100
  };
};

/**
 * Hook para contador de pasos
 */
export const useStepCounter = (totalPasos: number) => {
  const [pasoActual, setPasoActual] = useState(1);

  const siguiente = useCallback(() => {
    setPasoActual((prev) => Math.min(prev + 1, totalPasos));
  }, [totalPasos]);

  const anterior = useCallback(() => {
    setPasoActual((prev) => Math.max(prev - 1, 1));
  }, []);

  const irAlPaso = useCallback((paso: number) => {
    if (paso >= 1 && paso <= totalPasos) {
      setPasoActual(paso);
    }
  }, [totalPasos]);

  const reiniciar = useCallback(() => {
    setPasoActual(1);
  }, []);

  return {
    pasoActual,
    totalPasos,
    siguiente,
    anterior,
    irAlPaso,
    reiniciar,
    porcentajeCompletado: (pasoActual / totalPasos) * 100,
    esUltimoPaso: pasoActual === totalPasos,
    esPrimerPaso: pasoActual === 1
  };
};

/**
 * Hook para contador de progreso con porcentaje
 */
export const useProgressCounter = (
  valorActual: number,
  valorTotal: number,
  duracion: number = 1000
) => {
  const [porcentaje, setPorcentaje] = useState(0);
  const targetPorcentaje = (valorActual / valorTotal) * 100;

  useEffect(() => {
    const diferencia = targetPorcentaje - porcentaje;
    if (diferencia === 0) return;

    const pasos = 60; // 60 frames para suavidad
    const incrementoPorPaso = diferencia / pasos;
    const tiempoIntervalo = duracion / pasos;

    let paso = 0;
    const intervalo = setInterval(() => {
      paso++;
      setPorcentaje((prev) => {
        const nuevo = prev + incrementoPorPaso;
        return paso === pasos ? targetPorcentaje : nuevo;
      });

      if (paso >= pasos) {
        clearInterval(intervalo);
      }
    }, tiempoIntervalo);

    return () => clearInterval(intervalo);
  }, [valorActual, valorTotal, duracion, targetPorcentaje]);

  return {
    porcentaje: Math.round(porcentaje),
    porcentajeDecimal: porcentaje.toFixed(2),
    valorActual,
    valorTotal
  };
};

/**
 * Hook para contador de incremento gradual
 */
export const useGradualIncrement = (
  valorInicial: number = 0,
  velocidad: number = 1
) => {
  const [valor, setValor] = useState(valorInicial);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const iniciar = useCallback(() => {
    setIsRunning(true);
  }, []);

  const detener = useCallback(() => {
    setIsRunning(false);
  }, []);

  const establecer = useCallback((nuevoValor: number) => {
    setValor(nuevoValor);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setValor((prev) => prev + velocidad);
    }, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, velocidad]);

  return {
    valor,
    isRunning,
    iniciar,
    detener,
    establecer
  };
};

/**
 * Hook para contador con límite máximo
 */
export const useCounterWithLimit = (
  limiteMinimo: number = 0,
  limiteMaximo: number = 100,
  valorInicial: number = 0
) => {
  const [valor, setValor] = useState(
    Math.max(limiteMinimo, Math.min(limiteMaximo, valorInicial))
  );

  const incrementar = useCallback((cantidad: number = 1) => {
    setValor((prev) => Math.min(prev + cantidad, limiteMaximo));
  }, [limiteMaximo]);

  const decrementar = useCallback((cantidad: number = 1) => {
    setValor((prev) => Math.max(prev - cantidad, limiteMinimo));
  }, [limiteMinimo]);

  const establecer = useCallback((nuevoValor: number) => {
    setValor(Math.max(limiteMinimo, Math.min(nuevoValor, limiteMaximo)));
  }, [limiteMinimo, limiteMaximo]);

  const reiniciar = useCallback(() => {
    setValor(valorInicial);
  }, [valorInicial]);

  return {
    valor,
    incrementar,
    decrementar,
    establecer,
    reiniciar,
    enLimiteMaximo: valor === limiteMaximo,
    enLimiteMinimo: valor === limiteMinimo,
    porcentaje: ((valor - limiteMinimo) / (limiteMaximo - limiteMinimo)) * 100
  };
};

/**
 * Hook para contador que alterna entre valores
 */
export const useToggleCounter = (valor1: number, valor2: number) => {
  const [valor, setValor] = useState(valor1);

  const alternar = useCallback(() => {
    setValor((prev) => (prev === valor1 ? valor2 : valor1));
  }, [valor1, valor2]);

  const establecerValor1 = useCallback(() => {
    setValor(valor1);
  }, [valor1]);

  const establecerValor2 = useCallback(() => {
    setValor(valor2);
  }, [valor2]);

  return {
    valor,
    alternar,
    establecerValor1,
    establecerValor2,
    esValor1: valor === valor1,
    esValor2: valor === valor2
  };
};

/**
 * Hook para contador con historial
 */
export const useCounterWithHistory = (valorInicial: number = 0) => {
  const [valor, setValor] = useState(valorInicial);
  const [historial, setHistorial] = useState<number[]>([valorInicial]);
  const [posicion, setPosicion] = useState(0);

  const incrementar = useCallback((cantidad: number = 1) => {
    const nuevoValor = valor + cantidad;
    const nuevoHistorial = historial.slice(0, posicion + 1);
    nuevoHistorial.push(nuevoValor);
    setHistorial(nuevoHistorial);
    setValor(nuevoValor);
    setPosicion(nuevoHistorial.length - 1);
  }, [valor, historial, posicion]);

  const decrementar = useCallback((cantidad: number = 1) => {
    incrementar(-cantidad);
  }, [incrementar]);

  const deshacer = useCallback(() => {
    if (posicion > 0) {
      const nuevaPosicion = posicion - 1;
      setPosicion(nuevaPosicion);
      setValor(historial[nuevaPosicion]);
    }
  }, [posicion, historial]);

  const rehacer = useCallback(() => {
    if (posicion < historial.length - 1) {
      const nuevaPosicion = posicion + 1;
      setPosicion(nuevaPosicion);
      setValor(historial[nuevaPosicion]);
    }
  }, [posicion, historial]);

  return {
    valor,
    historial,
    incrementar,
    decrementar,
    deshacer,
    rehacer,
    puedeDeshacer: posicion > 0,
    puedeRehacer: posicion < historial.length - 1
  };
};

/**
 * Hook para contador formateado (moneda, porcentaje, etc)
 */
export const useFormattedCounter = (
  valorFinal: number,
  tipo: 'moneda' | 'porcentaje' | 'numero' = 'numero',
  moneda: string = 'COP',
  duracion: number = 2000
) => {
  const [valor, setValor] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(elapsed / duracion, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOut
      const nuevoValor = easedProgress * valorFinal;

      setValor(nuevoValor);

      if (progress < 1) {
        animationIdRef.current = requestAnimationFrame(animate);
      }
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [valorFinal, duracion]);

  const formatear = (): string => {
    switch (tipo) {
      case 'moneda':
        return new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: moneda
        }).format(valor);
      case 'porcentaje':
        return `${Math.round(valor)}%`;
      case 'numero':
      default:
        return Math.round(valor).toString();
    }
  };

  return {
    valor: Math.round(valor),
    valorFormateado: formatear(),
    progreso: (valor / valorFinal) * 100
  };
};

/**
 * Hook para contador con animación de parpadeo
 */
export const useFlashingCounter = (
  valor: number,
  duracionParpadeo: number = 500
) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, duracionParpadeo);

    return () => clearInterval(intervalo);
  }, [duracionParpadeo]);

  return {
    valor,
    isVisible,
    opacity: isVisible ? 1 : 0.3
  };
};

/**
 * Hook para contador de eventos
 */
export const useEventCounter = () => {
  const [conteos, setConteos] = useState<{ [key: string]: number }>({});

  const incrementar = useCallback((evento: string, cantidad: number = 1) => {
    setConteos((prev) => ({
      ...prev,
      [evento]: (prev[evento] || 0) + cantidad
    }));
  }, []);

  const decrementar = useCallback((evento: string, cantidad: number = 1) => {
    setConteos((prev) => ({
      ...prev,
      [evento]: Math.max(0, (prev[evento] || 0) - cantidad)
    }));
  }, []);

  const resetear = useCallback((evento?: string) => {
    if (evento) {
      setConteos((prev) => ({
        ...prev,
        [evento]: 0
      }));
    } else {
      setConteos({});
    }
  }, []);

  const obtener = useCallback((evento: string): number => {
    return conteos[evento] || 0;
  }, [conteos]);

  const total = useCallback((): number => {
    return Object.values(conteos).reduce((a, b) => a + b, 0);
  }, [conteos]);

  return {
    conteos,
    incrementar,
    decrementar,
    resetear,
    obtener,
    total: total()
  };
};

/**
 * Hook para contador sincronizado entre pestañas
 */
export const useSyncedCounter = (
  clave: string,
  valorInicial: number = 0
) => {
  const [valor, setValor] = useState(() => {
    if (typeof window !== 'undefined') {
      const guardado = localStorage.getItem(clave);
      return guardado ? parseInt(guardado, 10) : valorInicial;
    }
    return valorInicial;
  });

  useEffect(() => {
    localStorage.setItem(clave, valor.toString());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === clave && e.newValue) {
        setValor(parseInt(e.newValue, 10));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [valor, clave]);

  const incrementar = useCallback((cantidad: number = 1) => {
    setValor((prev) => prev + cantidad);
  }, []);

  const decrementar = useCallback((cantidad: number = 1) => {
    setValor((prev) => Math.max(0, prev - cantidad));
  }, []);

  const reiniciar = useCallback(() => {
    setValor(valorInicial);
  }, [valorInicial]);

  return {
    valor,
    incrementar,
    decrementar,
    reiniciar
  };
};

/**
 * Hook para contador de tiempo transcurrido
 */
export const useElapsedTime = () => {
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const pausedTimeRef = useRef<number>(0);
  const animationIdRef = useRef<number | null>(null);

  const iniciar = useCallback(() => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - pausedTimeRef.current;
  }, []);

  const pausar = useCallback(() => {
    setIsRunning(false);
    if (startTimeRef.current !== null) {
      pausedTimeRef.current = Date.now() - startTimeRef.current;
    }
  }, []);

  const reiniciar = useCallback(() => {
    setIsRunning(false);
    setTiempoTranscurrido(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const actualizar = () => {
      if (startTimeRef.current !== null) {
        setTiempoTranscurrido(Date.now() - startTimeRef.current);
      }
      animationIdRef.current = requestAnimationFrame(actualizar);
    };

    animationIdRef.current = requestAnimationFrame(actualizar);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [isRunning]);

  const formatearTiempo = (): string => {
    const totalSegundos = Math.floor(tiempoTranscurrido / 1000);
    const horas = Math.floor(totalSegundos / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    if (horas > 0) {
      return `${horas}:${minutos.toString().padStart(2, '0')}:${segundos
        .toString()
        .padStart(2, '0')}`;
    }

    return `${minutos}:${segundos.toString().padStart(2, '0')}`;
  };

  return {
    tiempoTranscurrido,
    tiempoFormateado: formatearTiempo(),
    isRunning,
    iniciar,
    pausar,
    reiniciar
  };
};

/**
 * Hook para contador circular/radial
 */
export const useRadialCounter = (
  valorFinal: number,
  duracion: number = 2000,
  radius: number = 50
) => {
  const [valor, setValor] = useState(0);
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duracion, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const nuevoValor = easedProgress * valorFinal;

      setValor(nuevoValor);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [valorFinal, duracion]);

  const strokeDashoffset = circumference - (valor / valorFinal) * circumference;

  return {
    valor: Math.round(valor),
    porcentaje: (valor / valorFinal) * 100,
    circumference,
    strokeDashoffset,
    radius
  };
};

// EXPORT COMO OBJETO
export const counterHooks = {
  useCounter,
  useCounterOnView,
  useCounterWithEasing,
  useCountDown,
  useStepCounter,
  useProgressCounter,
  useGradualIncrement,
  useCounterWithLimit,
  useToggleCounter,
  useCounterWithHistory,
  useFormattedCounter,
  useFlashingCounter,
  useEventCounter,
  useSyncedCounter,
  useElapsedTime,
  useRadialCounter
};

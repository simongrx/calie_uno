'use client';

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { PilarType } from '@/types';

export interface UsePilarFilterOptions {
  pilarPorDefecto?: PilarType;
  permitirMultiples?: boolean;
  persistirEnLocal?: boolean;
  clave?: string;
}

/**
 * Hook para filtrar contenido por pilar
 */
export const usePilarFilter = <T extends { pilar: PilarType }>(
  datos: T[],
  options: UsePilarFilterOptions = {}
) => {
  const {
    pilarPorDefecto = 'cultura',
    permitirMultiples = false,
    persistirEnLocal = false,
    clave = 'pilar_filtro'
  } = options;

  const [pilarSeleccionado, setPilarSeleccionado] = useState<PilarType | PilarType[]>(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      const guardado = localStorage.getItem(clave);
      if (guardado) {
        try {
          return JSON.parse(guardado);
        } catch {
          return pilarPorDefecto;
        }
      }
    }
    return pilarPorDefecto;
  });

  useEffect(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      localStorage.setItem(clave, JSON.stringify(pilarSeleccionado));
    }
  }, [pilarSeleccionado, persistirEnLocal, clave]);

  const seleccionarPilar = useCallback(
    (pilar: PilarType) => {
      if (permitirMultiples) {
        setPilarSeleccionado((prev) => {
          const actual = Array.isArray(prev) ? prev : [prev];
          return actual.includes(pilar)
            ? actual.filter((p) => p !== pilar)
            : [...actual, pilar];
        });
      } else {
        setPilarSeleccionado(pilar);
      }
    },
    [permitirMultiples]
  );

  const limpiarFiltro = useCallback(() => {
    setPilarSeleccionado(pilarPorDefecto);
  }, [pilarPorDefecto]);

  const datosFiltradores = useMemo(() => {
    if (Array.isArray(pilarSeleccionado)) {
      return datos.filter((item) => pilarSeleccionado.includes(item.pilar));
    }
    return datos.filter((item) => item.pilar === pilarSeleccionado);
  }, [datos, pilarSeleccionado]);

  const conteosPorPilar = useMemo(() => {
    const conteos: { [key in PilarType]: number } = {
      cultura: 0,
      naturaleza: 0,
      gastronomia: 0,
      bienestar: 0
    };

    datos.forEach((item) => {
      conteos[item.pilar]++;
    });

    return conteos;
  }, [datos]);

  const pilarActivo = useCallback(
    (pilar: PilarType): boolean => {
      if (Array.isArray(pilarSeleccionado)) {
        return pilarSeleccionado.includes(pilar);
      }
      return pilarSeleccionado === pilar;
    },
    [pilarSeleccionado]
  );

  return {
    pilarSeleccionado,
    seleccionarPilar,
    limpiarFiltro,
    datosFiltradores,
    conteosPorPilar,
    pilarActivo,
    cantidadSeleccionada: Array.isArray(pilarSeleccionado)
      ? pilarSeleccionado.length
      : 1,
    totalDatos: datos.length,
    datosFiltrados: datosFiltradores.length
  };
};

/**
 * Hook para filtrar con múltiples criterios incluyendo pilar
 */
export const usePilarMultiFilter = <T extends { pilar: PilarType }>(
  datos: T[],
  options: UsePilarFilterOptions = {}
) => {
  const {
    pilarPorDefecto = 'cultura',
    persistirEnLocal = false,
    clave = 'filtro_completo'
  } = options;

  const [filtros, setFiltros] = useState(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      const guardado = localStorage.getItem(clave);
      if (guardado) {
        try {
          return JSON.parse(guardado);
        } catch {
          return { pilar: pilarPorDefecto, busqueda: '', otros: {} };
        }
      }
    }
    return { pilar: pilarPorDefecto, busqueda: '', otros: {} };
  });

  useEffect(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      localStorage.setItem(clave, JSON.stringify(filtros));
    }
  }, [filtros, persistirEnLocal, clave]);

  const establecerPilar = useCallback((pilar: PilarType) => {
    setFiltros((prev: any) => ({ ...prev, pilar }));
  }, []);

  const establecerBusqueda = useCallback((busqueda: string) => {
    setFiltros((prev: any) => ({ ...prev, busqueda }));
  }, []);

  const establecerFiltro = useCallback((clave: string, valor: any) => {
    setFiltros((prev: any) => ({
      ...prev,
      otros: { ...prev.otros, [clave]: valor }
    }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    setFiltros({ pilar: pilarPorDefecto, busqueda: '', otros: {} });
  }, [pilarPorDefecto]);

  const datosFiltradores = useMemo(() => {
    return datos.filter((item) => {
      // Filtro por pilar
      if (item.pilar !== filtros.pilar) return false;

      // Filtro por búsqueda (si aplica)
      if (filtros.busqueda) {
        const busquedaLower = filtros.busqueda.toLowerCase();
        // Aquí puedes adaptar según los campos de tu objeto T
        const textoItem = JSON.stringify(item).toLowerCase();
        if (!textoItem.includes(busquedaLower)) return false;
      }

      // Filtros adicionales
      for (const [clave, valor] of Object.entries(filtros.otros)) {
        if (valor && (item as any)[clave] !== valor) {
          return false;
        }
      }

      return true;
    });
  }, [datos, filtros]);

  const tieneFilterosActivos = useMemo(() => {
    return (
      filtros.busqueda !== '' || Object.keys(filtros.otros).length > 0
    );
  }, [filtros]);

  return {
    filtros,
    establecerPilar,
    establecerBusqueda,
    establecerFiltro,
    limpiarFiltros,
    datosFiltradores,
    tieneFilterosActivos,
    totalDatos: datos.length,
    datosFiltrados: datosFiltradores.length
  };
};

/**
 * Hook para transitar entre pilares con animación
 */
export const usePilarTransition = () => {
  const [pilarActual, setPilarActual] = useState<PilarType>('cultura');
  const [pilarAnterior, setPilarAnterior] = useState<PilarType>('cultura');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const cambiarPilar = useCallback((nuevoPilar: PilarType) => {
    if (nuevoPilar === pilarActual) return;

    setIsTransitioning(true);
    setPilarAnterior(pilarActual);

    setTimeout(() => {
      setPilarActual(nuevoPilar);
      setIsTransitioning(false);
    }, 300);
  }, [pilarActual]);

  return {
    pilarActual,
    pilarAnterior,
    isTransitioning,
    cambiarPilar
  };
};

/**
 * Hook para historial de pilares visitados
 */
export const usePilarHistory = (tamanioMax: number = 10) => {
  const [historial, setHistorial] = useState<PilarType[]>(['cultura']);
  const [posicion, setPosicion] = useState(0);

  const irAPilar = useCallback((pilar: PilarType) => {
    const nuevoHistorial = historial.slice(0, posicion + 1);
    if (nuevoHistorial[nuevoHistorial.length - 1] !== pilar) {
      nuevoHistorial.push(pilar);
      if (nuevoHistorial.length > tamanioMax) {
        nuevoHistorial.shift();
      } else {
        setPosicion(nuevoHistorial.length - 1);
      }
      setHistorial(nuevoHistorial);
    }
  }, [historial, posicion, tamanioMax]);

  const atrasEnHistorial = useCallback(() => {
    if (posicion > 0) {
      setPosicion(posicion - 1);
    }
  }, [posicion]);

  const adelanteEnHistorial = useCallback(() => {
    if (posicion < historial.length - 1) {
      setPosicion(posicion + 1);
    }
  }, [posicion, historial.length]);

  const pilarActual = historial[posicion];

  return {
    pilarActual,
    historial,
    posicion,
    irAPilar,
    atrasEnHistorial,
    adelanteEnHistorial,
    puedeIrAtras: posicion > 0,
    puedeIrAdelante: posicion < historial.length - 1
  };
};

/**
 * Hook para comparar pilares
 */
export const useComparePilares = () => {
  const [pilaresAComparar, setPilaresAComparar] = useState<PilarType[]>([]);

  const agregarPillar = useCallback((pilar: PilarType) => {
    setPilaresAComparar((prev) => {
      if (prev.includes(pilar)) {
        return prev.filter((p) => p !== pilar);
      }
      if (prev.length >= 4) {
        return [...prev.slice(1), pilar];
      }
      return [...prev, pilar];
    });
  }, []);

  const limpiarComparacion = useCallback(() => {
    setPilaresAComparar([]);
  }, []);

  const pilarEstaSeleccionado = useCallback(
    (pilar: PilarType) => pilaresAComparar.includes(pilar),
    [pilaresAComparar]
  );

  return {
    pilaresAComparar,
    agregarPillar,
    limpiarComparacion,
    pilarEstaSeleccionado,
    cantidadSeleccionados: pilaresAComparar.length
  };
};

/**
 * Hook para filtrar por pilar con búsqueda avanzada
 */
export const usePilarAdvancedSearch = <T extends { pilar: PilarType }>(
  datos: T[],
  campos: (keyof T)[] = []
) => {
  const [pilar, setPilar] = useState<PilarType>('cultura');
  const [termino, setTermino] = useState('');
  const [filtrosAvanzados, setFiltrosAvanzados] = useState<{
    [key: string]: any;
  }>({});

  const resultados = useMemo(() => {
    let resultado = datos.filter((item) => item.pilar === pilar);

    if (termino.trim()) {
      const terminoLower = termino.toLowerCase();
      resultado = resultado.filter((item) => {
        return campos.some((campo) => {
          const valor = item[campo];
          return (
            valor &&
            String(valor).toLowerCase().includes(terminoLower)
          );
        });
      });
    }

    for (const [clave, valor] of Object.entries(filtrosAvanzados)) {
      if (valor !== undefined && valor !== null) {
        resultado = resultado.filter((item) => {
          return (item as any)[clave] === valor;
        });
      }
    }

    return resultado;
  }, [datos, pilar, termino, filtrosAvanzados, campos]);

  const establecerFiltroAvanzado = useCallback((clave: string, valor: any) => {
    setFiltrosAvanzados((prev) => ({
      ...prev,
      [clave]: valor
    }));
  }, []);

  const limpiarFiltros = useCallback(() => {
    setPilar('cultura');
    setTermino('');
    setFiltrosAvanzados({});
  }, []);

  return {
    pilar,
    setPilar,
    termino,
    setTermino,
    filtrosAvanzados,
    establecerFiltroAvanzado,
    resultados,
    limpiarFiltros,
    totalResultados: resultados.length
  };
};

/**
 * Hook para filtro de pilar con favoritos
 */
export const usePilarWithFavorites = <T extends { pilar: PilarType; id: string }>(
  datos: T[],
  options: UsePilarFilterOptions = {}
) => {
  const {
    pilarPorDefecto = 'cultura',
    persistirEnLocal = true,
    clave = 'favoritos_pilar'
  } = options;

  const [pilarSeleccionado, setPilarSeleccionado] = useState(pilarPorDefecto);
  const [favoritos, setFavoritos] = useState<string[]>(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      const guardado = localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : [];
    }
    return [];
  });

  useEffect(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      localStorage.setItem(clave, JSON.stringify(favoritos));
    }
  }, [favoritos, persistirEnLocal, clave]);

  const seleccionarPilar = useCallback((pilar: PilarType) => {
    setPilarSeleccionado(pilar);
  }, []);

  const agregarAFavoritos = useCallback((id: string) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  }, []);

  const esFavorito = useCallback((id: string) => {
    return favoritos.includes(id);
  }, [favoritos]);

  const datosFiltradores = useMemo(() => {
    return datos.filter((item) => item.pilar === pilarSeleccionado);
  }, [datos, pilarSeleccionado]);

  const datosFiltradorosFavoritos = useMemo(() => {
    return datosFiltradores.filter((item) => favoritos.includes(item.id));
  }, [datosFiltradores, favoritos]);

  return {
    pilarSeleccionado,
    seleccionarPilar,
    favoritos,
    agregarAFavoritos,
    esFavorito,
    datosFiltradores,
    datosFiltradorosFavoritos,
    totalFavoritos: favoritos.length
  };
};

/**
 * Hook para estadísticas por pilar
 */
export const usePilarStats = <T extends { pilar: PilarType }>(datos: T[]) => {
  const stats = useMemo(() => {
    const estadisticas: { [key in PilarType]: { count: number; porcentaje: number } } = {
      cultura: { count: 0, porcentaje: 0 },
      naturaleza: { count: 0, porcentaje: 0 },
      gastronomia: { count: 0, porcentaje: 0 },
      bienestar: { count: 0, porcentaje: 0 }
    };

    datos.forEach((item) => {
      estadisticas[item.pilar].count++;
    });

    const total = datos.length;
    (Object.keys(estadisticas) as PilarType[]).forEach((pilar) => {
      estadisticas[pilar].porcentaje =
        total > 0 ? (estadisticas[pilar].count / total) * 100 : 0;
    });

    return estadisticas;
  }, [datos]);

  const pilarConMasDatos = useMemo(() => {
    let mayor: PilarType = 'cultura';
    let cantidad = 0;

    (Object.keys(stats) as PilarType[]).forEach((pilar) => {
      if (stats[pilar].count > cantidad) {
        cantidad = stats[pilar].count;
        mayor = pilar;
      }
    });

    return mayor;
  }, [stats]);

  return {
    stats,
    pilarConMasDatos,
    total: datos.length
  };
};

/**
 * Hook para ordenar datos por pilar
 */
export const usePilarSort = <T extends { pilar: PilarType }>(
  datos: T[],
  ordenPilar: PilarType[] = [
    'cultura',
    'naturaleza',
    'gastronomia',
    'bienestar'
  ]
) => {
  const datosOrdenados = useMemo(() => {
    const mapa: { [key in PilarType]: T[] } = {
      cultura: [],
      naturaleza: [],
      gastronomia: [],
      bienestar: []
    };

    datos.forEach((item) => {
      mapa[item.pilar].push(item);
    });

    const resultado: T[] = [];
    ordenPilar.forEach((pilar) => {
      resultado.push(...mapa[pilar]);
    });

    return resultado;
  }, [datos, ordenPilar]);

  return {
    datosOrdenados,
    cambiarOrden: (nuevoOrden: PilarType[]) => {
      // El estado se actualiza a través del re-render con nuevos props
      return nuevoOrden;
    }
  };
};

/**
 * Hook para grupar datos por pilar
 */
export const useGroupByPilar = <T extends { pilar: PilarType }>(
  datos: T[]
) => {
  const datosAgrupados = useMemo(() => {
    const grupos: { [key in PilarType]: T[] } = {
      cultura: [],
      naturaleza: [],
      gastronomia: [],
      bienestar: []
    };

    datos.forEach((item) => {
      grupos[item.pilar].push(item);
    });

    return grupos;
  }, [datos]);

  const obtenerGrupo = useCallback(
    (pilar: PilarType): T[] => {
      return datosAgrupados[pilar];
    },
    [datosAgrupados]
  );

  const cantidadPorGrupo = useMemo(() => {
    return {
      cultura: datosAgrupados.cultura.length,
      naturaleza: datosAgrupados.naturaleza.length,
      gastronomia: datosAgrupados.gastronomia.length,
      bienestar: datosAgrupados.bienestar.length
    };
  }, [datosAgrupados]);

  return {
    datosAgrupados,
    obtenerGrupo,
    cantidadPorGrupo
  };
};

/**
 * Hook para sincronizar filtro de pilar con URL
 */
export const usePilarFilterURL = () => {
  const [pilar, setPilar] = useState<PilarType>('cultura');

  useEffect(() => {
    // Obtener pilar de la URL al montar
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const pilarURL = params.get('pilar') as PilarType;
      if (pilarURL && ['cultura', 'naturaleza', 'gastronomia', 'bienestar'].includes(pilarURL)) {
        setPilar(pilarURL);
      }
    }
  }, []);

  const cambiarPilar = useCallback((nuevoPilar: PilarType) => {
    setPilar(nuevoPilar);
    
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('pilar', nuevoPilar);
      window.history.replaceState({}, '', `?${params.toString()}`);
    }
  }, []);

  return {
    pilar,
    cambiarPilar
  };
};

/**
 * Hook para animar transición entre filtros
 */
export const usePilarFilterAnimation = () => {
  const [pilarActual, setPilarActual] = useState<PilarType>('cultura');
  const [pilarAnterior, setPilarAnterior] = useState<PilarType>('cultura');
  const [isAnimating, setIsAnimating] = useState(false);

  const cambiarFiltro = useCallback((nuevoPilar: PilarType) => {
    if (nuevoPilar === pilarActual) return;

    setPilarAnterior(pilarActual);
    setIsAnimating(true);

    setTimeout(() => {
      setPilarActual(nuevoPilar);
      setIsAnimating(false);
    }, 300);
  }, [pilarActual]);

  return {
    pilarActual,
    pilarAnterior,
    isAnimating,
    cambiarFiltro
  };
};

/**
 * Hook para recomendaciones basadas en pilar actual
 */
export const usePilarRecommendations = <T extends { pilar: PilarType; rating?: number }>(
  datos: T[],
  pilarActual: PilarType,
  cantidad: number = 3
) => {
  const recomendaciones = useMemo(() => {
    return datos
      .filter((item) => item.pilar === pilarActual)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, cantidad);
  }, [datos, pilarActual, cantidad]);

  return {
    recomendaciones,
    tieneRecomendaciones: recomendaciones.length > 0
  };
};

/**
 * Hook para seguimiento de cambios de pilar
 */
export const usePilarChangeTracking = () => {
  const [cambios, setCambios] = useState<
    Array<{ pilar: PilarType; timestamp: number }>
  >([]);

  const registrarCambio = useCallback((pilar: PilarType) => {
    setCambios((prev) => [
      ...prev,
      { pilar, timestamp: Date.now() }
    ]);
  }, []);

  const obtenerUltimoCambio = useCallback(() => {
    return cambios[cambios.length - 1] || null;
  }, [cambios]);

  const obtenerHistorial = useCallback((minutos: number = 30) => {
    const ahora = Date.now();
    const limite = ahora - minutos * 60 * 1000;
    return cambios.filter((cambio) => cambio.timestamp > limite);
  }, [cambios]);

  const limpiarHistorial = useCallback(() => {
    setCambios([]);
  }, []);

  return {
    cambios,
    registrarCambio,
    obtenerUltimoCambio,
    obtenerHistorial,
    limpiarHistorial,
    totalCambios: cambios.length
  };
};

/**
 * Hook para notificaciones de filtro
 */
export const usePilarFilterNotification = () => {
  const [notificacion, setNotificacion] = useState<{
    mensaje: string;
    pilar: PilarType;
    visible: boolean;
  } | null>(null);

  const mostrarNotificacion = useCallback(
    (pilar: PilarType, mensaje?: string) => {
      const msgs: { [key in PilarType]: string } = {
        cultura: 'Mostrando contenido de Cultura',
        naturaleza: 'Mostrando contenido de Naturaleza',
        gastronomia: 'Mostrando contenido de Gastronomía',
        bienestar: 'Mostrando contenido de Bienestar'
      };

      setNotificacion({
        mensaje: mensaje || msgs[pilar],
        pilar,
        visible: true
      });

      setTimeout(() => {
        setNotificacion((prev) =>
          prev ? { ...prev, visible: false } : null
        );
      }, 3000);
    },
    []
  );

  const ocultarNotificacion = useCallback(() => {
    setNotificacion((prev) =>
      prev ? { ...prev, visible: false } : null
    );
  }, []);

  return {
    notificacion,
    mostrarNotificacion,
    ocultarNotificacion
  };
};

/**
 * Hook para guardar preferencias de pilar por usuario
 */
export const usePilarPreferences = (
  userId: string,
  options: { persistirEnLocal?: boolean } = {}
) => {
  const { persistirEnLocal = true } = options;
  const clave = `pilar_pref_${userId}`;

  const [preferencias, setPreferencias] = useState(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      const guardado = localStorage.getItem(clave);
      if (guardado) {
        try {
          return JSON.parse(guardado);
        } catch {
          return { pilarFavorito: 'cultura', ultimoVisitado: 'cultura' };
        }
      }
    }
    return { pilarFavorito: 'cultura', ultimoVisitado: 'cultura' };
  });

  useEffect(() => {
    if (persistirEnLocal && typeof window !== 'undefined') {
      localStorage.setItem(clave, JSON.stringify(preferencias));
    }
  }, [preferencias, persistirEnLocal, clave]);

  const establecerFavorito = useCallback((pilar: PilarType) => {
    setPreferencias((prev: any) => ({ ...prev, pilarFavorito: pilar }));
  }, []);

  const actualizarUltimoVisitado = useCallback((pilar: PilarType) => {
    setPreferencias((prev: any) => ({ ...prev, ultimoVisitado: pilar }));
  }, []);

  return {
    preferencias,
    establecerFavorito,
    actualizarUltimoVisitado
  };
};

/**
 * Hook para sugerencias de pilar
 */
export const usePilarSuggestions = <T extends { pilar: PilarType }>(
  datos: T[],
  pilarActual: PilarType
) => {
  const sugerencias = useMemo(() => {
    const pilares: PilarType[] = [
      'cultura',
      'naturaleza',
      'gastronomia',
      'bienestar'
    ];
    
    return pilares
      .filter((p) => p !== pilarActual)
      .map((pilar) => ({
        pilar,
        cantidad: datos.filter((d) => d.pilar === pilar).length
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }, [datos, pilarActual]);

  return {
    sugerencias,
    pilarMasPopular: sugerencias[0]?.pilar || 'cultura'
  };
};

// EXPORT COMO OBJETO
export const pilarFilterHooks = {
  usePilarFilter,
  usePilarMultiFilter,
  usePilarTransition,
  usePilarHistory,
  useComparePilares,
  usePilarAdvancedSearch,
  usePilarWithFavorites,
  usePilarStats,
  usePilarSort,
  useGroupByPilar,
  usePilarFilterURL,
  usePilarFilterAnimation,
  usePilarRecommendations,
  usePilarChangeTracking,
  usePilarFilterNotification,
  usePilarPreferences,
  usePilarSuggestions
};

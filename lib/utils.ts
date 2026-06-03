// ============================================
// UTILIDADES GENERALES
// ============================================

// FUNCIONES DE CLASIFICACIÓN
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// FORMATEAR TEXTO
export const capitalizarPrimera = (texto: string): string => {
  return texto.charAt(0).toUpperCase() + texto.slice(1);
};

export const capitalizarPalabras = (texto: string): string => {
  return texto
    .split(' ')
    .map(palabra => capitalizarPrimera(palabra))
    .join(' ');
};

export const truncarTexto = (texto: string, limite: number = 100): string => {
  if (texto.length <= limite) return texto;
  return texto.substring(0, limite) + '...';
};

// FORMATEAR NÚMEROS
export const formatearNumero = (numero: number, decimales: number = 0): string => {
  return numero.toLocaleString('es-CO', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales
  });
};

export const formatearMoneda = (cantidad: number, moneda: string = 'COP'): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: moneda
  }).format(cantidad);
};

export const formatearPorcentaje = (valor: number, decimales: number = 1): string => {
  return `${valor.toFixed(decimales)}%`;
};

// FORMATEAR FECHAS
export const formatearFecha = (fecha: string | Date, formato: string = 'es-CO'): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return date.toLocaleDateString(formato);
};

export const formatearFechaHora = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return date.toLocaleString('es-CO');
};

export const obtenerFechaRelativa = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  const ahora = new Date();
  const diferencia = ahora.getTime() - date.getTime();
  const segundos = Math.floor(diferencia / 1000);

  if (segundos < 60) return 'hace unos segundos';
  if (segundos < 3600) return `hace ${Math.floor(segundos / 60)} minutos`;
  if (segundos < 86400) return `hace ${Math.floor(segundos / 3600)} horas`;
  if (segundos < 604800) return `hace ${Math.floor(segundos / 86400)} días`;
  
  return formatearFecha(fecha);
};

// VALIDACIONES
export const validarEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validarTelefono = (telefono: string): boolean => {
  const regex = /^[\d\s\-\+\(\)]{7,}$/;
  return regex.test(telefono);
};

export const validarURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validarContraseña = (contraseña: string): {
  esValida: boolean;
  mensajes: string[];
} => {
  const mensajes: string[] = [];
  
  if (contraseña.length < 8) mensajes.push('Mínimo 8 caracteres');
  if (!/[A-Z]/.test(contraseña)) mensajes.push('Al menos una mayúscula');
  if (!/[a-z]/.test(contraseña)) mensajes.push('Al menos una minúscula');
  if (!/[0-9]/.test(contraseña)) mensajes.push('Al menos un número');
  if (!/[^A-Za-z0-9]/.test(contraseña)) mensajes.push('Al menos un carácter especial');

  return {
    esValida: mensajes.length === 0,
    mensajes
  };
};

// OPERACIONES CON ARRAYS
export const agruparPor = <T>(array: T[], clave: keyof T): { [key: string]: T[] } => {
  return array.reduce((resultado, elemento) => {
    const key = String(elemento[clave]);
    if (!resultado[key]) {
      resultado[key] = [];
    }
    resultado[key].push(elemento);
    return resultado;
  }, {} as { [key: string]: T[] });
};

export const eliminarDuplicados = <T>(array: T[], clave?: keyof T): T[] => {
  if (!clave) {
    return Array.from(new Set(array));
  }
  const visto = new Set();
  return array.filter(elemento => {
    const valor = elemento[clave];
    if (visto.has(valor)) return false;
    visto.add(valor);
    return true;
  });
};

export const mezclarArrays = <T>(...arrays: T[][]): T[] => {
  return arrays.flat();
};

export const ordenarPor = <T>(array: T[], clave: keyof T, descendente: boolean = false): T[] => {
  const copia = [...array];
  copia.sort((a, b) => {
    const valorA = a[clave];
    const valorB = b[clave];
    
    if (valorA < valorB) return descendente ? 1 : -1;
    if (valorA > valorB) return descendente ? -1 : 1;
    return 0;
  });
  return copia;
};

export const paginarse = <T>(array: T[], pagina: number, porPagina: number): T[] => {
  const inicio = (pagina - 1) * porPagina;
  return array.slice(inicio, inicio + porPagina);
};

// OPERACIONES CON OBJETOS
export const mergearObjetos = <T extends object>(objetivo: T, ...fuentes: Partial<T>[]): T => {
  return Object.assign({}, objetivo, ...fuentes);
};

export const seleccionarClaves = <T extends object, K extends keyof T>(
  objeto: T,
  claves: K[]
): Pick<T, K> => {
  const resultado = {} as Pick<T, K>;
  claves.forEach(clave => {
    resultado[clave] = objeto[clave];
  });
  return resultado;
};

export const excluirClaves = <T extends object, K extends keyof T>(
  objeto: T,
  claves: K[]
): Omit<T, K> => {
  const resultado = { ...objeto } as Omit<T, K>;
  claves.forEach(clave => {
    delete (resultado as any)[clave];
  });
  return resultado;
};

// OPERACIONES CON LOCAL STORAGE
export const guardarEnLocal = (clave: string, valor: any): void => {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error('Error guardando en localStorage:', error);
  }
};

export const obtenerDelLocal = <T = any>(clave: string, porDefecto?: T): T | null => {
  try {
    const item = localStorage.getItem(clave);
    return item ? JSON.parse(item) : porDefecto || null;
  } catch (error) {
    console.error('Error obteniendo de localStorage:', error);
    return porDefecto || null;
  }
};

export const eliminarDelLocal = (clave: string): void => {
  try {
    localStorage.removeItem(clave);
  } catch (error) {
    console.error('Error eliminando de localStorage:', error);
  }
};

export const limpiarLocal = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error limpiando localStorage:', error);
  }
};

// OPERACIONES CON SESSION STORAGE
export const guardarEnSession = (clave: string, valor: any): void => {
  try {
    sessionStorage.setItem(clave, JSON.stringify(valor));
  } catch (error) {
    console.error('Error guardando en sessionStorage:', error);
  }
};

export const obtenerDelSession = <T = any>(clave: string, porDefecto?: T): T | null => {
  try {
    const item = sessionStorage.getItem(clave);
    return item ? JSON.parse(item) : porDefecto || null;
  } catch (error) {
    console.error('Error obteniendo de sessionStorage:', error);
    return porDefecto || null;
  }
};

// DELAY Y PROMESAS
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const ejecutarConReintentos = async <T>(
  funcion: () => Promise<T>,
  reintentos: number = 3,
  delayMs: number = 1000
): Promise<T> => {
  let ultimoError: Error | null = null;

  for (let i = 0; i < reintentos; i++) {
    try {
      return await funcion();
    } catch (error) {
      ultimoError = error as Error;
      if (i < reintentos - 1) {
        await delay(delayMs);
      }
    }
  }

  throw ultimoError;
};

// DEBOUNCE Y THROTTLE
export const debounce = <T extends (...args: any[]) => any>(
  funcion: T,
  espera: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => funcion(...args), espera);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  funcion: T,
  limite: number
): ((...args: Parameters<T>) => void) => {
  let enEspera = false;

  return (...args: Parameters<T>) => {
    if (!enEspera) {
      funcion(...args);
      enEspera = true;
      setTimeout(() => {
        enEspera = false;
      }, limite);
    }
  };
};

// GENERADOR DE IDS
export const generarId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const generarSlug = (texto: string): string => {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// CÁLCULOS ÚTILES
export const calcularPromedio = (numeros: number[]): number => {
  return numeros.reduce((a, b) => a + b, 0) / numeros.length;
};

export const calcularDistancia = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const calcularPercentaje = (parte: number, total: number): number => {
  if (total === 0) return 0;
  return (parte / total) * 100;
};

// COLORES
export const generarColorAleatorio = (): string => {
  const colores = [
    '#7C3AED', // Púrpura
    '#059669', // Verde
    '#DC2626', // Rojo
    '#0891B2', // Azul
    '#F59E0B', // Naranja
    '#EC4899'  // Rosa
  ];
  return colores[Math.floor(Math.random() * colores.length)];
};

export const obtenerColorPilar = (pilar: string): string => {
  const colores: { [key: string]: string } = {
    cultura: '#7C3AED',
    naturaleza: '#059669',
    gastronomia: '#DC2626',
    bienestar: '#0891B2'
  };
  return colores[pilar] || '#6B7280';
};

// TIPOS DE DATOS
export const tieneValor = <T>(valor: T | null | undefined): valor is T => {
  return valor !== null && valor !== undefined;
};

export const esArray = (valor: any): valor is any[] => {
  return Array.isArray(valor);
};

export const esObjeto = (valor: any): valor is object => {
  return typeof valor === 'object' && valor !== null && !Array.isArray(valor);
};

// NOTIFICACIONES Y ALERTAS
export const mostrarNotificacion = (
  mensaje: string,
  tipo: 'exito' | 'error' | 'advertencia' | 'info' = 'info',
  duracion: number = 3000
): void => {
  // Esta función será usada con un sistema de toast
  console.log(`[${tipo.toUpperCase()}] ${mensaje}`);
};

// DESCARGA DE ARCHIVOS
export const descargarArchivo = (contenido: string, nombreArchivo: string, tipo: string = 'text/plain'): void => {
  const blob = new Blob([contenido], { type: tipo });
  const url = window.URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = nombreArchivo;
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
  window.URL.revokeObjectURL(url);
};

export const descargarJSON = (datos: any, nombreArchivo: string = 'datos.json'): void => {
  const contenido = JSON.stringify(datos, null, 2);
  descargarArchivo(contenido, nombreArchivo, 'application/json');
};

export const descargarCSV = (datos: any[], nombreArchivo: string = 'datos.csv'): void => {
  if (datos.length === 0) return;

  const headers = Object.keys(datos[0]);
  const filas = datos.map(objeto =>
    headers.map(header => `"${objeto[header]}"`).join(',')
  );
  const contenido = [headers.join(','), ...filas].join('\n');

  descargarArchivo(contenido, nombreArchivo, 'text/csv;charset=utf-8;');
};

// COMPARTIR EN REDES SOCIALES
export const compartirEnRedSocial = (
  red: 'facebook' | 'twitter' | 'whatsapp' | 'linkedin',
  url: string,
  titulo?: string,
  descripcion?: string
): void => {
  const encodeUrl = encodeURIComponent(url);
  const encodeTitle = encodeURIComponent(titulo || '');
  const encodeDesc = encodeURIComponent(descripcion || '');

  const urls: { [key: string]: string } = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeUrl}&text=${encodeTitle}`,
    whatsapp: `https://wa.me/?text=${encodeTitle}%20${encodeUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeUrl}`
  };

  if (urls[red]) {
    window.open(urls[red], '_blank', 'width=600,height=400');
  }
};

// COPIAR AL PORTAPAPELES
export const copiarAlPortapapeles = async (texto: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    return false;
  }
};

// DETECCIÓN DE DISPOSITIVO
export const esMovil = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const esTablón = (): boolean => {
  return /iPad|Android(?!.*Mobile)/i.test(navigator.userAgent);
};

export const obtenerSistemaOperativo = (): 'Windows' | 'Mac' | 'Linux' | 'iOS' | 'Android' | 'Desconocido' => {
  const ua = navigator.userAgent;
  
  if (ua.indexOf('Win') > -1) return 'Windows';
  if (ua.indexOf('Mac') > -1) return 'Mac';
  if (ua.indexOf('Linux') > -1) return 'Linux';
  if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';
  if (ua.indexOf('Android') > -1) return 'Android';
  
  return 'Desconocido';
};

// SCROLL
export const desplazarAlElemento = (id: string, suavidad: 'smooth' | 'auto' = 'smooth'): void => {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.scrollIntoView({ behavior: suavidad, block: 'start' });
  }
};

export const desplazarAlTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const obtenerPosicionScroll = (): { x: number; y: number } => {
  return {
    x: window.scrollX || window.pageXOffset,
    y: window.scrollY || window.pageYOffset
  };
};

// VISIBILIDAD DE ELEMENTO
export const esVisibleEnViewport = (elemento: HTMLElement): boolean => {
  const rect = elemento.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// OBSERVADOR DE INTERSECCIÓN
export const crearObservadorInterseccion = (
  callback: (visible: boolean) => void,
  opciones?: IntersectionObserverInit
): IntersectionObserver => {
  return new IntersectionObserver(([entry]) => {
    callback(entry.isIntersecting);
  }, opciones);
};

// MÉTODOS ABREVIADOS
export const esperar = delay;
export const trazo = (valor: any): void => console.log(valor);
export const error = (valor: any): void => console.error(valor);
export const advertencia = (valor: any): void => console.warn(valor);
export const info = (valor: any): void => console.info(valor);

// CONVERSIÓN DE UNIDADES
export const kmAMillas = (km: number): number => km * 0.621371;
export const millasAKm = (millas: number): number => millas / 0.621371;
export const celsiusAFahrenheit = (celsius: number): number => (celsius * 9) / 5 + 32;
export const fahrenheitACelsius = (fahrenheit: number): number => ((fahrenheit - 32) * 5) / 9;

// CONSTANTS
export const COLORES_PILARES = {
  cultura: '#7C3AED',
  naturaleza: '#059669',
  gastronomia: '#DC2626',
  bienestar: '#0891B2'
};

export const TIEMPOS_ANIMACION = {
  rapido: 150,
  normal: 300,
  lento: 500,
  muyLento: 1000
};

export const RUTAS_PUBLICAS = ['/inicio', '/rutas', '/eventos', '/galeria', '/contacto'];

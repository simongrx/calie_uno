// ============================================
// TIPOS E INTERFACES PRINCIPALES
// ============================================

// PILARES
export type PilarType = 'cultura' | 'naturaleza' | 'gastronomia' | 'bienestar';

export interface Pilar {
  id: PilarType;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
  colorSecondario: string;
  imagen: string;
}

// RUTAS
export interface PuntoRuta {
  id: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  coordenadas: [number, number]; // [lat, lng]
  duracion?: string;
  tipo: 'parada' | 'foto' | 'experiencia';
  detalles?: string;
}

export interface Ruta {
  id: string;
  nombre: string;
  pilar: PilarType;
  descripcion: string;
  descripcionLarga: string;
  imagen: string;
  imagenCover: string;
  duracion: string;
  dificultad: 'facil' | 'moderado' | 'difícil';
  distancia?: string;
  puntos: PuntoRuta[];
  objetivo: string;
  galeria: string[];
  recomendaciones: string[];
  mejorHora?: string;
  precioAproximado?: string;
  incluye?: string[];
}
// EVENTOS
export interface Evento {
  id: string;
  nombre: string;
  pilar: PilarType;
  descripcion: string;
  fechaInicio: string; // "YYYY-MM-DD"
  fechaFin: string;
  hora?: string;
  ubicacion: string;
  coordenadas?: [number, number];
  imagen: string;
  enlace?: string;
  cuposDisponibles?: number;
  precio?: string;
  tags: string[];
  enVivo?: boolean;
  proximoProximo?: boolean;
}

// RESTAURANTES Y PLANES
export interface Restaurante {
  id: string;
  nombre: string;
  pilar: PilarType;
  barrio: string;
  descripcion: string;
  platoInsignia: string;
  imagen: string;
  imagenPlato: string;
  rating: number; // 1-5
  precioPromedio: string; // $ $$ $$$
  especialidad: string[];
  enlaceReserva?: string;
  trending?: boolean;
  nuevo?: boolean;
  telefono?: string;
  horario?: string;
}

export interface PlanExperiencia {
  id: string;
  nombre: string;
  descripcion: string;
  pilares: PilarType[];
  duracion: string;
  precioEstimado: string;
  incluye: string[];
  imagen: string;
  rutaAsociada?: string;
  restaurantesAsociados?: string[];
  eventosAsociados?: string[];
}
// GALERÍA
export interface ImagenGaleria {
  id: string;
  src: string;
  alt: string;
  titulo: string;
  pilar: PilarType;
  ruta?: string;
  evento?: string;
  ancho: number;
  alto: number;
}

// TESTIMONIOS
export interface Testimonio {
  id: string;
  nombre: string;
  pais: string;
  bandera: string;
  avatar: string;
  rating: number; // 1-5
  comentario: string;
  rutaVisitada?: string;
  foto?: string;
  video?: string;
  fecha?: string;
}

// ALIADOS
export interface Aliado {
  id: string;
  nombre: string;
  logo: string;
  categoria: 'gobierno' | 'academia' | 'empresa' | 'ong';
  descripcion: string;
  testimonio: string;
  contacto?: string;
  enlace?: string;
}
// MERCHANDISING (vitrina — datos placeholder)
export type CategoriaProducto = 'ropa' | 'accesorios' | 'souvenirs' | 'hogar';

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number; // COP
  categoria: CategoriaProducto;
  imagen: string;
  destacado?: boolean;
  agotado?: boolean;
}

// IMPACTO Y ESTADÍSTICAS
export interface Estadistica {
  id: string;
  label: string;
  valor: number;
  sufijo?: string;
  icono?: string;
  descripcion?: string;
}

// FILTROS
export interface FiltrosRutas {
  pilar?: PilarType;
  dificultad?: 'facil' | 'moderado' | 'difícil';
  duracion?: string;
}

export interface FiltrosEventos {
  pilar?: PilarType;
  mes?: number;
  enVivo?: boolean;
}

export interface FiltrosGaleria {
  pilar?: PilarType;
}

// RESPUESTAS DE API (para el futuro)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// CONTEXTO GLOBAL
export interface GlobalContext {
  pilarActivo?: PilarType;
  rutaActiva?: string;
  eventoActivo?: string;
  filtrosActivos: FiltrosRutas & FiltrosEventos & FiltrosGaleria;
}
// COMPONENTES PROPS
export interface SectionTitleProps {
  titulo: string;
  subtitulo?: string;
  alineacion?: 'left' | 'center' | 'right';
}

export interface PilarBadgeProps {
  pilar: PilarType;
  tamaño?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export interface LiveBadgeProps {
  tipo: 'vivo' | 'trending' | 'nuevo' | 'imperdible';
  pulsante?: boolean;
}

export interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export interface AnimatedCounterProps {
  valor: number;
  sufijo?: string;
  prefijo?: string;
  duracion?: number;
  label?: string;
}

export interface LightboxProps {
  imagenes: ImagenGaleria[];
  imagenInicial?: number;
  onClose: () => void;
}

export interface TypewriterProps {
  textos: string[];
  velocidad?: number;
  pausaDespues?: number;
}

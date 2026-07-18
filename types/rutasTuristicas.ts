// ============================================
// TIPOS DEL MAPA TURÍSTICO INTERACTIVO (overlay SVG)
// ============================================
// Nota: estos tipos son independientes del `Ruta`/`PuntoRuta` de `@/types`
// (que están basados en coordenadas Leaflet lat/lng). Aquí las coordenadas
// x/y están en unidades del viewBox del SVG.

export interface Punto {
  id: number;
  nombre: string;
  tipo: string;
  x: number;
  y: number;
  info: string;
  horario: string;
  imagen: string; // foto real del lugar (ruta pública)
}

export interface Ruta {
  id: string;
  nombre: string;
  color: string; // color del trazo y del corazón de las paradas
  colorLight: string;
  heartSrc: string; // SVG de corazón usado para todas las paradas de la ruta
  cover?: string; // foto de portada de la ruta (para la tarjeta-botón)
  description: string;
  puntos: Punto[];
  // Info rica para la card de ruta (opcional)
  descripcionLarga?: string;
  duracion?: string;
  dificultad?: string;
  distancia?: string;
  mejorHora?: string;
  precioAproximado?: string;
  incluye?: string[];
}

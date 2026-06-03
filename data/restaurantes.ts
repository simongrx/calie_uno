import { Restaurante, PlanExperiencia } from '@/types';

export const restaurantes: Restaurante[] = [
  {
    id: 'pacifico-cali',
    nombre: 'Restaurante Pacífico',
    pilar: 'gastronomia',
    barrio: 'San Antonio',
    descripcion: 'Sabores auténticos del Pacífico colombiano en un ambiente acogedor',
    platoInsignia: 'Ceviche de camarones',
    imagen: '/images/restaurantes/restaurante-1.webp',
    imagenPlato: '/images/restaurantes/restaurante-1.webp',
    rating: 4.8,
    precioPromedio: '$$$',
    especialidad: ['ceviche', 'mariscos', 'arroz con coco', 'patacones'],
    enlaceReserva: 'https://www.restaurantepacificócali.com',
    trending: true,
    nuevo: false,
    telefono: '+57 2 123 4567',
    horario: '12:00 - 23:00'
  },
  {
    id: 'sabores-del-valle',
    nombre: 'Sabores del Valle',
    pilar: 'gastronomia',
    barrio: 'Centro',
    descripcion: 'Comida tradicional vallecaucana con ingredientes frescos y locales',
    platoInsignia: 'Sancocho de gallina criolla',
    imagen: '/images/restaurantes/restaurante-2.webp',
    imagenPlato: '/images/restaurantes/restaurante-2.webp',
    rating: 4.6,
    precioPromedio: '$$',
    especialidad: ['sancocho', 'ajiaco', 'asados', 'tamales'],
    enlaceReserva: 'https://www.saboresdelvaллe.com',
    trending: false,
    nuevo: false,
    telefono: '+57 2 234 5678',
    horario: '11:00 - 22:00'
  },
  {
    id: 'fusion-gourmet',
    nombre: 'Fusión Gourmet',
    pilar: 'gastronomia',
    barrio: 'San Fernando',
    descripcion: 'Cocina internacional fusionada con sabores locales del Pacífico',
    platoInsignia: 'Salmón a la pasiflora con salsa de lulo',
    imagen: '/images/restaurantes/restaurante-3.webp',
    imagenPlato: '/images/restaurantes/restaurante-3.webp',
    rating: 4.9,
    precioPromedio: '$$$',
    especialidad: ['fusión', 'pescado', 'vegetariano', 'postres'],
    enlaceReserva: 'https://www.fusiongourmet.com',
    trending: true,
    nuevo: true,
    telefono: '+57 2 345 6789',
    horario: '18:00 - 23:30'
  },
  {
    id: 'mi-tierra',
    nombre: 'Mi Tierra',
    pilar: 'gastronomia',
    barrio: 'San Alejo',
    descripcion: 'Restaurante familiar con recetas caseras y auténticas',
    platoInsignia: 'Bandeja Caleña',
    imagen: '/images/restaurantes/restaurante-4.webp',
    imagenPlato: '/images/restaurantes/restaurante-4.webp',
    rating: 4.5,
    precioPromedio: '$$',
    especialidad: ['casero', 'bandeja caleña', 'sopas', 'carnes'],
    enlaceReserva: 'https://www.mitierra.com',
    trending: false,
    nuevo: false,
    telefono: '+57 2 456 7890',
    horario: '10:00 - 21:00'
  }
];

export const planesExperiencia: PlanExperiencia[] = [
  {
    id: 'plan-romantico',
    nombre: 'Plan Romántico',
    descripcion: 'Una noche mágica para parejas enamoradas',
    pilares: ['cultura', 'gastronomia'],
    duracion: '5 horas',
    precioEstimado: '$300.000 - $400.000',
    incluye: [
      'Cena en restaurante gourmet',
      'Paseo por Boulevard del Río',
      'Música en vivo',
      'Bebidas especiales',
      'Postre compartido'
    ],
    imagen: '/images/restaurantes/plan-romantico.webp',
    rutaAsociada: 'nocturna',
    restaurantesAsociados: ['fusion-gourmet', 'pacifico-cali'],
    eventosAsociados: []
  },
  {
    id: 'plan-familiar',
    nombre: 'Plan Familiar',
    descripcion: 'Diversión y gastronomía para toda la familia',
    pilares: ['cultura', 'gastronomia'],
    duracion: '6 horas',
    precioEstimado: '$400.000 - $600.000',
    incluye: [
      'Almuerzo familiar',
      'Visita a mercado local',
      'Taller de cocina casera',
      'Juegos tradicionales',
      'Postre sorpresa para niños'
    ],
    imagen: '/images/restaurantes/plan-familiar.webp',
    rutaAsociada: 'gastronomica',
    restaurantesAsociados: ['mi-tierra', 'sabores-del-valle'],
    eventosAsociados: []
  },
  {
    id: 'plan-aventura',
    nombre: 'Plan Aventura',
    descripcion: 'Naturaleza, adrenalina y buena comida',
    pilares: ['naturaleza', 'gastronomia', 'bienestar'],
    duracion: '8 horas',
    precioEstimado: '$500.000 - $800.000',
    incluye: [
      'Senderismo en reserva natural',
      'Baño en cascada',
      'Almuerzo al aire libre',
      'Bebidas refrescantes',
      'Meditación al atardecer'
    ],
    imagen: '/images/restaurantes/plan-aventura.webp',
    rutaAsociada: 'ecologica',
    restaurantesAsociados: ['pacifico-cali'],
    eventosAsociados: []
  },
  {
    id: 'plan-bienestar',
    nombre: 'Plan Bienestar Total',
    descripcion: 'Relax, spa y gastronomía saludable',
    pilares: ['bienestar', 'gastronomia'],
    duracion: '7 horas',
    precioEstimado: '$600.000 - $900.000',
    incluye: [
      'Masaje relajante',
      'Clase de yoga',
      'Almuerzo orgánico',
      'Baño en termas naturales',
      'Meditación y mindfulness',
      'Té herbal final'
    ],
    imagen: '/images/restaurantes/plan-bienestar.webp',
    rutaAsociada: 'bienestar',
    restaurantesAsociados: ['fusion-gourmet'],
    eventosAsociados: ['yoga-parque']
  },
  {
    id: 'plan-cultura-salsa',
    nombre: 'Plan Cultura y Salsa',
    descripcion: 'Inmersión total en la cultura salsera caleña',
    pilares: ['cultura', 'gastronomia'],
    duracion: '5 horas',
    precioEstimado: '$350.000 - $500.000',
    incluye: [
      'Clase de baile salsa',
      'Visita museo de la salsa',
      'Cena en restaurante tradicional',
      'Entrada a salsateca',
      'Bebidas y snacks'
    ],
    imagen: '/images/restaurantes/plan-cultura-salsa.webp',
    rutaAsociada: 'salsa',
    restaurantesAsociados: ['sabores-del-valle', 'pacifico-cali'],
    eventosAsociados: ['mundial-salsa']
  },
  {
    id: 'plan-valle-completo',
    nombre: 'Plan Valle Completo',
    descripcion: 'Conoce todo el Valle del Cauca en un día',
    pilares: ['cultura', 'naturaleza', 'gastronomia'],
    duracion: '12 horas',
    precioEstimado: '$800.000 - $1.200.000',
    incluye: [
      'Transporte todo incluido',
      'Desayuno regional',
      'Almuerzo en hacienda',
      'Merienda',
      'Visita pueblos coloniales',
      'Recorrido naturaleza',
      'Guía especializado',
      'Fotos profesionales'
    ],
    imagen: '/images/restaurantes/plan-valle-completo.webp',
    rutaAsociada: 'valle-region',
    restaurantesAsociados: ['mi-tierra', 'sabores-del-valle'],
    eventosAsociados: []
  }
];

// DATOS ADICIONALES DE CONTEXTO
export const categoriasComida = [
  'ceviche',
  'mariscos',
  'arroz con coco',
  'patacones',
  'sancocho',
  'ajiaco',
  'asados',
  'tamales',
  'fusión',
  'pescado',
  'vegetariano',
  'postres'
];

export const barrios = [
  'San Antonio',
  'Centro',
  'San Fernando',
  'San Alejo',
  'Cristo Rey',
  'La Merced',
  'El Peñol'
];

export const preciosCategorias = [
  { id: '$', label: 'Económico (menos de $30.000)', min: 0, max: 30000 },
  { id: '$$', label: 'Medio ($30.000 - $60.000)', min: 30000, max: 60000 },
  { id: '$$$', label: 'Premium (más de $60.000)', min: 60000, max: 999999 }
];

// FUNCIONES UTILITARIAS
export const obtenerRestaurantesPorPilar = (pilar: string) => {
  return restaurantes.filter(r => r.pilar === pilar);
};

export const obtenerRestaurantesTrending = () => {
  return restaurantes.filter(r => r.trending === true);
};

export const obtenerRestaurantesNuevos = () => {
  return restaurantes.filter(r => r.nuevo === true);
};

export const obtenerRestaurantesPorRating = (minRating: number = 4.5) => {
  return restaurantes
    .filter(r => r.rating >= minRating)
    .sort((a, b) => b.rating - a.rating);
};

export const buscarRestaurantes = (termino: string) => {
  const termLower = termino.toLowerCase();
  return restaurantes.filter(
    r =>
      r.nombre.toLowerCase().includes(termLower) ||
      r.descripcion.toLowerCase().includes(termLower) ||
      r.platoInsignia.toLowerCase().includes(termLower) ||
      r.especialidad.some(e => e.toLowerCase().includes(termLower))
  );
};

export const obtenerPlanesPorPilar = (pilar: string) => {
  return planesExperiencia.filter(p => p.pilares.includes(pilar as any));
};


// DATOS DE HORARIOS
export const horariosRestaurantes = {
  desayuno: { inicio: '07:00', fin: '11:00' },
  almuerzo: { inicio: '12:00', fin: '15:00' },
  merienda: { inicio: '15:00', fin: '17:00' },
  cena: { inicio: '18:00', fin: '23:00' }
};

// TIPOS DE COMIDAS ESPECIALES
export const tiposComidas = [
  {
    id: 'vegetariana',
    nombre: 'Vegetariana',
    icono: '🥗',
    descripcion: 'Sin carnes'
  },
  {
    id: 'vegana',
    nombre: 'Vegana',
    icono: '🌱',
    descripcion: 'Sin productos de origen animal'
  },
  {
    id: 'sin-gluten',
    nombre: 'Sin Gluten',
    icono: '🌾',
    descripcion: 'Apto para celíacos'
  },
  {
    id: 'mariscos',
    nombre: 'Mariscos',
    icono: '🦐',
    descripcion: 'Especialidad en productos del mar'
  },
  {
    id: 'organica',
    nombre: 'Orgánica',
    icono: '🥕',
    descripcion: 'Productos orgánicos certificados'
  }
];

// SISTEMA DE RESEÑAS PROMEDIO
export const calcularPromedioPuntaje = () => {
  const suma = restaurantes.reduce((acc, r) => acc + r.rating, 0);
  return (suma / restaurantes.length).toFixed(1);
};

// FILTRO COMPLETO
export interface FiltroRestaurantes {
  pilar?: string;
  precioMin?: number;
  precioMax?: number;
  ratingMin?: number;
  barrio?: string;
  trending?: boolean;
  nuevo?: boolean;
  especialidad?: string;
}

export const filtrarRestaurantes = (filtro: FiltroRestaurantes) => {
  return restaurantes.filter(r => {
    if (filtro.pilar && r.pilar !== filtro.pilar) return false;
    if (filtro.ratingMin && r.rating < filtro.ratingMin) return false;
    if (filtro.barrio && r.barrio !== filtro.barrio) return false;
    if (filtro.trending === true && !r.trending) return false;
    if (filtro.nuevo === true && !r.nuevo) return false;
    if (filtro.especialidad && !r.especialidad.includes(filtro.especialidad)) {
      return false;
    }
    return true;
  });
};

// RECOMENDACIONES POR OCASIÓN
export const recomendacionesPorOcasion = {
  cita: {
    descripcion: 'Para una cita romántica',
    restaurantes: ['fusion-gourmet', 'pacifico-cali'],
    plan: 'plan-romantico'
  },
  familia: {
    descripcion: 'Para salida en familia',
    restaurantes: ['mi-tierra', 'sabores-del-valle'],
    plan: 'plan-familiar'
  },
  negocios: {
    descripcion: 'Para reuniones de negocios',
    restaurantes: ['fusion-gourmet'],
    plan: undefined
  },
  celebracion: {
    descripcion: 'Para celebraciones especiales',
    restaurantes: ['fusion-gourmet', 'pacifico-cali'],
    plan: 'plan-romantico'
  },
  casual: {
    descripcion: 'Para algo rápido y casual',
    restaurantes: ['mi-tierra', 'sabores-del-valle'],
    plan: 'plan-familiar'
  }
};

// INFORMACIÓN DIETÉTICA
export const opcionesDieteticas = [
  {
    id: 'sin-sal',
    nombre: 'Sin sal',
    descripcion: 'Bajo en sodio'
  },
  {
    id: 'bajo-calorico',
    nombre: 'Bajo en calorías',
    descripcion: 'Para dietas especiales'
  },
  {
    id: 'sin-picante',
    nombre: 'Sin picante',
    descripcion: 'Apto para paladares sensibles'
  },
  {
    id: 'alto-protein',
    nombre: 'Alto en proteína',
    descripcion: 'Para deportistas'
  }
];

// MÉTODOS DE PAGO ACEPTADOS
export const metodosPago = [
  { id: 'efectivo', nombre: 'Efectivo' },
  { id: 'tarjeta-debito', nombre: 'Tarjeta de débito' },
  { id: 'tarjeta-credito', nombre: 'Tarjeta de crédito' },
  { id: 'transferencia', nombre: 'Transferencia bancaria' },
  { id: 'billetera-digital', nombre: 'Billetera digital' }
];

// DISPONIBILIDAD DE SERVICIOS
export const servicios = [
  { id: 'wifi', nombre: 'WiFi gratuito', icono: '📶' },
  { id: 'estacionamiento', nombre: 'Estacionamiento', icono: '🅿️' },
  { id: 'reserva', nombre: 'Reserva online', icono: '📅' },
  { id: 'entrega', nombre: 'Entrega a domicilio', icono: '🚚' },
  { id: 'privado', nombre: 'Salones privados', icono: '🏠' },
  { id: 'eventos', nombre: 'Eventos corporativos', icono: '🎉' },
  { id: 'take-away', nombre: 'Take away', icono: '📦' }
];

// FUNCIÓN PARA OBTENER RESTAURANTE POR ID
export const obtenerRestaurantePorId = (id: string) => {
  return restaurantes.find(r => r.id === id);
};

// FUNCIÓN PARA OBTENER PLAN POR ID
export const obtenerPlanPorId = (id: string) => {
  return planesExperiencia.find(p => p.id === id);
};

// ESTADÍSTICAS GENERALES
export const estadisticasRestaurantes = {
  total: restaurantes.length,
  promedioPuntaje: parseFloat(calcularPromedioPuntaje()),
  trending: restaurantes.filter(r => r.trending).length,
  nuevo: restaurantes.filter(r => r.nuevo).length,
  porPilar: {
    gastronomia: restaurantes.filter(r => r.pilar === 'gastronomia').length
  }
};

export const estadisticasPlanes = {
  total: planesExperiencia.length,
  duracionPromedio: '6.5 horas',
  precioPromedio: '$550.000',
  pilaresCubiertos: ['cultura', 'naturaleza', 'gastronomia', 'bienestar']
};

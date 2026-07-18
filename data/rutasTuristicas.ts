import { Ruta } from '@/types/rutasTuristicas';

// ============================================
// DATASET DE RUTAS TURÍSTICAS DE CALI (overlay SVG)
// ============================================
// Coordenadas x/y en el viewBox del mapa (1920x1280 = mapafinal.png).
// Cada ruta usa un color de corazón para todas sus paradas y ese mismo
// color para el trazo. Los valores x/y son aproximados (escalados desde la
// calibración previa) y se afinan con la herramienta de calibración.

export const rutasTuristicasCali: Ruta[] = [
  {
    id: 'centro_historico',
    nombre: 'Centro Histórico',
    color: '#ff2929',
    colorLight: 'rgba(255, 41, 41, 0.12)',
    heartSrc: '/recursos/CORAZON - ROJO.svg',
    cover: '/images/rutas/historica/cover.webp',
    description: 'Explora el corazón histórico de Cali',
    descripcionLarga: 'Conecta a los visitantes con el patrimonio histórico y cultural de Santiago de Cali, permitiendo vivir la experiencia de caminar por los mismos lugares donde se forjó la identidad caleña.',
    duracion: '3 horas',
    dificultad: 'Fácil',
    distancia: '2.5 km',
    mejorHora: 'Mañana (8:00 - 12:00)',
    precioAproximado: '$50.000 - $80.000',
    incluye: ['Guía profesional', 'Entrada a museos', 'Mapa digital', 'Foto grupal'],
    puntos: [
      { id: 1, nombre: 'Plaza de Cayzedo', tipo: 'Plaza', x: 409, y: 568, info: 'Plaza histórica central', horario: '8am-6pm', imagen: '/images/rutas/historica/punto-1.webp' },
      { id: 2, nombre: 'Iglesia La Ermita', tipo: 'Templo', x: 751, y: 565, info: 'Iglesia colonial', horario: '9am-5pm', imagen: '/images/rutas/historica/punto-2.webp' },
      { id: 3, nombre: 'Teatro Municipal', tipo: 'Teatro', x: 710, y: 719, info: 'Teatro histórico', horario: '10am-8pm', imagen: '/images/rutas/historica/punto-3.webp' },
      { id: 4, nombre: 'Boulevard del Río', tipo: 'Boulevard', x: 636, y: 810, info: 'Paseo junto al Cauca', horario: '8am-10pm', imagen: '/images/rutas/historica/punto-4.webp' },
    ],
  },
  {
    id: 'ecologica',
    nombre: 'Ruta Ecológica',
    color: '#00804f',
    colorLight: 'rgba(0, 128, 79, 0.12)',
    heartSrc: '/recursos/CORAZON - VERDE.svg',
    cover: '/images/rutas/ecologica/cover.webp',
    description: 'Naturaleza y biodiversidad',
    descripcionLarga: 'Una aventura en la naturaleza donde explorarás reservas naturales, cascadas y bosques tropicales. Aprenderás sobre la flora y fauna local, prácticas de sostenibilidad y la importancia de conservar estos ecosistemas únicos.',
    duracion: '5 horas',
    dificultad: 'Moderado',
    distancia: '4 km',
    mejorHora: 'Mañana (7:00 - 12:00)',
    precioAproximado: '$90.000 - $140.000',
    incluye: ['Guía naturalista', 'Equipo de senderismo', 'Almuerzo ecológico', 'Binoculares'],
    puntos: [
      { id: 1, nombre: 'Cristo Rey', tipo: 'Monumento', x: 1094, y: 338, info: 'Estatua icónica', horario: '8am-6pm', imagen: '/images/rutas/ecologica/punto-1.webp' },
      { id: 2, nombre: 'Zoológico de Cali', tipo: 'Zoológico', x: 1196, y: 459, info: 'Fauna local', horario: '9am-5pm', imagen: '/images/rutas/ecologica/punto-2.webp' },
      { id: 3, nombre: 'Parque del Perol', tipo: 'Parque', x: 1065, y: 620, info: 'Bosque natural', horario: '7am-6pm', imagen: '/images/rutas/ecologica/punto-3.webp' },
      { id: 4, nombre: 'Jardín Botánico', tipo: 'Jardín', x: 1319, y: 614, info: 'Flora colombiana', horario: '8am-5pm', imagen: '/images/rutas/ecologica/punto-4.webp' },
    ],
  },
  {
    id: 'nocturna',
    nombre: 'Cali Nocturna',
    color: '#ff621d',
    colorLight: 'rgba(255, 98, 29, 0.12)',
    heartSrc: '/recursos/CORAZON - NARANJA.svg',
    cover: '/images/rutas/nocturna/cover.webp',
    description: 'Vida nocturna y entretenimiento',
    descripcionLarga: 'Descubre la magia de Cali después del atardecer. Esta ruta te lleva por los lugares más vibrantes y seguros de la ciudad, con experiencias que incluyen música en vivo, gastronomía de noche, y una atmósfera única que solo existe cuando cae el sol.',
    duracion: '4 horas',
    dificultad: 'Fácil',
    distancia: '2.5 km',
    mejorHora: 'Noche (20:00 - 00:00)',
    precioAproximado: '$100.000 - $150.000',
    incluye: ['Transporte seguro', 'Entrada a lugares', 'Bebida de bienvenida', 'Acompañante local'],
    puntos: [
      { id: 1, nombre: 'Granada', tipo: 'Zona Comercial', x: 1106, y: 821, info: 'Centro nocturno', horario: '6pm-3am', imagen: '/images/rutas/nocturna/punto-1.webp' },
      { id: 2, nombre: 'Bar Nocturno', tipo: 'Zona Social', x: 1539, y: 550, info: 'Vida social y coctelería', horario: '6pm-1am', imagen: '/images/rutas/nocturna/punto-2.webp' },
      { id: 3, nombre: 'Barrio San Antonio', tipo: 'Barrio Bohemio', x: 1540, y: 703, info: 'Arte y cultura', horario: '5pm-2am', imagen: '/images/rutas/nocturna/punto-3.webp' },
      { id: 4, nombre: 'La Topa Tolondra', tipo: 'Cantina', x: 1466, y: 870, info: 'Música tradicional', horario: '7pm-4am', imagen: '/images/rutas/nocturna/punto-4.webp' },
    ],
  },
  {
    id: 'bienestar',
    nombre: 'Ruta Bienestar',
    color: '#ffcf01',
    colorLight: 'rgba(255, 207, 1, 0.12)',
    heartSrc: '/recursos/CORAZON - AMARILLO.svg',
    cover: '/images/rutas/bienestar/cover.webp',
    description: 'Relajación y salud',
    descripcionLarga: 'Una experiencia de descanso y renovación personal. Esta ruta combina spa tradicionales, yoga al aire libre, termas naturales y meditación guiada. Perfecta para desconectarse del estrés y reconectarse con uno mismo en un ambiente natural y acogedor.',
    duracion: '6 horas',
    dificultad: 'Fácil',
    distancia: '5 km',
    mejorHora: 'Mañana-Tarde (8:00 - 14:00)',
    precioAproximado: '$150.000 - $250.000',
    incluye: ['Masaje relajante', 'Clase de yoga', 'Almuerzo saludable', 'Meditación guiada'],
    puntos: [
      { id: 1, nombre: 'Yoga al Parque', tipo: 'Wellness', x: 551, y: 1093, info: 'Clases de yoga', horario: '6am-12pm', imagen: '/images/rutas/bienestar/punto-1.webp' },
      { id: 2, nombre: 'Termales de Cañaveralejo', tipo: 'Termas', x: 904, y: 1045, info: 'Aguas termales naturales', horario: '9am-6pm', imagen: '/images/rutas/bienestar/punto-2.webp' },
      { id: 3, nombre: 'Río Pance', tipo: 'Río', x: 1228, y: 1036, info: 'Balneario natural', horario: '8am-5pm', imagen: '/images/rutas/bienestar/punto-3.webp' },
      { id: 4, nombre: 'Farallones', tipo: 'Montaña', x: 1578, y: 978, info: 'Senderismo y vistas', horario: '7am-6pm', imagen: '/images/rutas/bienestar/punto-4.webp' },
    ],
  },
];

import { Ruta } from '@/types';

export const rutas: Ruta[] = [
  {
    id: 'historica-centro',
    nombre: 'Ruta Histórica del Centro',
    pilar: 'cultura',
    descripcion: 'Descubre la rica historia de Cali a través de sus monumentos y edificaciones coloniales',
    descripcionLarga: 'Conecta a los visitantes con el patrimonio histórico y cultural de Santiago de Cali, permitiendo vivir la experiencia de caminar por los mismos lugares donde se forjó la identidad caleña.',
    imagen: '/images/rutas/historica/cover.webp',
    imagenCover: '/images/rutas/historica/cover.webp',
    duracion: '3 horas',
    dificultad: 'facil',
    distancia: '2.5 km',
    objetivo: 'Conectar a los visitantes con el patrimonio histórico y cultural de Santiago de Cali',
    mejorHora: 'Mañana (8:00 - 12:00)',
    precioAproximado: '$50.000 - $80.000',
    incluye: ['Guía profesional', 'Entrada a museos', 'Mapa digital', 'Foto grupal'],
    puntos: [
      {
        id: 'punto-1-historica',
        nombre: 'Plaza de Caicedo',
        descripcion: 'Punto de encuentro y corazón histórico',
        imagen: '/images/rutas/historica/punto-1.webp',
        coordenadas: [3.4372, -76.5186],
        duracion: '30 min',
        tipo: 'parada',
        detalles: 'La plaza más importante de Cali'
      },
      {
        id: 'punto-2-historica',
        nombre: 'Catedral Metropolitana',
        descripcion: 'Majestuosa catedral neoclásica',
        imagen: '/images/rutas/historica/punto-2.webp',
        coordenadas: [3.4380, -76.5190],
        duracion: '45 min',
        tipo: 'foto',
        detalles: 'Joya arquitectónica del siglo XIX'
      },
      {
        id: 'punto-3-historica',
        nombre: 'Teatro Municipal',
        descripcion: 'Joya arquitectónica y cultural',
        imagen: '/images/rutas/historica/punto-3.webp',
        coordenadas: [3.4388, -76.5195],
        duracion: '40 min',
        tipo: 'experiencia',
        detalles: 'Espacio emblemático para conciertos'
      },
      {
        id: 'punto-4-historica',
        nombre: 'Museo La Merced',
        descripcion: 'Arte religioso y colonial',
        imagen: '/images/rutas/historica/punto-4.webp',
        coordenadas: [3.4395, -76.5200],
        duracion: '50 min',
        tipo: 'parada',
        detalles: 'Colección de arte sacro único'
      }
    ],
    galeria: [
      '/images/rutas/historica/punto-1.webp',
      '/images/rutas/historica/punto-2.webp',
      '/images/rutas/historica/punto-3.webp',
      '/images/rutas/historica/punto-4.webp'
    ],
    recomendaciones: [
      'Usar zapatos cómodos',
      'Llevar protector solar',
      'Traer cámara',
      'Ir de mañana',
      'Reservar con anticipación'
    ]
  },
  {
    id: 'ecologica',
    nombre: 'Ruta Ecológica',
    pilar: 'naturaleza',
    descripcion: 'Descubre la biodiversidad del Valle del Cauca',
    descripcionLarga: 'Una aventura en la naturaleza donde explorarás reservas naturales, cascadas y bosques tropicales. Aprenderás sobre la flora y fauna local, prácticas de sostenibilidad y la importancia de conservar estos ecosistemas únicos.',
    imagen: '/images/rutas/ecologica/cover.webp',
    imagenCover: '/images/rutas/ecologica/cover.webp',
    duracion: '5 horas',
    dificultad: 'moderado',
    distancia: '4 km',
    objetivo: 'Conectar con la naturaleza y promover conciencia ambiental',
    mejorHora: 'Mañana (7:00 - 12:00)',
    precioAproximado: '$90.000 - $140.000',
    incluye: ['Guía naturalista', 'Equipo de senderismo', 'Almuerzo ecológico', 'Binoculares'],
    puntos: [
      {
        id: 'punto-1-eco',
        nombre: 'Reserva Natural El Peñol',
        descripcion: 'Bosque tropical protegido',
        imagen: '/images/rutas/ecologica/punto-1.webp',
        coordenadas: [3.4500, -76.5300],
        duracion: '90 min',
        tipo: 'parada',
        detalles: 'Reserva con senderos naturales y avistamiento de aves'
      },
      {
        id: 'punto-2-eco',
        nombre: 'Cascada del Cristal',
        descripcion: 'Cascada de agua cristalina',
        imagen: '/images/rutas/ecologica/punto-2.webp',
        coordenadas: [3.4510, -76.5310],
        duracion: '60 min',
        tipo: 'experiencia',
        detalles: 'Hermosa cascada donde puedes nadar en aguas naturales'
      },
      {
        id: 'punto-3-eco',
        nombre: 'Vivero de Plantas Nativas',
        descripcion: 'Aprende sobre plantas locales',
        imagen: '/images/rutas/ecologica/punto-3.webp',
        coordenadas: [3.4520, -76.5320],
        duracion: '45 min',
        tipo: 'parada',
        detalles: 'Centro dedicado a la propagación de plantas nativas del valle'
      },
      {
        id: 'punto-4-eco',
        nombre: 'Mirador Natural',
        descripcion: 'Vista panorámica del valle',
        imagen: '/images/rutas/ecologica/punto-4.webp',
        coordenadas: [3.4530, -76.5330],
        duracion: '30 min',
        tipo: 'foto',
        detalles: 'Punto más alto con vistas espectaculares del Valle del Cauca'
      }
    ],
    galeria: [
      '/images/rutas/ecologica/punto-1.webp',
      '/images/rutas/ecologica/punto-2.webp',
      '/images/rutas/ecologica/punto-3.webp',
      '/images/rutas/ecologica/punto-4.webp'
    ],
    recomendaciones: [
      'Llevar repelente de insectos',
      'Usar protector solar biodegradable',
      'Traer ropa de baño',
      'Zapatos para senderismo',
      'No dejar basura (principio Leave No Trace)'
    ]
  },
  {
    id: 'nocturna',
    nombre: 'Ruta Nocturna',
    pilar: 'bienestar',
    descripcion: 'Experimenta Cali bajo las luces de la noche',
    descripcionLarga: 'Descubre la magia de Cali después del atardecer. Esta ruta te lleva por los lugares más vibrantes y seguros de la ciudad, con experiencias que incluyen música en vivo, gastronomía de noche, y una atmósfera única que solo existe cuando cae el sol.',
    imagen: '/images/rutas/nocturna/cover.webp',
    imagenCover: '/images/rutas/nocturna/cover.webp',
    duracion: '4 horas',
    dificultad: 'facil',
    distancia: '2.5 km',
    objetivo: 'Mostrar la vida nocturna segura y vibrante de Cali',
    mejorHora: 'Noche (20:00 - 00:00)',
    precioAproximado: '$100.000 - $150.000',
    incluye: ['Transporte seguro', 'Entrada a lugares', 'Bebida de bienvenida', 'Acompañante local'],
    puntos: [
      {
        id: 'punto-1-nocturna',
        nombre: 'Boulevard del Río',
        descripcion: 'Paseo nocturno iluminado',
        imagen: '/images/rutas/nocturna/punto-1.webp',
        coordenadas: [3.4540, -76.5340],
        duracion: '45 min',
        tipo: 'parada',
        detalles: 'Paseo peatonal con luces especiales, restaurantes y bares'
      },
      {
        id: 'punto-2-nocturna',
        nombre: 'Centro Comercial Nocturno',
        descripcion: 'Compras y entretenimiento',
        imagen: '/images/rutas/nocturna/punto-2.webp',
        coordenadas: [3.4550, -76.5350],
        duracion: '60 min',
        tipo: 'experiencia',
        detalles: 'Zona comercial con tiendas, cafés y espacios de esparcimiento'
      },
      {
        id: 'punto-3-nocturna',
        nombre: 'Bar con Música en Vivo',
        descripcion: 'Disfruta música en vivo y cócteles',
        imagen: '/images/rutas/nocturna/punto-3.webp',
        coordenadas: [3.4560, -76.5360],
        duracion: '75 min',
        tipo: 'experiencia',
        detalles: 'Lugar acogedor con artistas locales en vivo'
      },
      {
        id: 'punto-4-nocturna',
        nombre: 'Restaurante Estrella',
        descripcion: 'Cena gourmet con vista nocturna',
        imagen: '/images/rutas/nocturna/punto-4.webp',
        coordenadas: [3.4570, -76.5370],
        duracion: '60 min',
        tipo: 'parada',
        detalles: 'Restaurante de lujo con comida internacional y local'
      }
    ],
    galeria: [
      '/images/rutas/nocturna/punto-1.webp',
      '/images/rutas/nocturna/punto-2.webp',
      '/images/rutas/nocturna/punto-3.webp',
      '/images/rutas/nocturna/punto-4.webp'
    ],
    recomendaciones: [
      'Usar ropa cómoda y elegante',
      'No llevar valuables',
      'Ir en grupo o con guía local',
      'Respetar horarios de cierre',
      'Probar cócteles locales'
    ]
  },
  {
    id: 'bienestar',
    nombre: 'Ruta del Bienestar',
    pilar: 'bienestar',
    descripcion: 'Relájate y rejuvenece en el Valle del Cauca',
    descripcionLarga: 'Una experiencia de descanso y renovación personal. Esta ruta combina spa tradicionales, yoga al aire libre, termas naturales y meditación guiada. Perfecta para desconectarse del estrés y reconectarse con uno mismo en un ambiente natural y acogedor.',
    imagen: '/images/rutas/bienestar/cover.webp',
    imagenCover: '/images/rutas/bienestar/cover.webp',
    duracion: '6 horas',
    dificultad: 'facil',
    distancia: '5 km',
    objetivo: 'Promover bienestar integral y relajación en la naturaleza',
    mejorHora: 'Mañana-Tarde (8:00 - 14:00)',
    precioAproximado: '$150.000 - $250.000',
    incluye: ['Masaje relajante', 'Clase de yoga', 'Almuerzo saludable', 'Meditación guiada'],
    puntos: [
      {
        id: 'punto-1-bienestar',
        nombre: 'Spa Natural',
        descripcion: 'Spa con tratamientos tradicionales',
        imagen: '/images/rutas/bienestar/punto-1.webp',
        coordenadas: [3.4580, -76.5380],
        duracion: '90 min',
        tipo: 'experiencia',
        detalles: 'Centro de spa con masajes y tratamientos con productos naturales'
      },
      {
        id: 'punto-2-bienestar',
        nombre: 'Termas Naturales',
        descripcion: 'Aguas termales calientes',
        imagen: '/images/rutas/bienestar/punto-2.webp',
        coordenadas: [3.4590, -76.5390],
        duracion: '60 min',
        tipo: 'experiencia',
        detalles: 'Piscinas naturales con agua termal a temperatura perfecta'
      },
      {
        id: 'punto-3-bienestar',
        nombre: 'Estudio de Yoga',
        descripcion: 'Clase de yoga y meditación',
        imagen: '/images/rutas/bienestar/punto-3.webp',
        coordenadas: [3.4600, -76.5400],
        duracion: '75 min',
        tipo: 'experiencia',
        detalles: 'Clase de yoga guiada en ambiente tranquilo con vista a la naturaleza'
      },
      {
        id: 'punto-4-bienestar',
        nombre: 'Restaurante Orgánico',
        descripcion: 'Comida saludable y orgánica',
        imagen: '/images/rutas/bienestar/punto-4.webp',
        coordenadas: [3.4610, -76.5410],
        duracion: '60 min',
        tipo: 'parada',
        detalles: 'Restaurante especializado en comida orgánica y saludable'
      }
    ],
    galeria: [
      '/images/rutas/bienestar/punto-1.webp',
      '/images/rutas/bienestar/punto-2.webp',
      '/images/rutas/bienestar/punto-3.webp',
      '/images/rutas/bienestar/punto-4.webp'
    ],
    recomendaciones: [
      'Llevar traje de baño',
      'Traer toalla',
      'Usar sandalias',
      'Llegar con tiempo para relajarse',
      'No comer pesado antes de yoga'
    ]
  },
  {
    id: 'valle-region',
    nombre: 'Ruta del Valle',
    pilar: 'naturaleza',
    descripcion: 'Explora los pueblos mágicos del Valle del Cauca',
    descripcionLarga: 'Salir de Cali y descubrir los pueblos coloniales, haciendas históricas y paisajes montañosos del Valle del Cauca. Esta ruta te lleva por lugares con rica herencia cultural y natural, donde la tradición y la modernidad conviven armóniosamente.',
    imagen: '/images/rutas/valle/cover.webp',
    imagenCover: '/images/rutas/valle/cover.webp',
    duracion: '8 horas',
    dificultad: 'moderado',
    distancia: '60 km',
    objetivo: 'Mostrar la riqueza cultural y natural de toda la región vallecaucana',
    mejorHora: 'Día completo (7:00 - 15:00)',
    precioAproximado: '$200.000 - $300.000',
    incluye: ['Transporte', 'Guía regional', 'Almuerzo típico', 'Entrada a haciendas'],
    puntos: [
      {
        id: 'punto-1-valle',
        nombre: 'Pueblo de Palmira',
        descripcion: 'Capital agrícola del Valle',
        imagen: '/images/rutas/valle/punto-1.webp',
        coordenadas: [3.5398, -76.3040],
        duracion: '90 min',
        tipo: 'parada',
        detalles: 'Pueblo tradicional con plaza central y arquitectura colonial'
      },
      {
        id: 'punto-2-valle',
        nombre: 'Hacienda Piedechinche',
        descripcion: 'Hacienda cafetera histórica',
        imagen: '/images/rutas/valle/punto-2.webp',
        coordenadas: [3.5500, -76.2900],
        duracion: '120 min',
        tipo: 'experiencia',
        detalles: 'Hacienda tradicional con cultivos de café y paisajes montañosos'
      },
      {
        id: 'punto-3-valle',
        nombre: 'Pueblo de Ginebra',
        descripcion: 'Pueblo pequeño con tradición azucarera',
        imagen: '/images/rutas/valle/punto-3.webp',
        coordenadas: [3.6000, -76.2500],
        duracion: '75 min',
        tipo: 'parada',
        detalles: 'Pueblo con historia azucarera y gastronomía local auténtica'
      },
      {
        id: 'punto-4-valle',
        nombre: 'Mirador de Jabalcones',
        descripcion: 'Vista panorámica del Valle',
        imagen: '/images/rutas/valle/punto-4.webp',
        coordenadas: [3.6200, -76.2300],
        duracion: '45 min',
        tipo: 'foto',
        detalles: 'Punto elevado con vistas espectaculares de toda la región'
      }
    ],
    galeria: [
      '/images/rutas/valle/punto-1.webp',
      '/images/rutas/valle/punto-2.webp',
      '/images/rutas/valle/punto-3.webp',
      '/images/rutas/valle/punto-4.webp'
    ],
    recomendaciones: [
      'Salir temprano de Cali',
      'Llevar efectivo para pueblos pequeños',
      'Usar protector solar',
      'Traer cámara para fotos',
      'Respetar horarios de haciendas'
    ]
  }
];


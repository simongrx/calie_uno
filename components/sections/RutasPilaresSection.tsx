import { getRutasByPilar } from '@/lib/data';
import type { PilarType } from '@/types';
import { RutasScrollHero, type PilarInfo } from '@/components/sections/RutasScrollHero';

// Configuración por pilar (imagen full-bleed + color de acento).
const PILARES: { id: PilarType; label: string; img: string; color: string }[] = [
  { id: 'cultura', label: 'Cultura', img: '/images/pilares/cultura.jpg', color: '#8B5CF6' },
  { id: 'naturaleza', label: 'Naturaleza', img: '/images/pilares/naturaleza.jpg', color: '#10B981' },
  { id: 'gastronomia', label: 'Gastronomía', img: '/images/pilares/gastronomia.jpg', color: '#EF4444' },
  { id: 'bienestar', label: 'Bienestar', img: '/images/pilares/bienestar.jpg', color: '#06B6D4' },
];

// Respaldo para pilares sin ruta cargada (p. ej. gastronomía).
const FALLBACK: Record<PilarType, { nombre: string; descripcion: string; meta: string[]; href: string }> = {
  cultura: { nombre: 'Patrimonio caleño', descripcion: 'Monumentos, plazas y memoria viva del centro.', meta: ['Experiencia cultural'], href: '/rutas' },
  naturaleza: { nombre: 'Naturaleza del Valle', descripcion: 'Reservas, cascadas y miradores cerca de la ciudad.', meta: ['Aire libre'], href: '/rutas' },
  gastronomia: { nombre: 'Sabores del Valle', descripcion: 'Cocina del Pacífico y tradición vallecaucana en cada parada.', meta: ['Pacífico & Valle'], href: '/sabores' },
  bienestar: { nombre: 'Bienestar y vida nocturna', descripcion: 'Ritmos, descanso y planes para reconectar.', meta: ['Para relajarse'], href: '/rutas' },
};

function buildPilar(p: (typeof PILARES)[number]): PilarInfo {
  const ruta = getRutasByPilar(p.id)[0];
  if (ruta) {
    const meta = [ruta.duracion, `${ruta.puntos.length} paradas`, ruta.distancia].filter(
      Boolean
    ) as string[];
    return {
      id: p.id,
      label: p.label,
      img: p.img,
      color: p.color,
      nombre: ruta.nombre,
      descripcion: ruta.descripcion,
      meta,
      href: `/rutas/${ruta.id}`,
    };
  }
  const fb = FALLBACK[p.id];
  return { id: p.id, label: p.label, img: p.img, color: p.color, ...fb };
}

export function RutasPilaresSection() {
  const pilares = PILARES.map(buildPilar);
  return <RutasScrollHero pilares={pilares} />;
}

export default RutasPilaresSection;

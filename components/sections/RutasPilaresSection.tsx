import { getRutasByPilar } from '@/lib/data';
import type { PilarType } from '@/types';
import { HeroScrollAnimation, type HeroScrollItem } from '@/components/ui/hero-scroll-animation';

// Configuración por pilar (imagen + etiqueta).
const PILARES: { id: PilarType; label: string; img: string }[] = [
  { id: 'cultura', label: 'Cultura', img: '/images/pilares/cultura.jpg' },
  { id: 'naturaleza', label: 'Naturaleza', img: '/images/pilares/naturaleza.jpg' },
  { id: 'gastronomia', label: 'Gastronomía', img: '/images/pilares/gastronomia.jpg' },
  { id: 'bienestar', label: 'Bienestar', img: '/images/pilares/bienestar.jpg' },
];

function pilarHref(id: PilarType): string {
  const ruta = getRutasByPilar(id)[0];
  if (ruta) return `/rutas/${ruta.id}`;
  return id === 'gastronomia' ? '/sabores' : '/rutas';
}

export function RutasPilaresSection() {
  const items: HeroScrollItem[] = PILARES.map((p) => ({
    img: p.img,
    label: p.label,
    href: pilarHref(p.id),
  }));

  return (
    <HeroScrollAnimation
      className="-mt-16 sm:-mt-24"
      intro={
        <>
          Aquí cada calle tiene historia, cada barrio tiene sabor y cada atardecer recuerda por qué{' '}
          <span className="text-brand-orange">Cali</span> se queda en el corazón.
        </>
      }
      eyebrow="Rutas por pilar"
      title={
        <>
          Explora Cali y el Valle con sus <span className="text-brand-orange">rutas</span>
        </>
      }
      description="Cuatro pilares —cultura, naturaleza, gastronomía y bienestar— y una ruta distinta para cada forma de vivir el Valle del Cauca."
      items={items}
      ctaText="Ver todas las rutas"
      ctaHref="/rutas"
    />
  );
}

export default RutasPilaresSection;

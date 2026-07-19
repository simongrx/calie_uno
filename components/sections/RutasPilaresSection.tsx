import { getRutas } from '@/lib/data';
import { RutasSpotlight, type RutaSpotlightItem } from '@/components/sections/RutasSpotlight';

export function RutasPilaresSection() {
  const rutas: RutaSpotlightItem[] = getRutas().map((r) => ({
    id: r.id,
    nombre: r.nombre,
    descripcionCorta: r.descripcion,
    imagenUrl: r.imagenCover ?? r.imagen,
    pilar: r.pilar,
  }));

  return (
    <RutasSpotlight
      className="-mt-16 sm:-mt-24"
      intro={
        <>
          Aquí cada calle tiene historia, cada barrio tiene sabor y cada atardecer recuerda por qué{' '}
          <span className="text-brand-orange">Cali</span> se queda en el corazón.
        </>
      }
      eyebrow="Rutas que enamoran"
      rutas={rutas}
    />
  );
}

export default RutasPilaresSection;

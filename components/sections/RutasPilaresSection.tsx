import React from 'react';
import Image from 'next/image';
import { Clock, MapPin, Route as RouteIcon } from 'lucide-react';
import { PreviewSwitchHero } from '@/components/ui/preview-switch-hero';
import { SweepButton } from '@/components/ui/sweep-button';
import { getRutasByPilar } from '@/lib/data';
import type { PilarType } from '@/types';

// Configuración visual por pilar (imagen del teléfono + color del acento).
const PILARES: { id: PilarType; label: string; img: string; color: string }[] = [
  { id: 'cultura', label: 'Cultura', img: '/images/pilares/cultura.jpg', color: '#8B5CF6' },
  { id: 'naturaleza', label: 'Naturaleza', img: '/images/pilares/naturaleza.jpg', color: '#10B981' },
  { id: 'gastronomia', label: 'Gastronomía', img: '/images/pilares/gastronomia.jpg', color: '#EF4444' },
  { id: 'bienestar', label: 'Bienestar', img: '/images/pilares/bienestar.jpg', color: '#06B6D4' },
];

// Texto de respaldo para pilares sin ruta cargada (p. ej. gastronomía).
const FALLBACK: Record<PilarType, { nombre: string; descripcion: string; meta: string[]; href: string }> = {
  cultura: { nombre: 'Patrimonio caleño', descripcion: 'Monumentos, plazas y memoria viva del centro.', meta: ['Experiencia cultural'], href: '/rutas' },
  naturaleza: { nombre: 'Naturaleza del Valle', descripcion: 'Reservas, cascadas y miradores cerca de la ciudad.', meta: ['Aire libre'], href: '/rutas' },
  gastronomia: { nombre: 'Sabores del Valle', descripcion: 'Cocina del Pacífico y tradición vallecaucana en cada parada.', meta: ['Pacífico & Valle'], href: '/sabores' },
  bienestar: { nombre: 'Bienestar y vida nocturna', descripcion: 'Ritmos, descanso y planes para reconectar.', meta: ['Para relajarse'], href: '/rutas' },
};

interface PilarInfo {
  label: string;
  img: string;
  color: string;
  nombre: string;
  descripcion: string;
  meta: string[];
  href: string;
}

function buildPilar(p: (typeof PILARES)[number]): PilarInfo {
  const ruta = getRutasByPilar(p.id)[0];
  if (ruta) {
    const meta = [ruta.duracion, `${ruta.puntos.length} paradas`, ruta.distancia].filter(
      Boolean
    ) as string[];
    return {
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
  return { label: p.label, img: p.img, color: p.color, ...fb };
}

const META_ICON = [Clock, MapPin, RouteIcon];

function PilarFrame({ pilar }: { pilar: PilarInfo }) {
  return (
    <div
      className="group/frame relative w-full overflow-hidden rounded-2xl ring-1 ring-white/12"
      style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 30px 60px rgba(0,0,0,0.45)' }}
    >
      {/* Barra superior del marco (estilo ventana) */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="flex items-center gap-1.5">
          <i className="size-2.5 rounded-full" style={{ background: `${pilar.color}` }} />
          <i className="size-2.5 rounded-full bg-white/25" />
          <i className="size-2.5 rounded-full bg-white/15" />
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-white/45">
          rutas · {pilar.label}
        </span>
      </div>

      {/* Imagen panorámica del pilar */}
      <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9]">
        <Image
          src={pilar.img}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover transition-transform duration-700 group-hover/frame:scale-[1.03]"
          alt={pilar.nombre}
        />
        {/* Degradado para legibilidad */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636] via-[#0A1636]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

        {/* Info de ruta — cambia por pilar */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8">
          <span
            className="mb-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
            style={{ background: `${pilar.color}33`, border: `1px solid ${pilar.color}88` }}
          >
            {pilar.label}
          </span>
          <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">
            {pilar.nombre}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-white/75 sm:text-base">{pilar.descripcion}</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-white/65">
            {pilar.meta.map((m, i) => {
              const Icon = META_ICON[i % META_ICON.length];
              return (
                <span key={m} className="inline-flex items-center gap-1.5">
                  <Icon aria-hidden className="size-4" style={{ color: pilar.color }} />
                  {m}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function RutasPilaresSection() {
  const tabs = PILARES.map((p) => ({
    id: p.id,
    label: p.label,
    media: <PilarFrame pilar={buildPilar(p)} />,
  }));

  return (
    <PreviewSwitchHero
      className="-mt-16 sm:-mt-24"
      badge={{ tag: 'Rutas', label: 'Una experiencia por cada pilar' }}
      title={
        <>
          Explora Cali y el Valle con sus{' '}
          <span className="text-brand-orange">rutas</span>
        </>
      }
      description="Desliza o toca cada pilar para descubrir una ruta distinta: cultura, naturaleza, gastronomía y bienestar, cada una con su propia experiencia en Cali y la región."
      showEmail={false}
      actions={<SweepButton href="/rutas">Ver todas las rutas</SweepButton>}
      tabs={tabs}
      scrollLength="320vh"
    />
  );
}

export default RutasPilaresSection;

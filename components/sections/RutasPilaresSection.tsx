import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Signal,
  Wifi,
  BatteryFull,
  Clock,
  MapPin,
  Route as RouteIcon,
} from 'lucide-react';
import { PreviewSwitchHero } from '@/components/ui/preview-switch-hero';
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

function PilarPhone({ pilar }: { pilar: PilarInfo }) {
  return (
    <Link
      href={pilar.href}
      className="group/phone relative mx-auto block w-full max-w-[340px]"
      aria-label={`Ver ${pilar.nombre}`}
    >
      {/* Marco del teléfono */}
      <div
        className="overflow-hidden rounded-[2.5rem] p-2 ring-1 ring-white/15"
        style={{
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pantalla — alto fijo para que cambiar de pilar no redimensione */}
        <div className="relative h-[400px] overflow-hidden rounded-[2rem] ring-1 ring-white/10 sm:h-[440px]">
          {/* Imagen del pilar */}
          <Image
            src={pilar.img}
            fill
            sizes="340px"
            className="object-cover transition-transform duration-700 group-hover/phone:scale-105"
            alt={pilar.nombre}
          />
          {/* Degradado para legibilidad de la info inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1636] via-[#0A1636]/35 to-black/25" />

          {/* ── Overlay del teléfono POR ENCIMA ── */}
          {/* notch */}
          <div className="absolute left-1/2 top-3 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black/70" />
          {/* status bar */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-3 text-xs font-semibold text-white">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal aria-hidden className="size-3.5" />
              <Wifi aria-hidden className="size-4" />
              <BatteryFull aria-hidden className="size-5" />
            </div>
          </div>

          {/* Info de ruta — cambia por pilar */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5">
            <span
              className="mb-2 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white"
              style={{
                background: `${pilar.color}33`,
                border: `1px solid ${pilar.color}88`,
              }}
            >
              {pilar.label}
            </span>
            <h3 className="text-xl font-bold leading-tight text-white">{pilar.nombre}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm text-white/70">{pilar.descripcion}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/60">
              {pilar.meta.map((m, i) => {
                const Icon = META_ICON[i % META_ICON.length];
                return (
                  <span key={m} className="inline-flex items-center gap-1.5">
                    <Icon aria-hidden className="size-3.5" style={{ color: pilar.color }} />
                    {m}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function RutasPilaresSection() {
  const tabs = PILARES.map((p) => ({
    id: p.id,
    label: p.label,
    media: <PilarPhone pilar={buildPilar(p)} />,
  }));

  return (
    <PreviewSwitchHero
      badge={{ tag: 'Rutas', label: 'Una experiencia por cada pilar' }}
      title={
        <>
          Explora el Valle por sus <span className="text-brand-orange">4 pilares</span>
        </>
      }
      description="Desliza o toca cada pilar para descubrir una ruta distinta: cultura, naturaleza, gastronomía y bienestar, cada una con su propia experiencia en Cali y la región."
      showEmail={false}
      primaryCta={{ label: 'Ver todas las rutas', href: '/rutas' }}
      secondaryCta={{ label: 'Abrir el mapa', href: '/mapa' }}
      tabs={tabs}
      scrollLength="320vh"
    />
  );
}

export default RutasPilaresSection;

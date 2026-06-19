import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRutaBySlug, getRutaSlugs } from '@/lib/data';
import { RutaDetalle } from '@/components/rutas/RutaDetalle';

export function generateStaticParams() {
  return getRutaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ruta = getRutaBySlug(slug);
  if (!ruta) return { title: 'Ruta no encontrada | Cali Enamora' };
  return {
    title: `${ruta.nombre} | Rutas | Cali Enamora`,
    description: ruta.descripcion,
    openGraph: {
      title: ruta.nombre,
      description: ruta.descripcion,
      images: [{ url: ruta.imagenCover }],
    },
  };
}

export default async function RutaDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ruta = getRutaBySlug(slug);
  if (!ruta) notFound();

  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <Link
          href="/rutas"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a todas las rutas
        </Link>

        <RutaDetalle ruta={ruta} />
      </div>
    </section>
  );
}

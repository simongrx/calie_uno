import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRestauranteBySlug, getRestauranteSlugs } from '@/lib/data';
import { RestauranteDetalle } from '@/components/sabores/RestauranteDetalle';

export function generateStaticParams() {
  return getRestauranteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const restaurante = getRestauranteBySlug(slug);
  if (!restaurante) return { title: 'Restaurante no encontrado | Cali Enamora' };
  return {
    title: `${restaurante.nombre} | Sabores | Cali Enamora`,
    description: restaurante.descripcion,
    openGraph: {
      title: restaurante.nombre,
      description: restaurante.descripcion,
      images: [{ url: restaurante.imagen }],
    },
  };
}

export default async function SaborPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const restaurante = getRestauranteBySlug(slug);
  if (!restaurante) notFound();

  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <Link
          href="/sabores"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a sabores
        </Link>

        <RestauranteDetalle restaurante={restaurante} />
      </div>
    </section>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEventoBySlug, getEventoSlugs } from '@/lib/data';
import { EventoDetalle } from '@/components/eventos/EventoDetalle';

export function generateStaticParams() {
  return getEventoSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) return { title: 'Evento no encontrado | Cali Enamora' };
  return {
    title: `${evento.nombre} | Eventos | Cali Enamora`,
    description: evento.descripcion,
    openGraph: {
      title: evento.nombre,
      description: evento.descripcion,
      images: [{ url: evento.imagen }],
    },
  };
}

export default async function EventoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const evento = getEventoBySlug(slug);
  if (!evento) notFound();

  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <Link
          href="/eventos"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a eventos
        </Link>

        <EventoDetalle evento={evento} />
      </div>
    </section>
  );
}

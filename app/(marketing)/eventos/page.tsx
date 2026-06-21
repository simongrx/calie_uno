import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { EventosCatalogo } from '@/components/eventos/EventosCatalogo';
import { getEventos } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Eventos | Cali Enamora',
  description:
    'Descubre los eventos en vivo y próximos del Valle del Cauca: cultura, naturaleza, gastronomía y bienestar.',
};

export default function EventosPage() {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Eventos en Vivo"
          subtitulo="Descubre los eventos más emocionantes del Valle del Cauca"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />
        <EventosCatalogo eventos={getEventos()} />
      </div>
    </section>
  );
}

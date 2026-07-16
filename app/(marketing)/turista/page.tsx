import type { Metadata } from 'next';
import { RutasPilaresSection } from '@/components/sections/RutasPilaresSection';
import { RestaurantesSection } from '@/components/sections/RestaurantesSection';
import { MerchandisingSection } from '@/components/sections/MerchandisingSection';
import { EventosMarqueeSection } from '@/components/sections/EventosMarqueeSection';
import { TestimoniosSection } from '@/components/sections/TestimoniosSection';
import { SegmentCTA } from '@/components/ui/SegmentCTA';

export const metadata: Metadata = {
  title: 'Turista | Cali Enamora',
  description:
    'Descubre el Valle del Cauca: rutas, sabores y experiencias, merchandising y eventos para vivir la región como viajero.',
};

export default function TuristaPage() {
  return (
    <>
      {/* Rutas por pilar */}
      <RutasPilaresSection />

      {/* Sabores y experiencias */}
      <RestaurantesSection />

      {/* Merchandising */}
      <MerchandisingSection />

      {/* Eventos */}
      <EventosMarqueeSection />

      {/* Prueba social */}
      <TestimoniosSection />

      {/* Cierre → Corporativa */}
      <SegmentCTA
        titulo="¿Quieres conocer cómo hacemos posible esto?"
        subtitulo="Detrás de cada ruta hay una comunidad, aliados y benefactores que sostienen el proyecto. Conoce el lado corporativo de Cali Enamora."
        acciones={[
          {
            label: 'Descubre cómo lo hacemos',
            href: '/corporativa',
            variante: 'primary',
          },
        ]}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SaboresCatalogo } from '@/components/sabores/SaboresCatalogo';
import { getRestaurantes, getPlanes } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sabores y Experiencias | Cali Enamora',
  description:
    'Descubre los mejores restaurantes, planes y experiencias gastronómicas del Valle del Cauca.',
};

export default function SaboresPage() {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Sabores y Experiencias"
          subtitulo="Descubre los mejores restaurantes, planes y experiencias gastronómicas del momento"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />
        <SaboresCatalogo restaurantes={getRestaurantes()} planes={getPlanes()} />
      </div>
    </section>
  );
}

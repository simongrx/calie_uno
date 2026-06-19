import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { RutasCatalogo } from '@/components/rutas/RutasCatalogo';
import { getRutas } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Rutas Turísticas | Cali Enamora',
  description:
    'Explora todas las rutas turísticas sostenibles de Cali y el Valle del Cauca: cultura, naturaleza, gastronomía y bienestar.',
};

export default function RutasPage() {
  const rutas = getRutas();

  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Rutas Turísticas"
          subtitulo="Explora nuestras experiencias únicas diseñadas para cada pilar"
          alineacion="center"
          conLinea={true}
          className="mb-12 sm:mb-16"
        />
        <RutasCatalogo rutas={rutas} />
      </div>
    </section>
  );
}

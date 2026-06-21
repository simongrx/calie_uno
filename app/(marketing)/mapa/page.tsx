import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { MapaExplorador } from '@/components/mapa/MapaExplorador';

export const metadata: Metadata = {
  title: 'Mapa Interactivo | Cali Enamora',
  description:
    'Explora en el mapa todas las rutas turísticas sostenibles de Cali y el Valle del Cauca, filtradas por pilar.',
};

export default function MapaPage() {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Mapa Interactivo"
          subtitulo="Visualiza todas nuestras rutas y sus paradas. Filtra por pilar para enfocar tu exploración"
          alineacion="center"
          conLinea={true}
          className="mb-10 sm:mb-12"
        />
        <MapaExplorador />
      </div>
    </section>
  );
}

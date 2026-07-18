import type { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import MapaCalibrador from '@/components/mapa/MapaCalibrador';

// Página interna: herramienta para calibrar la posición de los pines del mapa
// turístico sobre la ilustración. No está enlazada en la navegación pública.
export const metadata: Metadata = {
  title: 'Calibración del mapa | Cali Enamora',
  robots: { index: false, follow: false },
};

export default function CalibracionMapaPage() {
  return (
    <section className="section bg-transparent">
      <div className="container-custom">
        <SectionTitle
          titulo="Calibración de pines"
          subtitulo="Herramienta interna: ubica cada punto haciendo click sobre el mapa"
          alineacion="center"
          conLinea={true}
          className="mb-8"
        />
        <MapaCalibrador imageUrl="/images/rutas/mapafinal.png" />
      </div>
    </section>
  );
}

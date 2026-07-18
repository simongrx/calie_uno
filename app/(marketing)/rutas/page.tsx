import type { Metadata } from 'next';
import RutasMapaPanel from '@/components/rutas/RutasMapaPanel';

export const metadata: Metadata = {
  title: 'Rutas Turísticas | Cali Enamora',
  description:
    'Explora todas las rutas turísticas sostenibles de Cali y el Valle del Cauca: cultura, naturaleza, gastronomía y bienestar.',
};

export default function RutasPage() {
  return (
    <RutasMapaPanel imageUrl="/images/rutas/mapafinal.png" />
  );
}

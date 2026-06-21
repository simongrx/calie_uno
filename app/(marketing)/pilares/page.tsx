import type { Metadata } from 'next';
import { PilaresSection } from '@/components/sections/PilaresSection';

export const metadata: Metadata = {
  title: 'Los 4 Pilares | Cali Enamora',
  description:
    'Cultura, naturaleza, gastronomía y bienestar: las cuatro dimensiones de nuestra propuesta de turismo sostenible.',
};

export default function PilaresPage() {
  return <PilaresSection />;
}

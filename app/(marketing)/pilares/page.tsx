import type { Metadata } from 'next';
import { PilaresSection } from '@/components/sections/PilaresSection';

export const metadata: Metadata = {
  title: 'Nuestros Pilares | Cali Enamora',
  description:
    'Cultura, naturaleza, gastronomía y bienestar: las dimensiones de nuestra propuesta de turismo sostenible.',
};

export default function PilaresPage() {
  return <PilaresSection />;
}

import type { Metadata } from 'next';
import { AliadosSection } from '@/components/sections/AliadosSection';

export const metadata: Metadata = {
  title: 'Aliados | Cali Enamora',
  description:
    'Instituciones y organizaciones que hacen posible el turismo sostenible en Cali y el Valle del Cauca.',
};

export default function AliadosPage() {
  return <AliadosSection />;
}

import type { Metadata } from 'next';
import { InversoresSection } from '@/components/sections/InversoresSection';

export const metadata: Metadata = {
  title: 'Invertir | Cali Enamora',
  description:
    'Oportunidades de inversión de impacto con retorno financiero sostenible en el turismo experiencial del Valle del Cauca.',
};

export default function InvertirPage() {
  return <InversoresSection />;
}

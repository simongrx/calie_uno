import type { Metadata } from 'next';
import { NosotrosSection } from '@/components/sections/NosotrosSection';

export const metadata: Metadata = {
  title: 'Quiénes Somos | Cali Enamora',
  description:
    'Conoce a Cali Enamora: nuestra misión, visión y valores para impulsar un turismo experiencial y sostenible en el Valle del Cauca.',
};

export default function NosotrosPage() {
  return <NosotrosSection />;
}

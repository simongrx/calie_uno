import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Donar | Cali Enamora',
  description:
    'Conviértete en benefactor de Cali Enamora. Tu donación sostiene un modelo de turismo sostenible con impacto social en el Valle del Cauca.',
};

// La antigua página de inversión ahora es donación: vive en /corporativa (sección Donar).
export default function InvertirPage() {
  redirect('/corporativa#donar');
}

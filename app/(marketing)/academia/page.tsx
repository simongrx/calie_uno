import type { Metadata } from 'next';
import { NuestraAcademia } from '@/components/sections/NuestraAcademia';

export const metadata: Metadata = {
  title: 'Academia Cali Enamora | Formación y fortalecimiento',
  description:
    'Formación, fortalecimiento empresarial e innovación para el ecosistema turístico y cultural del Valle del Cauca.',
};

export default function AcademiaPage() {
  return <NuestraAcademia />;
}

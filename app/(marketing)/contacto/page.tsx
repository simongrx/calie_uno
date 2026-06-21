import type { Metadata } from 'next';
import { ContactoSection } from '@/components/sections/ContactoSection';

export const metadata: Metadata = {
  title: 'Contacto | Cali Enamora',
  description:
    'Ponte en contacto con Cali Enamora. Resolvemos tus dudas sobre rutas, eventos, alianzas e inversión.',
};

export default function ContactoPage() {
  return <ContactoSection />;
}

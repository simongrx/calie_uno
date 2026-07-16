import type { Metadata } from 'next';
import { NosotrosSection } from '@/components/sections/NosotrosSection';
import { OrigenSection } from '@/components/sections/OrigenSection';
import { NuestraAcademia } from '@/components/sections/NuestraAcademia';
import { AliadosSection } from '@/components/sections/AliadosSection';
import { EstructuraApoyoSection } from '@/components/sections/EstructuraApoyoSection';
import { DonacionSection } from '@/components/sections/DonacionSection';
import { ContactoSection } from '@/components/sections/ContactoSection';
import { SegmentCTA } from '@/components/ui/SegmentCTA';

export const metadata: Metadata = {
  title: 'Hacer parte | Cali Enamora',
  description:
    'Conoce Cali Enamora por dentro: quiénes somos, cómo nacimos, nuestra academia y aliados, y cómo convertirte en asociado, aliado o benefactor.',
};

export default function CorporativaPage() {
  return (
    <>
      {/* Quiénes somos */}
      <NosotrosSection />

      {/* Cómo nació Cali-e */}
      <OrigenSection />

      {/* Academia */}
      <NuestraAcademia />

      {/* Visibilidad de aliados */}
      <AliadosSection />

      {/* Jerarquía: Asociados → Aliados → Benefactores */}
      <EstructuraApoyoSection />

      {/* Donación */}
      <DonacionSection />

      {/* Contacto */}
      <ContactoSection />

      {/* Cierre → Turista */}
      <SegmentCTA
        titulo="¿Quieres explorar nuestras rutas, eventos y experiencias?"
        subtitulo="Descubre el otro lado de Cali Enamora: el Valle del Cauca que puedes vivir como viajero."
        acciones={[
          {
            label: 'Explorar como turista',
            href: '/turista',
            variante: 'primary',
          },
        ]}
      />
    </>
  );
}

import type { Metadata } from 'next';
import { NosotrosSection } from '@/components/sections/NosotrosSection';
import { OrigenSection } from '@/components/sections/OrigenSection';
import { NuestraAcademia } from '@/components/sections/NuestraAcademia';
import { AliadosSection } from '@/components/sections/AliadosSection';
import { EstructuraApoyoSection } from '@/components/sections/EstructuraApoyoSection';
import { DonacionSection } from '@/components/sections/DonacionSection';
import { ContactoSection } from '@/components/sections/ContactoSection';
import { SegmentCTA } from '@/components/ui/SegmentCTA';
import { SectionShell } from '@/components/ui/SectionShell';

export const metadata: Metadata = {
  title: 'Hacer parte | Cali Enamora',
  description:
    'Conoce Cali Enamora por dentro: quiénes somos, cómo nacimos, nuestra academia y aliados, y cómo convertirte en asociado, aliado o benefactor.',
};

export default function CorporativaPage() {
  return (
    <>
      {/* Quiénes somos */}
      <SectionShell>
        <NosotrosSection />
      </SectionShell>

      {/* Cómo nació Cali-e (timeline horizontal pinned; sin blur para no romper el sticky) */}
      <SectionShell seam={false}>
        <OrigenSection />
      </SectionShell>

      {/* Academia */}
      <SectionShell>
        <NuestraAcademia />
      </SectionShell>

      {/* Visibilidad de aliados */}
      <SectionShell>
        <AliadosSection />
      </SectionShell>

      {/* Jerarquía: Asociados → Aliados → Benefactores (pinned; sin blur para no romper el sticky) */}
      <SectionShell seam={false}>
        <EstructuraApoyoSection />
      </SectionShell>

      {/* Donación */}
      <SectionShell>
        <DonacionSection />
      </SectionShell>

      {/* Contacto — pegado a la sección de Benefactor (Donación) */}
      <SectionShell>
        <ContactoSection compactTop />
      </SectionShell>

      {/* Cierre → Turista */}
      <SectionShell>
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
      </SectionShell>
    </>
  );
}

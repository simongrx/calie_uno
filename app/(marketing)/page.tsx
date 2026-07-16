import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactBar } from '@/components/sections/ImpactBar';
import { IntroCaliE } from '@/components/sections/IntroCaliE';
import { PilaresSection } from '@/components/sections/PilaresSection';
import { SegmentCTA } from '@/components/ui/SegmentCTA';

export default function Home() {
  return (
    <>
      {/* Hero — intro de marca (scroll Cristo Rey) */}
      <HeroSection />

      {/* Barra de impacto (marquee) */}
      <ImpactBar />

      {/* ¿Qué es Cali-e? — info general */}
      <IntroCaliE />

      {/* Los 4 Pilares */}
      <PilaresSection />

      {/* Segmentación: turista vs. hacer parte */}
      <SegmentCTA
        titulo="¿Cómo quieres vivir Cali Enamora?"
        subtitulo="Elige tu camino: descubre el Valle como viajero o súmate al movimiento que lo hace posible."
        acciones={[
          {
            label: 'Quiero ser turista',
            href: '/turista',
            variante: 'primary',
            descripcion: 'Rutas, sabores, eventos y más',
          },
          {
            label: 'Quiero hacer parte',
            href: '/corporativa',
            variante: 'ghost',
            descripcion: 'Asóciate, alíate o dona',
          },
        ]}
      />
    </>
  );
}

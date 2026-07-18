import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactBar } from '@/components/sections/ImpactBar';
import { IntroCaliE } from '@/components/sections/IntroCaliE';
import { PilaresSection } from '@/components/sections/PilaresSection';

export default function Home() {
  return (
    <>
      {/* Hero — intro de marca (scroll Cristo Rey) */}
      <HeroSection />

      {/* Barra de impacto (marquee) */}
      <ImpactBar />

      {/* Transición: "¿Qué es Cali-e?" queda FIJA (sticky) y la sección de Pilares
          entra deslizándose desde la derecha encima (reveal), hasta llenar la
          pantalla. PilaresSection trae -mt-[100vh] para solapar el intro. */}
      <div className="relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <IntroCaliE />
        </div>

        {/* Los 4 Pilares — hero de 3 fases (portada → cards → CTA integrada). */}
        <PilaresSection
        ctaTitulo="¿Cómo quieres vivirlo?"
        ctaSubtitulo="Elige tu camino: descubre el Valle como viajero o súmate al movimiento que lo hace posible."
          ctaAcciones={[
            { label: 'Quiero ser turista', href: '/turista', variante: 'primary', descripcion: 'Rutas, sabores, eventos y más' },
            { label: 'Quiero hacer parte', href: '/corporativa', variante: 'ghost', descripcion: 'Asóciate, alíate o dona' },
          ]}
        />
      </div>
    </>
  );
}

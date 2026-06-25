import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactBar } from '@/components/sections/ImpactBar';
import { HeroParallax } from '@/components/ui/hero-parallax';
import { getParallaxImagenes } from '@/lib/galeria-parallax';
import { PilaresSection } from '@/components/sections/PilaresSection';
import { RutasPilaresSection } from '@/components/sections/RutasPilaresSection';
import { EventosSection } from '@/components/sections/EventosSection';
import { RestaurantesSection } from '@/components/sections/RestaurantesSection';
import { NuestraAcademia } from '@/components/sections/NuestraAcademia';
import { TestimoniosSection } from '@/components/sections/TestimoniosSection';
import { AliadosSection } from '@/components/sections/AliadosSection';
import { InversoresSection } from '@/components/sections/InversoresSection';
import { ContactoSection } from '@/components/sections/ContactoSection';

export default function Home() {
  // Selección aleatoria (por build) de imágenes reales del proyecto.
  const parallaxImagenes = getParallaxImagenes(15);

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Barra de impacto (marquee) */}
      <ImpactBar />

      {/* Galería parallax — recorrido visual que desemboca en los Pilares */}
      <HeroParallax products={parallaxImagenes} />

      {/* Los 4 Pilares */}
      <PilaresSection />

      {/* Rutas por pilar (preview switch con teléfono) */}
      <RutasPilaresSection />

      {/* Eventos */}
      <EventosSection />

      {/* Sabores (restaurantes y planes) */}
      <RestaurantesSection />

      {/* Academia */}
      <NuestraAcademia />

      {/* Testimonios */}
      <TestimoniosSection />

      {/* Aliados */}
      <AliadosSection />

      {/* Inversores */}
      <InversoresSection />

      {/* Contacto */}
      <ContactoSection />
    </>
  );
}

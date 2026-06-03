'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactBar } from '@/components/sections/ImpactBar';
import { PilaresSection } from '@/components/sections/PilaresSection';
import { RutasSection } from '@/components/sections/RutasSection';
import { EventosSection } from '@/components/sections/EventosSection';
import { RestaurantesSection } from '@/components/sections/RestaurantesSection';
import { NuestraAcademia } from '@/components/sections/NuestraAcademia';
import { TestimoniosSection } from '@/components/sections/TestimoniosSection';
import { AliadosSection } from '@/components/sections/AliadosSection';
import { InversoresSection } from '@/components/sections/InversoresSection';
import { ContactoSection } from '@/components/sections/ContactoSection';
import { AnimatedBackground } from '@/components/ui/AnimatedBackground';
// import Debug from './debug';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Fondo global animado en scroll (detrás de todo) */}
      <AnimatedBackground />

      {/* <Debug /> */}

      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Impact Bar - Estadísticas */}
      <ImpactBar />

      {/* Los 4 Pilares */}
      <PilaresSection />

      {/* Rutas Turísticas (incluye mapa interactivo por ruta en su detalle) */}
      <RutasSection />

      {/* Eventos */}
      <EventosSection />

      {/* Restaurantes y Planes */}
      <RestaurantesSection />

      {/* Nuestra Academia */}
      <NuestraAcademia />

      {/* Testimonios */}
      <TestimoniosSection />

      {/* Aliados */}
      <AliadosSection />

      {/* Inversores */}
      <InversoresSection />

      {/* Contacto */}
      <ContactoSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}

'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ImpactBar } from '@/components/sections/ImpactBar';
import { PilaresSection } from '@/components/sections/PilaresSection';
import { RutasSection } from '@/components/sections/RutasSection';
import { MapaSection } from '@/components/sections/MapaSection';
import { EventosSection } from '@/components/sections/EventosSection';
import { RestaurantesSection } from '@/components/sections/RestaurantesSection';
import { TestimoniosSection } from '@/components/sections/TestimoniosSection';
import { AliadosSection } from '@/components/sections/AliadosSection';
import { InversoresSection } from '@/components/sections/InversoresSection';
import { ContactoSection } from '@/components/sections/ContactoSection';
// import Debug from './debug';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A1636]">
      {/* <Debug /> */}
      
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Impact Bar - Estadísticas */}
      <ImpactBar />

      {/* Los 4 Pilares */}
      <PilaresSection />

      {/* Rutas Turísticas */}
      <RutasSection />

      {/* Mapa Interactivo */}
      <MapaSection />

      {/* Eventos */}
      <EventosSection />

      {/* Restaurantes y Planes */}
      <RestaurantesSection />

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

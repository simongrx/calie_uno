import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { SpotlightProvider } from '@/components/ui/SpotlightProvider';

/**
 * Layout del área pública (marketing): aporta el "chrome" compartido por todas
 * las páginas públicas — fondo aurora, listener de spotlight, navbar y footer.
 * El layout raíz (app/layout.tsx) solo aporta <html>/<body>/fuentes/metadata, de
 * modo que en Fase 2 las áreas (app)/(auth) podrán tener su propio chrome.
 */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Fondo aurora global (detrás de todo) */}
      <AuroraBackground />

      {/* Listener único para el efecto spotlight de las cards */}
      <SpotlightProvider />

      <Header />

      <main id="main-content" className="relative z-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}

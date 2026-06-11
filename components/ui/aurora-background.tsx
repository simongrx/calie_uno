'use client';

import React from 'react';

/**
 * Fondo aurora global: una capa fija detrás de todo el contenido con un gradiente
 * animado (colores de marca) difuminado y enmascarado. Adaptado al tema oscuro:
 * base navy + aurora sutil por encima. Se renderiza una vez en la página.
 */
export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base navy de marca */}
      <div className="absolute inset-0 bg-[#0A1636]" />
      {/* Aurora animada (sutil) */}
      <div className="aurora-layer absolute -inset-[20px] opacity-35 will-change-transform" />
    </div>
  );
}

export default AuroraBackground;

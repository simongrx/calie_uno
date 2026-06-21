'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // En Fase 2 esto se conectará a un servicio de logging/monitoreo.
    console.error(error);
  }, [error]);

  const glassActive: React.CSSProperties = {
    background: 'rgba(255, 41, 0, 0.26)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255, 41, 0, 0.55)',
    borderRadius: '9999px',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.28), 0 8px 24px rgba(255, 41, 0, 0.22)',
  };
  const glassInactive: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '9999px',
  };

  return (
    <div className="section flex items-center justify-center">
      <div className="container-custom flex flex-col items-center text-center">
        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Algo salió mal
        </h1>
        <p className="mb-8 max-w-md text-white/65">
          Tuvimos un problema cargando esta sección. Puedes intentarlo de nuevo o volver al inicio.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-full px-7 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={glassActive}
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-full px-7 py-3 font-semibold text-white transition-all duration-300 hover:brightness-110"
            style={glassInactive}
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

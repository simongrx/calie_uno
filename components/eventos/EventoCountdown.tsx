'use client';
 
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
 
interface EventosCountdownProps {
  fechaInicio: string; // "YYYY-MM-DD"
  enVivo?: boolean;
}
 
interface Tiempo {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}
 
function calcularTiempo(fechaStr: string): Tiempo | null {
  const ahora = new Date().getTime();
  const objetivo = new Date(fechaStr + 'T00:00:00').getTime();
  const diff = objetivo - ahora;
 
  if (diff <= 0) return null;
 
  return {
    dias:     Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas:    Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutos:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    segundos: Math.floor((diff % (1000 * 60)) / 1000),
  };
}
 
function Unidad({ valor, label }: { valor: number; label: string }) {
  const valorStr = String(valor).padStart(2, '0');
 
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden"
        style={{
          background: 'rgba(255, 41, 0, 0.15)',
          border: '1px solid rgba(255, 41, 0, 0.3)',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={valorStr}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-lg sm:text-xl font-bold text-white absolute"
            style={{ fontFamily: 'DM Sans, sans-serif' }}
          >
            {valorStr}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs text-white/40 mt-1.5 font-medium uppercase tracking-wider"
        style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '9px' }}>
        {label}
      </span>
    </div>
  );
}
 
export const EventosCountdown: React.FC<EventosCountdownProps> = ({ fechaInicio, enVivo }) => {
  const [tiempo, setTiempo] = useState<Tiempo | null>(() => calcularTiempo(fechaInicio));
 
  useEffect(() => {
    if (enVivo) return;
 
    const intervalo = setInterval(() => {
      setTiempo(calcularTiempo(fechaInicio));
    }, 1000);
 
    return () => clearInterval(intervalo);
  }, [fechaInicio, enVivo]);
 
  // Evento en vivo
  if (enVivo) {
    return (
      <div className="flex items-center gap-2 py-2 px-3 rounded-xl"
        style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
        <span className="text-red-400 text-xs font-semibold uppercase tracking-wider">
          Sucediendo ahora mismo
        </span>
      </div>
    );
  }
 
  // Evento pasado
  if (!tiempo) {
    return (
      <div className="flex items-center gap-2 py-2 px-3 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <svg className="w-3.5 h-3.5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-white/40 text-xs">Este evento ya ocurrió</span>
      </div>
    );
  }
 
  // Menos de 24 horas
  if (tiempo.dias === 0) {
    return (
      <div>
        <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-2">
          ¡Comienza hoy!
        </p>
        <div className="flex items-end gap-2">
          <Unidad valor={tiempo.horas} label="hrs" />
          <span className="text-white/40 font-bold mb-3.5">:</span>
          <Unidad valor={tiempo.minutos} label="min" />
          <span className="text-white/40 font-bold mb-3.5">:</span>
          <Unidad valor={tiempo.segundos} label="seg" />
        </div>
      </div>
    );
  }
 
  // Más de un día
  return (
    <div>
      <p className="text-xs text-white/40 uppercase tracking-wider mb-2"
        style={{ fontFamily: 'DM Sans, sans-serif' }}>
        Comienza en
      </p>
      <div className="flex items-end gap-2">
        <Unidad valor={tiempo.dias} label="días" />
        <span className="text-white/20 font-bold mb-3.5 text-sm">:</span>
        <Unidad valor={tiempo.horas} label="hrs" />
        <span className="text-white/20 font-bold mb-3.5 text-sm">:</span>
        <Unidad valor={tiempo.minutos} label="min" />
        <span className="text-white/20 font-bold mb-3.5 text-sm">:</span>
        <Unidad valor={tiempo.segundos} label="seg" />
      </div>
    </div>
  );
};
 
export default EventosCountdown;
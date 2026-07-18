"use client";

import { useCallback, useMemo, useState } from "react";
import { rutasTuristicasCali } from "@/data/rutasTuristicas";
import type { Punto, Ruta } from "@/types/rutasTuristicas";

// ============================================
// PROPS
// ============================================
interface MapaRutasTuristicasProps {
  imageUrl: string;
  viewBoxWidth?: number;
  viewBoxHeight?: number;
}

// ============================================
// BADGE (etiqueta pequeña coloreada)
// ============================================
function Badge({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className="inline-block rounded-full border px-3 py-1 text-xs font-semibold"
      style={{ backgroundColor: `${color}20`, color, borderColor: color }}
    >
      {children}
    </span>
  );
}

// ============================================
// POPUP DE INFORMACIÓN
// ============================================
function PopupInfo({ punto, ruta }: { punto: Punto; ruta: Ruta }) {
  return (
    <div className="pointer-events-none animate-[fadeIn_0.2s_ease] rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5">
      <h3 className="text-lg font-bold text-gray-900">{punto.nombre}</h3>
      <div className="mt-2 flex flex-wrap gap-2">
        <Badge color={ruta.color}>{punto.tipo}</Badge>
        <Badge color="#6b7280">🕐 {punto.horario}</Badge>
      </div>
      <p className="mt-2 text-sm text-gray-600">{punto.info}</p>
    </div>
  );
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
function MapaRutasTuristicas({
  imageUrl,
  viewBoxWidth = 1536,
  viewBoxHeight = 1024,
}: MapaRutasTuristicasProps) {
  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(null);
  const [activePointId, setActivePointId] = useState<number | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<Punto | null>(null);

  // --- Rutas visibles: todas, o solo la seleccionada ---
  const rutasVisibles = useMemo<Ruta[]>(() => {
    if (!selectedRutaId) return rutasTuristicasCali;
    return rutasTuristicasCali.filter((r) => r.id === selectedRutaId);
  }, [selectedRutaId]);

  // --- Puntos visibles: todos, o solo los de la ruta seleccionada ---
  const puntosVisibles = useMemo<Punto[]>(() => {
    if (!selectedRutaId) return rutasTuristicasCali.flatMap((r) => r.puntos);
    return (
      rutasTuristicasCali.find((r) => r.id === selectedRutaId)?.puntos ?? []
    );
  }, [selectedRutaId]);

  // --- Ruta del punto actualmente en hover (para colorear popup y pin) ---
  const rutaDelHover = useMemo<Ruta | null>(() => {
    if (!hoveredPoint) return null;
    return (
      rutasVisibles.find((r) =>
        r.puntos.some(
          (p) => p.id === hoveredPoint.id && p.nombre === hoveredPoint.nombre,
        ),
      ) ?? null
    );
  }, [hoveredPoint, rutasVisibles]);

  // --- Conectar puntos en orden como cadena de coordenadas para <polyline> ---
  const generarPolyline = useCallback(
    (puntos: Punto[]) => puntos.map((p) => `${p.x},${p.y}`).join(" "),
    [],
  );

  // --- Color de un punto: heredado de su ruta (dentro de las visibles) ---
  const obtenerColorDelPunto = useCallback(
    (punto: Punto) => {
      const ruta = rutasVisibles.find((r) =>
        r.puntos.some((p) => p.id === punto.id && p.nombre === punto.nombre),
      );
      return ruta?.color ?? "#ccc";
    },
    [rutasVisibles],
  );

  // --- Handlers de hover/focus de pins ---
  const activarPunto = useCallback((punto: Punto) => {
    setActivePointId(punto.id);
    setHoveredPoint(punto);
  }, []);

  const desactivarPunto = useCallback(() => {
    setActivePointId(null);
    setHoveredPoint(null);
  }, []);

  // --- Posición del popup con clamp para que no salga del viewBox ---
  const POPUP_W = 280;
  const POPUP_H = 200;
  const popupX = hoveredPoint
    ? Math.min(
        Math.max(hoveredPoint.x - POPUP_W / 2, 8),
        viewBoxWidth - POPUP_W - 8,
      )
    : 0;
  const popupY = hoveredPoint
    ? Math.min(
        Math.max(hoveredPoint.y - POPUP_H - 20, 8),
        viewBoxHeight - POPUP_H - 8,
      )
    : 0;

  return (
    <div className="flex w-full flex-col gap-4 rounded-lg bg-gray-50 p-6">
      {/* fade-in del popup */}
      <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>

      {/* ---------- Botones de filtro ---------- */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSelectedRutaId(null)}
          aria-pressed={selectedRutaId === null}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            selectedRutaId === null
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-100"
          }`}
        >
          Ver todo
        </button>

        {rutasTuristicasCali.map((ruta) => {
          const activa = selectedRutaId === ruta.id;
          return (
            <button
              key={ruta.id}
              type="button"
              title={ruta.description}
              onClick={() =>
                setSelectedRutaId((prev) => (prev === ruta.id ? null : ruta.id))
              }
              aria-pressed={activa}
              className="rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200"
              style={
                activa
                  ? { backgroundColor: ruta.color, color: "#fff" }
                  : {
                      backgroundColor: ruta.colorLight,
                      color: ruta.color,
                      boxShadow: `inset 0 0 0 1px ${ruta.color}`,
                    }
              }
            >
              {ruta.nombre}
            </button>
          );
        })}
      </div>

      {/* ---------- SVG del mapa ---------- */}
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full"
        role="img"
        aria-label="Mapa interactivo de rutas turísticas de Cali"
      >
        <title>Mapa de rutas turísticas de Cali</title>
        <image
          href={imageUrl}
          width={viewBoxWidth}
          height={viewBoxHeight}
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Líneas de rutas */}
        {rutasVisibles.map((ruta) => {
          const activa = selectedRutaId === ruta.id;
          return (
            <polyline
              key={ruta.id}
              points={generarPolyline(ruta.puntos)}
              fill="none"
              stroke={ruta.color}
              strokeWidth={activa ? 3 : 1}
              strokeLinejoin="round"
              strokeLinecap="round"
              opacity={activa ? 1 : 0.3}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Pins / puntos de interés */}
        {puntosVisibles.map((punto) => {
          const activo = activePointId === punto.id && hoveredPoint === punto;
          return (
            <circle
              key={`${punto.id}-${punto.nombre}`}
              cx={punto.x}
              cy={punto.y}
              r={activo ? 28 : 20}
              fill={obtenerColorDelPunto(punto)}
              stroke="#fff"
              strokeWidth={2}
              opacity={activo ? 1 : 0.85}
              role="button"
              tabIndex={0}
              aria-label={`${punto.nombre} — ${punto.tipo}, ${punto.horario}`}
              className="cursor-pointer outline-none transition-all duration-200"
              onMouseEnter={() => activarPunto(punto)}
              onMouseLeave={desactivarPunto}
              onFocus={() => activarPunto(punto)}
              onBlur={desactivarPunto}
            />
          );
        })}

        {/* Popup de información */}
        {hoveredPoint && rutaDelHover && (
          <foreignObject
            x={popupX}
            y={popupY}
            width={POPUP_W}
            height={POPUP_H}
            className="pointer-events-none overflow-visible"
          >
            <PopupInfo punto={hoveredPoint} ruta={rutaDelHover} />
          </foreignObject>
        )}
      </svg>
    </div>
  );
}

export default MapaRutasTuristicas;

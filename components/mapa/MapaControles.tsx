"use client";

import { useMap } from "react-leaflet";
import L from "leaflet";
import { Ruta, PilarType } from "@/types";

// ============================================
// COLORES POR PILAR
// ============================================
const pilarColores: Record<PilarType, string> = {
  cultura:     "#7c3aed",
  naturaleza:  "#059669",
  gastronomia: "#dc2626",
  bienestar:   "#0891b2",
};

// ============================================
// BOTÓN CONTROL REUTILIZABLE
// ============================================
function BotonControl({
  onClick,
  title,
  children,
}: {
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: "36px", height: "36px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(10, 22, 54, 0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "8px", cursor: "pointer",
        color: "rgba(255,255,255,0.7)",
        transition: "all 0.2s ease",
        fontFamily: "DM Sans, sans-serif",
        fontSize: "16px", fontWeight: "600",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 41, 0,0.25)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255, 41, 0,0.5)";
        (e.currentTarget as HTMLButtonElement).style.color = "white";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "rgba(10, 22, 54, 0.9)";
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
      }}
    >
      {children}
    </button>
  );
}

// ============================================
// CONTROLES DE ZOOM (necesita useMap → dentro del MapContainer)
// ============================================
export function MapaControlesZoom() {
  const map = useMap();

  const centrarEnCali = () => {
    map.flyTo([3.4516, -76.5320], 12, { duration: 1.2 });
  };

  const verTodo = (rutasFiltradas: Ruta[]) => {
    if (rutasFiltradas.length === 0) return;
    const coords = rutasFiltradas.flatMap((r) =>
      r.puntos.map((p) => p.coordenadas as [number, number])
    );
    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [40, 40], maxZoom: 14 });
    }
  };

  return null; // Los controles se renderizan fuera via MapaControles
}

// ============================================
// CONTROLES PRINCIPALES (fuera del MapContainer)
// ============================================
interface MapaControlesProps {
  rutasFiltradas: Ruta[];
  onCentrar: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onVerTodo: () => void;
}

export function MapaControles({
  rutasFiltradas,
  onCentrar,
  onZoomIn,
  onZoomOut,
  onVerTodo,
}: MapaControlesProps) {
  return (
    <>
      {/* Controles de zoom — esquina superior izquierda */}
      <div
        style={{
          position: "absolute", top: "12px", left: "12px", zIndex: 1000,
          display: "flex", flexDirection: "column", gap: "4px",
        }}
      >
        <BotonControl onClick={onZoomIn} title="Acercar">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </BotonControl>

        <BotonControl onClick={onZoomOut} title="Alejar">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </BotonControl>

        <div style={{ height: "4px" }} />

        <BotonControl onClick={onCentrar} title="Centrar en Cali">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </BotonControl>

        <BotonControl onClick={onVerTodo} title="Ver todas las rutas">
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </BotonControl>
      </div>

      {/* Leyenda de rutas — esquina inferior izquierda */}
      <div
        style={{
          position: "absolute", bottom: "16px", left: "12px", zIndex: 1000,
          background: "rgba(10, 22, 54, 0.88)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "12px", padding: "12px 14px",
          fontFamily: "DM Sans, sans-serif",
          maxWidth: "210px",
        }}
      >
        <p
          style={{
            fontSize: "9px", color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase", letterSpacing: "0.1em",
            marginBottom: "8px", margin: "0 0 8px 0",
          }}
        >
          Rutas activas
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {rutasFiltradas.map((ruta) => (
            <div key={ruta.id} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px", height: "3px", borderRadius: "2px",
                  background: pilarColores[ruta.pilar], flexShrink: 0,
                }}
              />
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)", lineHeight: "1.3" }}>
                {ruta.nombre}
              </span>
            </div>
          ))}
          {rutasFiltradas.length === 0 && (
            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)" }}>
              Sin rutas activas
            </span>
          )}
        </div>
      </div>

      {/* Hint — esquina superior derecha */}
      <div
        style={{
          position: "absolute", top: "12px", right: "12px", zIndex: 1000,
          background: "rgba(10, 22, 54, 0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "8px", padding: "6px 10px",
          fontFamily: "DM Sans, sans-serif",
          fontSize: "11px", color: "rgba(255,255,255,0.4)",
        }}
      >
        Clic en un marcador para ver detalles
      </div>
    </>
  );
}

export default MapaControles;

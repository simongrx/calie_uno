"use client";

import { PuntoRuta, Ruta } from "@/types";

// ============================================
// COLORES POR PILAR
// ============================================
const pilarColores: Record<string, string> = {
  cultura:     "#7c3aed",
  naturaleza:  "#059669",
  gastronomia: "#dc2626",
  bienestar:   "#0891b2",
};

// ============================================
// PROPS
// ============================================
interface MapaPopupProps {
  punto: PuntoRuta;
  ruta: Ruta;
  indice: number; // 0-based
}

// ============================================
// COMPONENTE
// ============================================
export function MapaPopup({ punto, ruta, indice }: MapaPopupProps) {
  const color = pilarColores[ruta.pilar] ?? "#f97316";
  const numero = indice + 1;

  return (
    <div
      style={{
        background: "rgba(10, 22, 54, 0.97)",
        border: `1px solid ${color}40`,
        borderRadius: "12px",
        overflow: "hidden",
        fontFamily: "Outfit, sans-serif",
        width: "260px",
      }}
    >
      {/* Imagen */}
      <div style={{ position: "relative", height: "130px", overflow: "hidden" }}>
        <img
          src={punto.imagen}
          alt={punto.nombre}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(10,22,54,0.85), transparent)",
          }}
        />

        {/* Número de parada */}
        <div
          style={{
            position: "absolute", top: "8px", left: "8px",
            background: color, color: "white",
            borderRadius: "50%", width: "24px", height: "24px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "12px", fontWeight: "700",
          }}
        >
          {numero}
        </div>

        {/* Tipo de punto */}
        <div
          style={{
            position: "absolute", top: "8px", right: "8px",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            color: "white", borderRadius: "20px",
            padding: "2px 8px", fontSize: "10px", fontWeight: "600",
            textTransform: "capitalize", border: `1px solid ${color}50`,
          }}
        >
          {punto.tipo}
        </div>

        {/* Duración sobre la imagen */}
        {punto.duracion && (
          <div
            style={{
              position: "absolute", bottom: "8px", right: "8px",
              background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
              color: "rgba(255,255,255,0.8)", borderRadius: "20px",
              padding: "2px 8px", fontSize: "10px",
              display: "flex", alignItems: "center", gap: "4px",
            }}
          >
            ⏱ {punto.duracion}
          </div>
        )}
      </div>

      {/* Contenido */}
      <div style={{ padding: "12px 14px" }}>
        {/* Nombre de la ruta */}
        <p
          style={{
            fontSize: "10px", color: color, fontWeight: "600",
            textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "4px",
          }}
        >
          {ruta.nombre}
        </p>

        {/* Nombre del punto */}
        <h4
          style={{
            fontSize: "15px", fontWeight: "700", color: "white",
            marginBottom: "6px", lineHeight: "1.2", margin: "0 0 6px 0",
          }}
        >
          {punto.nombre}
        </h4>

        {/* Descripción */}
        <p
          style={{
            fontSize: "12px", color: "rgba(255,255,255,0.6)",
            marginBottom: "8px", lineHeight: "1.5", margin: "0 0 8px 0",
          }}
        >
          {punto.descripcion}
        </p>

        {/* Detalles adicionales */}
        {punto.detalles && (
          <p
            style={{
              fontSize: "11px", color: "rgba(255,255,255,0.4)",
              lineHeight: "1.4", marginBottom: "10px", margin: "0 0 10px 0",
              padding: "6px 8px", borderRadius: "6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {punto.detalles}
          </p>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            paddingTop: "8px", borderTop: "1px solid rgba(255,255,255,0.08)",
            marginTop: "4px",
          }}
        >
          {/* Pilar badge */}
          <span
            style={{
              fontSize: "10px", fontWeight: "600",
              color: color, background: `${color}15`,
              border: `1px solid ${color}30`,
              borderRadius: "20px", padding: "2px 8px",
              textTransform: "capitalize",
            }}
          >
            {ruta.pilar}
          </span>

          {/* Progreso de parada */}
          <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>
            {numero} / {ruta.puntos.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default MapaPopup;

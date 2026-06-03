"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { PilarType } from "@/types";
import { rutas } from "@/data/rutas";
import { MapaPopup } from "@/components/mapa/MapaPopup";
import { MapaControles } from "@/components/mapa/MapaControles";

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
// CREAR ICONO PIN NUMERADO
// ============================================
const crearIcono = (color: string, numero: number) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44">
      <defs>
        <filter id="s${numero}" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.45)"/>
        </filter>
      </defs>
      <ellipse cx="18" cy="41" rx="5" ry="2.5" fill="rgba(0,0,0,0.18)"/>
      <path d="M18 2C11.37 2 6 7.37 6 14c0 9.75 12 28 12 28s12-18.25 12-28c0-6.63-5.37-12-12-12z"
        fill="${color}" filter="url(#s${numero})" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
      <circle cx="18" cy="14" r="7" fill="rgba(255,255,255,0.15)"/>
      <text x="18" y="18" text-anchor="middle" dominant-baseline="middle"
        font-family="Outfit,sans-serif" font-size="11" font-weight="700" fill="white">
        ${numero}
      </text>
    </svg>
  `;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -48],
  });
};

// ============================================
// COMPONENTE INTERNO: ajusta vista + expone métodos
// ============================================
interface MapaRefProps {
  rutasFiltradas: typeof rutas;
  mapRef: React.MutableRefObject<L.Map | null>;
}

function MapaRef({ rutasFiltradas, mapRef, pilarFiltro }: MapaRefProps & { pilarFiltro: string | null }) {
  const map = useMap();
  const iniciado = useRef(false);

  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);

  // Solo ajusta la vista cuando cambia el FILTRO, no en cada render
  useEffect(() => {
    if (!iniciado.current) {
      iniciado.current = true;
    }
    if (rutasFiltradas.length === 0) return;
    const coords = rutasFiltradas.flatMap((r) =>
      r.puntos.map((p) => p.coordenadas as [number, number])
    );
    if (coords.length > 0) {
      map.fitBounds(L.latLngBounds(coords), { padding: [50, 50], maxZoom: 14, animate: true });
    }
  }, [pilarFiltro]); // ← solo depende del filtro, no del array

  return null;
}

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
type Props = {
  pilarFiltro: PilarType | null;
};

export default function MapaInteractivo({ pilarFiltro }: Props) {
  const center: [number, number] = [3.4900, -76.4800];
  const [rutaDestacada, setRutaDestacada] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const rutasFiltradas = pilarFiltro
    ? rutas.filter((r) => r.pilar === pilarFiltro)
    : rutas;

  // Funciones de control expuestas a MapaControles
  const handleZoomIn  = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleCentrar = () => mapRef.current?.flyTo([3.4516, -76.5320], 12, { duration: 1.2 });
  const handleVerTodo = () => {
    const coords = rutasFiltradas.flatMap((r) =>
      r.puntos.map((p) => p.coordenadas as [number, number])
    );
    if (coords.length > 0 && mapRef.current) {
      mapRef.current.fitBounds(L.latLngBounds(coords), { padding: [40, 40], maxZoom: 14 });
    }
  };

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        {/* Mapa oscuro CartoDB */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Ref + ajuste de vista */}
        <MapaRef rutasFiltradas={rutasFiltradas} mapRef={mapRef} pilarFiltro={null} />

        {/* Rutas */}
        {rutasFiltradas.map((ruta) => {
          const color = pilarColores[ruta.pilar];
          const coords = ruta.puntos.map((p) => p.coordenadas as [number, number]);
          const esDestacada = rutaDestacada === ruta.id;

          return (
            <div key={ruta.id}>
              {/* Línea de ruta */}
              <Polyline
                positions={coords}
                pathOptions={{
                  color,
                  weight: esDestacada ? 5 : 3,
                  opacity: esDestacada ? 1 : 0.8,
                  dashArray: ruta.dificultad === "moderado" ? "10, 5" : undefined,
                  lineCap: "round",
                  lineJoin: "round",
                }}
                eventHandlers={{
                  mouseover: () => setRutaDestacada(ruta.id),
                  mouseout:  () => setRutaDestacada(null),
                }}
              />

              {/* Marcadores */}
              {ruta.puntos.map((punto, index) => (
                <Marker
                  key={punto.id}
                  position={punto.coordenadas as [number, number]}
                  icon={crearIcono(color, index + 1)}
                  eventHandlers={{
                    mouseover: () => setRutaDestacada(ruta.id),
                    mouseout:  () => setRutaDestacada(null),
                  }}
                >
                  <Popup className="ruta-popup" maxWidth={270} minWidth={260}>
                    <MapaPopup punto={punto} ruta={ruta} indice={index} />
                  </Popup>
                </Marker>
              ))}
            </div>
          );
        })}
      </MapContainer>

      {/* Controles flotantes */}
      <MapaControles
        rutasFiltradas={rutasFiltradas}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onCentrar={handleCentrar}
        onVerTodo={handleVerTodo}
      />

      {/* CSS popup */}
      <style>{`
        .ruta-popup .leaflet-popup-content-wrapper {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
        }
        .ruta-popup .leaflet-popup-content {
          margin: 0 !important;
          width: auto !important;
        }
        .ruta-popup .leaflet-popup-tip-container { display: none !important; }
        .ruta-popup .leaflet-popup-close-button {
          color: rgba(255,255,255,0.5) !important;
          font-size: 18px !important;
          top: 6px !important; right: 8px !important;
          z-index: 10 !important;
        }
        .ruta-popup .leaflet-popup-close-button:hover { color: white !important; }
      `}</style>
    </div>
  );
}

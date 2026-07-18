"use client";

// ============================================
// HERRAMIENTA INTERNA DE CALIBRACIÓN DE PINES
// ============================================
// No es parte de la UI pública: sirve para ubicar visualmente cada punto sobre
// la ilustración del mapa. Se selecciona un punto en la lista, se hace click en
// el mapa y se guarda su coordenada (x/y en el sistema del viewBox = píxeles de
// la imagen). El resultado se expone en `window.__calibracion` y como JSON
// copiable para hornearlo en `data/rutasTuristicas.ts`.

import { useCallback, useMemo, useRef, useState } from "react";
import { rutasTuristicasCali } from "@/data/rutasTuristicas";
import type { Punto } from "@/types/rutasTuristicas";

const VIEW_W = 1920;
const VIEW_H = 1280;

type Coords = Record<string, { x: number; y: number }>;

const keyDe = (rutaId: string, puntoId: number) => `${rutaId}:${puntoId}`;

declare global {
  interface Window {
    __calibracion?: Coords;
  }
}

interface MapaCalibradorProps {
  imageUrl: string;
}

export default function MapaCalibrador({ imageUrl }: MapaCalibradorProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Coordenadas iniciales = las actuales del dataset (para ver de dónde partimos).
  const [coords, setCoords] = useState<Coords>(() => {
    const init: Coords = {};
    for (const ruta of rutasTuristicasCali) {
      for (const p of ruta.puntos) init[keyDe(ruta.id, p.id)] = { x: p.x, y: p.y };
    }
    return init;
  });

  // Lista plana de puntos en el mismo orden que el dataset.
  const items = useMemo(
    () =>
      rutasTuristicasCali.flatMap((ruta) =>
        ruta.puntos.map((p) => ({
          key: keyDe(ruta.id, p.id),
          rutaId: ruta.id,
          rutaNombre: ruta.nombre,
          color: ruta.color,
          punto: p as Punto,
        })),
      ),
    [],
  );

  const [activeKey, setActiveKey] = useState<string>(items[0]?.key ?? "");
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const [copiado, setCopiado] = useState(false);

  // Convierte coordenadas de pantalla → coordenadas del viewBox del SVG.
  const puntoSVG = useCallback((clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const p = pt.matrixTransform(ctm.inverse());
    return { x: Math.round(p.x), y: Math.round(p.y) };
  }, []);

  const publicar = useCallback((next: Coords) => {
    if (typeof window !== "undefined") window.__calibracion = next;
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const p = puntoSVG(e.clientX, e.clientY);
      if (!p || !activeKey) return;
      setCoords((prev) => {
        const next = { ...prev, [activeKey]: p };
        publicar(next);
        return next;
      });
      // Avanza automáticamente al siguiente punto para agilizar.
      const idx = items.findIndex((it) => it.key === activeKey);
      const siguiente = items[idx + 1];
      if (siguiente) setActiveKey(siguiente.key);
    },
    [activeKey, items, puntoSVG, publicar],
  );

  const handleMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      setCursor(puntoSVG(e.clientX, e.clientY));
    },
    [puntoSVG],
  );

  const copiar = useCallback(async (texto: string) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1500);
    } catch {
      setCopiado(false);
    }
  }, []);

  // JSON copiable con las coordenadas actualizadas (por ruta).
  const salida = useMemo(() => {
    return rutasTuristicasCali
      .map((ruta) => {
        const lineas = ruta.puntos
          .map((p) => {
            const c = coords[keyDe(ruta.id, p.id)];
            return `  { id: ${p.id}, nombre: ${JSON.stringify(p.nombre)}, x: ${c.x}, y: ${c.y} },`;
          })
          .join("\n");
        return `// ${ruta.nombre} (${ruta.id})\n${lineas}`;
      })
      .join("\n\n");
  }, [coords]);

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-900/80 p-4 text-white lg:flex-row">
      {/* -------- Panel de puntos -------- */}
      <aside className="w-full shrink-0 lg:w-72">
        <p className="mb-2 text-sm text-gray-300">
          Selecciona un punto y haz click en el mapa. Avanza solo al siguiente.
        </p>
        <ol className="max-h-[520px] space-y-1 overflow-auto pr-1">
          {items.map((it, i) => {
            const activo = it.key === activeKey;
            const c = coords[it.key];
            return (
              <li key={it.key}>
                <button
                  type="button"
                  onClick={() => setActiveKey(it.key)}
                  className={`flex w-full items-center justify-between gap-2 rounded px-2 py-1 text-left text-xs transition-colors ${
                    activo ? "ring-2" : "hover:bg-white/10"
                  }`}
                  style={{
                    backgroundColor: activo ? `${it.color}33` : undefined,
                    boxShadow: activo ? `inset 0 0 0 1px ${it.color}` : undefined,
                  }}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: it.color }}
                    />
                    <span className="truncate">
                      {i + 1}. {it.punto.nombre}
                    </span>
                  </span>
                  <span className="shrink-0 tabular-nums text-gray-400">
                    {c.x},{c.y}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 rounded bg-black/40 p-2 text-[11px] text-gray-300">
          Cursor:{" "}
          <span className="tabular-nums text-white">
            {cursor ? `${cursor.x}, ${cursor.y}` : "—"}
          </span>
        </div>
      </aside>

      {/* -------- Mapa -------- */}
      <div className="min-w-0 flex-1">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className="w-full cursor-crosshair rounded"
          onClick={handleClick}
          onMouseMove={handleMove}
          onMouseLeave={() => setCursor(null)}
        >
          <image
            href={imageUrl}
            width={VIEW_W}
            height={VIEW_H}
            preserveAspectRatio="xMidYMid meet"
          />
          {items.map((it) => {
            const c = coords[it.key];
            const activo = it.key === activeKey;
            return (
              <g key={it.key}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={activo ? 16 : 11}
                  fill={it.color}
                  stroke="#fff"
                  strokeWidth={activo ? 4 : 2}
                  opacity={0.95}
                />
                <text
                  x={c.x}
                  y={c.y - 20}
                  textAnchor="middle"
                  fontSize={22}
                  fontWeight={700}
                  fill="#fff"
                  stroke="#000"
                  strokeWidth={0.6}
                  paintOrder="stroke"
                >
                  {it.punto.nombre}
                </text>
              </g>
            );
          })}
        </svg>

        {/* -------- Salida copiable -------- */}
        <details className="mt-3" open>
          <summary className="cursor-pointer text-sm text-gray-300">
            Coordenadas — cópialas y pásamelas
          </summary>
          <button
            type="button"
            onClick={() => copiar(salida)}
            className="mt-2 rounded bg-white/10 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/20"
          >
            {copiado ? "¡Copiado!" : "Copiar coordenadas"}
          </button>
          <pre
            id="calibracion-output"
            className="mt-2 max-h-64 overflow-auto rounded bg-black/60 p-3 text-[11px] leading-snug text-green-300"
          >
            {salida}
          </pre>
        </details>
      </div>
    </div>
  );
}

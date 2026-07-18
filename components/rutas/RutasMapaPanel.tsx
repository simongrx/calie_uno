"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { rutasTuristicasCali } from "@/data/rutasTuristicas";
import type { Punto, Ruta } from "@/types/rutasTuristicas";

// ============================================
// PANEL DE RUTAS — mapa interactivo con zoom + card de ruta
// ============================================

const VIEW_W = 1920;
const VIEW_H = 1280;
const IMG_ASPECT = VIEW_W / VIEW_H;

// Tamaño base del corazón (unidades del viewBox completo). Se escala para
// mantener un tamaño aparente ~constante al hacer zoom.
const HEART_BASE = 104;
const HEART_RATIO = 246.65 / 295.99; // aspecto del SVG de corazón

type Box = { x: number; y: number; w: number; h: number };

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

// Centro vertical de las paradas (para encuadrar la vista general).
const CENTRO_PARADAS_Y = (() => {
  const ys = rutasTuristicasCali.flatMap((r) => r.puntos.map((p) => p.y));
  return (Math.min(...ys) + Math.max(...ys)) / 2;
})();

// Caja (aspecto = contenedor) inscrita en la imagen → efecto "cover" sin bandas.
function coverBoxGeneral(aspect: number): Box {
  let w: number, h: number;
  if (aspect >= IMG_ASPECT) {
    w = VIEW_W;
    h = VIEW_W / aspect;
  } else {
    h = VIEW_H;
    w = VIEW_H * aspect;
  }
  const x = clamp((VIEW_W - w) / 2, 0, VIEW_W - w);
  // Sesgo hacia abajo (0.56) para que las paradas queden por debajo del navbar.
  const y = clamp(CENTRO_PARADAS_Y - h * 0.56, 0, VIEW_H - h);
  return { x, y, w, h };
}

// Bounding-box (con padding, aspecto = contenedor) de las paradas de una ruta.
function bboxDeRuta(ruta: Ruta, aspect: number): Box {
  const xs = ruta.puntos.map((p) => p.x);
  const ys = ruta.puntos.map((p) => p.y);
  let minX = Math.min(...xs);
  let maxX = Math.max(...xs);
  let minY = Math.min(...ys);
  let maxY = Math.max(...ys);

  const padX = Math.max((maxX - minX) * 0.3, 240);
  const padY = Math.max((maxY - minY) * 0.3, 240);
  minX -= padX;
  maxX += padX;
  minY -= padY;
  maxY += padY;

  let w = maxX - minX;
  let h = maxY - minY;
  // Expandir al aspecto del contenedor (para llenar sin distorsión ni bandas).
  if (w / h > aspect) {
    const nh = w / aspect;
    minY -= (nh - h) / 2;
    h = nh;
  } else {
    const nw = h * aspect;
    minX -= (nw - w) / 2;
    w = nw;
  }
  if (w > VIEW_W) {
    w = VIEW_W;
    h = w / aspect;
  }
  if (h > VIEW_H) {
    h = VIEW_H;
    w = h * aspect;
  }
  minX = clamp(minX, 0, VIEW_W - w);
  minY = clamp(minY, 0, VIEW_H - h);
  return { x: minX, y: minY, w, h };
}

const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

interface RutasMapaPanelProps {
  imageUrl?: string;
}

export default function RutasMapaPanel({
  imageUrl = "/images/rutas/mapafinal.png",
}: RutasMapaPanelProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [selectedRutaId, setSelectedRutaId] = useState<string | null>(null);
  const [size, setSize] = useState<{ w: number; h: number; headerH: number } | null>(null);
  const aspect = size ? size.w / size.h : IMG_ASPECT;

  const initialBox = useMemo(() => coverBoxGeneral(aspect), [aspect]);
  const [viewBox, setViewBox] = useState<Box>(initialBox);
  const viewBoxRef = useRef<Box>(initialBox);

  // mini-card de parada y tooltip (posición en px relativa al contenedor)
  const [miniCard, setMiniCard] = useState<
    { punto: Punto; ruta: Ruta; left: number; top: number; below: boolean } | null
  >(null);
  const [tooltip, setTooltip] = useState<
    { key: string; nombre: string; left: number; top: number } | null
  >(null);

  const rutaActiva = useMemo<Ruta | null>(
    () => rutasTuristicasCali.find((r) => r.id === selectedRutaId) ?? null,
    [selectedRutaId],
  );

  // --- Medir el contenedor (viewport - header) para que el mapa quepa sin scroll ---
  useEffect(() => {
    const medir = () => {
      const headerH =
        (document.querySelector("header") as HTMLElement | null)?.offsetHeight ?? 96;
      const w = containerRef.current?.clientWidth ?? window.innerWidth;
      // Alto completo del viewport: el mapa ocupa todo y queda detrás del navbar translúcido.
      setSize({ w, h: window.innerHeight, headerH });
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  // --- Animación del viewBox (zoom) ---
  const animarViewBox = useCallback((target: Box) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = viewBoxRef.current;
    const t0 = performance.now();
    const dur = 650;
    const step = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = easeInOut(p);
      const vb: Box = {
        x: start.x + (target.x - start.x) * e,
        y: start.y + (target.y - start.y) * e,
        w: start.w + (target.w - start.w) * e,
        h: start.h + (target.h - start.h) * e,
      };
      viewBoxRef.current = vb;
      setViewBox(vb);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Al cambiar de ruta o de tamaño: zoom al bbox de la ruta o a la vista general (cover).
  useEffect(() => {
    const target = rutaActiva ? bboxDeRuta(rutaActiva, aspect) : coverBoxGeneral(aspect);
    animarViewBox(target);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [rutaActiva, aspect, animarViewBox]);

  // Convierte una coordenada de datos a píxeles relativos al contenedor (getScreenCTM).
  const puntoAPixeles = useCallback((x: number, y: number) => {
    const svg = svgRef.current;
    const cont = containerRef.current;
    if (!svg || !cont) return null;
    const ctm = svg.getScreenCTM();
    if (!ctm) return null;
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const s = pt.matrixTransform(ctm);
    const r = cont.getBoundingClientRect();
    return { left: s.x - r.left, top: s.y - r.top };
  }, []);

  const seleccionarRuta = useCallback((id: string) => {
    setSelectedRutaId(id);
    setMiniCard(null);
    setTooltip(null);
  }, []);

  const salirDeRuta = useCallback(() => {
    setSelectedRutaId(null);
    setMiniCard(null);
    setTooltip(null);
  }, []);

  const abrirParada = useCallback(
    (ruta: Ruta, punto: Punto) => {
      const pos = puntoAPixeles(punto.x, punto.y);
      const cw = containerRef.current?.clientWidth ?? 0;
      const left = clamp(pos?.left ?? 0, 150, Math.max(150, cw - 150));
      const top = pos?.top ?? 0;
      setTooltip(null);
      setMiniCard({ punto, ruta, left, top, below: top < 250 });
    },
    [puntoAPixeles],
  );

  // Click en un corazón: en vista general selecciona la ruta; en modo ruta abre la parada.
  const clickCorazon = useCallback(
    (ruta: Ruta, punto: Punto) => {
      if (selectedRutaId) abrirParada(ruta, punto);
      else seleccionarRuta(ruta.id);
    },
    [selectedRutaId, abrirParada, seleccionarRuta],
  );

  const hoverCorazon = useCallback(
    (ruta: Ruta, punto: Punto) => {
      const pos = puntoAPixeles(punto.x, punto.y);
      if (pos)
        setTooltip({ key: `${ruta.id}:${punto.id}`, nombre: punto.nombre, left: pos.left, top: pos.top });
    },
    [puntoAPixeles],
  );

  const clickFondo = useCallback(() => {
    if (miniCard) setMiniCard(null);
    else if (selectedRutaId) salirDeRuta();
  }, [miniCard, selectedRutaId, salirDeRuta]);

  // Tecla Esc.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (miniCard) setMiniCard(null);
      else if (selectedRutaId) salirDeRuta();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [miniCard, selectedRutaId, salirDeRuta]);

  // Corazones visibles: todos (vista general) o los de la ruta activa.
  const corazones = useMemo(
    () =>
      (rutaActiva ? [rutaActiva] : rutasTuristicasCali).flatMap((ruta) =>
        ruta.puntos.map((punto, i) => ({ ruta, punto, numero: i + 1 })),
      ),
    [rutaActiva],
  );

  // Escala del corazón para tamaño aparente ~constante.
  const zoomFactor = viewBox.w / VIEW_W;
  const hw = HEART_BASE * zoomFactor;
  const hh = hw * HEART_RATIO;
  const numFont = hw * 0.34;

  // Centro y radios del spotlight (bbox de la ruta activa).
  const spot = useMemo(() => {
    if (!rutaActiva) return null;
    const xs = rutaActiva.puntos.map((p) => p.x);
    const ys = rutaActiva.puntos.map((p) => p.y);
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2;
    const rx = Math.max((Math.max(...xs) - Math.min(...xs)) / 2, 150) * 1.7;
    const ry = Math.max((Math.max(...ys) - Math.min(...ys)) / 2, 150) * 1.7;
    return { cx, cy, rx, ry };
  }, [rutaActiva]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none overflow-hidden h-[100dvh] -mt-[6rem]"
      style={size ? { height: `${size.h}px`, marginTop: `-${size.headerH}px` } : undefined}
    >
      <style>{`
        @keyframes miniIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes latido {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-9%) scale(1.09); }
        }
        .corazon-anim { transform-box: fill-box; transform-origin: center; animation: latido 2.4s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .corazon-anim { animation: none; } }
      `}</style>

      {/* ---------- MAPA (SVG) ---------- */}
      <svg
        ref={svgRef}
        viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`}
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        role="img"
        aria-label="Mapa de rutas turísticas de Cali"
        onClick={clickFondo}
      >
        <title>Mapa de rutas turísticas de Cali</title>

        <defs>
          <radialGradient
            id="spotGrad"
            gradientUnits="userSpaceOnUse"
            cx={spot?.cx ?? 0}
            cy={spot?.cy ?? 0}
            r={spot?.rx ?? 1}
          >
            <stop offset="55%" stopColor="black" />
            <stop offset="100%" stopColor="white" />
          </radialGradient>
          <mask id="spotMask">
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="white" />
            {spot && (
              <ellipse cx={spot.cx} cy={spot.cy} rx={spot.rx} ry={spot.ry} fill="url(#spotGrad)" />
            )}
          </mask>
        </defs>

        <image href={imageUrl} width={VIEW_W} height={VIEW_H} preserveAspectRatio="xMidYMid meet" />

        {/* Spotlight: atenúa el mapa fuera de la ruta activa */}
        {rutaActiva && (
          <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="#0a1024" opacity={0.5} mask="url(#spotMask)" />
        )}

        {/* Corazones (paradas) */}
        {corazones.map(({ ruta, punto, numero }, idx) => (
          <g
            key={`${ruta.id}:${punto.id}`}
            className="corazon-anim cursor-pointer outline-none"
            style={{ animationDelay: `${(idx % 4) * 0.35 + (rutaActiva ? 0 : idx * 0.05)}s` }}
            role="button"
            tabIndex={0}
            aria-label={`${punto.nombre} — ${punto.tipo}`}
            onClick={(e) => {
              e.stopPropagation();
              clickCorazon(ruta, punto);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                clickCorazon(ruta, punto);
              }
            }}
            onMouseEnter={() => hoverCorazon(ruta, punto)}
            onMouseLeave={() => setTooltip((t) => (t?.key === `${ruta.id}:${punto.id}` ? null : t))}
          >
            <circle cx={punto.x} cy={punto.y} r={hw * 0.6} fill="transparent" />
            <image
              href={encodeURI(ruta.heartSrc)}
              x={punto.x - hw / 2}
              y={punto.y - hh / 2}
              width={hw}
              height={hh}
              style={{ filter: "drop-shadow(0 3px 4px rgba(0,0,0,0.45))" }}
            />
            <text
              x={punto.x}
              y={punto.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={numFont}
              fontWeight={800}
              fill="#ffffff"
              stroke="rgba(0,0,0,0.35)"
              strokeWidth={numFont * 0.04}
              paintOrder="stroke"
              style={{ pointerEvents: "none" }}
            >
              {numero}
            </text>
          </g>
        ))}
      </svg>

      {/* ---------- TOOLTIP (nombre de la parada al hover) ---------- */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-md bg-black/80 px-2.5 py-1 text-xs font-semibold text-white shadow-lg"
          style={{ left: tooltip.left, top: tooltip.top - 30 }}
        >
          {tooltip.nombre}
        </div>
      )}

      {/* ---------- OVERLAY ARRIBA-IZQUIERDA (título+tarjetas ↔ card de ruta) ---------- */}
      {/* top = alto del navbar, para no quedar tapado por él */}
      <div
        className="absolute left-0 top-[6rem] z-20 overflow-y-auto p-4 sm:p-6 lg:p-8"
        style={size ? { top: `${size.headerH}px`, maxHeight: `${size.h - size.headerH}px` } : undefined}
      >
        <AnimatePresence mode="wait">
          {!rutaActiva ? (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h2
                className="max-w-[12ch] text-4xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
                style={{ textShadow: "0 2px 18px rgba(0,0,0,0.6)" }}
              >
                Rutas que nos enamoran
              </h2>
              <div className="mt-6 flex flex-col items-start gap-3">
                {rutasTuristicasCali.map((ruta, i) => (
                  <motion.div
                    key={ruta.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07 }}
                    className="w-full"
                  >
                    <RutaTile ruta={ruta} onClick={() => seleccionarRuta(ruta.id)} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="ruta"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <CardRuta
                ruta={rutaActiva}
                maxH={size ? size.h - size.headerH - 48 : undefined}
                onVolver={salirDeRuta}
                onParada={(p) => abrirParada(rutaActiva, p)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- MINI-CARD DE PARADA ---------- */}
      {miniCard && <MiniCardParada data={miniCard} onClose={() => setMiniCard(null)} />}
    </div>
  );
}

// ============================================
// TARJETA-BOTÓN DE RUTA (con foto de portada)
// ============================================
function RutaTile({ ruta, onClick }: { ruta: Ruta; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Ver la ruta ${ruta.nombre}`}
      className="group flex w-[min(88vw,340px)] items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-2.5 pr-4 text-left backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.18]"
      style={{
        boxShadow: `0 10px 30px rgba(0,0,0,0.35), inset 0 0 0 1px ${ruta.color}55`,
      }}
    >
      <span
        className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border-2"
        style={{ borderColor: ruta.color, boxShadow: `0 0 16px ${ruta.color}66` }}
      >
        {ruta.cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ruta.cover} alt="" className="h-full w-full object-cover" loading="lazy" />
        )}
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-base font-bold text-white">{ruta.nombre}</span>
        <span className="block truncate text-xs text-white/70">{ruta.description}</span>
      </span>

      <span
        className="ml-1 text-lg font-bold transition-transform duration-300 group-hover:translate-x-1"
        style={{ color: ruta.color }}
        aria-hidden
      >
        →
      </span>
    </button>
  );
}

// ============================================
// CARD DE RUTA (overlay arriba-izquierda al seleccionar)
// ============================================
function CardRuta({
  ruta,
  maxH,
  onVolver,
  onParada,
}: {
  ruta: Ruta;
  maxH?: number;
  onVolver: () => void;
  onParada: (p: Punto) => void;
}) {
  const chips = [
    ruta.duracion && { icon: "⏱️", label: ruta.duracion },
    ruta.dificultad && { icon: "🥾", label: ruta.dificultad },
    ruta.distancia && { icon: "📏", label: ruta.distancia },
    ruta.mejorHora && { icon: "🕐", label: ruta.mejorHora },
    ruta.precioAproximado && { icon: "💵", label: ruta.precioAproximado },
  ].filter(Boolean) as { icon: string; label: string }[];

  return (
    <div
      className="glass-card w-[min(92vw,380px)] overflow-y-auto rounded-2xl p-5 text-white"
      style={{ maxHeight: maxH, borderTop: `3px solid ${ruta.color}` }}
    >
      <button
        type="button"
        onClick={onVolver}
        className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/20"
      >
        ← Volver a las rutas
      </button>

      <h3 className="text-2xl font-extrabold leading-tight" style={{ color: ruta.color }}>
        {ruta.nombre}
      </h3>
      {ruta.descripcionLarga && (
        <p className="mt-2 text-sm leading-relaxed text-white/85">{ruta.descripcionLarga}</p>
      )}

      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {chips.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-white/90"
            >
              <span>{c.icon}</span>
              {c.label}
            </span>
          ))}
        </div>
      )}

      {ruta.incluye && ruta.incluye.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-white/60">Incluye</p>
          <ul className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-sm text-white/85">
            {ruta.incluye.map((it) => (
              <li key={it} className="flex items-start gap-1.5">
                <span style={{ color: ruta.color }}>✓</span>
                {it}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-white/60">Paradas</p>
        <ol className="mt-1.5 space-y-1">
          {ruta.puntos.map((p, i) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onParada(p)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm transition-colors hover:bg-white/10"
              >
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ backgroundColor: ruta.color }}
                >
                  {i + 1}
                </span>
                <span className="truncate text-white/90">{p.nombre}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ============================================
// MINI-CARD DE PARADA (foto + info), posicionada en píxeles
// ============================================
function MiniCardParada({
  data,
  onClose,
}: {
  data: { punto: Punto; ruta: Ruta; left: number; top: number; below: boolean };
  onClose: () => void;
}) {
  const { punto, ruta, left, top, below } = data;
  return (
    <div
      role="dialog"
      aria-label={punto.nombre}
      className="absolute z-30 w-[min(78vw,280px)]"
      style={{
        left,
        top,
        transform: below ? "translate(-50%, 28px)" : "translate(-50%, calc(-100% - 28px))",
        animation: "miniIn 0.18s ease",
      }}
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black/10">
        <div className="relative h-32 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={punto.imagen} alt={punto.nombre} className="h-full w-full object-cover" loading="lazy" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/80"
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          <h4 className="text-base font-bold text-gray-900">{punto.nombre}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold"
              style={{ backgroundColor: ruta.colorLight, color: ruta.color, borderColor: ruta.color }}
            >
              {punto.tipo}
            </span>
            <span className="inline-block rounded-full border border-gray-300 bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
              🕐 {punto.horario}
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600">{punto.info}</p>
        </div>
      </div>
    </div>
  );
}

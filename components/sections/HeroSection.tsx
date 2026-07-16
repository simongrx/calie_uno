'use client';

import React, { useEffect, useRef } from 'react';

/* ============================================================
   HERO — Scroll-scrubbing (secuencia de frames del Cristo Rey)
   ------------------------------------------------------------
   • En reposo (sin scroll) se ve un VIDEO en loop (cielo/nubes).
   • Al scrollear hace crossfade a los FRAMES estáticos, que se
     mapean 1:1 con la posición del scroll (no se reproduce solo).
   • Luz cálida que sigue el cursor + logo con flotación sutil.
   ============================================================ */

const FRAME_COUNT = 120;
// 👉 Carpeta pública con los 120 frames:
const FRAME_DIR = '/images/hero/cristo';
// 👉 Video en loop del primer plano (misma toma, cámara fija). '' para desactivar.
const VIDEO_SRC = '/videos/cristo-rest-loop.mp4';

const framePath = (i: number) =>
  `${FRAME_DIR}/frame_${String(i).padStart(3, '0')}.jpg`;

const IW = 1280;
const IH = 720;

export const HeroSection: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d', { alpha: false })!;
    const track = trackRef.current!;
    const stageEl = rootRef.current!.querySelector<HTMLElement>('.stage')!;
    const stages = Array.from(
      rootRef.current!.querySelectorAll<HTMLElement>('.hl')
    );

    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let loaded = 0;
    let ready = false;
    let raf = 0;
    let cw = 0;
    let ch = 0;
    let displayed = 0;
    let lastDrawn = -1;

    // Luz que sigue el cursor
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tgx = gx;
    let tgy = gy;

    // Bloquea el scroll mientras precargan los frames
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cw = Math.round(window.innerWidth * dpr);
      ch = Math.round(window.innerHeight * dpr);
      canvas.width = cw;
      canvas.height = ch;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      drawFrame(Math.round(displayed), true);
    }

    function drawCover(img: HTMLImageElement) {
      if (!img || !img.complete) return;
      const scale = Math.max(cw / IW, ch / IH);
      const dw = IW * scale;
      const dh = IH * scale;
      ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
    }

    function drawFrame(idx: number, force = false) {
      idx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
      if (idx === lastDrawn && !force) return;
      const img = images[idx];
      if (img && img.complete) {
        drawCover(img);
        lastDrawn = idx;
      }
    }

    const ss = (e0: number, e1: number, x: number) => {
      const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
      return t * t * (3 - 2 * t);
    };

    function progress() {
      const d = track.offsetHeight - window.innerHeight;
      if (d <= 0) return 0;
      const top = track.getBoundingClientRect().top;
      return Math.max(0, Math.min(1, -top / d));
    }

    function updateOverlay(p: number) {
      const o0 = ss(0, 0.06, p) * (1 - ss(0.34, 0.46, p));
      const o1 = ss(0.34, 0.46, p) * (1 - ss(0.66, 0.78, p));
      const o2 = ss(0.66, 0.78, p);
      const ops = [o0, o1, o2];
      stages.forEach((el, i) => {
        el.style.opacity = ops[i].toFixed(3);
        el.style.transform = `translateY(${((1 - ops[i]) * 8).toFixed(2)}px)`;
      });

      const c = ss(0.74, 0.92, p);
      const cta = ctaRef.current;
      if (cta) {
        cta.style.opacity = c.toFixed(3);
        cta.style.transform = `translateX(-50%) translateY(${((1 - c) * 18).toFixed(1)}px)`;
        cta.style.pointerEvents = c > 0.5 ? 'auto' : 'none';
      }
      if (hintRef.current)
        hintRef.current.style.opacity = (1 - ss(0, 0.1, p)).toFixed(3);
      if (outroRef.current)
        outroRef.current.style.opacity = (ss(0.9, 1, p) * 0.55).toFixed(3);

      // Crossfade video(reposo) ↔ frames(scroll)
      const v = videoRef.current;
      if (v && v.src) {
        const vis = 1 - ss(0, 0.05, p);
        v.style.opacity = vis.toFixed(3);
        if (vis > 0.02) {
          if (v.paused) v.play().catch(() => {});
        } else if (!v.paused) {
          v.pause();
        }
      }
    }

    function tick() {
      const p = progress();
      const target = p * (FRAME_COUNT - 1);
      displayed += (target - displayed) * 0.2;
      if (Math.abs(target - displayed) < 0.01) displayed = target;
      drawFrame(Math.round(displayed));
      updateOverlay(p);

      // Luz: lerp hacia el cursor
      gx += (tgx - gx) * 0.12;
      gy += (tgy - gy) * 0.12;
      if (glowRef.current)
        glowRef.current.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;

      raf = requestAnimationFrame(tick);
    }

    function bump() {
      loaded++;
      const pc = Math.round((loaded / FRAME_COUNT) * 100);
      if (barRef.current) barRef.current.style.width = pc + '%';
      if (pctRef.current) pctRef.current.textContent = 'Cargando ' + pc + '%';
      if (loaded >= FRAME_COUNT && !ready) {
        ready = true;
        resize();
        drawFrame(0, true);
        requestAnimationFrame(() => {
          loaderRef.current?.classList.add('hide');
          document.body.style.overflow = prevOverflow;
        });
      }
    }

    function load(i: number) {
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (i === 0 && lastDrawn < 0) {
          resize();
          drawFrame(0, true);
        }
        bump();
      };
      img.onerror = bump;
      img.src = framePath(i);
      images[i] = img;
    }

    // Pointer (luz)
    const onMove = (e: PointerEvent) => {
      tgx = e.clientX;
      tgy = e.clientY;
      if (glowRef.current) glowRef.current.style.opacity = '1';
    };
    const onLeave = () => {
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };
    stageEl.addEventListener('pointermove', onMove, { passive: true });
    stageEl.addEventListener('pointerleave', onLeave);

    window.addEventListener('resize', resize);
    resize();
    if (videoRef.current) videoRef.current.play().catch(() => {});
    for (let i = 0; i < FRAME_COUNT; i++) load(i);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      stageEl.removeEventListener('pointermove', onMove);
      stageEl.removeEventListener('pointerleave', onLeave);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div className="cristo-hero" ref={rootRef}>
      <style>{CSS}</style>

      {/* LOADER */}
      <div className="loader" ref={loaderRef}>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20CaliE-OCQi041dgJdYAvK07Eyaa6DieRdlH5.png"
          alt="Cali Enamora"
        />
        <div className="bar">
          <i ref={barRef} />
        </div>
        <div className="pct" ref={pctRef}>
          Cargando 0%
        </div>
      </div>

      {/* HERO */}
      <div className="scroll-track" ref={trackRef} id="inicio">
        <div className="stage">
          <canvas className="seq" ref={canvasRef} />
          {VIDEO_SRC ? (
            <video
              className="restvideo"
              ref={videoRef}
              src={VIDEO_SRC}
              muted
              loop
              playsInline
              preload="auto"
            />
          ) : null}
          <div className="scrim" />
          <div className="vignette" />
          <div className="cursor-glow" ref={glowRef} />
          <div className="outro" ref={outroRef} />

          <div className="overlay">
            {/* Grupo inferior: título dinámico (arriba) + logo (3ª franja) */}
            <div className="lowergroup">
              <div className="headlines">
                <div className="hl">
                  <div className="word">Descubre Cali</div>
                </div>
                <div className="hl">
                  <div className="word">Vive el Valle</div>
                </div>
                <div className="hl">
                  <div className="word">Enamórate</div>
                </div>
              </div>
              <div className="wordmark">
                <div className="l1">Cali Enamora</div>
                <div className="l2">y nuestro valle también</div>
              </div>
            </div>

            {/* CTA */}
            <div className="cta" ref={ctaRef}>
              <a className="btn btn-primary" href="/turista">
                Explora nuestras rutas
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a className="btn btn-secondary" href="/eventos">
                Ver eventos
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Flecha de scroll */}
          <div className="scroll-hint" ref={hintRef}>
            <span>Scroll</span>
            <svg className="chev" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <svg className="chev b" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

/* ============================================================
   CSS del componente (scoped bajo .cristo-hero)
   ============================================================ */
const CSS = `
.cristo-hero{
  --navy:#0A1636; --orange:#FF2900; --yellow:#FBBF24;
  --scrub:165vh;            /* largo del scrub ≈ 1.5 pantallas */
  /* Sube el hero bajo el header (sticky, transparente) para que la imagen
     llene desde el borde superior y no quede una franja navy arriba.
     ≈ altura del header sin scroll: h-18 (4.5rem) + py-3 (1.5rem). */
  margin-top:-6rem;
}
.cristo-hero .scroll-track{
  position:relative; height:calc(100vh + var(--scrub)); background:var(--navy);
}
.cristo-hero .stage{
  position:sticky; top:0; height:100vh; width:100%; overflow:hidden; background:var(--navy);
}
.cristo-hero .seq{ position:absolute; inset:0; width:100%; height:100%; display:block; z-index:0; }

/* Video del primer frame (loop) — visible solo en reposo */
.cristo-hero .restvideo{
  position:absolute; inset:0; width:100%; height:100%;
  object-fit:cover; display:block; z-index:1; opacity:0; pointer-events:none; will-change:opacity;
}

.cristo-hero .scrim{
  position:absolute; inset:0; pointer-events:none; z-index:2;
  background:linear-gradient(to bottom, rgba(10,22,54,.55) 0%, rgba(10,22,54,0) 24%, rgba(10,22,54,0) 50%, rgba(10,22,54,.40) 78%, rgba(10,22,54,.88) 100%);
}
.cristo-hero .vignette{
  position:absolute; inset:0; pointer-events:none; z-index:2;
  background:radial-gradient(120% 90% at 50% 42%, rgba(0,0,0,0) 55%, rgba(7,15,38,.45) 100%);
}
/* Luz cálida que sigue al cursor por encima del fondo */
.cristo-hero .cursor-glow{
  position:absolute; top:0; left:0;
  width:62vmax; height:62vmax; margin:-31vmax 0 0 -31vmax;
  pointer-events:none; z-index:2; opacity:0;
  mix-blend-mode:screen; transition:opacity .6s ease; will-change:transform,opacity;
  background:radial-gradient(circle at center,
    rgba(255,196,120,.26) 0%, rgba(255,138,54,.14) 30%, rgba(255,110,40,.05) 52%, rgba(255,110,40,0) 68%);
}
.cristo-hero .outro{ position:absolute; inset:0; pointer-events:none; z-index:3; background:var(--navy); opacity:0; }

.cristo-hero .overlay{ position:absolute; inset:0; z-index:4; pointer-events:none; }

.cristo-hero .lowergroup{
  position:absolute; left:50%; top:50%; transform:translateX(-50%);
  width:min(92vw,1100px);
  display:flex; flex-direction:column; align-items:center; gap:clamp(8px,1.7vh,20px);
}
.cristo-hero .headlines{ position:relative; width:100%; height:clamp(44px,7vh,84px); text-align:center; }
.cristo-hero .hl{
  position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
  opacity:0; will-change:opacity,transform;
}
.cristo-hero .hl .word{
  font-family:'CaliEnamora','DM Sans',cursive; font-weight:400; line-height:.88;
  font-size:clamp(28px,5vw,64px);
  background:linear-gradient(135deg,#FF2900 0%,#FBBF24 100%);
  -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent;
  filter:drop-shadow(0 5px 22px rgba(0,0,0,.45)); padding:0 .06em .10em;
}
.cristo-hero .wordmark{
  display:flex; flex-direction:column; align-items:center; text-align:center; line-height:.80; color:#fff;
  animation:ceh-logofloat 3.6s ease-in-out infinite;
}
@keyframes ceh-logofloat{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-12px); } }
.cristo-hero .wordmark .l1{
  font-family:'CaliEnamora','DM Sans',cursive; font-size:clamp(50px,9.5vw,138px); letter-spacing:.005em;
  filter:drop-shadow(0 8px 30px rgba(0,0,0,.55)) drop-shadow(0 2px 6px rgba(0,0,0,.4));
}
.cristo-hero .wordmark .l2{
  font-family:'CaliEnamora','DM Sans',cursive; font-size:clamp(25px,4.7vw,66px);
  margin-top:.02em; letter-spacing:.02em;
  filter:drop-shadow(0 6px 22px rgba(0,0,0,.55)) drop-shadow(0 2px 6px rgba(0,0,0,.4));
}

.cristo-hero .cta{
  position:absolute; left:50%; bottom:clamp(74px,13vh,128px); transform:translateX(-50%);
  display:flex; gap:18px; flex-wrap:wrap; justify-content:center;
  opacity:0; will-change:opacity,transform; pointer-events:none;
}
.cristo-hero .btn{
  pointer-events:auto; display:inline-flex; align-items:center; gap:.55em;
  padding:13px 26px; border-radius:9999px;
  font-family:'DM Sans',sans-serif; font-weight:600; font-size:clamp(14px,1.15vw,16.5px);
  color:#fff; text-decoration:none; cursor:pointer;
  backdrop-filter:blur(12px); -webkit-backdrop-filter:blur(12px);
  transition:transform .25s ease, background .25s ease, border-color .25s ease, box-shadow .25s ease;
}
.cristo-hero .btn svg{ width:1.05em; height:1.05em; }
.cristo-hero .btn-primary{ background:rgba(255,41,0,.24); border:1px solid rgba(255,41,0,.5); box-shadow:0 10px 30px rgba(255,41,0,.18), inset 0 1px 0 rgba(255,255,255,.12); }
.cristo-hero .btn-primary:hover{ transform:translateY(-3px); background:rgba(255,41,0,.34); border-color:rgba(255,41,0,.72); box-shadow:0 14px 38px rgba(255,41,0,.3); }
.cristo-hero .btn-secondary{ background:rgba(255,255,255,.09); border:1px solid rgba(255,255,255,.22); box-shadow:0 10px 30px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.1); }
.cristo-hero .btn-secondary:hover{ transform:translateY(-3px); background:rgba(255,255,255,.15); border-color:rgba(255,255,255,.36); }

.cristo-hero .scroll-hint{
  position:absolute; left:50%; bottom:30px; transform:translateX(-50%);
  display:flex; flex-direction:column; align-items:center; gap:6px; will-change:opacity; z-index:5;
}
.cristo-hero .scroll-hint span{
  font-size:11px; letter-spacing:.34em; text-transform:uppercase; font-weight:500;
  color:rgba(255,255,255,.55); text-shadow:0 2px 8px rgba(0,0,0,.6); padding-left:.34em;
}
.cristo-hero .scroll-hint .chev{ width:24px; height:24px; color:rgba(255,255,255,.6); animation:ceh-bob 1.3s ease-in-out infinite; }
.cristo-hero .scroll-hint .chev.b{ margin-top:-16px; color:rgba(255,255,255,.3); animation-delay:.16s; }
@keyframes ceh-bob{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(9px); } }

.cristo-hero .loader{
  position:fixed; inset:0; z-index:50;
  background:radial-gradient(120% 120% at 50% 35%, #122050 0%, #0A1636 60%);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:30px;
  transition:opacity .7s ease;
}
.cristo-hero .loader.hide{ opacity:0; pointer-events:none; }
.cristo-hero .loader img{ height:96px; width:auto; filter:drop-shadow(0 8px 30px rgba(0,0,0,.5)); animation:ceh-float 3s ease-in-out infinite; }
@keyframes ceh-float{ 0%,100%{ transform:translateY(0); } 50%{ transform:translateY(-9px); } }
.cristo-hero .bar{ width:min(280px,62vw); height:3px; border-radius:99px; background:rgba(255,255,255,.12); overflow:hidden; }
.cristo-hero .bar > i{ display:block; height:100%; width:0%; background:linear-gradient(90deg,#FF2900,#FBBF24); border-radius:99px; transition:width .2s ease; }
.cristo-hero .pct{ font-size:12px; letter-spacing:.34em; text-transform:uppercase; color:rgba(255,255,255,.6); font-weight:500; }

@media (prefers-reduced-motion: reduce){
  .cristo-hero .scroll-hint .chev{ animation:none; }
  .cristo-hero .loader img{ animation:none; }
  .cristo-hero .wordmark{ animation:none; }
}
`;

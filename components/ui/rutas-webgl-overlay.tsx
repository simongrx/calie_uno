'use client';

import React, { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Shader procedural: vetas de luz (fbm) en colores de marca, cuya intensidad
// crece con la velocidad de scroll (uInt). Salida aditiva (alpha = glow).
const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;
uniform float uInt;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.0 + vec2(3.1, 1.7); a *= 0.5; }
  return v;
}
void main(){
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 q = uv; q.x *= uRes.x / uRes.y;
  float t = uTime * 0.05;
  float n = fbm(q * 2.6 + vec2(t * 1.2, -t) + fbm(q * 1.8 - t * 0.6) * 0.8);
  float streak = smoothstep(0.58, 0.98, n);
  vec3 col = mix(vec3(1.0, 0.16, 0.0), vec3(1.0, 0.75, 0.14), clamp(n, 0.0, 1.0));
  float intensity = 0.16 + uInt * 1.5;
  float glow = streak * intensity;
  gl_FragColor = vec4(col * glow, glow * 0.85);
}
`;

/**
 * Capa WebGL (sin dependencias 3D): un shader procedural de luz que reacciona a
 * la velocidad de scroll. Se compone sobre las imágenes con mix-blend-screen.
 * Si el contexto WebGL no está disponible o el shader falla, se oculta solo.
 */
export function RutasWebGLOverlay({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false,
      antialias: true,
    }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    if (!gl) {
      canvas.style.display = 'none';
      return;
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('WebGL shader error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      canvas.style.display = 'none';
      return;
    }

    const prog = gl.createProgram();
    if (!prog) {
      canvas.style.display = 'none';
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      canvas.style.display = 'none';
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uInt = gl.getUniformLocation(prog, 'uInt');

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = canvas.clientWidth || 1;
      const h = canvas.clientHeight || 1;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const start = performance.now();

    const draw = (time: number, intensity: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform1f(uInt, intensity);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // Reduced motion: un solo frame estático y sin reaccionar al scroll.
    if (reduce) {
      draw(0, 0.12);
      return () => ro.disconnect();
    }

    let lastScroll = window.scrollY;
    let target = 0;
    let intensity = 0;
    let raf = 0;

    const onScroll = () => {
      const y = window.scrollY;
      target = Math.min(1, target + Math.abs(y - lastScroll) * 0.012);
      lastScroll = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      intensity += (target - intensity) * 0.08;
      target *= 0.92;
      draw((now - start) / 1000, intensity);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}

export default RutasWebGLOverlay;

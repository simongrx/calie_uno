// ============================================
// GALERÍA PARALLAX — escaneo de /public/images
// Server-only (usa fs): impórtalo solo desde Server Components.
// Devuelve una selección ALEATORIA (por build) de imágenes reales del
// proyecto para alimentar el Hero Parallax de la home.
// ============================================
import fs from 'fs';
import path from 'path';

export interface ParallaxItem {
  title: string;
  link: string;
  thumbnail: string; // URL pública: /images/<carpeta>/<archivo>
}

const IMAGES_ROOT = path.join(process.cwd(), 'public', 'images');
// hero = 127 frames del Cristo Rey; avatares/logos vacías; aliados = logos
// (recortados a pantalla completa se verían estirados, no son fotos escénicas).
const EXCLUDE_TOP = new Set(['hero', 'avatares', 'logos', 'aliados']);
const EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// carpeta (o subcarpeta más específica) -> etiqueta + ruta del módulo
const CATEGORIA: Record<string, { label: string; link: string }> = {
  rutas: { label: 'Rutas turísticas', link: '/rutas' },
  restaurantes: { label: 'Sabores del Valle', link: '/sabores' },
  eventos: { label: 'Eventos', link: '/eventos' },
  aliados: { label: 'Nuestros aliados', link: '/aliados' },
  pilares: { label: 'Los 4 pilares', link: '/pilares' },
  testimonios: { label: 'Historias', link: '/nosotros' },
  galeria: { label: 'Valle del Cauca', link: '/nosotros' },
  // subcarpetas de galeria/
  cultura: { label: 'Cultura', link: '/pilares' },
  naturaleza: { label: 'Naturaleza', link: '/pilares' },
  gastronomia: { label: 'Gastronomía', link: '/pilares' },
  bienestar: { label: 'Bienestar', link: '/pilares' },
};

type WalkResult = { rel: string[] };

function walk(dir: string, rel: string[] = []): WalkResult[] {
  let out: WalkResult[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      out = out.concat(walk(path.join(dir, entry.name), [...rel, entry.name]));
    } else if (EXT.has(path.extname(entry.name).toLowerCase())) {
      out.push({ rel: [...rel, entry.name] });
    }
  }
  return out;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Devuelve `n` imágenes aleatorias del proyecto (mezcladas entre carpetas),
 * cada una etiquetada y enlazada a su módulo. Se ejecuta en build (home estática),
 * así que la selección cambia en cada despliegue.
 */
export function getParallaxImagenes(n = 15): ParallaxItem[] {
  let files: WalkResult[] = [];
  try {
    files = walk(IMAGES_ROOT).filter((f) => !EXCLUDE_TOP.has(f.rel[0]));
  } catch {
    return [];
  }
  if (files.length === 0) return [];

  const items: ParallaxItem[] = files.map((f) => {
    const segs = f.rel.slice(0, -1); // segmentos de carpeta (sin el archivo)
    const cat =
      CATEGORIA[segs[segs.length - 1]] ||
      CATEGORIA[segs[0]] || { label: 'Valle del Cauca', link: '/' };
    const thumbnail = '/images/' + f.rel.map(encodeURIComponent).join('/');
    return { title: cat.label, link: cat.link, thumbnail };
  });

  const shuffled = shuffle(items);
  const picked = shuffled.slice(0, n);
  // si hubiera menos de n imágenes, completa repitiendo (no debería pasar)
  while (picked.length < n) picked.push(shuffled[picked.length % shuffled.length]);
  return picked;
}

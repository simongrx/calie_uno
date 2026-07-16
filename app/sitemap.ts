import type { MetadataRoute } from 'next';
import { getRutaSlugs, getEventoSlugs, getRestauranteSlugs } from '@/lib/data';

const BASE_URL = 'https://calienamora.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas estáticas
  const staticPaths = [
    '',
    '/turista',
    '/corporativa',
    '/rutas',
    '/mapa',
    '/eventos',
    '/sabores',
    '/pilares',
    '/academia',
    '/aliados',
    '/nosotros',
    '/contacto',
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.8,
  }));

  // Detalles dinámicos (SSG)
  const rutaEntries: MetadataRoute.Sitemap = getRutaSlugs().map((slug) => ({
    url: `${BASE_URL}/rutas/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const eventoEntries: MetadataRoute.Sitemap = getEventoSlugs().map((slug) => ({
    url: `${BASE_URL}/eventos/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const saborEntries: MetadataRoute.Sitemap = getRestauranteSlugs().map((slug) => ({
    url: `${BASE_URL}/sabores/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...rutaEntries, ...eventoEntries, ...saborEntries];
}

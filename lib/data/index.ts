/**
 * Capa de acceso a datos (facade).
 *
 * Los componentes y páginas importan SIEMPRE desde aquí (`@/lib/data`), nunca
 * directamente de `data/*`. Así, en Fase 2, podemos reemplazar el cuerpo de estos
 * getters por llamadas a una API/DB (Supabase/Prisma) sin tocar la UI.
 *
 * Por ahora los `slug` de las URLs usan el `id` de cada entidad (ya son
 * URL-friendly: 'historica-centro', 'pacifico-cali', etc.).
 */
import { rutas } from '@/data/rutas';
import { eventos } from '@/data/eventos';
import { restaurantes, planesExperiencia } from '@/data/restaurantes';
import { aliados } from '@/data/aliados';
import { testimonios } from '@/data/testimonios';
import { merchandising } from '@/data/merchandising';
import type {
  Ruta,
  Evento,
  Restaurante,
  PlanExperiencia,
  Aliado,
  Testimonio,
  Producto,
  PilarType,
} from '@/types';

/* ---------------- Rutas ---------------- */
export const getRutas = (): Ruta[] => rutas;
export const getRutaBySlug = (slug: string): Ruta | undefined =>
  rutas.find((r) => r.id === slug);
export const getRutasByPilar = (pilar: PilarType): Ruta[] =>
  rutas.filter((r) => r.pilar === pilar);
export const getRutasDestacadas = (n = 4): Ruta[] => rutas.slice(0, n);
export const getRutaSlugs = (): string[] => rutas.map((r) => r.id);

/* ---------------- Eventos ---------------- */
export const getEventos = (): Evento[] => eventos;
export const getEventoBySlug = (slug: string): Evento | undefined =>
  eventos.find((e) => e.id === slug);
export const getEventosEnVivo = (): Evento[] => eventos.filter((e) => e.enVivo);
export const getProximosEventos = (): Evento[] => eventos.filter((e) => !e.enVivo);
export const getEventoSlugs = (): string[] => eventos.map((e) => e.id);

/* ---------------- Sabores (restaurantes + planes) ---------------- */
export const getRestaurantes = (): Restaurante[] => restaurantes;
export const getRestauranteBySlug = (slug: string): Restaurante | undefined =>
  restaurantes.find((r) => r.id === slug);
export const getRestaurantesByRating = (min: number): Restaurante[] =>
  restaurantes.filter((r) => r.rating >= min);
export const getRestauranteSlugs = (): string[] => restaurantes.map((r) => r.id);
export const getPlanes = (): PlanExperiencia[] => planesExperiencia;

/* ---------------- Aliados ---------------- */
export const getAliados = (): Aliado[] => aliados;

/* ---------------- Testimonios ---------------- */
export const getTestimonios = (): Testimonio[] => testimonios;

/* ---------------- Merchandising (vitrina placeholder) ---------------- */
export const getMerchandising = (): Producto[] => merchandising;
export const getMerchandisingDestacados = (): Producto[] =>
  merchandising.filter((p) => p.destacado);
export const getMerchandisingSlugs = (): string[] => merchandising.map((p) => p.id);

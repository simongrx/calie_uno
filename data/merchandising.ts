import type { Producto } from '@/types';

/**
 * Catálogo de merchandising — DATOS PLACEHOLDER.
 * Reemplaza nombres, precios e imágenes por los productos reales.
 * Las imágenes usan fotos existentes del proyecto como marcador temporal.
 */
export const merchandising: Producto[] = [
  {
    id: 'camiseta-cali-e',
    nombre: 'Camiseta Cali Enamora',
    descripcion: 'Algodón orgánico con el wordmark de marca. Hecha en el Valle.',
    precio: 79000,
    categoria: 'ropa',
    imagen: '/images/galeria/cultura/foto-1.webp',
    destacado: true,
  },
  {
    id: 'gorra-pacifico',
    nombre: 'Gorra Pacífico',
    descripcion: 'Gorra bordada inspirada en los colores del Petronio.',
    precio: 55000,
    categoria: 'accesorios',
    imagen: '/images/galeria/cultura/foto-2.webp',
  },
  {
    id: 'mug-cerro',
    nombre: 'Mug Cristo Rey',
    descripcion: 'Taza de cerámica con la silueta del cerro más icónico de Cali.',
    precio: 42000,
    categoria: 'hogar',
    imagen: '/images/galeria/naturaleza/foto-1.webp',
    destacado: true,
  },
  {
    id: 'tote-bag-valle',
    nombre: 'Tote Bag Valle Verde',
    descripcion: 'Bolsa de lona reutilizable con arte del paisaje vallecaucano.',
    precio: 48000,
    categoria: 'accesorios',
    imagen: '/images/galeria/naturaleza/foto-3.webp',
  },
  {
    id: 'libreta-rutas',
    nombre: 'Libreta de Rutas',
    descripcion: 'Cuaderno de viaje para registrar tus experiencias en la región.',
    precio: 38000,
    categoria: 'souvenirs',
    imagen: '/images/galeria/cultura/foto-4.webp',
  },
  {
    id: 'termo-bienestar',
    nombre: 'Termo Bienestar',
    descripcion: 'Botella térmica de acero para tus recorridos de naturaleza.',
    precio: 89000,
    categoria: 'hogar',
    imagen: '/images/galeria/bienestar/foto-2.webp',
  },
  {
    id: 'pin-salsa',
    nombre: 'Pin Capital de la Salsa',
    descripcion: 'Pin esmaltado coleccionable. Perfecto para tu mochila.',
    precio: 22000,
    categoria: 'souvenirs',
    imagen: '/images/galeria/cultura/foto-5.webp',
    agotado: true,
  },
  {
    id: 'hoodie-enamora',
    nombre: 'Hoodie Enamora',
    descripcion: 'Buzo unisex de algodón felpado, edición limitada.',
    precio: 149000,
    categoria: 'ropa',
    imagen: '/images/galeria/gastronomia/foto-3.webp',
    destacado: true,
  },
];

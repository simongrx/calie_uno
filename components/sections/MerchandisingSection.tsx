'use client';

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { getMerchandising } from '@/lib/data';
import type { CategoriaProducto } from '@/types';

const glassCard: React.CSSProperties = {
  background: 'rgba(10, 22, 54, 0.55)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' } },
};

const categoriaLabel: Record<CategoriaProducto, string> = {
  ropa: 'Ropa',
  accesorios: 'Accesorios',
  souvenirs: 'Souvenirs',
  hogar: 'Hogar',
};

const formatoCOP = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

/**
 * Vitrina de merchandising (showcase). Datos placeholder desde @/lib/data.
 * Sin carrito ni pagos: cada producto invita a contacto para reservar/comprar.
 */
export const MerchandisingSection: React.FC = () => {
  const productos = getMerchandising();

  return (
    <section id="merchandising" className="section bg-transparent relative overflow-hidden">
      <div className="container-custom relative z-10">
        <SectionTitle
          titulo="Merchandising"
          subtitulo="Llévate un pedazo de Cali Enamora: productos hechos en el Valle que apoyan a las comunidades locales"
          alineacion="center"
          conLinea={true}
          className="mb-10 sm:mb-14"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {productos.map((producto) => (
            <motion.article
              key={producto.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="spotlight-card group flex flex-col overflow-hidden rounded-3xl"
              style={glassCard}
            >
              {/* Imagen */}
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={producto.imagen}
                  alt={producto.nombre}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                    style={{ background: 'rgba(10,22,54,0.7)', backdropFilter: 'blur(8px)' }}
                  >
                    {categoriaLabel[producto.categoria]}
                  </span>
                  {producto.destacado && (
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white"
                      style={{ background: 'rgba(255,41,0,0.85)' }}
                    >
                      Destacado
                    </span>
                  )}
                </div>
                {producto.agotado && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <span className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
                      Agotado
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-base font-bold text-white">{producto.nombre}</h3>
                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-white">
                  {producto.descripcion}
                </p>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="text-gradient-brand text-lg font-extrabold">
                    {formatoCOP.format(producto.precio)}
                  </span>
                  <a
                    href="/contacto"
                    aria-disabled={producto.agotado}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                      producto.agotado
                        ? 'pointer-events-none cursor-not-allowed text-white/40'
                        : 'text-white hover:brightness-110'
                    }`}
                    style={{
                      background: producto.agotado
                        ? 'rgba(255,255,255,0.06)'
                        : 'linear-gradient(135deg, rgba(255, 41, 0,0.9), rgba(204, 33, 0,0.9))',
                      boxShadow: producto.agotado ? 'none' : '0 6px 20px rgba(255, 41, 0,0.22)',
                    }}
                  >
                    {producto.agotado ? 'No disponible' : 'Lo quiero'}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-xs text-white/40">
          Tienda en línea próximamente · escríbenos para reservar tu pedido
        </p>
      </div>
    </section>
  );
};

export default MerchandisingSection;

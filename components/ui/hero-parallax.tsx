'use client';

import React from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export interface ParallaxProduct {
  title: string;
  link: string;
  thumbnail: string;
}

/**
 * Hero Parallax (estilo Aceternity) adaptado a la marca Cali Enamora.
 * Tres filas de imágenes reales del proyecto que se desplazan en sentidos
 * opuestos según el scroll; el bloque completo entra con rotación/opacidad.
 * Ocupa ~300vh: al terminar de recorrerlo, sigue la sección de Pilares.
 */
export const HeroParallax = ({ products }: { products: ParallaxProduct[] }) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 150]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[210vh] flex-col self-auto overflow-hidden pb-0 pt-20 antialiased [perspective:1000px] [transform-style:preserve-3d] sm:pt-28"
    >
      <Header />
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="will-change-transform"
      >
        <motion.div className="mb-16 flex flex-row-reverse space-x-12 space-x-reverse sm:mb-20 sm:space-x-20">
          {firstRow.map((product, i) => (
            <ProductCard product={product} translate={translateX} key={`r1-${i}`} />
          ))}
        </motion.div>
        <motion.div className="mb-16 flex flex-row space-x-12 sm:mb-20 sm:space-x-20">
          {secondRow.map((product, i) => (
            <ProductCard product={product} translate={translateXReverse} key={`r2-${i}`} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-12 space-x-reverse sm:space-x-20">
          {thirdRow.map((product, i) => (
            <ProductCard product={product} translate={translateX} key={`r3-${i}`} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="container-custom relative left-0 top-0 mx-auto w-full py-16 sm:py-24">
      <span
        className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/80"
        style={{
          background: 'rgba(255, 41, 0, 0.18)',
          border: '1px solid rgba(255, 41, 0, 0.4)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        ✦ Una postal viva
      </span>
      <h2
        className="text-4xl text-brand-orange sm:text-6xl lg:text-7xl"
        style={{ fontFamily: "'CaliEnamora', cursive", fontWeight: 400 }}
      >
        El Valle del Cauca, <br /> en imágenes
      </h2>
      <p className="mt-6 max-w-2xl text-base text-white/65 sm:mt-8 sm:text-xl">
        Cultura, naturaleza, sabores y bienestar: un recorrido visual por las
        experiencias que enamoran de Cali y su región. Desliza para descubrirlas
        y entra a conocer nuestros cuatro pilares.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: ParallaxProduct;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -20 }}
      className="group/product relative h-72 w-[22rem] flex-shrink-0 overflow-hidden rounded-2xl sm:h-96 sm:w-[30rem]"
    >
      <Link href={product.link} className="block">
        <Image
          src={product.thumbnail}
          height={600}
          width={600}
          sizes="(max-width: 640px) 22rem, 30rem"
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover/product:scale-105"
          alt={product.title}
        />
      </Link>
    </motion.div>
  );
};

export default HeroParallax;

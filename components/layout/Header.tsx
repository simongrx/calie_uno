'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Rutas', href: '#rutas' },
    { label: 'Eventos', href: '#eventos' },
    { label: 'Galería', href: '#galeria' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Aliados', href: '#aliados' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);

    const element = document.querySelector(href);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 backdrop-blur-2xl bg-[#071229]/75 border-b border-white/10'
          : 'py-3 backdrop-blur-xl bg-[#071229]/55 border-b border-white/5'
      }`}
    >
      <div className="container-custom">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-14' : 'h-18'
          }`}
        >
          {/* LOGO */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20CaliE-OCQi041dgJdYAvK07Eyaa6DieRdlH5.png"
                alt="Cali Enamora Logo"
                width={60}
                height={30}
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? 'h-8' : 'h-10 sm:h-11'
                }`}
                priority
              />

              <span
                className={`hidden sm:inline font-semibold text-white tracking-wide transition-all duration-500 ${
                  isScrolled ? 'text-sm' : 'text-base'
                }`}
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                Cali Enamora
              </span>
            </Link>
          </motion.div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-3">
            {navigationItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                whileHover={{
                  y: -2,
                  scale: 1.03,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className={`
                  relative
                  px-7
                  py-3.5
                  rounded-2xl
                  text-white/80
                  hover:text-white
                  transition-all
                  duration-300
                  border
                  border-white/10
                  hover:border-orange-400/40
                  overflow-hidden
                  group
                  ${
                    isScrolled
                      ? 'text-xs'
                      : 'text-base'
                  }
                `}
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 18px rgba(0,0,0,0.18)',
                }}
              >
                {/* brillo interno */}
                <span
                  className="
                    absolute
                    inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-300
                    bg-gradient-to-r
                    from-orange-400/10
                    to-yellow-300/10
                  "
                />

                {/* borde glow */}
                <span
                  className="
                    absolute
                    inset-0
                    rounded-2xl
                    border
                    border-white/5
                    group-hover:border-orange-300/20
                    transition-all
                    duration-300
                  "
                />

                {/* texto */}
                <span className="relative z-10">
                  {item.label}
                </span>

                {/* línea inferior */}
                <span
                  className="
                    absolute
                    bottom-1.5
                    left-1/2
                    -translate-x-1/2
                    w-0
                    h-[2px]
                    rounded-full
                    bg-gradient-to-r
                    from-orange-400
                    to-yellow-300
                    group-hover:w-3/4
                    transition-all
                    duration-300
                  "
                />
              </motion.button>
            ))}
          </nav>

          {/* CTA DESKTOP */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="#contacto"
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className={`
                inline-flex
                items-center
                gap-2
                rounded-2xl
                font-semibold
                text-white
                transition-all
                duration-300
                border
                border-orange-300/30
                hover:border-orange-300/50
                ${
                  isScrolled
                    ? 'px-5 py-2 text-xs'
                    : 'px-6 py-3 text-sm'
                }
              `}
              style={{
                background:
                  'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,0.9))',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 8px 30px rgba(249,115,22,0.25)',
              }}
            >
              <span>Contáctanos</span>

              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.a>
          </div>

          {/* MOBILE BUTTON */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
            className="
              lg:hidden
              p-3
              rounded-2xl
              text-white
              border
              border-white/10
            "
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
            aria-label="Menú"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.svg
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* MOBILE NAVIGATION */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="lg:hidden overflow-hidden pt-4"
            >
              <div className="flex flex-col gap-3 pb-4">
                {navigationItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleNavClick(item.href)}
                    className="
                      w-full
                      text-left
                      px-5
                      py-3
                      rounded-2xl
                      text-sm
                      font-medium
                      text-white/80
                      hover:text-white
                      border
                      border-white/10
                      transition-all
                      duration-300
                    "
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      background: 'rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}

                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: navigationItems.length * 0.05,
                  }}
                  href="#contacto"
                  onClick={() => setIsOpen(false)}
                  className="
                    mt-2
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(249,115,22,0.9), rgba(234,88,12,0.9))',
                    boxShadow:
                      '0 8px 30px rgba(249,115,22,0.25)',
                  }}
                >
                  Contáctanos
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
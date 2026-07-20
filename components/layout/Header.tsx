'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

type NavLeaf = { label: string; href: string };
type NavNode = NavLeaf | { label: string; children: NavLeaf[] };

const isLeaf = (node: NavNode): node is NavLeaf => 'href' in node;

// Estructura agrupada por audiencia: Turista vs. Corporativa.
const navTree: NavNode[] = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Turista',
    children: [
      { label: 'Ver todo', href: '/turista' },
      { label: 'Rutas', href: '/rutas' },
      { label: 'Mapa', href: '/mapa' },
      { label: 'Sabores', href: '/sabores' },
      { label: 'Eventos', href: '/eventos' },
      { label: 'Merchandising', href: '/turista#merchandising' },
    ],
  },
  {
    label: 'Hacer parte',
    children: [
      { label: 'Ver todo', href: '/corporativa' },
      { label: 'Nosotros', href: '/nosotros' },
      { label: 'Academia', href: '/academia' },
      { label: 'Aliados', href: '/aliados' },
      { label: 'Donar', href: '/corporativa#donar' },
    ],
  },
];

const leafBtnStyle: React.CSSProperties = {
  fontFamily: 'DM Sans, sans-serif',
  background: 'rgba(255,255,255,0.08)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 4px 18px rgba(0,0,0,0.18)',
};

const dropdownPanelStyle: React.CSSProperties = {
  background: 'rgba(10, 22, 54, 0.72)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.14)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.4)',
};

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null); // dropdown desktop (hover)
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setOpenGroup(null);
    setOpenMobileGroup(null);

    if (href.startsWith('#')) {
      // Ancla: si estamos en el home hacemos scroll; si no, vamos al home + ancla.
      if (pathname === '/') {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/' + href);
      }
    } else {
      router.push(href);
    }
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-3'
      }`}
    >
      <div className="container-custom">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-14' : 'h-18'
          }`}
        >
          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link href="/" className="flex items-center">
              <Image
                src="/recursos/logotipo-negativo-corazon.svg"
                alt="Cali Enamora Logo"
                width={120}
                height={100}
                className={`w-auto transition-all duration-500 ${
                  isScrolled ? 'h-10' : 'h-10 sm:h-14'
                }`}
                priority
                unoptimized
              />
            </Link>
          </motion.div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-3">
            {navTree.map((node) => {
              if (isLeaf(node)) {
                return (
                  <motion.button
                    key={node.label}
                    onClick={() => handleNavClick(node.href)}
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 border overflow-hidden group ${
                      isScrolled ? 'text-xs' : 'text-sm'
                    } ${
                      isActive(node.href)
                        ? 'text-white border-red-500/40'
                        : 'text-white hover:text-white border-white/10 hover:border-red-500/40'
                    }`}
                    style={leafBtnStyle}
                  >
                    <span className="relative z-10">{node.label}</span>
                  </motion.button>
                );
              }

              const groupActive = node.children.some((c) => isActive(c.href));
              return (
                <div
                  key={node.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(node.label)}
                  onMouseLeave={() => setOpenGroup((g) => (g === node.label ? null : g))}
                >
                  <motion.button
                    whileHover={{ y: -2, scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-1.5 px-4 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 border ${
                      isScrolled ? 'text-xs' : 'text-sm'
                    } ${
                      groupActive || openGroup === node.label
                        ? 'text-white border-red-500/40'
                        : 'text-white hover:text-white border-white/10 hover:border-red-500/40'
                    }`}
                    style={leafBtnStyle}
                  >
                    <span>{node.label}</span>
                    <svg
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        openGroup === node.label ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>

                  <AnimatePresence>
                    {openGroup === node.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-2xl p-2"
                        style={dropdownPanelStyle}
                      >
                        <div className="flex min-w-[180px] flex-col gap-1">
                          {node.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => handleNavClick(child.href)}
                              className={`w-full whitespace-nowrap rounded-xl px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                                isActive(child.href)
                                  ? 'bg-red-500/20 text-white'
                                  : 'text-white hover:bg-white/10 hover:text-white'
                              }`}
                              style={{ fontFamily: 'DM Sans, sans-serif' }}
                            >
                              {child.label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* CTA DESKTOP */}
          <div className="hidden md:flex items-center">
            <motion.a
              href="/contacto"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('/contacto');
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`inline-flex items-center gap-2 rounded-full font-semibold text-white transition-all duration-300 border border-red-400/30 hover:border-red-400/50 ${
                isScrolled ? 'px-5 py-2 text-xs' : 'px-6 py-3 text-sm'
              }`}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 41, 0,0.9), rgba(204, 33, 0,0.9))',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                boxShadow: '0 8px 30px rgba(255, 41, 0,0.25)',
              }}
            >
              <span>Contáctanos</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.a>
          </div>

          {/* MOBILE BUTTON */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.92 }}
            className="lg:hidden p-3 rounded-full text-white border border-white/10"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                {navTree.map((node, index) => {
                  if (isLeaf(node)) {
                    return (
                      <motion.button
                        key={node.label}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleNavClick(node.href)}
                        className={`w-full text-left px-5 py-3 rounded-full text-sm font-medium border border-white/10 transition-all duration-300 ${
                          isActive(node.href) ? 'text-white' : 'text-white hover:text-white'
                        }`}
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          background: 'rgba(255,255,255,0.06)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                        }}
                      >
                        {node.label}
                      </motion.button>
                    );
                  }

                  const expanded = openMobileGroup === node.label;
                  return (
                    <motion.div
                      key={node.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => setOpenMobileGroup(expanded ? null : node.label)}
                        className="flex w-full items-center justify-between rounded-full border border-white/10 px-5 py-3 text-left text-sm font-medium text-white transition-all duration-300 hover:text-white"
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          background: 'rgba(255,255,255,0.06)',
                          backdropFilter: 'blur(16px)',
                          WebkitBackdropFilter: 'blur(16px)',
                        }}
                      >
                        <span>{node.label}</span>
                        <svg
                          className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {expanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4"
                          >
                            <div className="flex flex-col gap-2 pt-2">
                              {node.children.map((child) => (
                                <button
                                  key={child.label}
                                  onClick={() => handleNavClick(child.href)}
                                  className={`w-full rounded-full px-5 py-2.5 text-left text-sm transition-all duration-200 ${
                                    isActive(child.href) ? 'bg-red-500/20 text-white' : 'text-white hover:text-white'
                                  }`}
                                  style={{ fontFamily: 'DM Sans, sans-serif', background: 'rgba(255,255,255,0.04)' }}
                                >
                                  {child.label}
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}

                <motion.a
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: navTree.length * 0.05 }}
                  href="/contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('/contacto');
                  }}
                  className="mt-2 flex items-center justify-center rounded-full py-3 text-sm font-semibold text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 41, 0,0.9), rgba(204, 33, 0,0.9))',
                    boxShadow: '0 8px 30px rgba(255, 41, 0,0.25)',
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

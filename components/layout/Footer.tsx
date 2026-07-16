'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-gray-900 text-gray-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-brand"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 sm:py-16"
        >
          {/* Logo Section */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logotipo%20naranja%20CaliE-uppsf2nVo5GsYhEbvYyfqqRlWZYetb.png"
                alt="Cali Enamora"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-sm text-white leading-relaxed mb-4">
              Corporación ciudadana para promover turismo sostenible en Cali y
              el Valle del Cauca.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: '📘',
                  label: 'Facebook',
                  href: 'https://facebook.com/calienamora',
                },
                {
                  icon: '📷',
                  label: 'Instagram',
                  href: 'https://instagram.com/calienamora',
                },
                {
                  icon: '𝕏',
                  label: 'Twitter',
                  href: 'https://twitter.com/calienamora',
                },
                {
                  icon: '🎬',
                  label: 'TikTok',
                  href: 'https://tiktok.com/@calienamora',
                },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-orange transition-colors duration-300 text-lg"
                  title={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-white">Navegación</h3>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Turista', href: '/turista' },
                { label: 'Hacer parte', href: '/corporativa' },
                { label: 'Contacto', href: '/contacto' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white hover:text-brand-orange transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Turista */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-white">Para el viajero</h3>
            <ul className="space-y-2">
              {[
                { label: '🗺️ Rutas', href: '/rutas' },
                { label: '🍽️ Sabores', href: '/sabores' },
                { label: '🎉 Eventos', href: '/eventos' },
                { label: '🛍️ Merchandising', href: '/turista#merchandising' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white hover:text-brand-orange transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-4 text-white">Contacto</h3>
            <div className="space-y-3 text-sm text-white">
              <p>
                <span className="font-semibold text-white">Email:</span>
                <br />
                <a
                  href="mailto:info@calienamora.com"
                  className="hover:text-brand-orange transition-colors"
                >
                  info@calienamora.com
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Teléfono:</span>
                <br />
                <a
                  href="tel:+5721234567"
                  className="hover:text-brand-orange transition-colors"
                >
                  +57 (2) 123-4567
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Ubicación:</span>
                <br />
                Carrera 5 # 12-28, Cali, Colombia
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 py-8 sm:py-12 my-8 sm:my-12"
        >
          <div className="max-w-md mx-auto sm:max-w-none sm:flex sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h3 className="text-lg font-bold text-white mb-2">
                ¡Suscríbete a nuestro boletín!
              </h3>
              <p className="text-sm text-white">
                Recibe las últimas noticias y promociones
              </p>
            </div>
            <motion.form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all duration-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 sm:px-6 py-2 rounded-lg bg-gradient-brand text-white font-semibold text-sm hover:shadow-lg transition-all duration-300"
              >
                Suscribir
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-gray-800 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between text-sm text-white gap-4"
        >
          <p>
            © {currentYear} Cali Enamora. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <Link
              href="#"
              className="hover:text-brand-orange transition-colors duration-300"
            >
              Política de Privacidad
            </Link>
            <Link
              href="#"
              className="hover:text-brand-orange transition-colors duration-300"
            >
              Términos de Servicio
            </Link>
            <Link
              href="#"
              className="hover:text-brand-orange transition-colors duration-300"
            >
              Cookies
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-brand text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40"
        aria-label="Volver al inicio"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7-7m0 0L5 14m7-7v12"
          />
        </svg>
      </motion.button>
    </footer>
  );
};

export default Footer;

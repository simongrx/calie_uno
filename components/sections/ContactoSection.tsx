'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '@/components/ui/SectionTitle';

export const ContactoSection: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: 'contacto',
    mensaje: '',
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Formulario enviado:', formData);

    setEnviado(true);

    setTimeout(() => {
      setEnviado(false);

      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: 'contacto',
        mensaje: '',
      });
    }, 3000);
  };

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
      transition: { duration: 0.6 },
    },
  };

  const infoItems = [
    {
      titulo: 'Email',
      contenido: 'info@calienamora.com',
      href: 'mailto:info@calienamora.com',
    },
    {
      titulo: 'Teléfono',
      contenido: '+57 (2) 123-4567',
      href: 'tel:+5721234567',
    },
    {
      titulo: 'Ubicación',
      contenido: 'Carrera 5 # 12-28, Cali, Colombia',
      href: 'https://maps.google.com',
    },
    {
      titulo: 'Horario',
      contenido: 'Lun - Vie: 8:00 AM - 6:00 PM',
      href: '#',
    },
  ];

  return (
    <section
      id="contacto"
      className="section bg-transparent relative overflow-hidden"
    >
      {/* EFECTOS */}
      <div className="spotlight-card absolute top-20 right-10 w-40 h-40 bg-red-600/5 rounded-full blur-3xl" />
      <div className="spotlight-card absolute bottom-20 left-10 w-40 h-40 bg-yellow-400/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">

        {/* TITULO */}
        <SectionTitle
          titulo="Ponte en Contacto"
          subtitulo="¿Preguntas sobre nuestras rutas, eventos o inversiones? Estamos aquí para ayudarte"
          alineacion="center"
          conLinea={true}
          className="mb-14 sm:mb-20"
        />

        {/* CONTENEDOR PRINCIPAL */}
        <div className="spotlight-card rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 sm:p-10 lg:p-14 max-w-7xl mx-auto">

          {/* GRID */}
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">

            {/* INFORMACION */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-1 flex flex-col"
            >

              {/* CAJAS INFO */}
              <div>

                {infoItems.map((item, index) => (
                  <motion.a
                    key={index}
                    variants={itemVariants}
                    href={item.href}
                    target={
                      item.href.startsWith('http')
                        ? '_blank'
                        : undefined
                    }
                    whileHover={{ y: -4 }}
                    className="block mb-5"
                  >
                    <div className="spotlight-card rounded-2xl bg-slate-800 border border-slate-700 hover:border-red-600 transition-all p-5 sm:p-6">

                      <h4 className="font-bold text-white text-base sm:text-lg mb-2">
                        {item.titulo}
                      </h4>

                      <p className="text-white text-sm sm:text-base break-words hover:text-red-500 transition-colors">
                        {item.contenido}
                      </p>

                    </div>
                  </motion.a>
                ))}

              </div>

        

              {/* REDES */}
              <motion.div
                variants={itemVariants}
                className="spotlight-card rounded-2xl bg-gradient-to-br from-red-600 to-red-700 text-white p-6 sm:p-7"
              >
                <h4 className="font-bold mb-5 text-base sm:text-lg text-center">
                  Síguenos en Redes Sociales
                </h4>

                <div className="flex justify-center gap-4 flex-wrap">

                  {[
                    {
                      icono: '📘',
                      nombre: 'Facebook',
                      href: 'https://facebook.com',
                    },
                    {
                      icono: '📷',
                      nombre: 'Instagram',
                      href: 'https://instagram.com',
                    },
                    {
                      icono: '𝕏',
                      nombre: 'Twitter',
                      href: 'https://twitter.com',
                    },
                    {
                      icono: '▶️',
                      nombre: 'YouTube',
                      href: 'https://youtube.com',
                    },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all text-lg"
                      title={social.nombre}
                    >
                      {social.icono}
                    </motion.a>
                  ))}

                </div>
              </motion.div>
            </motion.div>

            {/* FORMULARIO */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="spotlight-card rounded-3xl bg-slate-800 border border-slate-700 shadow-2xl p-6 sm:p-8 lg:p-10">

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Envíanos un Mensaje
                </h3>

                <p className="text-white text-sm sm:text-base mb-8">
                  Completa el formulario y nuestro equipo se pondrá en contacto contigo pronto.
                </p>

                <motion.form
                  onSubmit={handleSubmit}
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-6"
                >

                  {/* NOMBRE */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Nombre Completo
                    </label>

                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-red-600 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </motion.div>

                  {/* EMAIL */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-red-600 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </motion.div>

                  {/* TELEFONO */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Teléfono
                    </label>

                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+57 (2) 123-4567"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-red-600 focus:outline-none transition-all text-sm sm:text-base"
                    />
                  </motion.div>

                  {/* SELECT */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Tipo de Consulta
                    </label>

                    <select
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-red-600 focus:outline-none transition-all text-sm sm:text-base"
                    >
                      <option value="contacto">Contacto General</option>
                      <option value="rutas">Información sobre Rutas</option>
                      <option value="eventos">Consulta sobre Eventos</option>
                      <option value="inversion">Interés en Inversión</option>
                      <option value="alianza">Propuesta de Alianza</option>
                      <option value="otra">Otra Consulta</option>
                    </select>
                  </motion.div>

                  {/* MENSAJE */}
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Mensaje
                    </label>

                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      placeholder="Cuéntanos tu consulta o idea..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-red-600 focus:outline-none transition-all text-sm sm:text-base resize-none"
                    />
                  </motion.div>

                  {/* BOTON */}
                  <motion.button
                    variants={itemVariants}
                    type="submit"
                    disabled={enviado}
                    whileHover={!enviado ? { scale: 1.01 } : {}}
                    whileTap={!enviado ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-xl font-bold text-sm sm:text-base transition-all ${
                      enviado
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl'
                    }`}
                  >
                    {enviado ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
                  </motion.button>

                  {/* PRIVACIDAD */}
                  <motion.p
                    variants={itemVariants}
                    className="text-xs sm:text-sm text-white text-center"
                  >
                    Tu información será tratada con confidencialidad y conforme a nuestra
                    política de privacidad.
                  </motion.p>

                </motion.form>
              </div>
            </motion.div>
          </div>
        </div>


        {/* MAPA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="spotlight-card rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-96 lg:h-[500px] border border-white/10 max-w-7xl mx-auto"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.5277090430447!2d-76.53450792346993!3d3.4372160405819957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6f0cc33e215%3A0xf556f0c321e4c22d!2sCali%2C%20Colombia!5e0!3m2!1ses!2sco!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default ContactoSection;
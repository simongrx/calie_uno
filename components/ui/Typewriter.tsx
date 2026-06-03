'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export interface TypewriterProps {
  textos: string[];
  velocidad?: number;
  pausaDespues?: number;
  repetir?: boolean;
  className?: string;
  showCursor?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  textos,
  velocidad = 50,
  pausaDespues = 2000,
  repetir = true,
  className = '',
  showCursor = true,
}) => {
  const [textoActual, setTextoActual] = useState('');
  const [indiceTexto, setIndiceTexto] = useState(0);
  const [indiceCaracter, setIndiceCaracter] = useState(0);
  const [estaBorrando, setEstaBorrando] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const timer = setTimeout(() => {
      const textoCompleto = textos[indiceTexto];

      if (!estaBorrando) {
        // Escribiendo
        if (indiceCaracter < textoCompleto.length) {
          setTextoActual(textoCompleto.substring(0, indiceCaracter + 1));
          setIndiceCaracter(indiceCaracter + 1);
        } else {
          // Completó el texto, esperar antes de borrar
          setIsTyping(false);
          setTimeout(() => setIsTyping(true), pausaDespues);
          setEstaBorrando(true);
        }
      } else {
        // Borrando
        if (indiceCaracter > 0) {
          setTextoActual(textoCompleto.substring(0, indiceCaracter - 1));
          setIndiceCaracter(indiceCaracter - 1);
        } else {
          // Completó el borrado, siguiente texto
          setEstaBorrando(false);
          const siguienteIndice = (indiceTexto + 1) % textos.length;
          
          if (siguienteIndice === 0 && !repetir) {
            setIsTyping(false);
          } else {
            setIndiceTexto(siguienteIndice);
          }
        }
      }
    }, estaBorrando ? velocidad / 2 : velocidad);

    return () => clearTimeout(timer);
  }, [
    indiceCaracter,
    estaBorrando,
    indiceTexto,
    textos,
    velocidad,
    pausaDespues,
    repetir,
    isTyping,
  ]);

  return (
    <div className={className}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {textoActual}
      </motion.span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-1 h-8 bg-brand-orange ml-1"
        />
      )}
    </div>
  );
};

export default Typewriter;

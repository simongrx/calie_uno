'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={i}
                className="spotlight-card w-full max-w-xs rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-white shadow-xl shadow-black/30 backdrop-blur-md"
                style={{ WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }}
              >
                <div className="text-sm leading-relaxed text-white">{text}</div>
                <div className="mt-5 flex items-center gap-2">
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-white/15"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium leading-5 tracking-tight text-white">{name}</div>
                    <div className="leading-5 tracking-tight text-white">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default TestimonialsColumn;

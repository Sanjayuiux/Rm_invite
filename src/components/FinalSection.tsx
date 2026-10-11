import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../data/weddingData';

export const FinalSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#1A0508] text-[#F8F3E9]">
      {/* Background couple photo with smooth parallax / zoom reveal */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.12, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/final-couple.jpg"
          alt="Manoj & Ranjani Forever"
          className="w-full h-full object-cover object-[center_28%]"
          loading="lazy"
        />
      </motion.div>

      {/* Deep luxury velvet burgundy vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0508]/96 via-[#1A0508]/65 to-[#1A0508]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[#541820]/30 mix-blend-multiply pointer-events-none" />

      {/* Emotional Typography Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 sm:px-10 max-w-3xl mx-auto py-20"
      >
        <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-[0.5px] bg-[#B69A61]/50" />
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#B69A61]/80 font-light">
            And So
          </p>
          <span className="w-8 h-[0.5px] bg-[#B69A61]/50" />
        </div>

        <h2
          className="font-serif italic text-[#F8F3E9] font-light leading-none mb-1 drop-shadow-md"
          style={{ fontSize: 'clamp(56px, 11vw, 130px)' }}
        >
          Forever
        </h2>
        <h2
          className="font-serif italic font-light leading-none mb-8 sm:mb-10 drop-shadow-md"
          style={{ fontSize: 'clamp(56px, 11vw, 130px)', color: '#B69A61' }}
        >
          starts here.
        </h2>

        <p className="font-body text-sm sm:text-base tracking-[0.3em] uppercase text-[#F8F3E9]/75 font-light mt-6 sm:mt-8">
          {weddingData.couple.displayNames.groom} &amp; {weddingData.couple.displayNames.bride}
        </p>

        <p className="font-body text-xs tracking-[0.25em] text-[#B69A61]/80 font-light mt-2">
          22 · 11 · 2026
        </p>
      </motion.div>
    </section>
  );
};

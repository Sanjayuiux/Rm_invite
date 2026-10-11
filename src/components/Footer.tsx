import React from 'react';
import { motion } from 'framer-motion';
import { Monogram } from './Monogram';
import { weddingData } from '../data/weddingData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 sm:py-28 px-6 sm:px-10 bg-[#F8F3E9] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md mx-auto flex flex-col items-center"
      >
        {/* Monogram */}
        <Monogram size="md" variant="burgundy" />

        {/* Couple Names */}
        <p className="font-serif italic text-2xl sm:text-3xl text-[#541820] font-light mt-8 mb-2">
          {weddingData.couple.displayNames.groom} &amp; {weddingData.couple.displayNames.bride}
        </p>

        {/* Date */}
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#95666A] font-light">
          22 · 11 · 2026
        </p>

        {/* Thin divider */}
        <div className="w-8 h-[0.5px] bg-[#541820]/15 my-8" />

        {/* Simple thank you */}
        <p className="font-body text-xs text-[#541820]/40 font-light tracking-wide">
          Thank you for being a part of our celebration.
        </p>
      </motion.div>
    </footer>
  );
};

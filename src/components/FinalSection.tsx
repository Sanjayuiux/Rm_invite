import React from 'react';
import { motion } from 'framer-motion';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const FinalSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#380B12] text-[#FAF7F2]">
      {/* Background couple photo placeholder */}
      <div className="absolute inset-0 opacity-40">
        <WeddingImagePlaceholder
          type="FINAL_PHOTO"
          aspectRatio="hero"
          label="MANOJ & RANJANI"
          src="/images/final-placeholder.jpg"
          alt="Manoj & Ranjani Wedding Photograph"
          className="w-full h-full object-cover min-h-[85vh] sm:min-h-screen"
          showHoverEffect={false}
        />
      </div>

      {/* Deep velvet burgundy vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17]/95 via-[#4A0E17]/60 to-[#4A0E17]/90 pointer-events-none" />

      {/* Emotional Typography Overlay */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center px-6 sm:px-10 max-w-3xl mx-auto py-20"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-6 h-[1px] bg-[#C5A869]/70" />
          <span className="font-body text-[11px] sm:text-[12px] uppercase tracking-[0.35em] text-[#C5A869] font-semibold">
            {weddingData.couple.displayNames.groom} &amp; {weddingData.couple.displayNames.bride}
          </span>
          <span className="w-6 h-[1px] bg-[#C5A869]/70" />
        </div>

        <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-wide text-[#FAF7F2] leading-[1.08] mb-6">
          Forever
          <br />
          <span className="font-serif italic font-normal text-[#C5A869]">starts here.</span>
        </h2>

        <Ornament type="small" color="#C5A869" className="opacity-75 my-6" />

        <p className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#FAF7F2] font-light">
          22 · 11 · 2026
        </p>

        <p className="font-body text-xs sm:text-sm uppercase tracking-[0.28em] text-[#C5A869]/90 mt-2 font-semibold">
          Coimbatore, Tamil Nadu
        </p>
      </motion.div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { weddingData } from '../data/weddingData';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-end justify-center"
    >
      {/* Background cinematic photograph with dramatic reveal animation */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 1.15, filter: 'blur(8px)', opacity: 0 }}
        animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/hero-couple.jpg"
          alt="Manoj & Ranjani"
          className="w-full h-full object-cover object-[center_36%] sm:object-[center_32%]"
          loading="eager"
        />
      </motion.div>

      {/* Cinematic Vignette & Ambient Color Grading Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A0508]/95 via-[#1A0508]/45 to-[#1A0508]/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A0508]/50 via-transparent to-[#1A0508]/50 pointer-events-none" />
      {/* Delicate warm editorial glow */}
      <div className="absolute inset-0 bg-[#541820]/15 mix-blend-multiply pointer-events-none" />

      {/* Hero Content: Centered on mobile for balanced visual hierarchy, anchored left on larger screens */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-10 md:px-14 pb-20 sm:pb-28 flex flex-col items-center md:items-start text-center md:text-left">
        <div className="max-w-xl flex flex-col items-center md:items-start">
          {/* Small label */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center md:justify-start gap-2.5 mb-4 sm:mb-5"
          >
            <span className="w-5 h-[0.5px] bg-[#F8F3E9]/60" />
            <span className="font-body text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#F8F3E9]/85 font-light drop-shadow-sm">
              A Celebration of Love
            </span>
            <span className="w-5 h-[0.5px] bg-[#F8F3E9]/60 md:hidden" />
          </motion.div>

          {/* Couple Names - Elegant Cormorant Garamond */}
          <motion.h1
            className="font-serif italic text-[#F8F3E9] font-light leading-[0.95] tracking-normal drop-shadow-md text-center md:text-left"
            style={{ fontSize: 'clamp(52px, 12vw, 120px)' }}
            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {weddingData.couple.displayNames.groom}
            <br />
            <span
              style={{ fontSize: '0.32em' }}
              className="font-body not-italic tracking-[0.2em] uppercase text-[#F8F3E9]/65 font-light block my-1 sm:my-1.5"
            >
              &amp;
            </span>
            {weddingData.couple.displayNames.bride}
          </motion.h1>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 sm:mt-7"
          >
            <p className="font-body text-sm sm:text-base md:text-lg text-[#F8F3E9]/90 tracking-[0.3em] font-light drop-shadow-sm">
              21 · 11 · 2026
            </p>
          </motion.div>
        </div>

        {/* Scroll to discover */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-10 md:mt-0 md:absolute md:bottom-10 md:right-12"
        >
          <a
            href="#invitation"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#invitation')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center gap-2 text-[#F8F3E9]/65 hover:text-[#F8F3E9] transition-colors group focus:outline-none"
            aria-label="Scroll to discover"
          >
            <span className="font-body text-[9px] uppercase tracking-[0.3em] font-light drop-shadow-sm">
              Scroll to discover
            </span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

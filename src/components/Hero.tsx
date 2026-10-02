import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] lg:min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Editorial Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column: Asymmetrical Editorial Typography */}
        <motion.div
          className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left order-2 lg:order-1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Label */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-4">
            <span className="w-5 h-[1px] bg-[#7B2431]" />
            <span className="font-body text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-[#7B2431] font-semibold">
              A Celebration of Love
            </span>
          </div>

          {/* Couple Names */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#4A0E17] font-normal leading-[1.05] tracking-tight">
            <span>{weddingData.couple.displayNames.groom}</span>
            <span className="block font-script text-4xl sm:text-5xl md:text-6xl text-[#7B2431] my-1 sm:my-2 lg:-ml-2">
              and
            </span>
            <span>{weddingData.couple.displayNames.bride}</span>
          </h1>

          {/* Decorative Divider */}
          <div className="my-5 flex items-center justify-center lg:justify-start">
            <Ornament type="small" color="#7B2431" className="opacity-75" />
          </div>

          {/* Date Highlight */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-4"
          >
            <p className="font-serif text-xl sm:text-2xl text-[#4A0E17] tracking-[0.2em] font-normal">
              22 · 11 · 2026
            </p>
            <p className="font-body text-[11px] uppercase tracking-[0.25em] text-[#854D56] mt-1 font-medium">
              Coimbatore, Tamil Nadu
            </p>
          </motion.div>

          {/* Invitation statement */}
          <p className="font-body text-[#3B2226]/85 text-sm sm:text-base leading-relaxed max-w-md mx-auto lg:mx-0 font-light mt-2">
            Together with our families, we invite you to celebrate our wedding.
          </p>
        </motion.div>

        {/* Right Column: Editorial Photograph Placeholder */}
        <motion.div
          className="lg:col-span-7 order-1 lg:order-2 w-full"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative mx-auto max-w-[540px] lg:max-w-none">
            <WeddingImagePlaceholder
              type="COUPLE_HERO"
              aspectRatio="hero"
              label="MANOJ & RANJANI"
              src="/images/hero-placeholder.jpg"
              alt="Manoj and Ranjani Wedding Couple"
              className="shadow-xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        className="flex flex-col items-center justify-center pt-8 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <a
          href="#invitation"
          className="inline-flex flex-col items-center gap-1.5 text-[#3B2226]/60 hover:text-[#5C131D] transition-colors group focus:outline-none"
          aria-label="Scroll to discover invitation details"
        >
          <span className="font-body text-[10px] uppercase tracking-[0.3em] font-medium">
            Scroll to discover
          </span>
          <ChevronDown className="w-4 h-4 text-[#7B2431] group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};

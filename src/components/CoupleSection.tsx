import React from 'react';
import { motion } from 'framer-motion';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  return (
    <section
      id="couple"
      className="relative bg-[#F1E8DA] overflow-hidden border-t border-[#541820]/8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px] sm:min-h-[700px]">
        {/* Left: Typography (Center aligned on mobile for visual balance) */}
        <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 lg:py-28 order-2 lg:order-1">
          <RevealAnimation delay={0}>
            <p className="font-body text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#541820]/50 mb-5 sm:mb-6 font-light">
              The Couple
            </p>
            <h2
              className="font-serif italic text-[#351015] font-light leading-[1.05] mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(38px, 6vw, 68px)' }}
            >
              Two lives,<br />
              one beautiful<br />
              beginning.
            </h2>
            <div className="w-10 h-[0.5px] bg-[#B69A61]/50 mb-6 sm:mb-8 mx-auto lg:mx-0" />
            <p className="font-body text-sm sm:text-base text-[#541820]/75 font-light leading-relaxed max-w-sm mx-auto lg:mx-0">
              {weddingData.couple.subStatement}
            </p>
          </RevealAnimation>
        </div>

        {/* Right: Editorial Photograph with Reveal */}
        <div className="relative min-h-[420px] sm:min-h-[560px] lg:min-h-[640px] order-1 lg:order-2 overflow-hidden group">
          <RevealAnimation direction="right" delay={0.15} className="h-full w-full">
            <div className="relative h-full w-full min-h-[420px] sm:min-h-[560px] lg:min-h-[640px] overflow-hidden">
              <motion.img
                src="/images/couple-portrait.jpg"
                alt="Manoj & Ranjani"
                className="w-full h-full object-cover object-[center_25%] transition-transform duration-1000 group-hover:scale-[1.03]"
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
              />
              {/* Subtle Warm Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A0508]/40 via-transparent to-transparent pointer-events-none" />
              {/* Inner Luxury Stationery Border */}
              <div className="absolute inset-4 sm:inset-6 border border-[#F8F3E9]/30 pointer-events-none" />
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { SectionLabel } from './SectionLabel';
import { Countdown } from './Countdown';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const WeddingSection: React.FC = () => {
  return (
    <section
      id="wedding"
      className="relative py-20 sm:py-36 px-4 sm:px-10 md:px-12 bg-[#F8F3E9] border-t border-[#541820]/8 overflow-hidden"
    >
      {/* Bottom-right botanical accent */}
      <div className="absolute bottom-0 right-0 opacity-[0.08] pointer-events-none">
        <svg viewBox="0 0 120 120" className="w-36 h-36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M116 116 C90 100, 70 76, 50 56 C30 36, 14 18, 4 4" stroke="#541820" strokeWidth="0.8" strokeLinecap="round" />
          <path d="M116 60 C100 66, 80 70, 60 74" stroke="#541820" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="80" cy="60" rx="5" ry="9" stroke="#541820" strokeWidth="0.6" opacity="0.5" transform="rotate(45 80 60)" />
          <ellipse cx="96" cy="76" rx="5" ry="9" stroke="#541820" strokeWidth="0.6" opacity="0.4" transform="rotate(20 96 76)" />
          <circle cx="60" cy="74" r="3" fill="#541820" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <RevealAnimation delay={0}>
          <SectionLabel className="mb-8 sm:mb-12">The Day</SectionLabel>
        </RevealAnimation>

        {/* ========================================================================= */}
        {/* RECEPTION FEATURED HIGHLIGHT (Saturday, November 21st, 2026) */}
        {/* ========================================================================= */}
        <RevealAnimation delay={0.1}>
          <div className="bg-[#F1E8DA] border border-[#541820]/20 p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-sm text-center md:text-left">
            {/* Top gold emblem & badge */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 sm:mb-8 pb-4 border-b border-[#541820]/10 text-center sm:text-left">
              <span className="inline-block px-3 py-1 bg-[#541820] text-[#F8F3E9] text-[9px] sm:text-[10px] tracking-[0.28em] uppercase font-body font-medium">
                Featured Celebration
              </span>
              <p className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#95666A] font-light">
                Evening Felicitations
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Title / Description */}
              <div className="md:col-span-4 text-center md:text-left">
                <h3 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl text-[#351015] font-light leading-tight">
                  Wedding<br />Reception
                </h3>
                <p className="font-body text-xs sm:text-sm text-[#541820]/70 font-light mt-2 max-w-xs mx-auto md:mx-0">
                  Join us for an evening of felicitations, dinner &amp; joy.
                </p>
              </div>

              {/* Center Huge Date (21) */}
              <div className="md:col-span-4 text-center py-4 md:py-0 border-y md:border-y-0 md:border-x border-[#541820]/10">
                <div
                  className="font-serif text-[#541820] font-light leading-none select-none drop-shadow-sm"
                  style={{ fontSize: 'clamp(95px, 14vw, 150px)' }}
                >
                  21
                </div>
                <p className="font-body text-xs sm:text-sm tracking-[0.3em] uppercase text-[#541820]/80 mt-1 font-medium">
                  NOVEMBER 2026
                </p>
                <p className="font-body text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#95666A] mt-0.5 font-light">
                  SATURDAY
                </p>
              </div>

              {/* Timing & Venue */}
              <div className="md:col-span-4 text-center md:text-right space-y-2">
                <p className="font-serif italic text-2xl sm:text-3xl text-[#541820] font-light leading-tight">
                  06:00 PM — 09:00 PM
                </p>
                <p className="font-body text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#95666A] font-light">
                  Grand Evening Reception
                </p>
                <p className="font-body text-xs sm:text-sm text-[#541820]/65 font-light pt-2">
                  {weddingData.wedding.venue}, {weddingData.wedding.city}
                </p>
              </div>
            </div>
          </div>
        </RevealAnimation>

        {/* Divider */}
        <RevealAnimation delay={0.2}>
          <div className="my-12 sm:my-20 w-full h-[0.5px] bg-[#541820]/10" />
        </RevealAnimation>

        {/* Live Countdown to Reception */}
        <RevealAnimation delay={0.25}>
          <Countdown targetDate="2026-11-21T18:00:00+05:30" />
        </RevealAnimation>
      </div>
    </section>
  );
};

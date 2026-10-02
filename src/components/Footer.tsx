import React from 'react';
import { Monogram } from './Monogram';
import { Ornament } from './Ornament';
import { ShareButton } from './ShareButton';
import { weddingData } from '../data/weddingData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative py-20 sm:py-24 px-6 sm:px-10 bg-[#FFFFFF] text-center border-t border-[#7B2431]/20">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Share Option */}
        <ShareButton />

        <div className="w-16 h-[1px] bg-[#7B2431]/25 my-8" />

        {/* Thank You Note */}
        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#4A0E17] font-normal leading-relaxed mb-4">
          Thank you for being
          <br />
          a part of our celebration.
        </h3>

        <p className="font-script text-2xl sm:text-3xl text-[#7B2431] my-2">
          With love,
        </p>

        <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] tracking-wide font-normal mb-2">
          {weddingData.couple.displayNames.groom} &amp; {weddingData.couple.displayNames.bride}
        </p>

        <p className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-[#854D56] font-semibold mb-1">
          22 November 2026
        </p>

        <p className="font-body text-xs tracking-[0.18em] text-[#3B2226]/60 uppercase font-light">
          {weddingData.wedding.venue} · {weddingData.wedding.city}
        </p>

        <Ornament type="small" color="#7B2431" className="opacity-50 my-6" />

        {/* Small M&R Monogram Seal at bottom */}
        <div className="mt-2">
          <Monogram size="md" variant="burgundy" />
        </div>

        <p className="font-body text-[10px] tracking-[0.2em] text-[#3B2226]/40 uppercase mt-4">
          Manoj &amp; Ranjani Wedding Invitation
        </p>
      </div>
    </footer>
  );
};

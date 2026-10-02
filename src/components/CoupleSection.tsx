import React from 'react';
import { SectionLabel } from './SectionLabel';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const CoupleSection: React.FC = () => {
  return (
    <section
      id="couple"
      className="relative py-20 sm:py-28 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto"
    >
      <div className="text-center mb-12 sm:mb-16">
        <RevealAnimation delay={0}>
          <SectionLabel>The Couple</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#4A0E17] font-normal tracking-wide max-w-2xl mx-auto">
            {weddingData.couple.statement}
          </h2>
        </RevealAnimation>
      </div>

      {/* Editorial Couple Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Large Couple Portrait Placeholder */}
        <div className="lg:col-span-6 w-full">
          <RevealAnimation direction="left" delay={0.15}>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <WeddingImagePlaceholder
                type="COUPLE_PORTRAIT"
                aspectRatio="portrait"
                label="MANOJ & RANJANI"
                src="/images/couple-placeholder.jpg"
                alt="Manoj & Ranjani Couple Portrait"
                className="shadow-lg"
              />
            </div>
          </RevealAnimation>
        </div>

        {/* Editorial Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left">
          <RevealAnimation direction="right" delay={0.25}>
            {/* Groom details */}
            <div className="mb-6">
              <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold">
                The Groom
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal mt-1">
                {weddingData.couple.groom}
                <span className="text-base text-[#854D56] font-body ml-2 font-light">
                  {weddingData.couple.groomQualification}
                </span>
              </h3>
            </div>

            <div className="my-2 flex items-center justify-center lg:justify-start">
              <Ornament type="small" color="#7B2431" className="opacity-75" />
            </div>

            {/* Bride details */}
            <div className="mt-4 mb-8">
              <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold">
                The Bride
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal mt-1">
                {weddingData.couple.bride}
                <span className="text-base text-[#854D56] font-body ml-2 font-light">
                  {weddingData.couple.brideQualification}
                </span>
              </h3>
            </div>

            {/* Supporting Copy */}
            <p className="font-body text-base sm:text-lg text-[#3B2226]/80 leading-relaxed font-light max-w-lg mx-auto lg:mx-0 border-t border-[#7B2431]/25 pt-6">
              {weddingData.couple.subStatement}
            </p>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

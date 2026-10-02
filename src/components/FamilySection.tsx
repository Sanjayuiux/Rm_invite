import React from 'react';
import { SectionLabel } from './SectionLabel';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const FamilySection: React.FC = () => {
  return (
    <section
      id="family"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#FAF4F5]/50 border-t border-[#7B2431]/20 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <RevealAnimation delay={0}>
          <SectionLabel>{weddingData.families.introLabel}</SectionLabel>

          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#4A0E17] font-normal leading-tight mt-2 mb-12 sm:mb-16">
            {weddingData.families.heading}
          </h2>
        </RevealAnimation>

        {/* Two Families Side by Side with Pure Editorial Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Groom's Parents */}
          <RevealAnimation direction="left" delay={0.15}>
            <div className="flex flex-col items-center p-8 bg-[#FFFFFF] border border-[#7B2431]/25 shadow-sm">
              <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold mb-3">
                {weddingData.families.familyOne.relation}
              </span>

              <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal leading-relaxed">
                {weddingData.families.familyOne.father}
              </p>

              <span className="font-serif text-2xl text-[#7B2431] my-1 opacity-80">
                &amp;
              </span>

              <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal leading-relaxed">
                {weddingData.families.familyOne.mother}
              </p>

              <Ornament type="small" color="#7B2431" className="opacity-50 mt-4" />
            </div>
          </RevealAnimation>

          {/* Bride's Parents */}
          <RevealAnimation direction="right" delay={0.25}>
            <div className="flex flex-col items-center p-8 bg-[#FFFFFF] border border-[#7B2431]/25 shadow-sm">
              <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold mb-3">
                {weddingData.families.familyTwo.relation}
              </span>

              <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal leading-relaxed">
                {weddingData.families.familyTwo.father}
              </p>

              <span className="font-serif text-2xl text-[#7B2431] my-1 opacity-80">
                &amp;
              </span>

              <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal leading-relaxed">
                {weddingData.families.familyTwo.mother}
              </p>

              <Ornament type="small" color="#7B2431" className="opacity-50 mt-4" />
            </div>
          </RevealAnimation>
        </div>

        {/* Closing Blessing Statement */}
        <RevealAnimation delay={0.35}>
          <div className="mt-14 sm:mt-18">
            <p className="font-serif text-2xl sm:text-3xl text-[#4A0E17] max-w-xl mx-auto font-normal leading-relaxed">
              "{weddingData.families.closingBlessing}"
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

import React from 'react';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const FamilySection: React.FC = () => {
  return (
    <section
      id="family"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#F8F3E9] border-t border-[#541820]/8 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <RevealAnimation delay={0}>
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#541820]/45 mb-6">
            With Love &amp; Blessings
          </p>
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#351015] font-light mb-14 sm:mb-20">
            Our families
          </h2>
        </RevealAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-start relative">
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[0.5px] bg-[#541820]/12" />

          {/* Groom's Parents */}
          <RevealAnimation direction="left" delay={0.1}>
            <div className="flex flex-col items-center pb-10 md:pb-0 md:pr-10">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#95666A] mb-5 font-light">
                Parents of the Groom
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-[#541820] font-light leading-relaxed">
                {weddingData.families.familyOne.father}
              </p>
              <p className="font-body text-base text-[#95666A] my-1 font-light">&amp;</p>
              <p className="font-serif text-2xl sm:text-3xl text-[#541820] font-light leading-relaxed">
                {weddingData.families.familyOne.mother}
              </p>
            </div>
          </RevealAnimation>

          {/* Bride's Parents */}
          <RevealAnimation direction="right" delay={0.15}>
            <div className="flex flex-col items-center pt-10 md:pt-0 md:pl-10 border-t border-[#541820]/10 md:border-t-0">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#95666A] mb-5 font-light">
                Parents of the Bride
              </p>
              <p className="font-serif text-2xl sm:text-3xl text-[#541820] font-light leading-relaxed">
                {weddingData.families.familyTwo.father}
              </p>
              <p className="font-body text-base text-[#95666A] my-1 font-light">&amp;</p>
              <p className="font-serif text-2xl sm:text-3xl text-[#541820] font-light leading-relaxed">
                {weddingData.families.familyTwo.mother}
              </p>
            </div>
          </RevealAnimation>
        </div>

        <RevealAnimation delay={0.25}>
          <div className="mt-16 sm:mt-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="w-8 h-[0.5px] bg-[#B69A61]/35" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#541820]/30" />
              <span className="w-8 h-[0.5px] bg-[#B69A61]/35" />
            </div>
            <p className="font-serif italic text-2xl sm:text-3xl text-[#351015] font-light leading-relaxed max-w-xl mx-auto">
              "{weddingData.families.closingBlessing}"
            </p>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

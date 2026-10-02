import React from 'react';
import { SectionLabel } from './SectionLabel';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const InvitationIntro: React.FC = () => {
  return (
    <section
      id="invitation"
      className="relative py-20 sm:py-28 px-6 sm:px-10 max-w-4xl mx-auto text-center"
    >
      <div className="flex flex-col items-center">
        {/* Label & Heading Reveal */}
        <RevealAnimation delay={0}>
          <SectionLabel>Wedding Invitation</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-normal tracking-wide mt-2 mb-8 sm:mb-10">
            With the blessings of our families
          </h2>
        </RevealAnimation>

        {/* Family Names Container Reveal */}
        <RevealAnimation delay={0.15}>
          <div className="flex flex-col items-center gap-3 sm:gap-4 my-2">
            {/* Family One */}
            <div className="text-center">
              <p className="font-serif text-xl sm:text-2xl text-[#3B2226] font-normal leading-relaxed">
                {weddingData.families.familyOne.father}
              </p>
              <span className="font-serif text-base sm:text-lg text-[#7B2431] block my-0.5 opacity-80">
                &amp;
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#3B2226] font-normal leading-relaxed">
                {weddingData.families.familyOne.mother}
              </p>
            </div>

            <p className="font-body text-[11px] uppercase tracking-[0.28em] text-[#854D56] font-light my-1">
              and
            </p>

            {/* Family Two */}
            <div className="text-center">
              <p className="font-serif text-xl sm:text-2xl text-[#3B2226] font-normal leading-relaxed">
                {weddingData.families.familyTwo.father}
              </p>
              <span className="font-serif text-base sm:text-lg text-[#7B2431] block my-0.5 opacity-80">
                &amp;
              </span>
              <p className="font-serif text-xl sm:text-2xl text-[#3B2226] font-normal leading-relaxed">
                {weddingData.families.familyTwo.mother}
              </p>
            </div>
          </div>
        </RevealAnimation>

        {/* Traditional Ornamental Divider & Invitation Text */}
        <RevealAnimation delay={0.25}>
          <Ornament type="divider" className="my-8 sm:my-10" />

          <p className="font-body text-base sm:text-lg md:text-xl text-[#3B2226]/85 max-w-2xl leading-relaxed font-light my-2">
            {weddingData.families.invitationCopy}
          </p>
        </RevealAnimation>

        {/* Couple Names with Qualifications */}
        <RevealAnimation delay={0.35}>
          <div className="mt-10 sm:mt-12 flex flex-col items-center">
            <div className="text-center">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-normal tracking-wide">
                {weddingData.couple.groom}
                <span className="text-base sm:text-lg text-[#854D56] font-body ml-2 font-light">
                  {weddingData.couple.groomQualification}
                </span>
              </h3>
            </div>

            <div className="my-3 flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-[#7B2431]/40" />
              <span className="font-serif text-lg sm:text-xl text-[#7B2431] font-normal tracking-widest uppercase">
                weds
              </span>
              <span className="w-8 h-[1px] bg-[#7B2431]/40" />
            </div>

            <div className="text-center">
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-normal tracking-wide">
                {weddingData.couple.bride}
                <span className="text-base sm:text-lg text-[#854D56] font-body ml-2 font-light">
                  {weddingData.couple.brideQualification}
                </span>
              </h3>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

import React from 'react';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

const FloralCorner: React.FC<{ flip?: boolean; flipY?: boolean }> = ({ flip = false, flipY = false }) => (
  <svg
    viewBox="0 0 80 80"
    className="w-16 h-16 sm:w-24 sm:h-24 opacity-[0.12]"
    style={{ transform: `scaleX(${flip ? -1 : 1}) scaleY(${flipY ? -1 : 1})` }}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M4 4 C4 4, 30 10, 38 26 C46 42, 58 56, 76 76" stroke="#541820" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M4 4 C10 18, 20 28, 32 34" stroke="#541820" strokeWidth="0.5" strokeLinecap="round" opacity="0.6" />
    <path d="M38 4 C36 16, 30 24, 26 34" stroke="#541820" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />
    <circle cx="14" cy="20" r="2.5" fill="#541820" opacity="0.25" />
    <circle cx="26" cy="10" r="1.5" fill="#541820" opacity="0.2" />
    <circle cx="50" cy="54" r="2" fill="#541820" opacity="0.18" />
    <path d="M14 20 C18 14, 22 12, 26 10" stroke="#541820" strokeWidth="0.4" opacity="0.3" />
    <ellipse cx="58" cy="36" rx="4" ry="7" stroke="#541820" strokeWidth="0.5" opacity="0.2" transform="rotate(-30 58 36)" />
    <ellipse cx="35" cy="58" rx="4" ry="7" stroke="#541820" strokeWidth="0.5" opacity="0.2" transform="rotate(60 35 58)" />
  </svg>
);

export const InvitationIntro: React.FC = () => {
  return (
    <section
      id="invitation"
      className="relative py-20 sm:py-32 px-5 sm:px-10 bg-[#F8F3E9] border-t border-[#541820]/8 overflow-hidden"
    >
      {/* Corner botanical accents */}
      <div className="absolute top-0 left-0"><FloralCorner /></div>
      <div className="absolute top-0 right-0"><FloralCorner flip /></div>
      <div className="absolute bottom-0 left-0"><FloralCorner flipY /></div>
      <div className="absolute bottom-0 right-0"><FloralCorner flip flipY /></div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <RevealAnimation delay={0}>
          <p className="font-body text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-[#541820]/50 mb-6 sm:mb-8 font-light">
            The Wedding Invitation
          </p>
        </RevealAnimation>

        {/* Couple Inviting Headline */}
        <RevealAnimation delay={0.1}>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#351015] font-light mb-6 sm:mb-8 leading-tight">
            We invite you to celebrate<br />our wedding
          </h2>
        </RevealAnimation>

        {/* Couple Personal Invitation Message */}
        <RevealAnimation delay={0.15}>
          <p className="font-body text-sm sm:text-base text-[#541820]/75 leading-relaxed font-light max-w-xl mx-auto mb-10 sm:mb-14 px-4">
            Together with our families, we joyfully invite you and your family to join us as we celebrate our love and begin our new journey together.
          </p>
        </RevealAnimation>

        {/* Prominent Couple Names */}
        <RevealAnimation delay={0.2}>
          <div className="my-6 sm:my-8 flex flex-col items-center justify-center">
            {/* Groom */}
            <div className="my-1">
              <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#351015] font-light tracking-wide inline-flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
                <span>{weddingData.couple.groom},</span>
                <span className="font-body not-italic text-sm sm:text-base text-[#95666A] font-light">
                  {weddingData.couple.groomQualification}
                </span>
              </h3>
            </div>

            {/* Weds Connector */}
            <div className="my-3 sm:my-4 flex items-center justify-center gap-4">
              <span className="w-8 sm:w-12 h-[0.5px] bg-[#B69A61]/50" />
              <span className="font-serif italic text-lg sm:text-xl text-[#B69A61] font-light">
                weds
              </span>
              <span className="w-8 sm:w-12 h-[0.5px] bg-[#B69A61]/50" />
            </div>

            {/* Bride */}
            <div className="my-1">
              <h3 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-[#351015] font-light tracking-wide inline-flex flex-wrap items-baseline justify-center gap-2 sm:gap-3">
                <span>{weddingData.couple.bride},</span>
                <span className="font-body not-italic text-sm sm:text-base text-[#95666A] font-light">
                  {weddingData.couple.brideQualification}
                </span>
              </h3>
            </div>
          </div>
        </RevealAnimation>

        {/* Delicate Ornamental Divider */}
        <RevealAnimation delay={0.25}>
          <div className="flex items-center justify-center gap-3 my-8 sm:my-10">
            <span className="w-12 sm:w-16 h-[0.5px] bg-[#541820]/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#B69A61]/70" />
            <span className="w-12 sm:w-16 h-[0.5px] bg-[#541820]/20" />
          </div>
        </RevealAnimation>

        {/* Blessings from Parents (Elegant supporting attribution) */}
        <RevealAnimation delay={0.3}>
          <div className="max-w-2xl mx-auto pt-2">
            <p className="font-body text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#95666A] mb-6 font-light">
              With the love &amp; blessings of our parents
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 text-center">
              {/* Groom's Parents */}
              <div className="flex flex-col items-center">
                <p className="font-serif text-lg sm:text-xl text-[#541820] font-light leading-relaxed">
                  {weddingData.families.familyOne.father}
                </p>
                <p className="font-body text-xs text-[#95666A] my-0.5 font-light">&amp;</p>
                <p className="font-serif text-lg sm:text-xl text-[#541820] font-light leading-relaxed">
                  {weddingData.families.familyOne.mother}
                </p>
              </div>

              {/* Bride's Parents */}
              <div className="flex flex-col items-center pt-4 sm:pt-0 border-t border-[#541820]/10 sm:border-t-0">
                <p className="font-serif text-lg sm:text-xl text-[#541820] font-light leading-relaxed">
                  {weddingData.families.familyTwo.father}
                </p>
                <p className="font-body text-xs text-[#95666A] my-0.5 font-light">&amp;</p>
                <p className="font-serif text-lg sm:text-xl text-[#541820] font-light leading-relaxed">
                  {weddingData.families.familyTwo.mother}
                </p>
              </div>
            </div>
          </div>
        </RevealAnimation>
      </div>
    </section>
  );
};

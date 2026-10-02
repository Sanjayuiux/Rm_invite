import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const InvitationIntro: React.FC = () => {
  return (
    <section
      id="invitation"
      className="relative py-20 sm:py-28 px-6 sm:px-10 max-w-4xl mx-auto text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center"
      >
        {/* Small label */}
        <SectionLabel>Wedding Invitation</SectionLabel>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B2C] font-normal tracking-wide mt-2 mb-8 sm:mb-10">
          With the blessings of our families
        </h2>

        {/* Family Names Container */}
        <div className="flex flex-col items-center gap-3 sm:gap-4 my-2">
          {/* Family One */}
          <div className="text-center">
            <p className="font-serif text-xl sm:text-2xl text-[#2A2119] font-normal leading-relaxed">
              {weddingData.families.familyOne.father}
            </p>
            <span className="font-script text-lg sm:text-xl text-[#B69A61] block -my-0.5">
              &amp;
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#2A2119] font-normal leading-relaxed">
              {weddingData.families.familyOne.mother}
            </p>
          </div>

          <p className="font-body text-[11px] uppercase tracking-[0.25em] text-[#788D78] font-medium my-1">
            and
          </p>

          {/* Family Two */}
          <div className="text-center">
            <p className="font-serif text-xl sm:text-2xl text-[#2A2119] font-normal leading-relaxed">
              {weddingData.families.familyTwo.father}
            </p>
            <span className="font-script text-lg sm:text-xl text-[#B69A61] block -my-0.5">
              &amp;
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#2A2119] font-normal leading-relaxed">
              {weddingData.families.familyTwo.mother}
            </p>
          </div>
        </div>

        {/* Traditional Ornamental Divider */}
        <Ornament type="divider" className="my-8 sm:my-10" />

        {/* Invitation Text */}
        <p className="font-body text-base sm:text-lg md:text-xl text-[#2A2119]/85 max-w-2xl leading-relaxed font-light my-2">
          {weddingData.families.invitationCopy}
        </p>

        {/* Couple Names with Qualifications */}
        <div className="mt-10 sm:mt-12 flex flex-col items-center">
          <div className="text-center">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B2C] font-normal tracking-wide">
              {weddingData.couple.groom}
              <span className="text-base sm:text-lg text-[#788D78] font-body ml-2 font-light">
                {weddingData.couple.groomQualification}
              </span>
            </h3>
          </div>

          <div className="my-2 flex items-center justify-center gap-3">
            <span className="w-8 h-[1px] bg-[#B69A61]/50" />
            <span className="font-script text-2xl sm:text-3xl text-[#B69A61] font-normal">
              weds
            </span>
            <span className="w-8 h-[1px] bg-[#B69A61]/50" />
          </div>

          <div className="text-center">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B2C] font-normal tracking-wide">
              {weddingData.couple.bride}
              <span className="text-base sm:text-lg text-[#788D78] font-body ml-2 font-light">
                {weddingData.couple.brideQualification}
              </span>
            </h3>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

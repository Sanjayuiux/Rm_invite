import React from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const FamilySection: React.FC = () => {
  return (
    <section
      id="family"
      className="relative py-24 sm:py-32 px-6 sm:px-10 bg-[#EEE5D2]/35 border-t border-[#B69A61]/25 text-center"
    >
      <div className="max-w-4xl mx-auto">
        <SectionLabel>{weddingData.families.introLabel}</SectionLabel>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B2C] font-normal tracking-wide mt-2 mb-12 sm:mb-16">
          {weddingData.families.heading}
        </h2>

        {/* Two Families Side by Side with Pure Editorial Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Groom's Parents */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center p-8 bg-[#F7F1E3] border border-[#B69A61]/35 shadow-sm"
          >
            <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#B69A61] font-semibold mb-3">
              {weddingData.families.familyOne.relation}
            </span>

            <p className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal leading-relaxed">
              {weddingData.families.familyOne.father}
            </p>

            <span className="font-script text-xl text-[#B69A61] my-1">
              &amp;
            </span>

            <p className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal leading-relaxed">
              {weddingData.families.familyOne.mother}
            </p>

            <Ornament type="small" className="opacity-50 mt-4" />
          </motion.div>

          {/* Bride's Parents */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center p-8 bg-[#F7F1E3] border border-[#B69A61]/35 shadow-sm"
          >
            <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#B69A61] font-semibold mb-3">
              {weddingData.families.familyTwo.relation}
            </span>

            <p className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal leading-relaxed">
              {weddingData.families.familyTwo.father}
            </p>

            <span className="font-script text-xl text-[#B69A61] my-1">
              &amp;
            </span>

            <p className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal leading-relaxed">
              {weddingData.families.familyTwo.mother}
            </p>

            <Ornament type="small" className="opacity-50 mt-4" />
          </motion.div>
        </div>

        {/* Closing Blessing Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 sm:mt-18"
        >
          <p className="font-serif text-xl sm:text-2xl text-[#183B2C] italic max-w-xl mx-auto font-normal">
            "{weddingData.families.closingBlessing}"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

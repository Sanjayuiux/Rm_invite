import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const Timeline: React.FC = () => {
  return (
    <section
      id="timeline"
      className="relative py-24 sm:py-32 px-6 sm:px-10 max-w-4xl mx-auto overflow-hidden"
    >
      <div className="text-center mb-16 sm:mb-20">
        <SectionLabel>Schedule</SectionLabel>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#183B2C] font-normal tracking-wide">
          Two days of celebration
        </h2>
        <p className="font-body text-xs sm:text-sm uppercase tracking-[0.25em] text-[#788D78] mt-2">
          Coimbatore, Tamil Nadu
        </p>
      </div>

      {/* Editorial Vertical Timeline */}
      <div className="relative">
        {/* Central Vertical Line */}
        <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[1px] bg-gradient-to-b from-[#B69A61]/20 via-[#B69A61]/60 to-[#B69A61]/20 -translate-x-1/2" />

        <div className="space-y-16 sm:space-y-24">
          {weddingData.timeline.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } gap-6 sm:gap-12 pl-12 sm:pl-0`}
              >
                {/* Milestone Node on line */}
                <div className="absolute left-4 sm:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="w-5 h-5 rounded-full bg-[#F7F1E3] border-2 border-[#183B2C] flex items-center justify-center shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B69A61]" />
                  </div>
                </div>

                {/* Content Box (occupies 1/2 of width on desktop) */}
                <div
                  className={`w-full sm:w-1/2 ${
                    isEven ? 'sm:text-right sm:pr-8' : 'sm:text-left sm:pl-8'
                  }`}
                >
                  {/* Event Tag */}
                  <span className="font-body text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#B69A61] font-semibold block mb-1">
                    {event.tag}
                  </span>

                  {/* Date & Day */}
                  <div className="mb-2">
                    <span className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal">
                      {event.date}
                    </span>
                    <span className="font-body text-[11px] uppercase tracking-[0.2em] text-[#788D78] block font-medium">
                      {event.day}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#183B2C] font-normal mb-2">
                    {event.title}
                  </h3>

                  {/* Time */}
                  <div
                    className={`inline-flex items-center gap-1.5 text-[#183B2C] bg-[#EEE5D2]/70 px-3 py-1 border border-[#B69A61]/30 rounded-none mb-3 ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-[#B69A61]" />
                    <span className="font-body text-xs tracking-wider font-medium">
                      {event.time}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-sm sm:text-base text-[#2A2119]/80 font-light leading-relaxed mb-3">
                    {event.description}
                  </p>

                  {/* Venue location line */}
                  <div
                    className={`flex items-center gap-1.5 text-xs text-[#788D78] font-body ${
                      isEven ? 'sm:justify-end' : 'sm:justify-start'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#B69A61] shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                {/* Empty spacer for alignment on opposite side */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="text-center mt-16 sm:mt-20">
        <Ornament type="small" className="opacity-60" />
      </div>
    </section>
  );
};

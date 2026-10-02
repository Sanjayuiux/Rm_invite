import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CalendarPlus, Clock } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { PrimaryButton } from './PrimaryButton';
import { Countdown } from './Countdown';
import { Ornament } from './Ornament';
import { weddingData } from '../data/weddingData';

export const WeddingSection: React.FC = () => {
  const handleAddToCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Manoj & Ranjani Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${weddingData.wedding.calendarDetails.title}`,
      `DESCRIPTION:${weddingData.wedding.calendarDetails.description}`,
      `LOCATION:${weddingData.wedding.fullAddress}`,
      `DTSTART:${weddingData.wedding.calendarDetails.startDate}`,
      `DTEND:${weddingData.wedding.calendarDetails.endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Manoj-Ranjani-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="wedding"
      className="relative py-24 sm:py-36 px-6 sm:px-12 bg-[#FAF4F5]/70 border-y border-[#7B2431]/20 overflow-hidden text-center"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Label */}
        <SectionLabel>The Wedding</SectionLabel>

        {/* Dramatic Date Section - Monumental Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="my-6 sm:my-10"
        >
          {/* Huge Number in Royal Burgundy */}
          <div className="font-serif text-[110px] sm:text-[160px] md:text-[210px] lg:text-[240px] text-[#4A0E17] leading-none font-normal tracking-tighter select-none">
            {weddingData.wedding.dayNumber}
          </div>

          {/* Month & Year */}
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#4A0E17] tracking-[0.25em] uppercase font-normal -mt-2 sm:-mt-6">
            {weddingData.wedding.monthYear}
          </p>

          <p className="font-body text-xs sm:text-sm tracking-[0.35em] text-[#854D56] uppercase font-semibold mt-2">
            {weddingData.wedding.day}
          </p>
        </motion.div>

        {/* Live Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Countdown />
        </motion.div>

        <Ornament type="divider" className="my-10 max-w-sm mx-auto" />

        {/* Ceremony Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          {/* Heading */}
          <div>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#4A0E17] font-normal tracking-wide">
              {weddingData.wedding.title}
            </h3>
            <span className="font-body text-[11px] sm:text-[12px] tracking-[0.28em] uppercase text-[#7B2431] font-semibold block mt-1.5">
              Auspicious Muhurtham
            </span>
          </div>

          {/* Time Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#7B2431]/30 bg-[#FFFFFF] text-[#4A0E17] shadow-sm">
            <Clock className="w-4 h-4 text-[#7B2431]" />
            <span className="font-body text-xs sm:text-sm tracking-wider font-semibold">
              {weddingData.wedding.time}
            </span>
          </div>

          {/* Venue Information */}
          <div className="pt-2">
            <h4 className="font-serif text-2xl sm:text-3xl text-[#4A0E17] font-normal">
              {weddingData.wedding.venue}
            </h4>
            <p className="font-body text-sm sm:text-base text-[#3B2226]/80 font-light mt-1">
              {weddingData.wedding.address}
            </p>
            <p className="font-body text-xs sm:text-sm text-[#854D56] uppercase tracking-[0.2em] mt-0.5 font-semibold">
              {weddingData.wedding.city}
            </p>
          </div>

          {/* Action CTAs: Get Directions & Add to Calendar */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <PrimaryButton
              as="a"
              href={weddingData.wedding.googleMapsUrl}
              target="_blank"
              variant="primary"
              size="md"
              icon={<MapPin className="w-4 h-4" />}
            >
              Get Directions
            </PrimaryButton>

            <PrimaryButton
              onClick={handleAddToCalendar}
              variant="outline"
              size="md"
              icon={<CalendarPlus className="w-4 h-4" />}
            >
              Add to Calendar
            </PrimaryButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

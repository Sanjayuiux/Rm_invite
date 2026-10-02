import React from 'react';
import { MapPin, CalendarPlus, Clock, Sparkles } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { PrimaryButton } from './PrimaryButton';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const ReceptionSection: React.FC = () => {
  const handleAddToCalendar = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Manoj & Ranjani Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `SUMMARY:${weddingData.reception.calendarDetails.title}`,
      `DESCRIPTION:${weddingData.reception.calendarDetails.description}`,
      `LOCATION:${weddingData.wedding.fullAddress}`,
      `DTSTART:${weddingData.reception.calendarDetails.startDate}`,
      `DTEND:${weddingData.reception.calendarDetails.endDate}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Manoj-Ranjani-Reception.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="reception"
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Asymmetric Two-Column Editorial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Side: Dramatic Evening Typography */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <RevealAnimation direction="left" delay={0}>
            <SectionLabel theme="burgundy" className="justify-start">
              {weddingData.reception.title}
            </SectionLabel>

            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#4A0E17] font-normal leading-[1.05] mt-2 mb-6">
              An evening before
              <br />
              <span className="text-[#7B2431]">the beginning</span>
            </h2>

            <div className="flex items-center gap-3 text-[#7B2431] mb-6">
              <Sparkles className="w-4 h-4 opacity-80" />
              <span className="font-body text-xs sm:text-[13px] tracking-[0.25em] uppercase font-light">
                The Grand Reception
              </span>
            </div>

            <p className="font-body text-base sm:text-lg text-[#3B2226]/80 font-light leading-relaxed max-w-lg mb-8">
              Before the sacred vows at dawn, join us under the evening lights for celebrations, music, and an exquisite dinner banquet with family and friends.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton
                as="a"
                href={weddingData.reception.googleMapsUrl}
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
          </RevealAnimation>
        </div>

        {/* Right Side: Architectural Stationery Slate */}
        <div className="lg:col-span-5 w-full">
          <RevealAnimation direction="right" delay={0.2}>
            <div className="relative p-8 sm:p-10 bg-[#FFFFFF] border border-[#7B2431]/25 text-left shadow-sm">
              <div className="absolute inset-2 border border-dashed border-[#7B2431]/15 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Date */}
                <div>
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#854D56] font-light block">
                    Date
                  </span>
                  <p className="font-serif text-4xl sm:text-5xl text-[#4A0E17] font-normal leading-tight mt-1">
                    21 November 2026
                  </p>
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-[#7B2431] font-light mt-0.5">
                    Saturday Evening
                  </p>
                </div>

                {/* Time */}
                <div className="border-t border-[#7B2431]/15 pt-5">
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#854D56] font-light block">
                    Time
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4 text-[#7B2431]" />
                    <p className="font-body text-sm sm:text-base text-[#4A0E17] font-light">
                      {weddingData.reception.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="border-t border-[#7B2431]/15 pt-5">
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-[#854D56] font-light block">
                    Venue
                  </span>
                  <p className="font-serif text-3xl sm:text-4xl text-[#4A0E17] font-normal leading-tight mt-1">
                    {weddingData.reception.venue}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-[#3B2226]/75 font-light mt-0.5">
                    {weddingData.reception.address}
                  </p>
                  <p className="font-body text-xs text-[#854D56] uppercase tracking-[0.18em] font-semibold mt-0.5">
                    {weddingData.reception.city}
                  </p>
                </div>

                <Ornament type="small" color="#7B2431" className="opacity-50 mt-2" />
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </section>
  );
};

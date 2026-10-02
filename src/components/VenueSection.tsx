import React from 'react';
import { MapPin, Navigation as NavIcon, Car, Plane, Train } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { PrimaryButton } from './PrimaryButton';
import { Ornament } from './Ornament';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const VenueSection: React.FC = () => {
  return (
    <section
      id="venue"
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto"
    >
      <div className="text-center mb-14 sm:mb-18">
        <RevealAnimation delay={0}>
          <SectionLabel>The Venue</SectionLabel>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#4A0E17] font-normal tracking-wide">
            {weddingData.venue.name}
          </h2>
          <p className="font-body text-sm sm:text-base text-[#3B2226]/80 font-light mt-2 max-w-xl mx-auto">
            {weddingData.venue.addressLine1}, {weddingData.venue.addressLine2}, {weddingData.venue.city}
          </p>
        </RevealAnimation>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch mb-12">
        {/* Large Venue Image Placeholder */}
        <div className="lg:col-span-7 flex flex-col">
          <RevealAnimation direction="left" delay={0.15} className="h-full">
            <WeddingImagePlaceholder
              type="VENUE"
              aspectRatio="wide"
              label="SRI LAKSHMI MAHAL"
              src="/images/venue-placeholder.jpg"
              alt="Sri Lakshmi Mahal Kovilpalayam Coimbatore"
              className="h-full min-h-[340px] shadow-md"
            />
          </RevealAnimation>
        </div>

        {/* Map Area & Directions Card */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <RevealAnimation direction="right" delay={0.25} className="h-full">
            <div className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#7B2431]/25 shadow-sm h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#7B2431] mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="font-body text-[11px] uppercase tracking-[0.25em] font-semibold">
                    Location &amp; Access
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#4A0E17] font-normal mb-3">
                  Sri Lakshmi Mahal
                </h3>

                <p className="font-body text-sm text-[#3B2226]/80 leading-relaxed font-light mb-6">
                  Located conveniently along the prime Kovai – Sathy Highway in Kovilpalayam, the venue provides spacious air-conditioned halls and valet parking for guests.
                </p>

                {/* Travel Distances */}
                <div className="space-y-4 border-t border-[#7B2431]/20 pt-5">
                  {weddingData.venue.travelNotes.map((note, idx) => {
                    const Icon = idx === 0 ? Plane : idx === 1 ? Train : Car;
                    return (
                      <div key={note.title} className="flex items-start gap-3">
                        <Icon className="w-4 h-4 text-[#7B2431] mt-0.5 shrink-0" />
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-body text-xs sm:text-[13px] font-semibold text-[#4A0E17]">
                              {note.title}
                            </span>
                            <span className="font-body text-[11px] text-[#854D56] font-light">
                              ({note.distance})
                            </span>
                          </div>
                          <p className="font-body text-xs text-[#3B2226]/70 font-light mt-0.5">
                            {note.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-8 border-t border-[#7B2431]/20 mt-6 flex flex-col sm:flex-row items-center gap-4">
                <PrimaryButton
                  as="a"
                  href={weddingData.venue.googleMapsUrl}
                  target="_blank"
                  variant="primary"
                  size="md"
                  icon={<NavIcon className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  Get Directions
                </PrimaryButton>

                <span className="font-body text-xs text-[#854D56] tracking-wider uppercase font-semibold">
                  Opens in Google Maps
                </span>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>

      <div className="text-center">
        <RevealAnimation delay={0.2}>
          <Ornament type="divider" color="#7B2431" className="max-w-xs mx-auto opacity-70" />
        </RevealAnimation>
      </div>
    </section>
  );
};

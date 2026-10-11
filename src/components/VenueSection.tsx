import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { PrimaryButton } from './PrimaryButton';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const VenueSection: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section
      id="venue"
      className="relative py-24 sm:py-32 px-5 sm:px-10 md:px-14 bg-[#F1E8DA] border-t border-[#541820]/8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <RevealAnimation delay={0}>
          <SectionLabel className="mb-8">The Place</SectionLabel>
          <h2
            className="font-serif italic text-[#351015] font-light text-center mb-3"
            style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
          >
            {weddingData.venue.name}
          </h2>
          <p className="text-center font-body text-sm text-[#541820]/60 font-light mb-10 sm:mb-12 tracking-wide px-4">
            {weddingData.venue.addressLine1}, {weddingData.venue.addressLine2}, {weddingData.venue.city}
          </p>
        </RevealAnimation>

        {/* Large venue image with smooth viewport reveal */}
        <RevealAnimation delay={0.15}>
          <div className="relative max-w-5xl mx-auto mb-10 overflow-hidden group shadow-lg">
            <div className="aspect-[16/9] sm:aspect-[21/10] w-full overflow-hidden">
              <motion.img
                src="/images/sri-lakshmi-mahal.jpg"
                alt="Sri Lakshmi Mahal Kovilpalayam Coimbatore"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                initial={{ scale: 1.08, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                loading="lazy"
              />
            </div>
            {/* Subtle luxury stationery border outline */}
            <div className="absolute inset-3 sm:inset-5 border border-[#F8F3E9]/25 pointer-events-none" />
          </div>
        </RevealAnimation>

        {/* CTAs */}
        <RevealAnimation delay={0.25}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton
              as="a"
              href={weddingData.venue.googleMapsUrl}
              target="_blank"
              variant="primary"
              size="md"
              icon={<MapPin className="w-4 h-4" />}
            >
              Get Directions
            </PrimaryButton>
            <PrimaryButton
              onClick={() => setShowMap(!showMap)}
              variant="outline"
              size="md"
            >
              {showMap ? 'Hide Map' : 'View Map'}
            </PrimaryButton>
          </div>
        </RevealAnimation>

        {showMap && (
          <RevealAnimation delay={0.1}>
            <div className="max-w-4xl mx-auto mt-10 border border-[#541820]/15 shadow-sm">
              <iframe
                title="Sri Lakshmi Mahal"
                width="100%"
                height="380"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </RevealAnimation>
        )}
      </div>
    </section>
  );
};

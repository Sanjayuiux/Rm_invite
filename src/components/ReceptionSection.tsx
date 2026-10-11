import React from 'react';
import { MapPin } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const ReceptionSection: React.FC = () => {
  return (
    <section
      id="reception"
      className="relative bg-[#F1E8DA] border-t border-[#541820]/8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Burgundy left block */}
        <div className="lg:col-span-4 bg-[#541820] flex flex-col items-start justify-center px-8 sm:px-12 py-16 lg:py-24">
          <RevealAnimation direction="left" delay={0}>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[#F8F3E9]/45 mb-6">
              The Celebration
            </p>
            <div
              className="font-serif text-[#F8F3E9] font-light leading-none select-none"
              style={{ fontSize: 'clamp(90px, 13vw, 170px)' }}
            >
              21
            </div>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-[#F8F3E9]/55 mt-2 font-light">
              NOVEMBER 2026
            </p>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-[#B69A61]/70 mt-1 font-light">
              SATURDAY
            </p>
          </RevealAnimation>
        </div>

        {/* Right: Details + Image */}
        <div className="lg:col-span-8 flex flex-col lg:flex-row items-stretch">
          {/* Details */}
          <div className="flex-1 px-8 sm:px-12 py-16 lg:py-24 flex flex-col justify-center">
            <RevealAnimation delay={0.15}>
              <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-[#351015] font-light mb-3">
                Reception
              </h2>
              <p className="font-body text-[10px] tracking-[0.25em] uppercase text-[#95666A] mb-8 font-light">
                Evening Felicitations
              </p>
              <div className="space-y-4 mb-8">
                <p className="font-serif italic text-2xl sm:text-3xl text-[#541820] font-light">
                  06:00 PM — 09:00 PM
                </p>
                <div>
                  <p className="font-serif text-xl sm:text-2xl text-[#351015] font-light">
                    {weddingData.reception.venue}
                  </p>
                  <p className="font-body text-xs sm:text-sm text-[#541820]/60 font-light mt-1 leading-relaxed">
                    {weddingData.reception.address},<br />
                    {weddingData.reception.city}.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <PrimaryButton
                  as="a"
                  href={weddingData.reception.googleMapsUrl}
                  target="_blank"
                  variant="primary"
                  size="sm"
                  icon={<MapPin className="w-3.5 h-3.5" />}
                >
                  Get Directions
                </PrimaryButton>
                <PrimaryButton
                  as="a"
                  href="https://maps.google.com/maps?q=Sri+Lakshmi+Mahal+Kovilpalayam+Coimbatore"
                  target="_blank"
                  variant="outline"
                  size="sm"
                >
                  View Map
                </PrimaryButton>
              </div>
            </RevealAnimation>
          </div>

          {/* Reception image */}
          <div className="lg:w-[42%] min-h-[280px] lg:min-h-0">
            <WeddingImagePlaceholder
              type="COUPLE_PORTRAIT"
              aspectRatio="portrait"
              label="RECEPTION"
              src="/images/reception-placeholder.jpg"
              alt="Wedding Reception"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

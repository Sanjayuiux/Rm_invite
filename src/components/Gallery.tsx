import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Sparkles, ChevronRight } from 'lucide-react';
import { SectionLabel } from './SectionLabel';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { Lightbox } from './Lightbox';
import { RevealAnimation } from './RevealAnimation';
import { weddingData } from '../data/weddingData';

export const Gallery: React.FC = () => {
  const [activeHighlight, setActiveHighlight] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = weddingData.gallery;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[activeHighlight];

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-36 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Editorial Header with Carattere Calligraphy */}
      <div className="text-center mb-14 sm:mb-20">
        <RevealAnimation delay={0}>
          <SectionLabel>Visual Chronicle</SectionLabel>

          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#4A0E17] font-normal leading-[1.05] my-2">
            Moments in Time
          </h2>

          <p className="font-body text-xs sm:text-sm tracking-[0.28em] uppercase text-[#854D56] font-light mt-3">
            Four Chapters of Love &amp; Devotion
          </p>
        </RevealAnimation>

        {/* Interactive Chapter Pills */}
        <RevealAnimation delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {images.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveHighlight(idx)}
                className={`px-4 py-2 text-[11px] sm:text-xs uppercase tracking-[0.2em] font-body transition-all duration-300 border cursor-pointer ${
                  activeHighlight === idx
                    ? 'bg-[#5C131D] text-[#FFFFFF] border-[#5C131D] shadow-sm font-normal'
                    : 'bg-white/80 text-[#3B2226]/75 border-[#7B2431]/25 hover:border-[#5C131D] font-light'
                }`}
              >
                <span className="text-[#C5A869] mr-1.5 font-normal">0{idx + 1}</span>
                <span>{item.placeholderLabel.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </RevealAnimation>
      </div>

      {/* Redesigned Luxury Editorial Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Spotlight Masterpiece Frame */}
        <div className="lg:col-span-7">
          <RevealAnimation direction="left" delay={0.2}>
            <div className="relative p-3 sm:p-5 bg-[#FFFFFF] border border-[#7B2431]/25 shadow-xl">
              {/* Delicate Antique Gold Corner Accents */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-[#C5A869] pointer-events-none" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-[#C5A869] pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-[#C5A869] pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-[#C5A869] pointer-events-none" />

              {/* Main Image with Smooth Crossfade Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative group cursor-pointer"
                  onClick={() => openLightbox(activeHighlight)}
                >
                  <WeddingImagePlaceholder
                    type="GALLERY"
                    aspectRatio="portrait"
                    label={currentImage.placeholderLabel}
                    src={currentImage.src}
                    alt={currentImage.alt}
                    className="w-full max-h-[520px] object-cover"
                    showHoverEffect={true}
                  />

                  {/* Floating Fullscreen Action Badge */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#4A0E17]/85 backdrop-blur-md text-white text-[10px] tracking-wider uppercase font-body">
                      <Maximize2 className="w-3 h-3 text-[#C5A869]" />
                      Expand
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Spotlight Caption Strip */}
              <div className="pt-4 pb-2 px-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#7B2431]/15 mt-3">
                <div className="text-center sm:text-left">
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold block">
                    Memory 0{activeHighlight + 1}
                  </span>
                  <p className="font-serif text-2xl sm:text-3xl text-[#4A0E17] font-normal leading-tight mt-0.5">
                    {currentImage.caption}
                  </p>
                </div>

                <button
                  onClick={() => openLightbox(activeHighlight)}
                  className="inline-flex items-center gap-1.5 text-xs text-[#5C131D] hover:text-[#4A0E17] font-body uppercase tracking-[0.2em] font-light cursor-pointer group"
                >
                  <span>View Fullscreen</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </RevealAnimation>
        </div>

        {/* Right Column: Curated 3-Item Vignette Stack */}
        <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-5">
          {images.map((item, idx) => {
            const isSelected = activeHighlight === idx;

            return (
              <RevealAnimation
                key={item.id}
                direction="right"
                delay={0.15 + idx * 0.1}
              >
                <div
                  onClick={() => setActiveHighlight(idx)}
                  className={`group relative p-3.5 sm:p-4 bg-white border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                    isSelected
                      ? 'border-[#5C131D] shadow-md ring-1 ring-[#5C131D]/40'
                      : 'border-[#7B2431]/20 hover:border-[#7B2431]/60 hover:bg-[#FAF4F5]/40'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden border border-[#7B2431]/20 bg-[#F5EFEB]">
                    <WeddingImagePlaceholder
                      type="GALLERY"
                      aspectRatio="portrait"
                      label={`0${idx + 1}`}
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      showHoverEffect={false}
                    />

                    {isSelected && (
                      <div className="absolute inset-0 bg-[#5C131D]/20 border-2 border-[#5C131D]" />
                    )}
                  </div>

                  {/* Thumbnail Information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-[#7B2431] font-semibold">
                        Chapter 0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-[#5C131D] font-body bg-[#FAF0F2] px-2 py-0.5 rounded-full border border-[#7B2431]/20">
                          <Sparkles className="w-2.5 h-2.5 text-[#C5A869]" />
                          Active
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl text-[#4A0E17] font-normal truncate">
                      {item.placeholderLabel}
                    </h4>

                    <p className="font-body text-xs text-[#3B2226]/75 font-light line-clamp-1 mt-0.5">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </RevealAnimation>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

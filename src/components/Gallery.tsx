import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionLabel } from './SectionLabel';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';
import { Lightbox } from './Lightbox';
import { weddingData } from '../data/weddingData';

export const Gallery: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = weddingData.gallery;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section
      id="gallery"
      className="relative py-24 sm:py-32 px-6 sm:px-10 md:px-14 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16 sm:mb-20">
        <SectionLabel>Visual Chronicle</SectionLabel>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#4A0E17] font-normal tracking-wide">
          Moments in time
        </h2>
        <p className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase text-[#854D56] mt-2 font-semibold">
          Editorial Gallery
        </p>
      </div>

      {/* Balanced 4-Photo Asymmetric Editorial Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Photo 1: Large Editorial Portrait (Cols 1-7) */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingImagePlaceholder
            type="GALLERY"
            aspectRatio="portrait"
            label={images[0].placeholderLabel}
            src={images[0].src}
            alt={images[0].alt}
            onClick={() => openLightbox(0)}
            className="shadow-md"
          />
          <p className="font-serif text-sm sm:text-base text-[#3B2226]/80 italic mt-3 text-center sm:text-left">
            {images[0].caption}
          </p>
        </motion.div>

        {/* Photo 2: Atmospheric Landscape (Cols 8-12) */}
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingImagePlaceholder
            type="GALLERY"
            aspectRatio="landscape"
            label={images[1].placeholderLabel}
            src={images[1].src}
            alt={images[1].alt}
            onClick={() => openLightbox(1)}
            className="shadow-md"
          />
          <p className="font-serif text-sm sm:text-base text-[#3B2226]/80 italic mt-3 text-center sm:text-left">
            {images[1].caption}
          </p>
        </motion.div>

        {/* Photo 3: Candid Portrait (Cols 1-5) */}
        <motion.div
          className="md:col-span-5"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingImagePlaceholder
            type="GALLERY"
            aspectRatio="portrait"
            label={images[2].placeholderLabel}
            src={images[2].src}
            alt={images[2].alt}
            onClick={() => openLightbox(2)}
            className="shadow-md"
          />
          <p className="font-serif text-sm sm:text-base text-[#3B2226]/80 italic mt-3 text-center sm:text-left">
            {images[2].caption}
          </p>
        </motion.div>

        {/* Photo 4: Forever Embrace Landscape (Cols 6-12) */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <WeddingImagePlaceholder
            type="GALLERY"
            aspectRatio="landscape"
            label={images[3].placeholderLabel}
            src={images[3].src}
            alt={images[3].alt}
            onClick={() => openLightbox(3)}
            className="shadow-md"
          />
          <p className="font-serif text-sm sm:text-base text-[#3B2226]/80 italic mt-3 text-center sm:text-left">
            {images[3].caption}
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={images}
        currentIndex={currentIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </section>
  );
};

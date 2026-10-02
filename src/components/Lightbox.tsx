import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WeddingImagePlaceholder } from './WeddingImagePlaceholder';

interface LightboxProps {
  isOpen: boolean;
  images: Array<{
    id: string;
    src: string;
    alt: string;
    caption: string;
    placeholderLabel: string;
    aspectRatio: 'portrait' | 'landscape' | 'tall';
  }>;
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      onNext();
    } else if (diff < -50) {
      onPrev();
    }
    setTouchStart(null);
  };

  if (!isOpen) return null;

  const currentItem = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#24060B]/97 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar: counter & close */}
        <div className="flex items-center justify-between z-20 text-[#FAF7F2] px-2">
          <span className="font-body text-xs sm:text-sm tracking-[0.25em] uppercase text-[#C5A869] font-medium">
            {currentIndex + 1} / {images.length}
          </span>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#7B2431]/60 bg-[#4A0E17]/60 flex items-center justify-center text-[#FFFFFF] hover:border-[#C5A869] transition-all cursor-pointer focus:outline-none"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center image container with navigation buttons */}
        <div className="relative flex-1 flex items-center justify-center my-auto max-w-5xl mx-auto w-full px-2 sm:px-12">
          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            className="absolute left-0 sm:left-2 z-20 w-11 h-11 rounded-full border border-[#7B2431]/60 bg-[#4A0E17]/80 text-[#FFFFFF] flex items-center justify-center hover:border-[#C5A869] transition-all cursor-pointer focus:outline-none"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Current Image View */}
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full max-w-xl max-h-[75vh] flex items-center justify-center"
          >
            <WeddingImagePlaceholder
              type="GALLERY"
              aspectRatio={currentItem.aspectRatio}
              label={currentItem.placeholderLabel}
              src={currentItem.src}
              alt={currentItem.alt}
              className="max-h-[70vh] shadow-2xl"
              showHoverEffect={false}
            />
          </motion.div>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            className="absolute right-0 sm:right-2 z-20 w-11 h-11 rounded-full border border-[#7B2431]/60 bg-[#4A0E17]/80 text-[#FFFFFF] flex items-center justify-center hover:border-[#C5A869] transition-all cursor-pointer focus:outline-none"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Caption */}
        <div className="text-center z-20 py-2">
          <p className="font-serif text-lg sm:text-xl text-[#FAF7F2] font-normal italic">
            {currentItem.caption}
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-[#C5A869]/80 block mt-1 font-medium">
            Swipe or use arrows to navigate
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { Monogram } from './Monogram';
import { Ornament } from './Ornament';

export type PlaceholderType =
  | 'COUPLE_HERO'
  | 'COUPLE_PORTRAIT'
  | 'VENUE'
  | 'GALLERY'
  | 'FINAL_PHOTO';

interface WeddingImagePlaceholderProps {
  type: PlaceholderType;
  aspectRatio?: 'portrait' | 'landscape' | 'square' | 'tall' | 'hero' | 'wide';
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
  onClick?: () => void;
  showHoverEffect?: boolean;
}

export const WeddingImagePlaceholder: React.FC<WeddingImagePlaceholderProps> = ({
  type,
  aspectRatio = 'portrait',
  label,
  src,
  alt = 'Manoj & Ranjani Wedding Photograph',
  className = '',
  onClick,
  showHoverEffect = true
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Aspect ratio classes
  const aspectClasses = {
    hero: 'aspect-[3/4] sm:aspect-[4/5] lg:aspect-[16/10] min-h-[500px] max-h-[85vh]',
    portrait: 'aspect-[3/4] min-h-[380px]',
    tall: 'aspect-[9/16] min-h-[420px]',
    landscape: 'aspect-[16/10] min-h-[280px]',
    wide: 'aspect-[21/9] min-h-[320px]',
    square: 'aspect-square min-h-[300px]'
  }[aspectRatio];

  const defaultLabels = {
    COUPLE_HERO: 'COUPLE PORTRAIT',
    COUPLE_PORTRAIT: 'EDITORIAL PHOTOGRAPHY',
    VENUE: 'SRI LAKSHMI MAHAL',
    GALLERY: 'WEDDING GALLERY',
    FINAL_PHOTO: 'FOREVER STARTS HERE'
  }[type];

  const displayLabel = label || defaultLabels;

  // Has valid custom image loaded?
  const showActualImage = src && imageLoaded && !imageError;

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
      className={`relative w-full overflow-hidden transition-all duration-500 group select-none ${
        onClick ? 'cursor-pointer' : ''
      } ${aspectClasses} ${className}`}
    >
      {/* Background paper texture & warm tint */}
      <div className="absolute inset-0 bg-[#EEE5D2]/70" />

      {/* Actual image element if provided */}
      {src && (
        <img
          src={src}
          alt={alt}
          onLoad={(e) => {
            // Check if natural width is > 1 (to ignore 1x1 placeholder binary)
            const img = e.currentTarget;
            if (img.naturalWidth > 10) {
              setImageLoaded(true);
            } else {
              setImageError(true);
            }
          }}
          onError={() => setImageError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
            showHoverEffect ? 'group-hover:scale-[1.025]' : ''
          } ${showActualImage ? 'opacity-100' : 'opacity-0'}`}
        />
      )}

      {/* Editorial Luxury Stationery Frame (Shown when photo not yet provided or loading) */}
      {!showActualImage && (
        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col items-center justify-between border border-[#B69A61]/30 m-2 sm:m-3 transition-colors duration-300 group-hover:border-[#B69A61]/60">
          {/* Subtle outer inner double border */}
          <div className="absolute inset-1.5 border border-dashed border-[#B69A61]/20 pointer-events-none" />

          {/* Top corner accents */}
          <div className="w-full flex items-center justify-between text-[#B69A61]/50 px-1 pt-1 z-10">
            <span className="text-[10px] tracking-[0.25em] font-body uppercase font-medium">
              M &amp; R
            </span>
            <Ornament type="corner" color="#B69A61" className="w-4 h-4 opacity-40 rotate-90" />
          </div>

          {/* Center visual: Monogram + Editorial text */}
          <div className="flex flex-col items-center justify-center text-center my-auto px-4 z-10 py-6">
            <Monogram
              size={type === 'COUPLE_HERO' ? 'lg' : 'md'}
              variant="gold"
              className="mb-4 opacity-80 group-hover:scale-105 transition-transform duration-300"
            />

            <h4 className="font-serif text-[#183B2C] text-lg sm:text-xl md:text-2xl font-normal tracking-wide mb-1">
              {displayLabel}
            </h4>

            <p className="font-body text-[#788D78] text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-medium mt-1">
              Photograph Will Be Added
            </p>

            <Ornament type="small" className="mt-3 opacity-60" />
          </div>

          {/* Bottom details */}
          <div className="w-full flex items-center justify-between text-[#B69A61]/50 px-1 pb-1 z-10">
            <Ornament type="corner" color="#B69A61" className="w-4 h-4 opacity-40 -rotate-90" />
            <span className="text-[9px] tracking-[0.2em] font-body uppercase font-light text-[#2A2119]/50">
              22 · 11 · 2026
            </span>
          </div>
        </div>
      )}

      {/* Subtle antique gold border overlay */}
      <div className="absolute inset-0 border border-[#B69A61]/35 pointer-events-none transition-colors duration-300 group-hover:border-[#B69A61]/70" />
    </div>
  );
};

import React from 'react';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg' | 'seal';
  variant?: 'burgundy' | 'gold' | 'white' | 'subtle';
  className?: string;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 'md',
  variant = 'burgundy',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-10 h-10 text-[14px]',
    lg: 'w-16 h-16 text-[22px]',
    seal: 'w-20 h-20 sm:w-24 sm:h-24 text-[26px] sm:text-[30px]'
  }[size];

  const colorStyles = {
    burgundy: {
      border: 'border-[#5C131D]',
      text: 'text-[#5C131D]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#5C131D]/25'
    },
    gold: {
      border: 'border-[#B89758]/70',
      text: 'text-[#B89758]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#B89758]/30'
    },
    white: {
      border: 'border-[#FAF7F2]',
      text: 'text-[#FFFFFF]',
      bg: 'bg-[#5C131D]',
      innerBorder: 'border-[#C5A869]/50'
    },
    subtle: {
      border: 'border-[#7B2431]/20',
      text: 'text-[#5C131D]/80',
      bg: 'bg-[#F9F0F2]',
      innerBorder: 'border-[#7B2431]/20'
    }
  }[variant];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border relative transition-all duration-300 select-none ${sizeClasses} ${colorStyles.border} ${colorStyles.bg} ${className}`}
      aria-label="Manoj and Ranjani Monogram"
    >
      {/* Subtle inner concentric ring for fine stationery engraving feel */}
      <span
        className={`absolute inset-1 rounded-full border border-dashed pointer-events-none ${colorStyles.innerBorder}`}
      />

      <div className={`font-serif tracking-widest font-normal italic flex items-center justify-center ${colorStyles.text}`}>
        <span>M</span>
        <span className="text-[0.65em] mx-[1px] font-sans not-italic font-light opacity-75">&amp;</span>
        <span>R</span>
      </div>
    </div>
  );
};

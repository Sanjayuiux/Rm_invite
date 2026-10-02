import React from 'react';

interface MonogramProps {
  size?: 'sm' | 'md' | 'lg' | 'seal';
  variant?: 'gold' | 'forest' | 'cream' | 'subtle';
  className?: string;
}

export const Monogram: React.FC<MonogramProps> = ({
  size = 'md',
  variant = 'gold',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7 text-[11px]',
    md: 'w-10 h-10 text-[14px]',
    lg: 'w-16 h-16 text-[22px]',
    seal: 'w-20 h-20 sm:w-24 sm:h-24 text-[26px] sm:text-[30px]'
  }[size];

  const colorStyles = {
    gold: {
      border: 'border-[#B69A61]/70',
      text: 'text-[#B69A61]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#B69A61]/30'
    },
    forest: {
      border: 'border-[#183B2C]',
      text: 'text-[#183B2C]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#183B2C]/20'
    },
    cream: {
      border: 'border-[#EEE5D2]',
      text: 'text-[#F7F1E3]',
      bg: 'bg-[#183B2C]',
      innerBorder: 'border-[#B69A61]/50'
    },
    subtle: {
      border: 'border-[#2A2119]/20',
      text: 'text-[#2A2119]/80',
      bg: 'bg-[#EEE5D2]/40',
      innerBorder: 'border-[#B69A61]/25'
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

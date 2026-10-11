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
      border: 'border-[#541820]',
      text: 'text-[#541820]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#541820]/20'
    },
    gold: {
      border: 'border-[#B69A61]/70',
      text: 'text-[#B69A61]',
      bg: 'bg-transparent',
      innerBorder: 'border-[#B69A61]/30'
    },
    white: {
      border: 'border-[#F8F3E9]',
      text: 'text-[#F8F3E9]',
      bg: 'bg-[#541820]',
      innerBorder: 'border-[#B69A61]/50'
    },
    subtle: {
      border: 'border-[#541820]/20',
      text: 'text-[#541820]/80',
      bg: 'bg-[#F1E8DA]',
      innerBorder: 'border-[#541820]/15'
    }
  }[variant];

  return (
    <div
      className={`inline-flex items-center justify-center rounded-full border relative transition-all duration-300 select-none ${sizeClasses} ${colorStyles.border} ${colorStyles.bg} ${className}`}
      aria-label="Manoj and Ranjani Monogram"
    >
      <span
        className={`absolute inset-1 rounded-full border border-dashed pointer-events-none ${colorStyles.innerBorder}`}
      />
      <div className={`font-serif flex items-center justify-center leading-none ${colorStyles.text}`}>
        <span>M</span>
        <span className="text-[0.6em] mx-[1px] font-body font-light opacity-70">&amp;</span>
        <span>R</span>
      </div>
    </div>
  );
};

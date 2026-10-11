import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'burgundy' | 'gold' | 'light';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  theme = 'burgundy'
}) => {
  const colorClass = {
    burgundy: 'text-[#541820]/60',
    gold: 'text-[#B69A61]',
    light: 'text-[#F8F3E9]/70'
  }[theme];

  return (
    <div className={`flex items-center justify-center gap-3 mb-4 select-none ${className}`}>
      <span className="flex-1 max-w-[40px] h-[0.5px] bg-current opacity-30" />
      <span
        className={`text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-normal font-body ${colorClass}`}
      >
        {children}
      </span>
      <span className="flex-1 max-w-[40px] h-[0.5px] bg-current opacity-30" />
    </div>
  );
};

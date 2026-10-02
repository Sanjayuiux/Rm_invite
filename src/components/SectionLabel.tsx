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
    burgundy: 'text-[#7B2431]',
    gold: 'text-[#B89758]',
    light: 'text-[#F5EFEB]'
  }[theme];

  return (
    <div className={`flex items-center justify-center gap-2.5 mb-3.5 select-none ${className}`}>
      <span className="w-4 h-[1px] bg-current opacity-40" />
      <span
        className={`text-[11px] sm:text-[12px] uppercase tracking-[0.25em] font-medium font-body ${colorClass}`}
      >
        {children}
      </span>
      <span className="w-4 h-[1px] bg-current opacity-40" />
    </div>
  );
};

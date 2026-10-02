import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  theme?: 'dark' | 'light' | 'gold';
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  children,
  className = '',
  theme = 'gold'
}) => {
  const colorClass = {
    gold: 'text-[#B69A61]',
    dark: 'text-[#183B2C]',
    light: 'text-[#D8CBB5]'
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

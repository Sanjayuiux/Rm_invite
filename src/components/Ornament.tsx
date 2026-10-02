import React from 'react';

interface OrnamentProps {
  type?: 'divider' | 'flourish' | 'corner' | 'mandala' | 'small';
  className?: string;
  color?: string; // default burgundy or antique gold
}

export const Ornament: React.FC<OrnamentProps> = ({
  type = 'divider',
  className = '',
  color = '#7B2431' // Rich Burgundy
}) => {
  if (type === 'small') {
    return (
      <svg
        viewBox="0 0 40 12"
        className={`w-10 h-3 inline-block overflow-visible ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M20 1L22 6L20 11L18 6L20 1Z"
          stroke={color}
          strokeWidth="0.8"
          fill={color}
          fillOpacity="0.12"
        />
        <circle cx="8" cy="6" r="1.5" fill={color} fillOpacity="0.6" />
        <circle cx="32" cy="6" r="1.5" fill={color} fillOpacity="0.6" />
        <line x1="10.5" y1="6" x2="16.5" y2="6" stroke={color} strokeWidth="0.6" strokeDasharray="1.5 1.5" />
        <line x1="23.5" y1="6" x2="29.5" y2="6" stroke={color} strokeWidth="0.6" strokeDasharray="1.5 1.5" />
      </svg>
    );
  }

  if (type === 'corner') {
    return (
      <svg
        viewBox="0 0 32 32"
        className={`w-6 h-6 overflow-visible ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M2 30V8C2 4.68629 4.68629 2 8 2H30"
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M6 30V10C6 7.79086 7.79086 6 10 6H30"
          stroke={color}
          strokeWidth="0.5"
          strokeOpacity="0.6"
          strokeDasharray="2 2"
        />
        <circle cx="10" cy="10" r="1.5" fill={color} />
      </svg>
    );
  }

  if (type === 'mandala') {
    return (
      <svg
        viewBox="0 0 80 80"
        className={`w-16 h-16 overflow-visible ${className}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="40" cy="40" r="36" stroke={color} strokeWidth="0.75" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="40" cy="40" r="32" stroke={color} strokeWidth="0.5" opacity="0.4" />
        <circle cx="40" cy="40" r="18" stroke={color} strokeWidth="0.75" opacity="0.8" />
        {/* 8-pointed delicate petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <g key={angle} transform={`rotate(${angle} 40 40)`}>
            <path
              d="M40 12 C43 22, 43 28, 40 32 C37 28, 37 22, 40 12 Z"
              stroke={color}
              strokeWidth="0.75"
              fill={color}
              fillOpacity="0.08"
            />
            <circle cx="40" cy="22" r="1" fill={color} opacity="0.8" />
          </g>
        ))}
        <circle cx="40" cy="40" r="4" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.75" />
      </svg>
    );
  }

  // Default: Elegant bridal stationery horizontal divider
  return (
    <div className={`flex items-center justify-center gap-3 my-6 select-none ${className}`}>
      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#7B2431]/50 to-[#7B2431]" />
      
      <svg
        viewBox="0 0 70 20"
        className="w-16 h-5 overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Center lotus motif in burgundy */}
        <path
          d="M35 2 C38 7, 42 10, 47 10 C42 10, 38 13, 35 18 C32 13, 28 10, 23 10 C28 10, 32 7, 35 2 Z"
          stroke={color}
          strokeWidth="0.8"
          fill={color}
          fillOpacity="0.1"
        />
        {/* Fine flanking paisley curls */}
        <path
          d="M23 10 C18 10, 14 7, 10 10 C7 12, 5 10, 3 10"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <path
          d="M47 10 C52 10, 56 7, 60 10 C63 12, 65 10, 67 10"
          stroke={color}
          strokeWidth="0.75"
          strokeLinecap="round"
        />
        <circle cx="35" cy="10" r="1.5" fill={color} />
        <circle cx="10" cy="10" r="1" fill={color} opacity="0.7" />
        <circle cx="60" cy="10" r="1" fill={color} opacity="0.7" />
      </svg>

      <span className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#7B2431]/50 to-[#7B2431]" />
    </div>
  );
};

import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'light';
  size?: 'sm' | 'md' | 'lg';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  target,
  rel,
  children,
  icon,
  className = '',
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-body text-center font-normal tracking-[0.18em] uppercase transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#7B2431] focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-[11px] py-2.5 px-5 gap-2',
    md: 'text-[12px] py-3.5 px-7 gap-2.5',
    lg: 'text-[13px] py-4 px-9 gap-3'
  }[size];

  const variantStyles = {
    primary:
      'bg-[#5C131D] text-[#FFFFFF] border border-[#5C131D] hover:bg-[#4A0E17] hover:border-[#C5A869]/50 shadow-sm active:scale-[0.99]',
    outline:
      'bg-transparent text-[#5C131D] border border-[#7B2431] hover:bg-[#F9F0F2] hover:text-[#4A0E17] active:scale-[0.99]',
    ghost:
      'bg-transparent text-[#3B2226] border border-transparent hover:border-[#7B2431]/30 hover:bg-[#F9F0F2]/60',
    light:
      'bg-[#FFFFFF] text-[#5C131D] border border-[#7B2431]/40 hover:bg-[#FAF7F2] hover:border-[#5C131D] shadow-sm'
  }[variant];

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0 opacity-80">{icon}</span>}
      <span>{children}</span>
    </>
  );

  if (as === 'a' && href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? (rel || 'noopener noreferrer') : rel}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};

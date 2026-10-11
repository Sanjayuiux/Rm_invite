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
    'relative inline-flex items-center justify-center font-body text-center font-normal tracking-[0.2em] uppercase transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#541820] focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-[10px] py-2.5 px-5 gap-2',
    md: 'text-[11px] py-3 px-7 gap-2.5',
    lg: 'text-[12px] py-4 px-10 gap-3'
  }[size];

  const variantStyles = {
    primary:
      'bg-[#541820] text-[#F8F3E9] border border-[#541820] hover:bg-[#351015] active:scale-[0.99]',
    outline:
      'bg-transparent text-[#541820] border border-[#541820]/60 hover:bg-[#541820]/5 active:scale-[0.99]',
    ghost:
      'bg-transparent text-[#541820] border border-transparent hover:border-[#541820]/20',
    light:
      'bg-[#F8F3E9] text-[#541820] border border-[#541820]/30 hover:bg-[#F1E8DA]'
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

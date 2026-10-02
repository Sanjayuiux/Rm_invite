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
    'relative inline-flex items-center justify-center font-body text-center font-medium tracking-[0.16em] uppercase transition-all duration-300 select-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B69A61] focus-visible:ring-offset-2';

  const sizeStyles = {
    sm: 'text-[11px] py-2.5 px-5 gap-2',
    md: 'text-[12px] py-3.5 px-7 gap-2.5',
    lg: 'text-[13px] py-4 px-9 gap-3'
  }[size];

  const variantStyles = {
    primary:
      'bg-[#183B2C] text-[#F7F1E3] border border-[#183B2C] hover:bg-[#132e22] hover:border-[#B69A61]/40 shadow-sm active:scale-[0.99]',
    outline:
      'bg-transparent text-[#183B2C] border border-[#B69A61] hover:bg-[#EEE5D2]/60 hover:text-[#183B2C] active:scale-[0.99]',
    ghost:
      'bg-transparent text-[#2A2119] border border-transparent hover:border-[#B69A61]/30 hover:bg-[#EEE5D2]/40',
    light:
      'bg-[#F7F1E3] text-[#183B2C] border border-[#B69A61]/60 hover:bg-white hover:border-[#B69A61] shadow-sm'
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

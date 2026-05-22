import type { ButtonHTMLAttributes, ReactNode } from 'react';

type XiButtonVariant = 'primary' | 'secondary' | 'ghost';

type XiButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: XiButtonVariant;
};

export function XiButton({ children, variant = 'primary', className = '', ...props }: XiButtonProps) {
  return (
    <button className={`xi-button xi-button--${variant} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

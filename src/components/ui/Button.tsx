import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none focus:ring-4';
  
  const variants = {
    primary: 'bg-[var(--color-academic-blue)] text-white hover:bg-blue-800 focus:ring-blue-300 shadow-md hover:shadow-lg',
    secondary: 'bg-[var(--color-creative-yellow)] text-gray-900 hover:bg-yellow-400 focus:ring-yellow-200 shadow-md hover:shadow-lg',
    success: 'bg-[var(--color-progress-green)] text-white hover:bg-green-600 focus:ring-green-300 shadow-md hover:shadow-lg',
    warning: 'bg-[var(--color-motivation-orange)] text-white hover:bg-orange-600 focus:ring-orange-300 shadow-md hover:shadow-lg',
    outline: 'border-2 border-[var(--color-academic-blue)] text-[var(--color-academic-blue)] hover:bg-blue-50 focus:ring-blue-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

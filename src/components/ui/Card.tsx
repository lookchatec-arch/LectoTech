import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', style }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', style }: CardProps) {
  return <div className={`p-6 border-b border-gray-100 ${className}`} style={style}>{children}</div>;
}

export function CardContent({ children, className = '', style }: CardProps) {
  return <div className={`p-6 ${className}`} style={style}>{children}</div>;
}

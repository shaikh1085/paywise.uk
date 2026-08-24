import React from 'react';

interface ThreeDCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  accent?: 'none' | 'emerald' | 'cyan' | 'slate';
  onClick?: () => void;
}

export const ThreeDCard: React.FC<ThreeDCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  accent = 'none',
  onClick,
}) => {
  const accentBorders = {
    none: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
    emerald: 'border-[#059669] dark:border-[#10B981]',
    cyan: 'border-[#059669] dark:border-[#10B981]',
    slate: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl bg-white dark:bg-[#171717] border ${
        accentBorders[accent]
      } shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] ${
        hoverEffect
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(0,0,0,0.09)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.5)]'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

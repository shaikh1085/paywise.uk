import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'high';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={`relative rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] ${className}`}
    >
      {children}
    </div>
  );
};

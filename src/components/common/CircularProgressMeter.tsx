import React from 'react';

interface CircularProgressMeterProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export const CircularProgressMeter: React.FC<CircularProgressMeterProps> = ({
  percentage,
  size = 104,
  strokeWidth = 8,
  label = 'Retention',
  className = '',
}) => {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safePercentage / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-[#E5E5E5] dark:text-[#2A2A2A]"
          strokeWidth={strokeWidth}
        />

        {/* Foreground Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          className="text-[#059669] dark:text-[#10B981] transition-all duration-500 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-base sm:text-lg font-black text-[#111111] dark:text-[#F5F5F5] tabular-nums tracking-tight">
          {safePercentage.toFixed(1)}%
        </span>
        <span className="text-3xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3]">
          {label}
        </span>
      </div>
    </div>
  );
};

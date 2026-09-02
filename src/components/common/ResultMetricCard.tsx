import React from 'react';
import { AnimatedNumber } from './AnimatedNumber';
import { Tooltip } from './Tooltip';
import { LucideIcon } from 'lucide-react';

interface ResultMetricCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  tooltipText?: string;
  icon?: LucideIcon;
  variant?: 'neutral' | 'emerald' | 'rose' | 'amber' | 'cyan';
  className?: string;
}

export const ResultMetricCard: React.FC<ResultMetricCardProps> = ({
  label,
  value,
  prefix = '',
  suffix = '',
  decimals = 1,
  tooltipText,
  icon: Icon,
  variant = 'neutral',
  className = '',
}) => {
  const variantStyles = {
    neutral: {
      border: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
      bg: 'bg-white dark:bg-[#171717]',
      text: 'text-[#111111] dark:text-[#F5F5F5]',
    },
    emerald: {
      border: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
      bg: 'bg-white dark:bg-[#171717]',
      text: 'text-[#059669] dark:text-[#10B981]',
    },
    rose: {
      border: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
      bg: 'bg-white dark:bg-[#171717]',
      text: 'text-[#DC2626] dark:text-[#F87171]',
    },
    amber: {
      border: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
      bg: 'bg-white dark:bg-[#171717]',
      text: 'text-[#B45309] dark:text-[#FBBF24]',
    },
    cyan: {
      border: 'border-[#E5E5E5] dark:border-[#2A2A2A]',
      bg: 'bg-white dark:bg-[#171717]',
      text: 'text-[#059669] dark:text-[#10B981]',
    },
  };

  const style = variantStyles[variant] || variantStyles.neutral;

  return (
    <div
      className={`relative p-3 sm:p-4 rounded-xl ${style.bg} border ${style.border} shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition-all duration-150 hover:-translate-y-0.5 ${className}`}
    >
      <div className="flex items-center justify-between gap-1 mb-1">
        <span className="text-2xs font-bold uppercase tracking-wider text-[#525252] dark:text-[#A3A3A3] truncate">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {tooltipText && <Tooltip content={tooltipText} title={label} />}
          {Icon && <Icon className="w-3.5 h-3.5 text-[#737373] dark:text-[#888888] shrink-0" />}
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <AnimatedNumber
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
          className={`text-base sm:text-lg font-extrabold tracking-tight ${style.text} tabular-nums`}
        />
      </div>
    </div>
  );
};

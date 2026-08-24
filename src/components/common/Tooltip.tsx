import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, Info } from 'lucide-react';

export interface TooltipProps {
  content?: React.ReactNode;
  text?: string;
  title?: string;
  icon?: 'help' | 'info';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  text,
  title,
  icon = 'help',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const displayContent = content || text || '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const IconComponent = icon === 'info' ? Info : HelpCircle;

  return (
    <div className={`relative inline-flex items-center align-middle ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        aria-expanded={isOpen}
        aria-label={title || 'More information'}
        className="p-0.5 text-[#737373] dark:text-[#888888] hover:text-[#059669] dark:hover:text-[#10B981] focus:outline-none transition-colors rounded-full cursor-pointer"
      >
        <IconComponent className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 sm:w-72 p-3 text-xs leading-relaxed rounded-xl bg-[#111111] dark:bg-[#1E1E1E] text-[#F5F5F5] shadow-xl border border-[#2A2A2A] pointer-events-none animate-in fade-in zoom-in-95 duration-100"
        >
          {title && <p className="font-bold text-white mb-1">{title}</p>}
          <div className="text-[#A3A3A3] text-2xs sm:text-xs">{displayContent}</div>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[#111111] dark:border-t-[#1E1E1E]" />
        </div>
      )}
    </div>
  );
};

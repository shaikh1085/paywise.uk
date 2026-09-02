import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  variant?: 'desktop-segmented' | 'compact';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'desktop-segmented',
  className = '',
}) => {
  const { resolvedTheme, setTheme, toggleTheme } = useTheme();

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Switch between light and dark mode"
        title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
        className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-[#111111] dark:text-[#F5F5F5] hover:border-[#059669] dark:hover:border-[#10B981] shadow-xs active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#059669] dark:focus-visible:ring-[#10B981] ${className}`}
      >
        {resolvedTheme === 'dark' ? (
          <Sun className="w-5 h-5 text-[#F5F5F5] hover:text-[#10B981] transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-[#111111] hover:text-[#059669] transition-colors" />
        )}
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Theme mode switcher"
      className={`inline-flex items-center p-1 rounded-xl bg-[#F5F5F5] dark:bg-[#111111] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        aria-pressed={resolvedTheme === 'light'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
          resolvedTheme === 'light'
            ? 'bg-white text-[#111111] shadow-xs font-bold'
            : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-white'
        }`}
      >
        <Sun className={`w-3.5 h-3.5 ${resolvedTheme === 'light' ? 'text-[#059669]' : ''}`} />
        <span>Light</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        aria-pressed={resolvedTheme === 'dark'}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
          resolvedTheme === 'dark'
            ? 'bg-[#1E1E1E] text-[#10B981] shadow-xs font-bold border border-[#2A2A2A]'
            : 'text-[#525252] dark:text-[#A3A3A3] hover:text-[#111111] dark:hover:text-white'
        }`}
      >
        <Moon className={`w-3.5 h-3.5 ${resolvedTheme === 'dark' ? 'text-[#10B981]' : ''}`} />
        <span>Dark</span>
      </button>
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { BreadcrumbItem } from '../../types';

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center flex-wrap gap-1.5 text-xs text-[#525252] dark:text-[#A3A3A3]">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#059669] dark:hover:text-[#10B981] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const label = item.label || item.name || '';
          const path = item.path || item.item || '/';
          return (
            <li key={path + index} className="flex items-center">
              <ChevronRight className="w-3.5 h-3.5 mx-1 text-[#737373] dark:text-[#888888]" />
              {isLast ? (
                <span className="font-semibold text-[#111111] dark:text-[#F5F5F5] truncate max-w-xs sm:max-w-md" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  to={path}
                  className="hover:text-[#059669] dark:hover:text-[#10B981] transition-colors truncate max-w-xs"
                >
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

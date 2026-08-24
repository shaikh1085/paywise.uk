import React, { useState } from 'react';
import { Copy, Check, Printer, Share2, Download, RotateCcw } from 'lucide-react';

export interface ExportActionsProps {
  onCopyText?: string;
  textToCopy?: string;
  copyText?: string;
  shareTitle?: string;
  shareUrl?: string;
  fileName?: string;
  csvData?: Array<Record<string, string | number>>;
  title?: string;
  variant?: string;
  onReset?: () => void;
  onPrint?: () => void;
}

export const ExportActions: React.FC<ExportActionsProps> = ({
  onCopyText,
  textToCopy,
  copyText,
  shareTitle = 'UK Salary & Take-Home Pay Calculation',
  shareUrl,
  fileName = 'paywise-calculation',
  csvData,
  title,
  onReset,
  onPrint,
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const rawText = onCopyText || textToCopy || copyText || '';
  const effectiveShareTitle = title || shareTitle;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  const handleShare = async () => {
    const url = shareUrl || window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: effectiveShareTitle,
          url,
        });
      } catch {
        // Ignored if cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2500);
    }
  };

  const handleDownloadCsv = () => {
    if (!csvData || csvData.length === 0) return;
    const headers = Object.keys(csvData[0]).join(',');
    const rows = csvData.map((obj) =>
      Object.values(obj)
        .map((val) => `"${String(val).replace(/"/g, '""')}"`)
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[#E5E5E5] dark:border-[#2A2A2A] no-print">
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press cursor-pointer"
        title="Copy calculation summary to clipboard"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
            <span className="text-[#059669] dark:text-[#10B981]">Copied summary!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
            <span>Copy results</span>
          </>
        )}
      </button>

      {csvData && csvData.length > 0 && (
        <button
          type="button"
          onClick={handleDownloadCsv}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press cursor-pointer"
          title="Download calculation as CSV spreadsheet"
        >
          <Download className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
          <span>Export CSV</span>
        </button>
      )}

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press cursor-pointer"
        title="Print this calculation"
      >
        <Printer className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
        <span>Print results</span>
      </button>

      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#F5F5F5] dark:bg-[#222222] hover:bg-[#E5E5E5] dark:hover:bg-[#2A2A2A] text-[#111111] dark:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press cursor-pointer"
        title="Share this calculation"
      >
        {shared ? (
          <>
            <Check className="w-3.5 h-3.5 text-[#059669] dark:text-[#10B981]" />
            <span className="text-[#059669] dark:text-[#10B981]">Link copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-[#525252] dark:text-[#A3A3A3]" />
            <span>Share calculation</span>
          </>
        )}
      </button>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FAFAFA] dark:bg-[#181818] hover:bg-[#F0F0F0] dark:hover:bg-[#222222] text-[#737373] hover:text-[#111111] dark:hover:text-[#F5F5F5] border border-[#E5E5E5] dark:border-[#2A2A2A] shadow-xs transition-colors btn-press cursor-pointer ml-auto"
          title="Reset all inputs to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
};

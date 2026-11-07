import React, { useState } from 'react';
import { Check, Copy, Facebook, Linkedin, MessageCircle, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  /** URL to share. Defaults to the current page URL. */
  url?: string;
  /** Title used as the share text. Defaults to the current page title. */
  title?: string;
  /** Extra text prepended to the shared message. Defaults to the title. */
  text?: string;
  /** 'bar' shows labelled buttons; 'compact' shows icon-only buttons (used in the footer). */
  variant?: 'bar' | 'compact';
  className?: string;
}

/**
 * ShareButtons — shares the current page (URL + title) via WhatsApp, X,
 * Facebook, LinkedIn, copy link, and the native share sheet where supported.
 * No new dependencies, no tracking, no external scripts. Share links are
 * plain https:// URLs opened in a new tab.
 */
export const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title,
  text,
  variant = 'bar',
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '');
  const shareTitle = title ?? (typeof window !== 'undefined' ? document.title : 'PayWise UK');
  const shareText = text ?? shareTitle;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);
  const encodedMessage = encodeURIComponent(`${shareText} ${shareUrl}`);

  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Clipboard API unavailable (e.g. non-secure context): fall back to a
      // temporary textarea + execCommand.
      const textarea = document.createElement('textarea');
      textarea.value = shareUrl;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // Copy failed; leave the button unchanged.
        document.body.removeChild(textarea);
        return;
      }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedMessage}`,
      icon: <MessageCircle className="w-4 h-4" />,
      hover: 'hover:bg-[#25D366] hover:border-[#25D366] hover:text-white',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: <XIcon className="w-4 h-4" />,
      hover: 'hover:bg-[#111111] hover:border-[#111111] hover:text-white dark:hover:bg-[#F5F5F5] dark:hover:border-[#F5F5F5] dark:hover:text-[#111111]',
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="w-4 h-4" />,
      hover: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="w-4 h-4" />,
      hover: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
    },
  ];

  const buttonBase =
    'inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#E5E5E5] dark:border-[#2A2A2A] bg-white dark:bg-[#171717] text-[#262626] dark:text-[#D4D4D4] font-semibold transition-colors shadow-xs';

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Share this page">
        <span className="text-xs font-bold text-[#111111] dark:text-[#F5F5F5]">Share:</span>
        {canNativeShare && (
          <button
            type="button"
            onClick={handleNativeShare}
            aria-label="Share this page"
            title="Share this page"
            className={`${buttonBase} w-8 h-8 hover:bg-[#059669] hover:border-[#059669] hover:text-white`}
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.label}`}
            title={`Share on ${link.label}`}
            className={`${buttonBase} w-8 h-8 ${link.hover}`}
          >
            {link.icon}
          </a>
        ))}
        <button
          type="button"
          onClick={handleCopy}
          aria-label="Copy page link"
          title="Copy page link"
          className={`${buttonBase} w-8 h-8 hover:bg-[#059669] hover:border-[#059669] hover:text-white`}
        >
          {copied ? <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" /> : <Copy className="w-4 h-4" />}
        </button>
        {copied && <span className="text-xs font-semibold text-[#059669] dark:text-[#10B981]">Copied</span>}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-white dark:bg-[#171717] border border-[#E5E5E5] dark:border-[#2A2A2A] p-4 sm:p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)] ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <p className="text-sm font-bold text-[#111111] dark:text-[#F5F5F5] shrink-0">
          Found this useful? Share it:
        </p>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Share this page">
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className={`${buttonBase} px-3 py-2 text-xs hover:bg-[#059669] hover:border-[#059669] hover:text-white`}
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          )}
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.label}`}
              className={`${buttonBase} px-3 py-2 text-xs ${link.hover}`}
            >
              {link.icon}
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy page link"
            className={`${buttonBase} px-3 py-2 text-xs hover:bg-[#059669] hover:border-[#059669] hover:text-white`}
          >
            {copied ? <Check className="w-4 h-4 text-[#059669] dark:text-[#10B981]" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy link'}
          </button>
        </div>
      </div>
    </div>
  );
};

/** X (formerly Twitter) logo — lucide-react has no X brand icon. */
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
  </svg>
);

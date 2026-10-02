import React, { useState } from 'react';
import { Share2, Check, MessageCircle } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { weddingData } from '../data/weddingData';

export const ShareButton: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = weddingData.meta.siteTitle;
    const text = `${weddingData.meta.whatsappMessage}\n${url}`;

    // On mobile, if navigator.share exists, try it; otherwise direct to WhatsApp!
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // Direct WhatsApp share url
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: weddingData.meta.whatsappMessage,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    // Desktop Fallback: Copy Link
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      <PrimaryButton
        onClick={handleShare}
        variant="outline"
        size="md"
        icon={copied ? <Check className="w-4 h-4 text-[#183B2C]" /> : <Share2 className="w-4 h-4 text-[#B69A61]" />}
        className="min-w-[200px]"
      >
        {copied ? 'Link Copied to Clipboard' : 'Share Invitation'}
      </PrimaryButton>

      <span className="font-body text-[10px] tracking-[0.2em] uppercase text-[#788D78] mt-2 flex items-center gap-1.5 font-medium">
        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
        Share with family &amp; friends via WhatsApp
      </span>
    </div>
  );
};

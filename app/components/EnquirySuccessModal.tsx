"use client";

import { useState } from "react";

export default function EnquirySuccessModal({
  trackingCode,
  onClose,
}: {
  trackingCode: string;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — user can still select/copy manually.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.2)] p-8 lg:p-10 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 className="font-playfair text-2xl font-medium text-gray-900 mb-2">Enquiry Received!</h2>
        <p className="text-gray-500 text-sm mb-6">
          We&apos;ll be in touch shortly. Save your tracking code to check your status anytime.
        </p>

        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex items-center justify-between gap-3 mb-6">
          <span className="font-mono font-bold text-lg text-brand-red tracking-wider">{trackingCode}</span>
          <button
            type="button"
            onClick={handleCopy}
            className={`text-xs font-semibold transition rounded-full px-3.5 py-1.5 whitespace-nowrap ${
              copied
                ? "bg-green-100 text-green-700"
                : "bg-brand-red text-white hover:bg-[#8A2728]"
            }`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`/track?code=${encodeURIComponent(trackingCode)}`}
            className="flex-1 bg-brand-red text-white rounded-[1.25rem] font-medium hover:bg-[#8A2728] transition flex items-center justify-center gap-2 text-[14px] py-3.5"
          >
            Track My Enquiry
          </a>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 rounded-[1.25rem] font-medium hover:bg-gray-200 transition text-[14px] py-3.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

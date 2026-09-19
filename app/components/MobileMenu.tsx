"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQs" },
  { href: "/track", label: "Track Enquiry" },
];

export default function MobileMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-lg border border-white/50 shadow-sm flex items-center justify-center text-gray-900 relative z-50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Left drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[82vw] max-w-[340px] bg-white z-[100] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 pt-7 pb-5 border-b border-gray-100">
          <Image src="/images/header-logo-transparent.webp" alt="Morocco Visa Service" width={150} height={53} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-9 h-9 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-4 py-4 flex-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = link.href === active;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-4 py-4 rounded-2xl font-medium text-[16px] transition ${
                  isActive ? "bg-brand-red/10 text-brand-red font-bold" : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="px-4 pb-8 pt-4 border-t border-gray-100 flex flex-col gap-3">
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className={`px-4 py-4 rounded-2xl font-bold text-[15px] text-center transition ${
              active === "/contact" ? "bg-brand-red/10 text-brand-red" : "text-gray-900 hover:bg-gray-50"
            }`}
          >
            Contact Us
          </a>
          <a
            href="/contact"
            onClick={() => setOpen(false)}
            className="px-4 py-4 rounded-2xl font-bold text-[15px] text-center bg-brand-red text-white hover:bg-[#8A2728] transition flex items-center justify-center gap-2"
          >
            Apply for Visa <span className="text-lg leading-none">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}

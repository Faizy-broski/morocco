"use client";

import { useState } from "react";

const docs = [
  {
    title: "Passport",
    detail: "A valid passport with at least six months' validity remaining and blank pages for stamps.",
  },
  {
    title: "Travel Information",
    detail: "Your flight itinerary or booking reference, plus planned entry and exit dates for Morocco.",
  },
  {
    title: "Accommodation Details",
    detail: "A hotel booking confirmation or invitation letter showing where you'll be staying.",
  },
  {
    title: "Supporting Documents",
    detail: "Recent bank statements, passport photos, and any additional paperwork specific to your visa type.",
  },
];

export default function DocumentsAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul data-anim-group="doc-list" className="w-full flex flex-col border-t border-gray-100">
      {docs.map((doc, index) => {
        const isOpen = openIndex === index;
        return (
          <li key={doc.title} data-anim="card" className="border-b border-gray-100">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-5 cursor-pointer group text-left"
            >
              <span className="text-gray-800 font-medium text-[15px] group-hover:text-brand-red transition">
                {doc.title}
              </span>
              <span
                className={`text-brand-red text-xl leading-none transition-transform duration-300 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                &rsaquo;
              </span>
            </button>
            {isOpen && (
              <p className="text-gray-500 text-[13px] leading-relaxed font-medium pb-5 pr-4">
                {doc.detail}
              </p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

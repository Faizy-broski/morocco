"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Do UK citizens need a visa for Morocco?",
    answer:
      "Our team can guide you through this step clearly. Tell us about your trip and we'll share the current requirements for your application.",
  },
  {
    question: "What documents are required?",
    answer:
      "Typically you'll need a valid passport, passport-sized photographs, proof of accommodation and travel itinerary. We'll give you a tailored checklist once you get in touch.",
  },
  {
    question: "How long does the process take?",
    answer:
      "Processing times vary by nationality and visa type, but most applications are completed within 7 to 15 business days once submitted.",
  },
  {
    question: "How much does the visa cost?",
    answer:
      "Costs depend on your nationality and the type of visa you need. Contact our team and we'll confirm the exact fee for your application.",
  },
  {
    question: "Can you check my documents?",
    answer:
      "Yes. Our team reviews every document before submission to make sure everything meets the current requirements.",
  },
  {
    question: "How do I apply?",
    answer:
      "Simply reach out to our team, share your travel details, and we'll walk you through each step of the application from start to finish.",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div data-anim-group="faq-items" className="w-full md:w-[55%] flex flex-col z-10 pt-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const isLast = index === faqs.length - 1;
        return (
          <div
            key={faq.question}
            data-anim="card"
            className={`border-t border-[#E5E5E5] ${isLast ? "border-b" : ""}`}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="w-full py-7 flex items-center justify-between cursor-pointer group text-left"
            >
              <h4 className="font-playfair text-gray-900 text-xl font-medium group-hover:text-brand-red transition">
                {faq.question}
              </h4>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`flex-shrink-0 ml-4 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-brand-red" : "text-gray-400 group-hover:text-brand-red"
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isOpen && (
              <div className="pb-8">
                <p className="text-gray-500 text-[15px] leading-relaxed font-medium pr-8">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

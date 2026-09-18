"use client";

import { useEffect, useState } from "react";

const categories = [
  { id: "category-01", label: "01. Application Process" },
  { id: "category-02", label: "02. Requirements" },
  { id: "category-03", label: "03. Post-Approval" },
];

export default function FAQCategoryIndex() {
  const [activeId, setActiveId] = useState(categories[0].id);

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="lg:w-4/12 lg:sticky lg:top-[20vh] z-10 hidden lg:flex flex-col gap-8">
      <h3 data-anim="heading-blur-in" className="font-playfair text-3xl text-[#1a1a1a] mb-4">Categories</h3>
      <ul className="flex flex-col gap-8 relative py-2">
        {/* Connecting line */}
        <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-gray-200/60 z-0"></div>

        {categories.map((category) => {
          const isActive = activeId === category.id;
          return (
            <li
              key={category.id}
              data-anim="fade-up"
              onClick={() => scrollToCategory(category.id)}
              className="relative z-10 flex items-center gap-6 group cursor-pointer"
            >
              <div
                className={`w-[16px] h-[16px] rounded-full border-4 border-[#FFFAEF] shadow-sm transition-colors ${
                  isActive ? "bg-brand-red" : "bg-gray-300 group-hover:bg-[#E76C53]"
                }`}
              ></div>
              <span
                className={`font-bold text-[13px] tracking-widest uppercase transition-colors ${
                  isActive ? "text-brand-red" : "text-gray-400 group-hover:text-[#E76C53]"
                }`}
              >
                {category.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

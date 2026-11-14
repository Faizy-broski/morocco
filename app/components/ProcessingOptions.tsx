"use client";

import { PROCESSING_OPTIONS, amountPenceFor, type ProcessingValue } from "@/app/lib/constants";

type Props = {
  value: ProcessingValue;
  onChange: (value: ProcessingValue) => void;
  idPrefix: string;
  travellers: number;
};

/** Checkbox-style single choice: ticking one option unticks the other; one is always selected. */
export default function ProcessingOptions({ value, onChange, idPrefix, travellers }: Props) {
  return (
    <fieldset className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4">
      <legend className="sr-only">Processing speed</legend>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Processing Speed</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROCESSING_OPTIONS.map((o) => {
          const checked = value === o.value;
          const id = `${idPrefix}-${o.value}`;
          return (
            <label
              key={o.value}
              htmlFor={id}
              className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition ${
                checked ? "border-brand-red bg-white shadow-sm" : "border-gray-200 bg-white/60 hover:bg-white"
              }`}
            >
              <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={() => onChange(o.value)}
                className="mt-1 h-4 w-4 rounded accent-[#A33132] cursor-pointer"
              />
              <span className="flex-1">
                <span className="flex items-baseline justify-between gap-2">
                  <span className="font-semibold text-gray-900 text-[15px]">{o.name}</span>
                  <span className="font-semibold text-brand-red text-[15px]">£{o.price}</span>
                </span>
                <span className="block text-[13px] text-gray-500">{o.time} · per applicant</span>
              </span>
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-sm text-gray-600" aria-live="polite">
        Total: <span className="font-semibold text-gray-900">£{amountPenceFor(value, travellers) / 100}</span>{" "}
        ({travellers} {travellers === 1 ? "applicant" : "applicants"})
      </p>
    </fieldset>
  );
}

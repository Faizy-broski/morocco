"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const visaTypes = [
  "Tourist Visa",
  "Business Visa",
  "Student Visa",
  "Work Visa",
  "Transit Visa",
];

export default function ContactBookingForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [visaType, setVisaType] = useState("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [travellers, setTravellers] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const decrementTravellers = () => setTravellers((count) => Math.max(1, count - 1));
  const incrementTravellers = () => setTravellers((count) => Math.min(20, count + 1));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldClass = (delay: string) => `contact-form-field ${delay}`;

  return (
    <div
      data-anim="fade-up"
      className="contact-booking-form bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgb(0,0,0,0.04)] p-8 md:p-16 border border-gray-100 relative overflow-hidden mb-16"
    >
      <style jsx global>{`
        .contact-booking-form .react-datepicker-wrapper {
          width: 100%;
        }
        .contact-booking-form .react-datepicker-popper {
          z-index: 50;
        }
        .contact-booking-form .react-datepicker {
          font-family: inherit;
          display: flex;
          border: 1px solid #eee;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        .contact-booking-form .react-datepicker__time-container {
          float: none;
          width: 90px;
          border-left: 1px solid #f0f0f0;
        }
        .contact-booking-form .react-datepicker__time-container .react-datepicker__time-box {
          width: 90px;
        }
        .contact-booking-form .react-datepicker__day--selected,
        .contact-booking-form .react-datepicker__day--keyboard-selected,
        .contact-booking-form .react-datepicker__time-list-item--selected {
          background-color: #a33132 !important;
          color: #fff !important;
        }
        .contact-booking-form .react-datepicker__day:hover,
        .contact-booking-form .react-datepicker__time-list-item:hover {
          background-color: #f9e5e5 !important;
        }
        @keyframes contact-form-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(163, 49, 50, 0); }
          50% { box-shadow: 0 0 0 4px rgba(163, 49, 50, 0.06); }
        }
        .contact-form-field:focus-within {
          animation: contact-form-glow 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Background watermark */}
      <div className="absolute -right-20 -bottom-20 w-[300px] h-[300px] opacity-[0.02] pointer-events-none">
        <Image src="/images/plane.svg" alt="" fill className="object-contain" />
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5`}>
          <div className={`${fieldClass("delay-[0ms]")} bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center`}>
            <label htmlFor="cf-name" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Full Name</label>
            <input
              id="cf-name"
              type="text"
              required
              placeholder="e.g. John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-900 font-semibold placeholder:text-gray-400 placeholder:font-medium w-full text-[17px]"
            />
          </div>

          <div className={`${fieldClass("delay-[80ms]")} bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center`}>
            <label htmlFor="cf-email" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address</label>
            <input
              id="cf-email"
              type="email"
              required
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-900 font-semibold placeholder:text-gray-400 placeholder:font-medium w-full text-[17px]"
            />
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5`}>
          <div className={`${fieldClass("delay-[160ms]")} bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center relative`}>
            <label htmlFor="cf-visa" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Visa Type</label>
            <select
              id="cf-visa"
              required
              value={visaType}
              onChange={(e) => setVisaType(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-900 font-semibold w-full text-[17px] appearance-none cursor-pointer pr-6"
            >
              <option value="" disabled>Select visa type</option>
              {visaTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 bottom-4 text-brand-red pointer-events-none">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          <div className={`${fieldClass("delay-[240ms]")} bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center relative`}>
            <label htmlFor="cf-date" className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Travel Date &amp; Time</label>
            <DatePicker
              id="cf-date"
              selected={travelDate}
              onChange={(date: Date | null) => setTravelDate(date)}
              showTimeSelect
              timeIntervals={15}
              dateFormat="MMM d, yyyy h:mm aa"
              placeholderText="Select date & time"
              minDate={new Date()}
              required
              wrapperClassName="w-full"
              className="bg-transparent border-none outline-none text-gray-900 font-semibold placeholder:text-gray-400 placeholder:font-medium w-full text-[17px] cursor-pointer pr-6"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute right-4 bottom-4 text-brand-red pointer-events-none">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
              <line x1="16" x2="16" y1="2" y2="6"/>
              <line x1="8" x2="8" y1="2" y2="6"/>
              <line x1="3" x2="21" y1="10" y2="10"/>
            </svg>
          </div>
        </div>

        <div className={`${fieldClass("delay-[320ms]")} bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex items-center justify-between`}>
          <div className="flex flex-col justify-center">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Travellers</span>
            <div className="text-gray-900 font-semibold text-[17px]">{travellers} {travellers === 1 ? "person" : "people"}</div>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={decrementTravellers}
              disabled={travellers <= 1}
              aria-label="Decrease travellers"
              className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition pb-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              -
            </button>
            <button
              type="button"
              onClick={incrementTravellers}
              disabled={travellers >= 20}
              aria-label="Increase travellers"
              className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition pb-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        <div
          className={`${fieldClass(
            "delay-[480ms]"
          )} mt-4 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-6 justify-between`}
        >
          <span className="text-gray-400 text-[11px] font-sans font-bold uppercase tracking-[0.2em]">Takes 1 minute</span>
          <button
            type="submit"
            className="w-full sm:w-auto bg-brand-red text-white px-10 py-5 rounded-full font-sans font-bold text-[13px] tracking-widest uppercase hover:bg-[#8A2728] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3 group"
          >
            Send Message
            <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
          </button>
        </div>

        {submitted && (
          <p className="text-sm font-medium text-green-700 mt-2">
            Thanks {fullName || "there"}! We&apos;ve received your enquiry{visaType ? ` for a ${visaType}` : ""} and will be in touch shortly.
          </p>
        )}
      </form>
    </div>
  );
}

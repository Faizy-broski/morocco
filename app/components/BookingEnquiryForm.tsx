"use client";

import { useState, FormEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { VISA_TYPES } from "@/app/lib/constants";
import EnquirySuccessModal from "@/app/components/EnquirySuccessModal";

export default function BookingEnquiryForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [visaType, setVisaType] = useState("");
  const [travelDate, setTravelDate] = useState<Date | null>(null);
  const [travellers, setTravellers] = useState(1);
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "error">("idle");
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  const decrementTravellers = () => setTravellers((count) => Math.max(1, count - 1));
  const incrementTravellers = () => setTravellers((count) => Math.min(20, count + 1));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState("loading");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          visaType,
          travelDate,
          travellers,
          source: "homepage",
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      const data = await res.json();
      setTrackingCode(data.trackingCode);
      setSubmitState("idle");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div data-anim="booking-card" className="booking-form bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-8 lg:p-10">
      <style jsx global>{`
        .booking-form .react-datepicker-wrapper {
          width: 100%;
        }
        .booking-form .react-datepicker__input-container input {
          width: 100%;
        }
        .booking-form .react-datepicker-popper {
          z-index: 50;
        }
        .booking-form .react-datepicker {
          font-family: inherit;
          display: flex;
          align-items: stretch;
          border: 1px solid #eee;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        .booking-form .react-datepicker__month-container {
          float: none;
        }
        .booking-form .react-datepicker__time-container {
          float: none;
          width: 130px;
          border-left: 1px solid #f0f0f0;
        }
        .booking-form .react-datepicker__time-container .react-datepicker__time-box {
          width: 130px;
        }
        .booking-form .react-datepicker__time-list {
          padding: 4px 0 !important;
          height: 280px !important;
          overflow-y: auto !important;
        }
        .booking-form .react-datepicker__time-list-item {
          display: flex;
          align-items: center;
          height: auto !important;
          padding: 10px 12px !important;
          font-size: 14px;
        }
        .booking-form .react-datepicker__header--time {
          padding: 12px 0;
        }
        .booking-form .react-datepicker-time__header {
          font-size: 15px;
        }
        .booking-form .react-datepicker__header {
          background-color: #fff;
          border-bottom: 1px solid #f0f0f0;
        }
        .booking-form .react-datepicker__navigation {
          top: 10px;
        }
        .booking-form .react-datepicker__day--selected,
        .booking-form .react-datepicker__day--keyboard-selected,
        .booking-form .react-datepicker__time-list-item--selected {
          background-color: var(--brand-red, #a33132) !important;
          color: #fff !important;
        }
        .booking-form .react-datepicker__day:hover,
        .booking-form .react-datepicker__time-list-item:hover {
          background-color: #f9e5e5 !important;
        }
        .booking-form .react-datepicker__triangle {
          display: none;
        }
      `}</style>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-2">Booking Enquiry</p>
          <h2 className="font-playfair text-4xl font-medium text-gray-900">Plan Your Trip to Morocco</h2>
        </div>
        <div className="hidden sm:block text-sm text-gray-500 font-medium">
          Takes less than 30 seconds to complete. 
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center">
          <label htmlFor="fullName" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Full Name</label>
          <input
            id="fullName"
            type="text"
            required
            placeholder="e.g. John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full text-[15px]"
          />
        </div>

        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center">
          <label htmlFor="email" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Email Address</label>
          <input
            id="email"
            type="email"
            required
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full text-[15px]"
          />
        </div>

        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center relative">
          <label htmlFor="visaType" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Visa Type</label>
          <select
            id="visaType"
            required
            value={visaType}
            onChange={(e) => setVisaType(e.target.value)}
            className="bg-transparent border-none outline-none text-gray-900 font-medium w-full text-[15px] appearance-none cursor-pointer pr-6"
          >
            <option value="" disabled>Select visa type</option>
            {VISA_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 translate-y-1 w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center relative">
          <label htmlFor="travelDate" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Travel Date &amp; Time</label>
          <DatePicker
            id="travelDate"
            selected={travelDate}
            onChange={(date: Date | null) => setTravelDate(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="MMM d, yyyy h:mm aa"
            placeholderText="Select date & time"
            minDate={new Date()}
            required
            wrapperClassName="w-full"
            className="bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full text-[15px] cursor-pointer pr-6"
          />
          <svg className="pointer-events-none absolute right-4 top-1/2 translate-y-1 w-3.5 h-3.5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>

        <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex items-center justify-between">
          <div className="flex flex-col justify-center">
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">Travellers</label>
            <div className="text-gray-900 font-medium text-[15px]">{travellers} {travellers === 1 ? "person" : "people"}</div>
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

        <div className="col-span-1 flex items-center">
          <button
            type="submit"
            disabled={submitState === "loading"}
            className="w-full bg-brand-red text-white rounded-[1.25rem] font-medium hover:bg-[#8A2728] transition flex items-center justify-center gap-2 text-[14px] py-4 disabled:opacity-60"
          >
            {submitState === "loading" ? "Sending..." : "Send Enquiry"} <span className="text-lg leading-none">&rarr;</span>
          </button>
        </div>
      </form>

      {submitState === "error" && (
        <p className="mt-4 text-sm font-medium text-red-700">
          Something went wrong sending your enquiry. Please try again.
        </p>
      )}

      {trackingCode && (
        <EnquirySuccessModal trackingCode={trackingCode} onClose={() => setTrackingCode(null)} />
      )}
    </div>
  );
}

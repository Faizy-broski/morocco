"use client";

import ApplicationForm from "@/app/components/ApplicationForm";

/** Homepage booking card: the same step-by-step application, started in place. */
export default function BookingEnquiryForm() {
  return (
    <div data-anim="booking-card" className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-2">Booking Enquiry</p>
        <h2 className="font-playfair text-3xl sm:text-4xl font-medium text-gray-900">Plan Your Trip to Morocco</h2>
      </div>
      <ApplicationForm
        embedded
        source="homepage"
        initialEnquiry={{ email: "", processing: "standard", travellers: 1 }}
      />
    </div>
  );
}

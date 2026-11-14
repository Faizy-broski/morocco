"use client";

import { Suspense, useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import MobileMenu from "@/app/components/MobileMenu";

type TrackedEnquiry = {
  trackingCode: string;
  fullName: string;
  visaType: string;
  processing: string;
  travelDate: string;
  travellers: number;
  status: "new" | "contacted" | "closed";
  paymentStatus: "unpaid" | "paid" | "refunded";
  detailsCompletedAt: string | null;
  amountPence: number;
  createdAt: string;
};

const STATUS_LABELS: Record<TrackedEnquiry["status"], string> = {
  new: "Received",
  contacted: "In Progress — We've Contacted You",
  closed: "Completed",
};

const STATUS_STYLES: Record<TrackedEnquiry["status"], string> = {
  new: "bg-brand-red/10 text-brand-red",
  contacted: "bg-amber-100 text-amber-700",
  closed: "bg-green-100 text-green-700",
};

function TrackForm() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState(searchParams.get("code") ?? "");
  const [enquiry, setEnquiry] = useState<TrackedEnquiry | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [payError, setPayError] = useState("");
  const [paying, setPaying] = useState(false);
  const [needsDetails, setNeedsDetails] = useState(false);
  const [resendEmail, setResendEmail] = useState("");
  const [resendMsg, setResendMsg] = useState("");

  const resendLink = async () => {
    if (!enquiry) return;
    setResendMsg("");
    const res = await fetch("/api/applications/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackingCode: enquiry.trackingCode, email: resendEmail }),
    });
    setResendMsg(
      res.ok
        ? "If that email matches this enquiry, we've sent your application link. Check your inbox (and spam)."
        : "Please enter the email you used for this enquiry."
    );
  };
  const returnedPaid = searchParams.get("paid") === "1";
  const returnedCancelled = searchParams.get("cancelled") === "1";

  const startPayment = async () => {
    if (!enquiry) return;
    setPaying(true);
    setPayError("");
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackingCode: enquiry.trackingCode }),
      });
      const data = await res.json();
      if (data.needsDetails) setNeedsDetails(true);
      if (!res.ok || !data.url) {
        setPayError(data.error ?? "Could not start payment. Please try again.");
        setPaying(false);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setPayError("Could not start payment. Please try again.");
      setPaying(false);
    }
  };

  const lookup = async (trackingCode: string, silent = false) => {
    if (!trackingCode.trim()) return;
    if (!silent) {
      setState("loading");
      setEnquiry(null);
    }
    try {
      const res = await fetch(`/api/enquiries/track?code=${encodeURIComponent(trackingCode.trim())}${returnedPaid ? "&paid=1" : ""}`);
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setState("error");
        return;
      }
      setEnquiry(data.enquiry);
      setState("idle");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setState("error");
    }
  };

  useEffect(() => {
    const initial = searchParams.get("code");
    if (initial) lookup(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // After returning from Stripe the webhook may lag a moment: poll briefly until payment shows as paid.
  useEffect(() => {
    if (!returnedPaid || !enquiry || enquiry.paymentStatus !== "unpaid") return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (tries > 8) return clearInterval(timer);
      lookup(enquiry.trackingCode, true);
    }, 2500);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnedPaid, enquiry?.trackingCode, enquiry?.paymentStatus]);

  // Payment done: forget the saved draft so the next application starts clean.
  useEffect(() => {
    if (enquiry?.paymentStatus !== "paid") return;
    try {
      localStorage.removeItem("mv_application_token");
    } catch {
      // ignore
    }
  }, [enquiry?.paymentStatus]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lookup(code);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex flex-col items-center pb-16">
      {/* Header */}
      <header className="relative z-50 w-full pt-8 pb-4 px-6 md:px-12 flex items-center justify-between mx-auto max-w-[1400px]">
        <div className="flex-shrink-0">
          <a href="/">
            <Image src="/images/header-logo-transparent.webp" alt="Morocco Visa Service" width={220} height={78} priority />
          </a>
        </div>
        {/* Navigation Pill */}
        <div className="hidden lg:flex items-center bg-white/20 backdrop-blur-lg border border-white/30 rounded-full p-1.5 pl-8 shadow-sm">
          <nav className="flex items-center space-x-6 font-bold text-[14.5px] text-gray-700 mr-6 whitespace-nowrap">
            <a href="/" className="hover:text-brand-red transition">Home</a>
            <a href="/about" className="hover:text-brand-red transition">About Us</a>
            <a href="/services" className="hover:text-brand-red transition">Services</a>
            <a href="/how-it-works" className="hover:text-brand-red transition">How It Works</a>
            <a href="/faq" className="hover:text-brand-red transition">FAQs</a>
            <a href="/track" className="bg-white text-brand-red font-bold px-4 py-2 rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100">Track</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href="/contact" className="text-gray-900 font-bold text-[14.5px] px-2 hover:text-brand-red transition">
              Contact Us
            </a>
            <a href="/contact" className="bg-white text-brand-red px-5 py-2.5 rounded-full font-bold text-[13px] hover:bg-gray-50 transition shadow-[0_2px_10px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-2 inline-flex">
              Apply for Visa <span className="text-lg leading-none">&rarr;</span></a>
          </div>
        </div>
        <MobileMenu active="/track" />
      </header>

      <div className="w-full max-w-lg mx-4 bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-8 lg:p-10 mt-8">
        <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-2">Track Enquiry</p>
        <h1 className="font-playfair text-3xl font-medium text-gray-900 mb-8">Check Your Enquiry Status</h1>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center">
            <label htmlFor="code" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Tracking Code
            </label>
            <input
              id="code"
              type="text"
              required
              placeholder="MV-XXXXXX"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-transparent border-none outline-none text-gray-900 font-mono font-medium placeholder:text-gray-400 w-full text-[15px] uppercase"
            />
          </div>
          <button
            type="submit"
            disabled={state === "loading"}
            className="bg-brand-red text-white rounded-[1.25rem] font-medium hover:bg-[#8A2728] transition px-8 py-4 text-[14px] disabled:opacity-60 whitespace-nowrap"
          >
            {state === "loading" ? "Checking..." : "Check Status"}
          </button>
        </form>

        {state === "error" && (
          <p className="text-sm font-medium text-red-700 mb-4">{errorMessage}</p>
        )}

        {enquiry && (
          <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-6">
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono font-bold text-brand-red tracking-wider">{enquiry.trackingCode}</span>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[enquiry.status]}`}>
                {STATUS_LABELS[enquiry.status]}
              </span>
            </div>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Name</dt>
                <dd className="font-medium text-gray-900">{enquiry.fullName}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Visa Type</dt>
                <dd className="font-medium text-gray-900">{enquiry.visaType}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Processing</dt>
                <dd className="font-medium text-gray-900 capitalize">{enquiry.processing}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Travel Date</dt>
                <dd className="font-medium text-gray-900">
                  {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(enquiry.travelDate))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Travellers</dt>
                <dd className="font-medium text-gray-900">{enquiry.travellers}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Submitted</dt>
                <dd className="font-medium text-gray-900">
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.createdAt))}
                </dd>
              </div>
            </dl>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">Payment · £{(enquiry.amountPence / 100).toFixed(2)}</span>
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    enquiry.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : enquiry.paymentStatus === "refunded"
                        ? "bg-gray-200 text-gray-700"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {enquiry.paymentStatus === "paid" ? "Paid" : enquiry.paymentStatus === "refunded" ? "Refunded" : "Awaiting payment"}
                </span>
              </div>

              {enquiry.paymentStatus === "paid" && returnedPaid && (
                <p className="text-sm text-green-700">Thank you — your payment was received. A receipt is on its way to your email.</p>
              )}
              {enquiry.paymentStatus === "unpaid" && returnedPaid && (
                <p className="text-sm text-gray-600 mb-3">Confirming your payment… this page will update automatically.</p>
              )}
              {enquiry.paymentStatus === "unpaid" && returnedCancelled && !returnedPaid && (
                <p className="text-sm text-gray-600 mb-3">Payment was cancelled. Your enquiry is saved — you can pay whenever you&apos;re ready.</p>
              )}
              {enquiry.paymentStatus === "unpaid" && (!enquiry.detailsCompletedAt || needsDetails) && (
                <div className="mb-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-gray-700">
                  <p className="mb-3">
                    Passport details for every traveller are needed before payment. Enter the email you used and we&apos;ll
                    re-send your private application link.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      value={resendEmail}
                      onChange={(e) => setResendEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none"
                    />
                    <button type="button" onClick={resendLink} className="rounded-xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800 transition">
                      Email me the link
                    </button>
                  </div>
                  {resendMsg && <p className="mt-3 text-gray-600">{resendMsg}</p>}
                </div>
              )}
              {enquiry.paymentStatus === "unpaid" && enquiry.detailsCompletedAt && (
                <button
                  type="button"
                  onClick={startPayment}
                  disabled={paying}
                  className="w-full bg-brand-red text-white rounded-[1.25rem] font-medium hover:bg-[#8A2728] transition py-3.5 text-[14px] disabled:opacity-60"
                >
                  {paying ? "Redirecting..." : `Pay £${(enquiry.amountPence / 100).toFixed(2)} now`}
                </button>
              )}
              {payError && <p className="text-sm font-medium text-red-700 mt-3">{payError}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={null}>
      <TrackForm />
    </Suspense>
  );
}

"use client";

import { Suspense, useEffect, useState, FormEvent } from "react";
import { useSearchParams } from "next/navigation";

type TrackedEnquiry = {
  trackingCode: string;
  fullName: string;
  visaType: string;
  travelDate: string;
  travellers: number;
  status: "new" | "contacted" | "closed";
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

  const lookup = async (trackingCode: string) => {
    if (!trackingCode.trim()) return;
    setState("loading");
    setEnquiry(null);
    try {
      const res = await fetch(`/api/enquiries/track?code=${encodeURIComponent(trackingCode.trim())}`);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    lookup(code);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-8 lg:p-10">
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
                <dt className="text-gray-500">Travel Date</dt>
                <dd className="font-medium text-gray-900">
                  {new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(enquiry.travelDate))}
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

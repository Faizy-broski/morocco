"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { deleteEnquiry } from "@/app/actions/enquiries";

export default function DeleteButton({ id, fullName }: { id: string; fullName: string }) {
  const [isPending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = () => {
    setConfirmOpen(false);
    startTransition(async () => {
      try {
        await deleteEnquiry(id);
        toast.success(`Deleted enquiry from ${fullName}`);
      } catch {
        toast.error("Failed to delete enquiry. Please try again.");
      }
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={isPending}
        aria-label={`Delete enquiry from ${fullName}`}
        title="Delete"
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 transition disabled:opacity-60"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      </button>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4"
          onClick={() => setConfirmOpen(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-[0_20px_60px_rgb(0,0,0,0.2)] p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm text-gray-800 mb-5">
              Delete the enquiry from <span className="font-semibold">{fullName}</span>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="text-xs font-medium text-gray-500 hover:text-gray-900 px-4 py-2 rounded-full border border-gray-200 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runDelete}
                className="text-xs font-semibold text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

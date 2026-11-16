"use client";

import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import { sendReminder } from "@/app/actions/enquiries";

export default function ReminderButton({ id, sentAt }: { id: string; sentAt: string | null }) {
  const [pending, start] = useTransition();
  const [sent, setSent] = useState(sentAt);

  const run = () =>
    start(async () => {
      const res = await sendReminder(id);
      if (res.ok) {
        setSent(new Date().toISOString());
        toast.success("Link sent to the customer");
      } else toast.error(res.error);
    });

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
      <button
        type="button"
        onClick={run}
        disabled={pending}
        className="rounded-full border border-brand-red px-3 py-1 font-semibold text-brand-red transition hover:bg-brand-red hover:text-white disabled:opacity-60"
      >
        {pending ? "Sending…" : sent ? "Send link again" : "Send payment link"}
      </button>
      {sent && (
        <span className="text-gray-400">
          Last sent {new Intl.DateTimeFormat("en-GB", { dateStyle: "medium", timeStyle: "short" }).format(new Date(sent))}
        </span>
      )}
    </div>
  );
}

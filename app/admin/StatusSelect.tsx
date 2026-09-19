"use client";

import { useTransition } from "react";
import { updateEnquiryStatus } from "@/app/actions/enquiries";

const STATUSES = ["new", "contacted", "closed"] as const;

export default function StatusSelect({
  id,
  currentStatus,
  className,
}: {
  id: string;
  currentStatus: string;
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={currentStatus}
      disabled={isPending}
      onChange={(e) => {
        const value = e.target.value as (typeof STATUSES)[number];
        startTransition(() => {
          updateEnquiryStatus(id, value);
        });
      }}
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize border-0 cursor-pointer outline-none disabled:opacity-60 ${className ?? ""}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}

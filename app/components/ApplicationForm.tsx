"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ADDITIONAL_VISA_TYPES,
  CONDITION_ADDITIONAL_VISA,
  CONDITION_TOURISM,
  COUNTRIES,
  DIAL_CODES,
  DOCUMENT_TYPES,
  FIELD_STEP,
  OCCUPATIONS,
  PURPOSES_OF_TRIP,
  TRAVEL_CONDITIONS,
  VISA_ENTRIES,
} from "@/app/lib/applicationFields";
import { PROCESSING_OPTIONS, amountPenceFor, type ProcessingValue } from "@/app/lib/constants";
import type { SavedTraveller } from "@/app/lib/applicationSaved";

export type EnquiryValues = {
  email: string;
  processing: ProcessingValue;
  travellers: number;
};

type Props = {
  token?: string | null;
  initialEnquiry: EnquiryValues;
  saved?: SavedTraveller[];
  embedded?: boolean;
  source?: "homepage" | "contact";
};

type Files = { photo?: File; passport?: File; additionalVisa?: File; eVisa?: File };
type Draft = { values: Record<string, string>; conditions: boolean[]; files: Files; has: Record<string, boolean> };

const GREEN = "#006233";
const RED = "#C1272D";
const MUTED = "#C9B5B5";
const MAX_BYTES = 5 * 1024 * 1024;
const RESUME_KEY = "mv_application_token";

const STEPS = [
  { label: "Eligibility", icon: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6zM9 12l2 2 4-4" },
  { label: "Travel Conditions", icon: "M7 3h10v18H7zM10 8h4M10 12h4M10 16h2" },
  { label: "Personal Information", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 3.5-6 8-6s8 2 8 6" },
  { label: "Further Information", icon: "M2 16l20-8-8 14-2-6zM12 16l-2-6" },
  { label: "Attachments", icon: "M20 12l-8 8a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8-8" },
] as const;

const inputCls =
  "w-full bg-transparent font-[inherit] text-[15px] font-semibold text-gray-900 outline-none placeholder:font-medium placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-60";

const chevron = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-red" aria-hidden>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const todayStr = () => new Date().toISOString().slice(0, 10);
const splitPhone = (phone: string) => {
  const m = phone.match(/^(\+\d{1,4})\s*(.*)$/);
  return m ? { dial: m[1], number: m[2] } : { dial: "+44", number: phone };
};

function newDraft(n: number, enq: EnquiryValues, saved?: SavedTraveller): Draft {
  if (saved) {
    const ph = splitPhone(saved.values.phone ?? "");
    return {
      values: { ...saved.values, _dial: ph.dial, phone: ph.number },
      conditions: TRAVEL_CONDITIONS.map(() => true),
      files: {},
      has: saved.hasFiles,
    };
  }
  return {
    values: {
      _dial: "+44",
      email: n === 1 ? enq.email : "",
    },
    conditions: TRAVEL_CONDITIONS.map(() => false),
    files: {},
    has: {},
  };
}

function Stepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-5 mb-6" aria-label="Application progress">
      {STEPS.map((s, i) => {
        const n = i + 1;
        const cur = step - 1; // internal steps 2..6 are shown as 1..5
        const done = n < cur;
        const current = n === cur;
        const color = done ? GREEN : current ? RED : MUTED;
        return (
          <li key={s.label} className="relative flex flex-col items-center text-center" aria-current={current ? "step" : undefined}>
            {i > 0 && (
              <span
                className="absolute top-[22px] right-1/2 h-[2px] w-full"
                style={{ background: n <= cur ? GREEN : RED, opacity: n <= cur ? 1 : 0.85 }}
                aria-hidden
              />
            )}
            <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-white" style={{ background: color }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </span>
            <span className="mt-1.5 text-[11px] sm:text-sm font-medium leading-tight" style={{ color: done || current ? color : "#7A6464" }}>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function Field({
  label,
  required = true,
  error,
  children,
  hint,
}: {
  label: string;
  required?: boolean;
  /** kept for call sites; no longer shown */
  help?: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div
        className={`rounded-2xl border bg-[#F9F9F7] px-4 py-2.5 transition focus-within:border-brand-red/40 focus-within:bg-white ${
          error ? "border-red-300" : "border-gray-100"
        }`}
      >
        <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-gray-800">
          <span>
            {label} {required ? <span className="text-brand-red">*</span> : <span className="font-medium normal-case tracking-normal text-gray-400">(optional)</span>}
          </span>
        </div>
        {children}
      </div>
      {hint && <p className="mt-1.5 px-2 text-xs text-gray-500">{hint}</p>}
      {error && (
        <p role="alert" className="mt-1.5 px-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ApplicationForm({
  token: initialToken = null,
  initialEnquiry,
  saved = [],
  embedded,
  source = "contact",
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<string | null>(initialToken);
  const [enq, setEnq] = useState<EnquiryValues>(initialEnquiry);
  const [step, setStep] = useState(2);
  const firstUnsaved = (() => {
    const done = new Set(saved.map((x) => x.position));
    for (let i = 1; i <= initialEnquiry.travellers; i++) if (!done.has(i)) return i;
    return initialEnquiry.travellers;
  })();
  const [idx, setIdx] = useState(firstUnsaved);
  // What the server currently holds, so we only PATCH when something changed.
  const serverRef = useRef({
    travellers: initialToken ? initialEnquiry.travellers : 0,
    processing: initialEnquiry.processing,
    email: initialEnquiry.email,
  });
  const [serverSaved, setServerSaved] = useState<Set<number>>(new Set(saved.map((x) => x.position)));
  const [drafts, setDrafts] = useState<Record<number, Draft>>(() =>
    Object.fromEntries(saved.map((s) => [s.position, newDraft(s.position, initialEnquiry, s)]))
  );
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState("");
  const [busy, setBusy] = useState(false);

  // Coming back (Stripe "back" link, browser Back, refresh): restore what was already saved on the server.
  useEffect(() => {
    if (initialToken) return;
    let token: string | null = null;
    try {
      token = localStorage.getItem(RESUME_KEY);
    } catch {
      return;
    }
    if (!token) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/applications/${token}`);
        if (!res.ok) {
          localStorage.removeItem(RESUME_KEY); // paid or no longer exists
          return;
        }
        const data = (await res.json()) as { enquiry: EnquiryValues; saved: SavedTraveller[] };
        if (cancelled || tokenRef.current) return;
        tokenRef.current = token;
        serverRef.current = { travellers: data.enquiry.travellers, processing: data.enquiry.processing, email: data.enquiry.email };
        setEnq(data.enquiry);
        setDrafts(Object.fromEntries(data.saved.map((x) => [x.position, newDraft(x.position, data.enquiry, x)])));
        setServerSaved(new Set(data.saved.map((x) => x.position)));
        const done = new Set(data.saved.map((x) => x.position));
        let next = data.enquiry.travellers;
        for (let i = 1; i <= data.enquiry.travellers; i++) {
          if (!done.has(i)) {
            next = i;
            break;
          }
        }
        setIdx(next);
        setStep(done.has(next) ? 6 : 2);
        if (data.saved.length) setBanner("Welcome back — we've restored the details you already saved.");
      } catch {
        // offline: start fresh
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [initialToken]);

  const N = enq.travellers;
  const draft = drafts[idx] ?? newDraft(idx, enq);
  const v = draft.values;
  const total = amountPenceFor(enq.processing, N) / 100;
  const hasOther = v.hasOtherVisa === "yes";
  const isTourist = v.purposeOfTrip === "Tourist";

  // Scroll to the top of the form on every step change.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, idx]);

  const mutate = (fn: (d: Draft) => Draft) =>
    setDrafts((p) => ({ ...p, [idx]: fn(p[idx] ?? newDraft(idx, enq)) }));
  const setVal = (name: string, value: string) => mutate((d) => ({ ...d, values: { ...d.values, [name]: value } }));
  const setCond = (i: number, checked: boolean) =>
    mutate((d) => {
      const conditions = [...d.conditions];
      conditions[i] = checked;
      return { ...d, conditions };
    });
  const setFile = (kind: keyof Files, file?: File) => mutate((d) => ({ ...d, files: { ...d.files, [kind]: file } }));

  /* ---------- validation (client side; the server re-validates everything) ---------- */
  const validate = (s: number): Record<string, string> => {
    const e: Record<string, string> = {};
    const need = (k: string) => {
      if (!(v[k] ?? "").trim()) e[k] = "Required";
    };
    if (s === 2) {
      ["nationality", "countryOfResidence", "dateOfBirth", "documentType", "purposeOfTrip", "hasOtherVisa"].forEach(need);
      if (v.dateOfBirth && new Date(v.dateOfBirth) >= new Date()) e.dateOfBirth = "Date of birth must be in the past";
    }
    if (s === 3) {
      const ok = TRAVEL_CONDITIONS.every((_, i) => {
        if (i === CONDITION_TOURISM && !isTourist) return true;
        if (i === CONDITION_ADDITIONAL_VISA && !hasOther) return true;
        return draft.conditions[i];
      });
      if (!ok) e.conditionsAccepted = "Please accept all the travel conditions to continue.";
    }
    if (s === 4) {
      ["familyName", "firstName", "placeOfBirth", "phone", "occupation", "passportNumber", "issuedBy", "dateOfIssue", "expiryDate"].forEach(need);
      need("email");
      if (v.email && !/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address";
      if (v.phone && !/^[\d\s()-]{6,20}$/.test(v.phone)) e.phone = "Enter a valid phone number";
      if (v.passportNumber && !/^[A-Za-z0-9]{5,20}$/.test(v.passportNumber)) e.passportNumber = "Enter a valid passport number";
      if (v.dateOfIssue && new Date(v.dateOfIssue) > new Date()) e.dateOfIssue = "Date of issue cannot be in the future";
      if (v.expiryDate && new Date(v.expiryDate) <= new Date()) e.expiryDate = "The passport has expired";
      if (v.dateOfIssue && v.expiryDate && new Date(v.expiryDate) <= new Date(v.dateOfIssue)) e.expiryDate = "Expiry must be after the date of issue";
    }
    if (s === 5) {
      ["arrivalDate", "departureDate"].forEach(need);
      if (v.arrivalDate && new Date(v.arrivalDate) < new Date(todayStr())) e.arrivalDate = "Arrival date cannot be in the past";
      if (v.arrivalDate && v.departureDate && new Date(v.departureDate) <= new Date(v.arrivalDate)) e.departureDate = "Departure must be after arrival";
      if (hasOther) {
        ["additionalVisaType", "additionalVisaFrom", "additionalVisaUntil", "additionalVisaEntries", "additionalVisaNumber"].forEach(need);
        if (v.additionalVisaFrom && v.additionalVisaUntil && new Date(v.additionalVisaUntil) <= new Date(v.additionalVisaFrom))
          e.additionalVisaUntil = "Must be after 'Valid from'";
        else if (v.additionalVisaUntil && new Date(v.additionalVisaUntil) <= new Date()) e.additionalVisaUntil = "This visa has expired";
      }
      const code = (v.ukShareCode ?? "").replace(/\s+/g, "");
      if (code && !/^[A-Za-z0-9]{9}$/.test(code)) e.ukShareCode = "A UK share code is 9 letters/numbers, e.g. W12 3AB 4CD";
    }
    if (s === 6) {
      const bad = (f?: File, imagesOnly = false) => {
        if (!f) return "";
        if (f.size > MAX_BYTES) return "File must be 5MB or smaller.";
        if (!/^(image\/(jpeg|png|webp)|application\/pdf)$/.test(f.type)) return "Use JPG, PNG, WebP or PDF.";
        if (imagesOnly && f.type === "application/pdf") return "The photo must be an image.";
        return "";
      };
      if (!draft.files.photo && !draft.has.photo) e.photo = "Required";
      else if (bad(draft.files.photo, true)) e.photo = bad(draft.files.photo, true);
      if (!draft.files.passport && !draft.has.passport) e.passport = "Required";
      else if (bad(draft.files.passport)) e.passport = bad(draft.files.passport);
      if (hasOther && !draft.files.additionalVisa && !draft.has.additionalVisa) e.additionalVisa = "Required";
      else if (bad(draft.files.additionalVisa)) e.additionalVisa = bad(draft.files.additionalVisa);
      if (bad(draft.files.eVisa)) e.eVisa = bad(draft.files.eVisa);
    }
    return e;
  };

  /* ---------- navigation ---------- */
  const goNext = async () => {
    const e = validate(step);
    setErrs(e);
    setBanner("");
    if (Object.keys(e).length) {
      setBanner(step === 3 ? e.conditionsAccepted : "Please complete the highlighted fields.");
      return;
    }
    if (step < 6) {
      setStep(step + 1);
      return;
    }
    return saveTraveller("pay");
  };

  const addAnother = async () => {
    const e = validate(6);
    setErrs(e);
    setBanner("");
    if (Object.keys(e).length) {
      setBanner("Please complete the highlighted fields.");
      return;
    }
    return saveTraveller("add");
  };

  const goBack = () => {
    setErrs({});
    setBanner("");
    if (step > 2) setStep(step - 1);
    else if (idx > 1) {
      setIdx(idx - 1);
      setStep(6);
    }
  };

  /** Remove the traveller that was just added (only the last one can be removed). */
  const removeTraveller = async () => {
    if (N <= 1 || idx !== N) return;
    setBusy(true);
    setBanner("");
    try {
      if (tokenRef.current && serverSaved.has(idx)) {
        const res = await fetch(`/api/applications/${tokenRef.current}/enquiry`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: serverRef.current.email, processing: enq.processing, travellers: N - 1 }),
        });
        if (!res.ok) throw new Error("Could not remove this traveller. Please try again.");
        serverRef.current = { ...serverRef.current, travellers: N - 1, processing: enq.processing };
        setServerSaved((p) => new Set([...p].filter((x) => x !== idx)));
      }
      setDrafts((p) => Object.fromEntries(Object.entries(p).filter(([k]) => Number(k) !== idx)));
      setEnq((p) => ({ ...p, travellers: N - 1 }));
      setIdx(idx - 1);
      setStep(6);
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
    setBusy(false);
  };

  const saveTraveller = async (action: "add" | "pay") => {
    setBusy(true);
    try {
      // 1. Make sure the application exists on the server and matches the current choices.
      // The contact email (link + receipt) is traveller 1's email.
      const contactEmail = idx === 1 ? v.email : serverRef.current.email || enq.email;
      const srv = serverRef.current;
      if (!tokenRef.current) {
        const r = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: contactEmail, processing: enq.processing, travellers: N, source }),
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error ?? "Could not start your application. Please check your details and try again.");
        tokenRef.current = String(d.applyUrl).split("/").pop()!;
        try {
          localStorage.setItem(RESUME_KEY, tokenRef.current);
        } catch {
          // storage unavailable: resuming simply won't be offered
        }
        serverRef.current = { travellers: N, processing: enq.processing, email: contactEmail };
      } else if (srv.travellers !== N || srv.processing !== enq.processing || (idx === 1 && srv.email !== contactEmail)) {
        const r = await fetch(`/api/applications/${tokenRef.current}/enquiry`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: contactEmail, processing: enq.processing, travellers: N }),
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error ?? "Could not update your application. Please try again.");
        serverRef.current = { travellers: N, processing: enq.processing, email: contactEmail };
      }

      // 2. Save this traveller.
      const fd = new FormData();
      Object.entries(v).forEach(([k, val]) => {
        if (k === "_dial" || k === "phone") return;
        fd.append(k, val ?? "");
      });
      fd.append("phone", `${v._dial ?? "+44"} ${v.phone ?? ""}`.trim());
      fd.append("conditionsAccepted", "true");
      (Object.entries(draft.files) as [keyof Files, File | undefined][]).forEach(([k, f]) => f && fd.append(k, f));

      const res = await fetch(`/api/applications/${tokenRef.current}/travellers/${idx}`, { method: "PUT", body: fd });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const details: Record<string, string[]> = data.details ?? {};
        const flat: Record<string, string> = {};
        Object.entries(details).forEach(([k, m]) => (flat[k] = m[0]));
        setErrs(flat);
        const steps = Object.keys(flat).map((k) => FIELD_STEP[k]).filter(Boolean);
        if (steps.length) setStep(Math.min(...steps));
        setBanner(data.error ?? "Could not save. Please try again.");
        setBusy(false);
        return;
      }
      mutate((d) => ({
        ...d,
        files: {},
        has: {
          photo: true,
          passport: true,
          additionalVisa: hasOther && (!!d.has.additionalVisa || !!d.files.additionalVisa),
          eVisa: !!d.has.eVisa || !!d.files.eVisa,
        },
      }));

      setServerSaved((p) => new Set(p).add(idx));

      if (action === "add") {
        // New traveller: the count grows by one and a fresh set of steps starts.
        setEnq((p) => ({ ...p, travellers: N + 1 }));
        setIdx(N + 1);
        setStep(2);
        setBusy(false);
        return;
      }
      if (idx < N) {
        setIdx(idx + 1);
        setStep(2);
        setBusy(false);
        return;
      }
      const c = await fetch(`/api/applications/${tokenRef.current}/complete`, { method: "POST" });
      const cd = await c.json().catch(() => ({}));
      if (!c.ok || !cd.url) {
        if (Array.isArray(cd.missing) && cd.missing.length) {
          setIdx(cd.missing[0]);
          setStep(2);
        }
        throw new Error(cd.error ?? "Could not open the payment page. Please try again.");
      }
      window.location.assign(cd.url);
    } catch (err) {
      setBanner(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  /* ---------- small render helpers ---------- */
  const err = (k: string) => errs[k];
  const text = (name: string, opts: { type?: string; placeholder?: string; disabled?: boolean; max?: string; min?: string } = {}) => (
    <input
      id={`${name}-${idx}`}
      name={name}
      type={opts.type ?? "text"}
      value={v[name] ?? ""}
      onChange={(e) => setVal(name, e.target.value)}
      placeholder={opts.placeholder}
      disabled={opts.disabled}
      max={opts.max}
      min={opts.min}
      className={inputCls}
    />
  );
  const select = (name: string, options: readonly string[], opts: { disabled?: boolean } = {}) => (
    <div className="relative">
      <select
        id={`${name}-${idx}`}
        name={name}
        value={v[name] ?? ""}
        disabled={opts.disabled}
        onChange={(e) => setVal(name, e.target.value)}
        className={`${inputCls} cursor-pointer appearance-none pr-6`}
      >
        <option value=""></option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "yes" ? "Yes" : o === "no" ? "No" : o}
          </option>
        ))}
      </select>
      {chevron}
    </div>
  );

  const photoPreview = useMemo(() => (draft.files.photo ? URL.createObjectURL(draft.files.photo) : null), [draft.files.photo]);
  useEffect(
    () => () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    },
    [photoPreview]
  );

  const fileCard = (
    kind: keyof Files,
    title: string,
    required: boolean,
    desc: string,
    ext: string,
    opts: { photo?: boolean } = {}
  ) => {
    const f = draft.files[kind];
    const has = draft.has[kind];
    const pick = (file?: File) => file && setFile(kind, file);
    return (
      <div key={kind}>
        <div className={`rounded-[1.25rem] border bg-[#F9F9F7] p-4 ${err(kind) ? "border-red-300" : "border-gray-100"}`}>
          <div className="mb-1 text-[11px] font-bold uppercase tracking-widest text-gray-800">
            {title} {required ? <span className="text-brand-red">*</span> : <span className="font-medium normal-case tracking-normal text-gray-400">(optional)</span>}
          </div>
          <p className="mb-3 text-xs text-gray-700">{desc}</p>

          <label
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              pick(e.dataTransfer.files?.[0]);
            }}
            className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-[1rem] border-2 border-dashed border-gray-200 bg-white px-4 py-6 text-center transition hover:border-brand-red/50 hover:bg-[#FFFAFA]"
          >
            {opts.photo && (
              <span className="mb-1 block h-28 w-28 overflow-hidden rounded-2xl bg-[#E5E5E5]">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photoPreview} alt="Selected photo preview" className="h-full w-full object-cover" />
                ) : (
                  <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
                    <circle cx="50" cy="38" r="17" fill="#8a8a8a" />
                    <path d="M12 100c0-26 18-38 38-38s38 12 38 38z" fill="#8a8a8a" />
                  </svg>
                )}
              </span>
            )}
            {!opts.photo && (
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-red/10 text-brand-red">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
                </svg>
              </span>
            )}
            <span className="text-sm font-semibold text-gray-900">{f || has ? "Replace file" : "Click to choose a file"}</span>
            <span className="text-xs text-gray-500">or drag and drop · {ext} · max 5 MB</span>
            <input
              type="file"
              className="sr-only"
              accept={kind === "photo" ? "image/jpeg,image/png,image/webp" : "image/jpeg,image/png,image/webp,application/pdf"}
              onChange={(e) => pick(e.target.files?.[0])}
            />
          </label>

          {(f || has) && (
            <p className="mt-3 flex items-center gap-2 text-sm font-medium text-green-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="truncate">{f ? f.name : "Already uploaded"}</span>
            </p>
          )}
        </div>
        {err(kind) && (
          <p role="alert" className="mt-1.5 px-2 text-xs font-medium text-red-700">
            {err(kind)}
          </p>
        )}
      </div>
    );
  };

  const heading = (t: string) => (
    <h2 className="font-playfair text-center text-2xl sm:text-[28px] font-medium text-[#2B3445] pb-2 mb-5 border-b border-[#2B3445]/60">{t}</h2>
  );

  return (
    <div ref={rootRef} className={`text-gray-900 [&_button]:font-[inherit] ${embedded ? "scroll-mt-24" : "min-h-screen bg-[#E8E8E8] px-3 py-8 sm:px-6"}`}>
      <div className={embedded ? "" : "mx-auto max-w-5xl bg-white p-4 sm:p-8 shadow-sm"}>
        {N > 1 && (
          <p className="mb-3 text-center text-sm font-bold" style={{ color: GREEN }}>
            Traveller {idx} of {N}
          </p>
        )}
        <Stepper step={step} />

        <div className="rounded-[2rem] bg-white px-4 py-6 sm:px-8 sm:py-7 border border-gray-100">
          {/* STEP 2 — Eligibility */}
          {step === 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
              <Field label="Nationality/Country Citizenship" error={err("nationality")} help="The country that issued your passport">
                {select("nationality", COUNTRIES)}
              </Field>
              <Field label="Country of Usual Residence" error={err("countryOfResidence")} help="Where you currently live">
                {select("countryOfResidence", COUNTRIES)}
              </Field>
              <Field label="Date of Birth" error={err("dateOfBirth")} help="As shown in your passport">
                {text("dateOfBirth", { type: "date", max: todayStr() })}
              </Field>
              <Field label="Document type (Passport)" error={err("documentType")}>
                {select("documentType", DOCUMENT_TYPES)}
              </Field>
              <Field label="Purpose of the Trip" error={err("purposeOfTrip")}>
                {select("purposeOfTrip", PURPOSES_OF_TRIP)}
              </Field>
              <Field label="Do you have another valid visa?" error={err("hasOtherVisa")} help="e.g. a Schengen, USA, UK, Canada or Japan visa">
                {select("hasOtherVisa", ["yes", "no"])}
              </Field>
            </div>
          )}

          {/* STEP 3 — Travel conditions */}
          {step === 3 && (
            <fieldset>
              <legend className="sr-only">Travel conditions</legend>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 px-2 sm:px-6">
                {TRAVEL_CONDITIONS.map((c, i) => {
                  const na = (i === CONDITION_TOURISM && !isTourist) || (i === CONDITION_ADDITIONAL_VISA && !hasOther);
                  return (
                    <li key={c}>
                      <label className={`flex items-start gap-3 text-[15px] ${na ? "opacity-40" : "cursor-pointer"}`}>
                        <input
                          type="checkbox"
                          disabled={na}
                          checked={na ? false : !!draft.conditions[i]}
                          onChange={(e) => setCond(i, e.target.checked)}
                          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#A33132] disabled:cursor-not-allowed"
                        />
                        <span>
                          {c}
                          {na && <span className="ml-2 text-xs italic">(not applicable to your answers)</span>}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              {err("conditionsAccepted") && (
                <p role="alert" className="mt-4 px-2 sm:px-6 text-sm font-medium text-red-700">
                  {err("conditionsAccepted")}
                </p>
              )}
            </fieldset>
          )}

          {/* STEP 4 — Personal information */}
          {step === 4 && (
            <>
              {heading("Personal Information")}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                <Field label="Family Name" error={err("familyName")} help="Surname, as in the passport">{text("familyName")}</Field>
                <Field label="First name" error={err("firstName")} help="Given names, as in the passport">{text("firstName")}</Field>
                <Field label="Place of Birth" error={err("placeOfBirth")}>{text("placeOfBirth")}</Field>
                <Field label="Mobile" error={err("phone")} help="Include a number we can reach you on">
                  <div className="flex gap-2">
                    <select
                      aria-label="Country dial code"
                      value={v._dial ?? "+44"}
                      onChange={(e) => setVal("_dial", e.target.value)}
                      className={`${inputCls} !w-24 shrink-0 cursor-pointer`}
                    >
                      {DIAL_CODES.map(([c, d]) => (
                        <option key={c} value={d}>
                          {c} {d}
                        </option>
                      ))}
                    </select>
                    {text("phone", { type: "tel", placeholder: "7123 456789" })}
                  </div>
                </Field>
                <Field label="Email" error={err("email")} help={idx === 1 ? "Your application link and payment receipt are sent to this address" : undefined}>
                  {text("email", { type: "email" })}
                </Field>
                <Field label="Occupation/Job" error={err("occupation")}>{select("occupation", OCCUPATIONS)}</Field>
                <Field label="Passport Number" error={err("passportNumber")}>{text("passportNumber", { placeholder: "e.g. AB1234567" })}</Field>
                <Field label="Issued by" error={err("issuedBy")} help="The country that issued the passport">{select("issuedBy", COUNTRIES)}</Field>
                <Field label="Date of Issue" error={err("dateOfIssue")}>{text("dateOfIssue", { type: "date", max: todayStr() })}</Field>
                <Field label="Expiry Date" error={err("expiryDate")}>{text("expiryDate", { type: "date", min: todayStr() })}</Field>
              </div>
            </>
          )}

          {/* STEP 5 — Further information */}
          {step === 5 && (
            <>
              {hasOther && (
                <>
                  {heading("Additional Visa")}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 mb-6">
                    <Field label="I have one of the following valid visas" error={err("additionalVisaType")}>
                      {select("additionalVisaType", ADDITIONAL_VISA_TYPES)}
                    </Field>
                    <Field label="Valid from" error={err("additionalVisaFrom")}>{text("additionalVisaFrom", { type: "date" })}</Field>
                    <Field label="Valid Until" error={err("additionalVisaUntil")}>{text("additionalVisaUntil", { type: "date" })}</Field>
                    <Field label="Number of Entry Visa" error={err("additionalVisaEntries")}>
                      {select("additionalVisaEntries", VISA_ENTRIES)}
                    </Field>
                    <Field label="Additional Visa Number" error={err("additionalVisaNumber")}>{text("additionalVisaNumber")}</Field>
                  </div>
                </>
              )}
              {heading("Travel")}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 mb-6">
                <Field label="Expected Date to Arrive in Morocco" error={err("arrivalDate")}>
                  {text("arrivalDate", { type: "date", min: todayStr() })}
                </Field>
                <Field label="Expected Date to Leave Morocco" error={err("departureDate")}>
                  {text("departureDate", { type: "date", min: v.arrivalDate || todayStr() })}
                </Field>
              </div>
              {heading("UK Immigration Status")}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                <Field
                  label="UK Immigration Status Code"
                  required={false}
                  error={err("ukShareCode")}
                  hint="Only if you hold a UK e-visa / immigration status. 9-character share code."
                  help="Your UK share code, e.g. W12 3AB 4CD"
                >
                  {text("ukShareCode", { placeholder: "e.g. W12 3AB 4CD" })}
                </Field>
              </div>
            </>
          )}

          {/* STEP 6 — Attachments */}
          {step === 6 && (
            <>
              {heading("Attachment")}
              <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                {fileCard("photo", "Photo (Picture Upload)", true, "Recent, plain background, face clearly visible (ICAO standard).", "JPG, PNG, WebP", { photo: true })}
                {fileCard("passport", "Passport (Passport Upload)", true, "The page containing your identity data and validity.", "PDF, JPG, PNG")}
                {hasOther && fileCard("additionalVisa", "Additional visa", true, "A copy of the other valid visa you declared.", "PDF, JPG, PNG")}
                {fileCard("eVisa", "UK e-Visa (Upload e-visa)", false, "Your UK e-visa / immigration status document, if you have one.", "PDF, JPG, PNG")}
              </div>
              <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                <Field label="Processing Speed" help="Applies to the whole application. Standard takes 3–5 working days; Urgent is next working day">
                  <div className="relative">
                    <select
                      value={enq.processing}
                      onChange={(e) => setEnq({ ...enq, processing: e.target.value as ProcessingValue })}
                      className={`${inputCls} cursor-pointer appearance-none pr-6`}
                    >
                      {PROCESSING_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.name} – {o.time} – £{o.price} per applicant
                        </option>
                      ))}
                    </select>
                    {chevron}
                  </div>
                </Field>
                <div className="flex flex-col justify-center rounded-[1.25rem] border border-gray-100 bg-[#FFFAEF] p-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-800">Total to pay</span>
                  <span className="font-playfair text-3xl text-gray-900">£{total}</span>
                  <span className="text-xs text-gray-500">
                    {N} {N === 1 ? "traveller" : "travellers"} × £{amountPenceFor(enq.processing, 1) / 100}
                  </span>
                </div>
              </div>
              <p className="mt-5 text-sm text-gray-600">
                Travelling with others? Choose <strong>Add another traveller</strong> — each person needs their own details and documents, and the total updates
                automatically. Otherwise continue to secure payment.
              </p>
            </>
          )}

          {banner && (
            <p role="alert" className="mt-6 rounded bg-red-50 border border-red-200 px-4 py-3 text-sm font-medium text-red-800">
              {banner}
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              {(step > 2 || idx > 1) && (
                <button
                  type="button"
                  onClick={goBack}
                  disabled={busy}
                  className="rounded-full border border-gray-200 bg-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
                >
                  Previous
                </button>
              )}
              {step === 2 && idx > 1 && idx === N && (
                <button
                  type="button"
                  onClick={removeTraveller}
                  disabled={busy}
                  className="text-sm font-semibold text-gray-500 underline-offset-4 hover:text-brand-red hover:underline disabled:opacity-60"
                >
                  Remove this traveller
                </button>
              )}
            </div>
            {step < 6 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={busy}
                className="rounded-full bg-brand-red px-10 py-3.5 text-[13px] font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#8A2728] disabled:opacity-60"
              >
                Next
              </button>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={addAnother}
                  disabled={busy || N >= 20}
                  className="rounded-full border-2 border-brand-red bg-white px-8 py-3.5 text-[13px] font-bold uppercase tracking-widest text-brand-red transition hover:bg-[#FFF5F5] disabled:opacity-60"
                >
                  {busy ? "Please wait…" : "+ Add another traveller"}
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  disabled={busy}
                  className="rounded-full bg-brand-red px-10 py-3.5 text-[13px] font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-[#8A2728] disabled:opacity-60"
                >
                  {busy ? "Please wait…" : idx < N ? "Save & next traveller" : `Save & pay £${total}`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

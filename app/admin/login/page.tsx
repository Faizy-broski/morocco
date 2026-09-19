"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, undefined);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] px-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-[0_20px_60px_rgb(0,0,0,0.08)] p-8 lg:p-10">
        <p className="text-brand-red text-[11px] font-bold tracking-widest uppercase mb-2">Admin</p>
        <h1 className="font-playfair text-3xl font-medium text-gray-900 mb-8">Sign in to your dashboard</h1>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center">
            <label htmlFor="email" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@example.com"
              className="bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full text-[15px]"
            />
          </div>

          <div className="bg-[#F9F9F7] border border-gray-100 rounded-[1.25rem] p-4 flex flex-col justify-center relative">
            <label htmlFor="password" className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              placeholder="••••••••"
              className="bg-transparent border-none outline-none text-gray-900 font-medium placeholder:text-gray-400 w-full text-[15px] pr-8"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 bottom-4 text-gray-400 hover:text-gray-600 transition"
            >
              {showPassword ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {state?.error && (
            <p className="text-sm font-medium text-red-700">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-red text-white rounded-[1.25rem] font-medium hover:bg-[#8A2728] transition flex items-center justify-center gap-2 text-[14px] py-4 disabled:opacity-60"
          >
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AppError({
  error,
  reset,
}: Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>) {
  useEffect(() => {
    // Log unexpected runtime error
    console.error('App runtime error:', error);
  }, [error]);

  useEffect(() => {
    const errorToast = toast.error(error.message || 'Something went wrong.');
    return () => toast.dismiss(errorToast);
  }, [error.message]);

  return (
    <div
      role="alert"
      className="flex min-h-[100dvh] w-full flex-col items-center justify-center p-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-950 text-white select-none"
    >
      <div className="flex w-full max-w-md flex-col items-center justify-center rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 text-center shadow-2xl">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 text-3xl border border-red-500/30">
          ⛈️
        </div>

        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Something went wrong
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 mb-6 max-w-sm">
          {error.message ||
            'An unexpected error occurred while loading meteorological data.'}
        </p>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-blue-600 px-6 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg hover:bg-blue-500 active:bg-blue-700 transition cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
          >
            Try Again 🔄
          </button>

          <Link
            href="/"
            className="rounded-full bg-white/15 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-white/25 transition cursor-pointer border border-white/20 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-hidden"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

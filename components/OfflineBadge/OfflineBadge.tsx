'use client';

import React from 'react';

export interface OfflineBadgeProps {
  /** Optional custom class name */
  className?: string;
  /** Optional timestamp of when the cached data was stored */
  lastUpdated?: string;
}

/**
 * OfflineBadge indicates to users that the application is operating in
 * offline mode and displaying cached atmospheric data.
 * Engineered for WCAG AAA / AA contrast compliance across all atmospheric gradient backgrounds.
 */
export default function OfflineBadge({
  className = '',
  lastUpdated,
}: OfflineBadgeProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-2 rounded-full bg-slate-900/90 border border-amber-400/40 px-3.5 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md shadow-md select-none ${className}`}
    >
      <span className="relative flex h-2 w-2 shrink-0 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
      </span>
      <span className="text-xs select-none" aria-hidden="true">
        📡
      </span>
      <span>Offline Mode — Cached Data</span>
      {lastUpdated && (
        <span className="text-amber-200/90 font-normal">
          ({lastUpdated})
        </span>
      )}
    </div>
  );
}

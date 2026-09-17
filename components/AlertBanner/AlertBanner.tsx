"use client";

import { IWeatherAlert } from "@/lib/types/weather";
import { useState } from "react";

export interface AlertBannerProps {
  alerts?: IWeatherAlert[];
  className?: string;
}

/**
 * AlertBanner displays active meteorological warnings and advisories.
 * Engineered for WCAG AAA / AA contrast compliance across all atmospheric gradient backgrounds
 * with full keyboard operability and accessible screen reader live announcements.
 */
export default function AlertBanner({
  alerts,
  className = "",
}: AlertBannerProps) {
  const [expanded, setExpanded] = useState(false);

  if (!alerts || alerts.length === 0) return null;

  const topAlert = alerts[0];
  const detailsId = "alert-details-content";

  return (
    <aside
      role="region"
      aria-label="Weather alerts"
      aria-live="polite"
      className={`mb-4 w-full rounded-2xl bg-slate-900/95 border-2 border-amber-500/50 p-4 text-amber-100 backdrop-blur-md shadow-xl select-none ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-slate-950 font-bold text-sm flex-shrink-0 shadow-xs select-none"
            aria-hidden="true"
          >
            ⚠️
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm md:text-base text-amber-300">
                {topAlert.event || "Severe Weather Advisory"}
              </span>
              {topAlert.severity && (
                <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-slate-950 shadow-2xs">
                  {topAlert.severity}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs md:text-sm text-slate-100 font-medium line-clamp-2">
              {topAlert.headline || topAlert.desc}
            </p>
          </div>
        </div>

        {topAlert.desc && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls={detailsId}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer flex-shrink-0 whitespace-nowrap rounded-lg px-2 py-1 transition-colors focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-hidden"
          >
            {expanded ? "Hide Details ▲" : "View Details ▼"}
          </button>
        )}
      </div>

      {expanded && topAlert.desc && (
        <div
          id={detailsId}
          className="mt-3 border-t border-slate-700/80 pt-3 text-xs text-slate-200 leading-relaxed max-h-48 overflow-y-auto"
        >
          <p className="whitespace-pre-line">{topAlert.desc}</p>
          {topAlert.instruction && (
            <div className="mt-2.5 rounded-xl bg-slate-800/90 border border-amber-500/30 p-3 font-medium text-amber-200 shadow-xs">
              <strong className="text-amber-300">Instruction:</strong> {topAlert.instruction}
            </div>
          )}
          <div className="mt-2.5 text-xs text-slate-400 font-medium">
            Effective: {topAlert.effective} — Expires: {topAlert.expires}
          </div>
        </div>
      )}
    </aside>
  );
}

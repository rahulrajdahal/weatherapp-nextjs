'use client';

import React from 'react';

/**
 * Props for the LocationHeadline component.
 */
export interface LocationHeadlineProps {
  /** Name of the active city (e.g., 'Kathmandu', 'Auckland') */
  cityName: string;
  /** Country of the active city (e.g., 'Nepal', 'New Zealand') */
  country: string;
  /** Textual meteorological condition description (e.g., 'Sunny', 'Light drizzle') */
  conditionText: string;
  /** Whether this location is currently in the user's bookmarked favorites */
  isFavorite: boolean;
  /** Callback fired when the user toggles the bookmark star button */
  onToggleFavorite: () => void;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * LocationHeadline displays the prominent heading summarizing the active
 * location name, country, and condition phrase, accompanied by an accessible
 * bookmark star button.
 */
export default function LocationHeadline({
  cityName,
  country,
  conditionText,
  isFavorite,
  onToggleFavorite,
  className = '',
}: LocationHeadlineProps) {
  return (
    <div
      className={`flex items-start justify-between gap-3 sm:gap-4 ${className}`}
    >
      <h1 className="max-w-[620px] text-lg sm:text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-snug sm:leading-tight -tracking-[0.5px] text-[#111625]">
        The current weather in{' '}
        <span className="underline decoration-blue-500 decoration-2 underline-offset-4 font-bold">
          {cityName}, {country}
        </span>{' '}
        is {conditionText.toLowerCase()}.
      </h1>

      <button
        onClick={onToggleFavorite}
        type="button"
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Remove ${cityName} from bookmarked favorites`
            : `Bookmark ${cityName} to favorites`
        }
        title={
          isFavorite
            ? 'Remove from bookmarked favorites'
            : 'Bookmark this location'
        }
        className={`flex-shrink-0 flex items-center justify-center rounded-xl sm:rounded-2xl p-2 sm:p-3 transition-all duration-200 shadow-2xs border cursor-pointer select-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden ${
          isFavorite
            ? 'bg-amber-50 border-amber-300 text-amber-500 hover:bg-amber-100 hover:scale-105'
            : 'bg-white border-slate-200 text-slate-400 hover:text-amber-500 hover:bg-slate-50 hover:scale-105'
        }`}
      >
        <span className="text-lg sm:text-2xl leading-none" aria-hidden="true">
          {isFavorite ? '★' : '☆'}
        </span>
      </button>
    </div>
  );
}

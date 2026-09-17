'use client';

import DailyForecastCard from '@/components/DailyForecastCard/DailyForecastCard';
import { IDailyForecast } from '@/lib/types/weather';

/**
 * Props for the DailyForecast extended outlook list.
 */
export interface DailyForecastProps {
  /** Array of daily forecast records */
  dailyForecasts: IDailyForecast[];
  /** Whether temperatures should be displayed in Celsius or Fahrenheit */
  isCelsius: boolean;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * DailyForecast renders the 7-day extended outlook section containing daily forecast cards.
 */
export default function DailyForecast({
  dailyForecasts,
  isCelsius,
  className = '',
}: DailyForecastProps) {
  return (
    <section
      aria-label="7-Day Extended Forecast"
      className="flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#111625] flex items-center gap-2">
          <span>📅</span> 7-Day Extended Outlook
        </h2>
        <span className="text-xs font-semibold text-slate-400 bg-white/70 px-2.5 py-1 rounded-full border border-slate-200/60">
          Daily highs & lows
        </span>
      </div>

      <div
        role="list"
        aria-label="Extended 7-day daily forecast list"
        className="flex flex-col gap-3"
      >
        {dailyForecasts.map((daily) => (
          <DailyForecastCard
            key={daily.date}
            forecast={daily}
            isCelsius={isCelsius}
          />
        ))}
      </div>
    </section>
  );
}

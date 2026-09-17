'use client';

import { IDailyForecast } from '@/lib/types/weather';
import { formatCalendarDay } from '@/lib/utils/dateTime';
import Image from 'next/image';

/**
 * Props for the DailyForecastCard component.
 */
export interface DailyForecastCardProps {
  /** Daily forecast data model containing temperatures, condition, and rain chance */
  forecast: IDailyForecast;
  /** Whether temperatures should be displayed in Celsius (°C) or Fahrenheit (°F) */
  isCelsius: boolean;
  /** Optional custom CSS class name */
  className?: string;
}

/**
 * DailyForecastCard renders an individual day's forecast in the 7-day outlook list,
 * showing the day name, condition summary, weather icon, precipitation probability pill,
 * and a visual high/low temperature distribution bar.
 */
export default function DailyForecastCard({
  forecast,
  isCelsius,
  className = '',
}: DailyForecastCardProps) {
  const dayName = formatCalendarDay(forecast.date);

  const maxTemp = Math.round(
    isCelsius ? forecast.maxtemp_c : forecast.maxtemp_f
  );
  const minTemp = Math.round(
    isCelsius ? forecast.mintemp_c : forecast.mintemp_f
  );

  const cardAriaLabel = `${dayName}: High of ${maxTemp}°, Low of ${minTemp}°. Condition: ${
    forecast.condition.text
  }.${
    forecast.daily_chance_of_rain > 0
      ? ` Rain chance: ${forecast.daily_chance_of_rain}%.`
      : ''
  }`;

  return (
    <div
      role="listitem"
      aria-label={cardAriaLabel}
      tabIndex={0}
      className={`flex items-center justify-between gap-1.5 sm:gap-3 rounded-2xl sm:rounded-3xl bg-white/80 backdrop-blur-md p-2.5 sm:p-4 shadow-xs hover:shadow-md hover:bg-white hover:border-slate-300 transition-all border border-white/80 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-hidden select-none ${className}`}
    >
      <div className="w-18 sm:w-28 flex-shrink-0 min-w-0">
        <p className="font-bold text-slate-800 text-xs sm:text-sm md:text-base truncate">
          {dayName}
        </p>
        <p className="text-[10px] sm:text-xs text-slate-500 capitalize truncate">
          {forecast.condition.text}
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
        {forecast.condition.icon && (
          <Image
            src={
              forecast.condition.icon.startsWith('http')
                ? forecast.condition.icon
                : `https:${forecast.condition.icon}`
            }
            alt={forecast.condition.text}
            width={32}
            height={32}
            className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
          />
        )}
        {forecast.daily_chance_of_rain > 0 && (
          <span
            className="text-[10px] sm:text-xs font-bold text-blue-600 bg-blue-50 px-1.5 sm:px-2 py-0.5 rounded-full"
            aria-label={`${forecast.daily_chance_of_rain}% chance of rain`}
          >
            {forecast.daily_chance_of_rain}%
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3 justify-end flex-shrink-0">
        <span
          className="text-xs sm:text-sm text-slate-400 font-semibold"
          aria-label={`Low: ${minTemp} degrees`}
        >
          {minTemp}°
        </span>
        <div
          className="w-10 sm:w-16 md:w-24 h-2 rounded-full bg-slate-100 overflow-hidden relative p-0.5"
          aria-hidden="true"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-400 via-sky-400 to-amber-400"
            style={{ width: '100%' }}
          />
        </div>
        <span
          className="text-xs sm:text-sm md:text-base text-slate-900 font-extrabold"
          aria-label={`High: ${maxTemp} degrees`}
        >
          {maxTemp}°
        </span>
      </div>
    </div>
  );
}

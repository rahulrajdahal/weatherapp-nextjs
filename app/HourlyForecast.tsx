'use client';

import { HourForecastCard } from '@/components';
import moment from 'moment';
import { IHourlyForeCastResp } from './page';

export default function HourlyForecast({
  hourlyForecasts,
}: {
  hourlyForecasts: IHourlyForeCastResp[];
}) {
  return (
    <>
      <p className='mb-5 mt-12 text-lg font-medium -tracking-[1.28px] text-[#3F4A5E]'>
        Forecast for next {hourlyForecasts.length} hours
      </p>

      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
        {hourlyForecasts.map((hourlyForecast) => (
          <HourForecastCard
            key={hourlyForecast.time}
            isCurrentHour={
              moment(hourlyForecast.time).format('L') ===
                moment().format('L') &&
              moment(hourlyForecast.time).format('HH') === moment().format('HH')
            }
            condition={hourlyForecast.condition}
            humidity={hourlyForecast.humidity}
            windSpeed={hourlyForecast.wind_kph}
            temp={hourlyForecast.temp_c}
            time={hourlyForecast.time}
          />
        ))}
      </div>
    </>
  );
}

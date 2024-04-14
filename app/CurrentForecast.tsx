'use client';

import { TemperatureDisplay } from '@/components';
import { myImageLoader } from '@/utils/imageLoader';
import Image from 'next/image';
import React from 'react';

export default function CurrentForecast({
  currentForcast,
  currentLocation,
}: {
  currentForcast: any;
  currentLocation: any;
}) {
  return (
    <main>
      <h1 className='text-xl'>Current Forecast</h1>

      <div className='flex items-center gap-4'>
        <TemperatureDisplay
          tempC={currentForcast?.temp_c}
          tempF={currentForcast?.temp_f}
        />

        <div className='flex flex-col items-center gap-2'>
          <span className='flex items-center gap-2'>
            <strong>Humidity:</strong>
            <p>{currentForcast?.humidity}</p>
          </span>
          <span className='flex items-center gap-2'>
            <span className='flex items-center gap-1'>
              <strong>Wind Direction:</strong>
              <p>{currentForcast?.wind_dir}</p>
            </span>
            <span className='flex items-center gap-1'>
              <strong>Wind Speed:</strong>
              <p>{currentForcast?.wind_kph} km/h</p>
            </span>
            <span className='flex items-center gap-1'>
              <strong>Wind Degree:</strong>
              <p>{currentForcast?.wind_degree}</p>
            </span>
          </span>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <span className='flex gap-2 font-semibold'>
          <Image
            src={`${currentForcast?.condition?.icon}`}
            width={24}
            height={24}
            alt={currentForcast?.condition?.text}
            loader={myImageLoader}
          />
          <p className='text-gray-400'>{currentForcast?.condition?.text}</p>
        </span>
        <span className='flex flex-col gap-2 font-semibold'>
          <p className='text-gray-400'>{currentLocation?.tz_id}</p>
          <strong className='text-2xl'>
            {currentLocation?.name}, {currentLocation?.country}
          </strong>
        </span>
      </div>
    </main>
  );
}

'use client';

import { dropIcon, windIcon } from '@/assets/icons';
import { myImageLoader } from '@/utils/imageLoader';
import { Cloud, Wine } from 'meistericons-react';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

export default function HourForecastCard({
  hourlyForecast,
}: {
  hourlyForecast: any;
}) {
  const isCurrentHour =
    moment(hourlyForecast.time).format('L') === moment().format('L') &&
    moment(hourlyForecast.time).format('HH') === moment().format('HH');

  return (
    <div
      key={hourlyForecast.time}
      className={`${isCurrentHour ? 'text-grey-900 bg-grey-200' : 'text-grey-400 border-grey-200 border'} flex flex-col items-center rounded-[6.25rem] px-6 py-8 lg:w-fit`}
      title={hourlyForecast.condition.text}
    >
      <p className=' text-sm font-medium -tracking-[0.035rem]'>
        {isCurrentHour ? 'Now' : moment(hourlyForecast.time).format('H:mm')}
      </p>

      <strong
        data-content='o'
        className='relative text-5xl font-medium leading-[3rem] -tracking-[0.12rem]  after:absolute after:-top-3 after:text-lg after:content-[attr(data-content)]'
      >
        {hourlyForecast.temp_c}
      </strong>
      <div className='mt-3 flex h-full w-full flex-col items-center gap-2 text-base font-medium leading-5 -tracking-[0.04rem]'>
        <span className='flex items-center gap-2'>
          <Image
            src={dropIcon}
            alt='search'
            width={24}
            height={24}
            className='h-6 w-6'
          />
          {hourlyForecast.humidity}%
        </span>
        <span className='flex items-center gap-2'>
          <Image
            src={windIcon}
            alt='search'
            width={24}
            height={24}
            className='h-6 w-6'
          />
          {hourlyForecast.wind_kph}km/h
        </span>
      </div>
    </div>
  );
}

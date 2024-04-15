'use client';

import { TemperatureDisplay } from '@/components';
import { myImageLoader } from '@/utils/imageLoader';
import moment from 'moment';
import Image from 'next/image';
import React from 'react';

export type ICurrentForecast = {
  windSpeed: number;
  time: string;
  condition: { text: string; icon: string };
  temp: number;
  humidity: number;
  tz_id: string;
};

export default function CurrentForecast({
  windSpeed,
  time,
  condition: { text, icon },
  humidity,
  temp,
  tz_id,
}: ICurrentForecast) {
  return (
    <aside title={text} className='relative w-full lg:max-w-[35.83%]'>
      <div
        style={{
          background: `linear-gradient(rgba(132, 250, 176,0.7), rgba(143, 211, 244,1)), url(https:${icon}) top right no-repeat`,
        }}
        className='relative z-10 flex h-full flex-col items-center justify-center rounded-tl-[32px] rounded-tr-[32px] bg-gradient-to-b from-[#84FAB0] to-[#8FD3F4] pb-20 pl-[45px] pr-[46px]'
      >
        <div className='flex flex-col items-center gap-[11px]'>
          <p
            className='relative text-9xl  font-bold -tracking-[1.28px] text-[#F8FBFF] after:absolute after:top-16   after:text-[32px] after:leading-[40px] after:content-[attr(data-content)] md:text-[200px]'
            data-content='o'
          >
            {temp}
          </p>

          <div className='flex flex-col gap-5'>
            <span className='min-w-[191px] rounded-[100px] bg-white p-2 text-center text-base font-medium -tracking-[1.28px]'>
              Humidity {humidity}%
            </span>
            <span className='min-w-[191px] rounded-[100px] bg-white p-2 text-center font-medium'>
              Wind Speed {windSpeed} km/h
            </span>
          </div>
        </div>

        <div className='absolute bottom-0 flex items-center text-2xl font-medium leading-[auto] text-[#F8FBFF] md:bottom-5 md:text-[32px]'>
          {moment(time).format('LT')} {tz_id}
        </div>
      </div>
      <div className='absolute left-4 top-4 w-full rounded-tr-[32px] bg-gradient-to-b from-[#84FAB0] to-[#8FD3F4] opacity-40'></div>
    </aside>
  );
}

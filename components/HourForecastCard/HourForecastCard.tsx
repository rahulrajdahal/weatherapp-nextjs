'use client';

import { dropIcon, windIcon } from '@/assets/icons';
import moment from 'moment';
import Image from 'next/image';

export const initialProps = {
  condition: {
    text: 'Clear',
  },
  humidity: 69,
  windSpeed: 15.2,
  temp: 20.2,
  time: '2024-04-15 00:00',
  isCurrentHour: true,
};

export default function HourForecastCard({
  windSpeed,
  time,
  condition: { text },
  humidity,
  temp,
  isCurrentHour,
}: {
  windSpeed: number;
  time: string;
  condition: { text: string };
  temp: number;
  humidity: number;
  isCurrentHour: boolean;
}) {
  return (
    <div
      key={time}
      className={`${isCurrentHour ? 'bg-grey-200 text-grey-900' : 'border border-grey-200 text-grey-400'} flex w-fit flex-col items-center rounded-[6.25rem] px-6 py-8`}
      title={text}
    >
      <p className=' text-sm font-medium -tracking-[0.035rem]'>
        {isCurrentHour ? 'Now' : moment(time).format('H:mm')}
      </p>

      <strong
        data-content='o'
        className='relative text-5xl font-medium leading-[3rem] -tracking-[0.12rem]  after:absolute after:-top-3 after:text-lg after:content-[attr(data-content)]'
      >
        {temp}
      </strong>
      <div className='mt-3 flex h-full w-full flex-col items-center gap-2 text-base font-medium leading-5 -tracking-[0.04rem]'>
        <span className='flex items-center gap-2'>
          <Image
            src={dropIcon}
            alt='humidity'
            width={24}
            height={24}
            className='h-6 w-6'
          />
          {humidity}%
        </span>
        <span className='flex items-center gap-2'>
          <Image
            src={windIcon}
            alt='windSpeed'
            width={24}
            height={24}
            className='h-6 w-6'
          />
          {windSpeed}km/h
        </span>
      </div>
    </div>
  );
}

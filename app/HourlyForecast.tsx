'use client';

import { TemperatureDisplay } from '@/components';
import { myImageLoader } from '@/utils/imageLoader';
import Image from 'next/image';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import moment from 'moment';

export default function HourlyForecast({
  hourlyForecasts,
  currentLocation,
}: {
  hourlyForecasts?: any;
  currentLocation?: any;
}) {
  console.log(hourlyForecasts, 'hour');

  return (
    <main>
      <h1 className='text-xl'>Hourly Forecast</h1>

      <Tabs.Root
        className='TabsRoot'
        defaultValue={moment(hourlyForecasts[0].time).format('LT')}
      >
        <Tabs.List
          className='flex items-center gap-4 flex-wrap'
          aria-label='Manage your account'
        >
          {hourlyForecasts.map((hourlyForecast: any) => (
            <Tabs.Trigger
              key={hourlyForecast.time}
              className='whitespace-nowrap'
              value={moment(hourlyForecast.time).format('LT')}
            >
              {moment(hourlyForecast.time).format('LT')}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {hourlyForecasts.map((hourlyForecast: any) => (
          <Tabs.Content
            key={hourlyForecast.time}
            className='TabsContent'
            value={moment(hourlyForecast.time).format('LT')}
          >
            <div className='flex items-center gap-4'>
              <Image
                src={`${hourlyForecast.condition.icon}`}
                width={24}
                height={24}
                alt={hourlyForecast.condition.text}
                loader={myImageLoader}
              />
              {hourlyForecast.condition.text}
            </div>

            <table className='mt-4 w-full rounded-lg text-center '>
              <thead>
                <tr className='w-full'>
                  <th
                    colSpan={2}
                    className='border-y border-r border-gray-300 py-4 '
                  >
                    Temp
                  </th>
                  <th className='border-y border-r border-gray-300 py-4 '>
                    Humidity
                  </th>
                  <th className='border-y border-r border-gray-300 py-4 '>
                    Wind
                  </th>
                </tr>
                <tr className='border-b p-2'>
                  <th className='w-fit border-y border-r border-gray-300 py-2'>
                    C
                  </th>
                  <th className='w-fit border-y border-r border-gray-300 py-2'>
                    F
                  </th>
                  <th className='w-fit border-y border-r border-gray-300 py-2'></th>
                  <th className='w-fit border-y border-r border-gray-300 py-2'>
                    Speed
                  </th>
                  <th className='w-fit border-y border-r border-gray-300 py-2'>
                    Direction
                  </th>
                  <th className='w-fit border-y border-r border-gray-300 py-2'>
                    Degree
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td className='border-y border-r border-gray-300 py-1'>
                    {hourlyForecast.temp_c}
                  </td>
                  <td className='border-y border-r border-gray-300 py-2'>
                    {hourlyForecast.temp_f}
                  </td>
                  <td className='border-y border-r border-gray-300 py-2'>
                    {hourlyForecast.humidity}
                  </td>
                  <td className='border-y border-r border-gray-300 py-2'>
                    {hourlyForecast.wind_kph}
                  </td>
                  <td className='border-y border-r border-gray-300 py-2'>
                    {hourlyForecast.wind_dir}
                  </td>
                  <td className='border-y border-r border-gray-300 py-2'>
                    {hourlyForecast.wind_degree}
                  </td>
                </tr>
              </tbody>
            </table>
          </Tabs.Content>
        ))}
      </Tabs.Root>

      {/* <strong>{hourlyForecast?.}</strong> */}
    </main>
  );
}

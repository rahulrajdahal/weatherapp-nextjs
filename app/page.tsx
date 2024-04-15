'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { HourForecastCard, Navbar, TemperatureDisplay } from '@/components';

import moment from 'moment';

export default function Home({ searchParams }: { searchParams: any }) {
  const [currentForcast, setCurrentForcast] = useState();
  const [hourlyForcasts, setHourlyForcasts] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [location, setLocation] = useState({
    latitude: 27.7293,
    longitude: 85.3343,
  });

  console.log(searchParams, 'poara');

  useEffect(() => {
    if ('geolocation' in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  const getForcast = useCallback(async () => {
    let resp;
    if (searchParams.q) {
      resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?q=${searchParams.q}&days=2&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );
    } else {
      resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?q=${location.latitude},${location.longitude}&days=2&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );
    }

    const respJson = await resp.json();

    console.log(
      respJson.forecast.forecastday.map((forecastday) =>
        forecastday.hour.filter((hour) => {
          if (moment(hour.time).format('L') === moment().format('L')) {
            return moment(hour.time).format('HH') >= moment().format('HH');
          }
          return hour;
        })
      ),
      'cats'
    );

    setCurrentForcast(respJson.current);
    setCurrentLocation(respJson.location);
    setHourlyForcasts(
      respJson.forecast.forecastday
        .map((forecastday) =>
          forecastday.hour.filter((hour) => {
            if (moment(hour.time).format('L') === moment().format('L')) {
              return moment(hour.time).format('HH') >= moment().format('HH');
            }
            return hour;
          })
        )
        .flat()
    );
  }, [location.latitude, location.longitude, searchParams]);

  useEffect(() => {
    getForcast();
  }, [getForcast]);

  return (
    <div className='bg-image lg:h-screen'>
      <Navbar />

      <div className='px-4 md:px-[6%] lg:px-[12.5%]'>
        <div className='no-scrollbar mt-[47px] flex flex-col gap-[6.25rem] rounded-[32px] bg-[#F0F4FA]  lg:h-[calc(100vh-8rem)] lg:flex-row'>
          <aside
            title={currentForcast?.condition?.text}
            className='relative w-full lg:max-w-[35.83%]'
          >
            <div
              style={{
                background: `linear-gradient(rgba(132, 250, 176,0.7), rgba(143, 211, 244,1)), url(https:${currentForcast?.condition?.icon}) top right no-repeat`,
              }}
              className='relative z-10 flex h-full flex-col items-center justify-center rounded-tl-[32px] rounded-tr-[32px] bg-gradient-to-b from-[#84FAB0] to-[#8FD3F4] pb-20 pl-[45px] pr-[46px]'
            >
              <div className='flex flex-col items-center gap-[11px]'>
                <p
                  className='relative text-9xl  font-bold -tracking-[1.28px] text-[#F8FBFF] after:absolute after:top-16   after:text-[32px] after:leading-[40px] after:content-[attr(data-content)] md:text-[200px]'
                  data-content='o'
                >
                  {currentForcast?.temp_c}
                </p>

                <div className='flex flex-col gap-5'>
                  <span className='min-w-[191px] rounded-[100px] bg-white p-2 text-center text-base font-medium -tracking-[1.28px]'>
                    Humidity {currentForcast?.humidity}%
                  </span>
                  <span className='min-w-[191px] rounded-[100px] bg-white p-2 text-center font-medium'>
                    Wind Speed {currentForcast?.wind_kph} km/h
                  </span>
                </div>
              </div>

              <div className='absolute bottom-0 flex items-center text-2xl font-medium leading-[auto] text-[#F8FBFF] md:bottom-5 md:text-[32px]'>
                {moment(currentForcast?.time).format('LT')}{' '}
                {currentLocation?.tz_id}
              </div>
            </div>
            <div className='absolute left-4 top-4 w-full rounded-tr-[32px] bg-gradient-to-b from-[#84FAB0] to-[#8FD3F4] opacity-40'></div>
          </aside>

          <div className='no-scrollbar overflow-y-scroll px-4 xl:pr-[6.944%]'>
            <p className='mt-0 max-w-[597px] text-[32px] font-medium leading-[40px] -tracking-[1.28px] text-[#111625] lg:mt-[171px]'>
              The current weather in{' '}
              <span className='underline'>
                {currentLocation?.name}, {currentLocation?.country}
              </span>{' '}
              is {currentForcast?.condition.text}.
            </p>

            <p className='mb-5 mt-12 text-lg font-medium -tracking-[1.28px] text-[#3F4A5E]'>
              Forecast for next 24 hours
            </p>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              {hourlyForcasts?.map((hourlyForecast) => (
                <HourForecastCard
                  key={hourlyForecast.time}
                  hourlyForecast={hourlyForecast}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

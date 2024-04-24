'use client';

import { Navbar } from '@/components';
import { Suspense, useCallback, useEffect, useState } from 'react';

import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CurrentForecast, { ICurrentForecast } from './CurrentForecast';
import HourlyForecast from './HourlyForecast';

export interface ICurrentForecastResp
  extends Omit<ICurrentForecast, 'temp' | 'windSpeed'> {
  temp_c: number;
  wind_kph: number;
}

export interface ICurrentLocationResp extends Pick<ICurrentForecast, 'tz_id'> {
  name: string;
  country: string;
}
export interface IHourlyForeCastResp
  extends Omit<ICurrentForecastResp, 'temp' | 'windSpeed' | 'last_updated'> {
  name: string;
  country: string;
  time: string;
}

export default function Home() {
  const searchParams = useSearchParams();

  const [currentForecast, setCurrentForecast] =
    useState<ICurrentForecastResp>();
  const [currentLocation, setCurrentLocation] =
    useState<ICurrentLocationResp>();

  const [hourlyForcasts, setHourlyForcasts] = useState<IHourlyForeCastResp[]>(
    []
  );

  const [location, setLocation] = useState({
    latitude: 27.7293,
    longitude: 85.3343,
  });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
      });
    }
  }, []);

  const getForecast = useCallback(async () => {
    let resp;
    if (searchParams.get('q')) {
      resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?q=${searchParams.get('q')}&days=2&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );
    } else {
      resp = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?q=${location.latitude},${location.longitude}&days=2&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );
    }

    const respJson = await resp.json();

    if (respJson.error) {
      return toast.error(respJson.error.message);
    }

    setCurrentForecast(respJson.current);
    setCurrentLocation(respJson.location);
    setHourlyForcasts(
      respJson.forecast.forecastday
        .map(
          (forecastday: {
            hour: (ICurrentForecastResp & { time: string })[];
          }) =>
            forecastday.hour.filter((hour) => {
              if (moment(hour.time).format('L') === moment().format('L')) {
                return moment(hour.time).format('HH') >= moment().format('HH');
              }
              return hour;
            })
        )
        .flat()
        .slice(0, 24)
    );
  }, [location.latitude, location.longitude, searchParams]);

  useEffect(() => {
    getForecast();
  }, [getForecast]);

  return (
    <div className='bg-image lg:h-screen'>
      <Navbar />

      <Suspense fallback={'Loading....'}>
        <div className='px-4 md:px-[6%] lg:px-[12.5%]'>
          <div className='no-scrollbar mt-[47px] flex flex-col gap-[6.25rem] rounded-[32px] bg-[#F0F4FA]  lg:h-[calc(100vh-8rem)] lg:flex-row'>
            {currentForecast && currentLocation ? (
              <CurrentForecast
                condition={currentForecast.condition}
                humidity={currentForecast.humidity}
                temp={currentForecast.temp_c}
                last_updated={currentForecast.last_updated}
                tz_id={currentLocation.tz_id}
                windSpeed={currentForecast.wind_kph}
              />
            ) : null}

            <div className='no-scrollbar overflow-y-scroll px-4 xl:pr-[6.944%]'>
              {currentForecast && currentLocation && (
                <p className='mt-0 max-w-[597px] text-[32px] font-medium leading-[40px] -tracking-[1.28px] text-[#111625] lg:mt-[171px]'>
                  The current weather in{' '}
                  <span className='underline'>
                    {currentLocation.name}, {currentLocation.country}
                  </span>{' '}
                  is {currentForecast.condition.text}.
                </p>
              )}

              {hourlyForcasts.length > 0 && (
                <HourlyForecast hourlyForecasts={hourlyForcasts} />
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

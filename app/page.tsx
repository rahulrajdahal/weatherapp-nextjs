'use client';

import { Navbar } from '@/components';
import { Suspense, useCallback, useEffect, useState } from 'react';

import * as Switch from '@radix-ui/react-switch';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import CurrentForecast, { ICurrentForecast } from './CurrentForecast';
import HourlyForecast from './HourlyForecast';

export interface ICurrentForecastResp
  extends Omit<ICurrentForecast, 'temp' | 'windSpeed'> {
  temp_c: number;
  temp_f: number;
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

  const [tempScale, setTempScale] = useState(false);
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
              if (
                moment(hour.time).format('L') ===
                moment(respJson.current.last_updated).format('L')
              ) {
                return (
                  moment(hour.time).format('HH') >=
                  moment(respJson.current.last_updated).format('HH')
                );
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
        <div className='px-4 md:px-[6%] xl:px-[12.5%]'>
          <div className='no-scrollbar mt-[47px] flex flex-col rounded-[32px] bg-[#F0F4FA] lg:h-[calc(100vh-8rem)] lg:flex-row lg:gap-[6.25rem]'>
            {currentForecast && currentLocation ? (
              <CurrentForecast
                condition={currentForecast.condition}
                humidity={currentForecast.humidity}
                temp={
                  tempScale ? currentForecast.temp_f : currentForecast.temp_c
                }
                last_updated={currentForecast.last_updated}
                tz_id={currentLocation.tz_id}
                windSpeed={currentForecast.wind_kph}
              />
            ) : null}

            <div className='no-scrollbar overflow-y-scroll px-4 xl:pr-[6.944%]'>
              <div className='mt-4 flex items-center justify-end gap-2'>
                <label className='' htmlFor='Celsius Temp'>
                  Celsius
                </label>
                <Switch.Root
                  checked={tempScale}
                  onCheckedChange={setTempScale}
                  className='relative h-[25px] w-[42px] cursor-default rounded-full  bg-gradient-to-br from-green-900 to-green-300 outline-none data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-green-300 data-[state=checked]:to-green-900'
                  id='temp-scale'
                >
                  <Switch.Thumb className='block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]' />
                </Switch.Root>
                <label className='' htmlFor='Fahrenheit Temp'>
                  Fahrenheit
                </label>
              </div>

              {currentForecast && currentLocation && (
                <p className='mt-4 max-w-[597px] text-[32px] font-medium leading-[40px] -tracking-[1.28px] text-[#111625] lg:mt-[155px]'>
                  The current weather in{' '}
                  <span className='underline'>
                    {currentLocation.name}, {currentLocation.country}
                  </span>{' '}
                  is {currentForecast.condition.text}.
                </p>
              )}

              {hourlyForcasts.length > 0 && currentForecast && (
                <HourlyForecast
                  hourlyForecasts={hourlyForcasts}
                  time={currentForecast.last_updated}
                  isCelsius={!tempScale}
                />
              )}
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { TemperatureDisplay } from '@/components';
import Image from 'next/image';
import { myImageLoader } from '@/utils/imageLoader';
import CurrentForecast from './CurrentForecast';
import HourlyForecast from './HourlyForecast';

export default function Home() {
  const [currentForcast, setCurrentForcast] = useState();
  const [hourlyForcasts, setHourlyForcasts] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [location, setLocation] = useState({
    latitude: 27.7293,
    longitude: 85.3343,
  });

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
    const resp = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${location.latitude},${location.longitude}&key=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
    );
    const respJson = await resp.json();

    setCurrentForcast(respJson.current);
    setCurrentLocation(respJson.location);
    setHourlyForcasts(respJson.forecast.forecastday[0].hour);
  }, [location]);

  // const currentForcast = useMemo(async () => {
  //   const data = await getForcast();
  //   if (data) {
  //     return data.current;
  //   }
  // }, [getForcast]);

  useEffect(() => {
    getForcast();
  }, [getForcast]);

  // const respJson = await resp.json();

  return currentForcast && currentLocation ? (
    <>
      <CurrentForecast
        currentForcast={currentForcast}
        currentLocation={currentLocation}
      />
      <HourlyForecast hourlyForecasts={hourlyForcasts} />
    </>
  ) : (
    <strong>No weather data found</strong>
  );
}

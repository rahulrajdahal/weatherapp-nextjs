import type { Meta, StoryObj } from '@storybook/react';
import DailyForecast from './DailyForecast';

/**
 * `DailyForecast` renders the 7-day extended outlook section containing a list of
 * daily high/low cards.
 */
const meta = {
  title: 'Weather/DailyForecast',
  component: DailyForecast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Extended 7-day outlook list visualizing daily conditions, rain chance percentages, and high/low temperature distribution bars.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof DailyForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

import { IDailyForecast } from '@/lib/types/weather';

const mockDailyList: IDailyForecast[] = [
  {
    date: '2026-09-16',
    date_epoch: 1789516800,
    maxtemp_c: 24.5,
    mintemp_c: 14.2,
    avgtemp_c: 19.3,
    maxtemp_f: 76.1,
    mintemp_f: 57.5,
    avgtemp_f: 66.8,
    maxwind_kph: 15.0,
    avghumidity: 50,
    uv: 4,
    condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
    daily_chance_of_rain: 0,
  },
  {
    date: '2026-09-17',
    date_epoch: 1789603200,
    maxtemp_c: 23.0,
    mintemp_c: 15.0,
    avgtemp_c: 19.0,
    maxtemp_f: 73.4,
    mintemp_f: 59.0,
    avgtemp_f: 66.2,
    maxwind_kph: 12.0,
    avghumidity: 55,
    uv: 5,
    condition: { text: 'Partly cloudy', icon: '//cdn.weatherapi.com/weather/64x64/day/116.png' },
    daily_chance_of_rain: 15,
  },
  {
    date: '2026-09-18',
    date_epoch: 1789689600,
    maxtemp_c: 19.8,
    mintemp_c: 13.5,
    avgtemp_c: 16.6,
    maxtemp_f: 67.6,
    mintemp_f: 56.3,
    avgtemp_f: 62.0,
    maxwind_kph: 20.0,
    avghumidity: 70,
    uv: 3,
    condition: { text: 'Patchy rain possible', icon: '//cdn.weatherapi.com/weather/64x64/day/176.png' },
    daily_chance_of_rain: 60,
  },
  {
    date: '2026-09-19',
    date_epoch: 1789776000,
    maxtemp_c: 18.2,
    mintemp_c: 12.0,
    avgtemp_c: 15.1,
    maxtemp_f: 64.8,
    mintemp_f: 53.6,
    avgtemp_f: 59.2,
    maxwind_kph: 25.0,
    avghumidity: 85,
    uv: 2,
    condition: { text: 'Moderate rain', icon: '//cdn.weatherapi.com/weather/64x64/day/302.png' },
    daily_chance_of_rain: 85,
  },
  {
    date: '2026-09-20',
    date_epoch: 1789862400,
    maxtemp_c: 21.0,
    mintemp_c: 13.0,
    avgtemp_c: 17.0,
    maxtemp_f: 69.8,
    mintemp_f: 55.4,
    avgtemp_f: 62.6,
    maxwind_kph: 10.0,
    avghumidity: 45,
    uv: 4,
    condition: { text: 'Sunny', icon: '//cdn.weatherapi.com/weather/64x64/day/113.png' },
    daily_chance_of_rain: 5,
  },
];


export const Celsius: Story = {
  args: {
    dailyForecasts: mockDailyList,
    isCelsius: true,
  },
};

export const Fahrenheit: Story = {
  args: {
    dailyForecasts: mockDailyList,
    isCelsius: false,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { IHourlyForecast } from '@/lib/types/weather';
import HourlyForecast from './HourlyForecast';

/**
 * `HourlyForecast` orchestrates the continuous 24-hour rolling projection,
 * embedding the interactive `WeatherTrendChart` spline and the responsive grid
 * of `HourForecastCard` components.
 */
const meta = {
  title: 'Weather/HourlyForecast',
  component: HourlyForecast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Container orchestrating the 24-hour continuous rolling projection, temperature trend spline, and responsive hourly cards.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof HourlyForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

const generate24hMock = (): IHourlyForecast[] => {
  const base = new Date('2026-09-16T10:00:00Z');
  const items: IHourlyForecast[] = [];

  for (let i = 0; i < 24; i++) {
    const d = new Date(base.getTime() + i * 3600000);
    const timeStr = d.toISOString().replace('T', ' ').substring(0, 16);
    const tempC = 20 + Math.round(5 * Math.sin((i / 24) * Math.PI * 2));

    items.push({
      time: timeStr,
      time_epoch: Math.floor(d.getTime() / 1000),
      temp_c: tempC,
      temp_f: Math.round((tempC * 9) / 5 + 32),
      condition: {
        text: i > 12 && i < 18 ? 'Light rain' : 'Partly cloudy',
        icon:
          i > 12 && i < 18
            ? '//cdn.weatherapi.com/weather/64x64/day/296.png'
            : '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      wind_kph: 12 + (i % 6),
      humidity: 55 + (i % 25),
      feelslike_c: tempC,
      feelslike_f: Math.round((tempC * 9) / 5 + 32),
      chance_of_rain: i > 12 && i < 18 ? 65 : 10,
    });
  }

  return items;
};

const mockHours = generate24hMock();

export const Rolling24Hours: Story = {
  args: {
    hourlyForecasts: mockHours,
    time: '2026-09-16 10:00',
    isCelsius: true,
  },
};

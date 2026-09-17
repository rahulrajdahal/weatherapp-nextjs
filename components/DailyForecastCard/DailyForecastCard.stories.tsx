import type { Meta, StoryObj } from '@storybook/react';
import DailyForecastCard from './DailyForecastCard';

/**
 * The `DailyForecastCard` displays an aggregated daily forecast row in the 7-day outlook list.
 * It features the day of the week, weather icon, chance of precipitation pill badge,
 * and high/low temperature distribution bar.
 */
const meta = {
  title: 'Components/DailyForecastCard',
  component: DailyForecastCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible listitem card visualizing day name, weather summary, rain chance percentage, and a dual-temperature indicator with low and high thresholds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isCelsius: {
      control: 'boolean',
      description: 'Whether temperatures are displayed in Celsius or Fahrenheit',
    },
    forecast: {
      control: 'object',
      description: 'Daily forecast data object conforming to IDailyForecast',
    },
  },
} satisfies Meta<typeof DailyForecastCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Typical mild sunny day with low rain probability.
 */
export const SunnyDay: Story = {
  args: {
    isCelsius: true,
    forecast: {
      date: '2026-09-17',
      date_epoch: 1789603200,
      maxtemp_c: 26.5,
      mintemp_c: 15.2,
      avgtemp_c: 20.8,
      maxtemp_f: 79.7,
      mintemp_f: 59.4,
      avgtemp_f: 69.4,
      maxwind_kph: 14.0,
      avghumidity: 45,
      uv: 5,
      condition: {
        text: 'Sunny',
        icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
      },
      daily_chance_of_rain: 0,
    },
  },
};

/**
 * Rainy day with high chance of precipitation pill visible.
 */
export const RainyWithHighPrecipitation: Story = {
  args: {
    isCelsius: true,
    forecast: {
      date: '2026-09-18',
      date_epoch: 1789689600,
      maxtemp_c: 18.0,
      mintemp_c: 12.4,
      avgtemp_c: 15.2,
      maxtemp_f: 64.4,
      mintemp_f: 54.3,
      avgtemp_f: 59.4,
      maxwind_kph: 22.0,
      avghumidity: 80,
      uv: 3,
      condition: {
        text: 'Heavy rain',
        icon: '//cdn.weatherapi.com/weather/64x64/day/308.png',
      },
      daily_chance_of_rain: 85,
    },
  },
};

/**
 * Imperial scale display (°F) for Fahrenheit users.
 */
export const FahrenheitScale: Story = {
  args: {
    isCelsius: false,
    forecast: {
      date: '2026-09-19',
      date_epoch: 1789776000,
      maxtemp_c: 30.1,
      mintemp_c: 20.0,
      avgtemp_c: 25.0,
      maxtemp_f: 86.2,
      mintemp_f: 68.0,
      avgtemp_f: 77.0,
      maxwind_kph: 11.0,
      avghumidity: 55,
      uv: 6,
      condition: {
        text: 'Partly cloudy',
        icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      daily_chance_of_rain: 20,
    },
  },
};

/**
 * Freezing snow forecast.
 */
export const SnowStorm: Story = {
  args: {
    isCelsius: true,
    forecast: {
      date: '2026-09-20',
      date_epoch: 1789862400,
      maxtemp_c: -1.0,
      mintemp_c: -8.5,
      avgtemp_c: -4.7,
      maxtemp_f: 30.2,
      mintemp_f: 16.7,
      avgtemp_f: 23.5,
      maxwind_kph: 30.0,
      avghumidity: 90,
      uv: 1,
      condition: {
        text: 'Blizzard',
        icon: '//cdn.weatherapi.com/weather/64x64/day/338.png',
      },
      daily_chance_of_rain: 60,
    },
  },
};


import type { Meta, StoryObj } from '@storybook/react';
import HourForecastCard from './HourForecastCard';

/**
 * The `HourForecastCard` component renders an individual hour's projection in the
 * 24-hour continuous rolling forecast carousel. It supports an elevated active state ("Now")
 * with a vibrant blue gradient and standard translucent glassmorphic cards for subsequent hours.
 */
const meta = {
  title: 'Components/HourForecastCard',
  component: HourForecastCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Renders an accessible, interactive hourly meteorological card including time label, WeatherAPI condition icon, current temperature, humidity percentage, and wind speed.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    time: {
      control: 'text',
      description: 'ISO timestamp or formatted date string',
    },
    temp: {
      control: { type: 'number', min: -50, max: 60, step: 1 },
      description: 'Temperature value in active unit scale',
    },
    humidity: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Relative humidity percentage',
    },
    windSpeed: {
      control: { type: 'number', min: 0, max: 200, step: 0.5 },
      description: 'Wind speed in km/h',
    },
    isCurrentHour: {
      control: 'boolean',
      description: 'Whether this card represents the current active hour',
    },
    condition: {
      control: 'object',
      description: 'Condition summary object with text and icon URL',
    },
  },
} satisfies Meta<typeof HourForecastCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Current active hour highlighted with the primary blue gradient theme and 'Now' label.
 */
export const CurrentHour: Story = {
  args: {
    time: '2026-09-16 14:00',
    temp: 22,
    humidity: 58,
    windSpeed: 14.5,
    isCurrentHour: true,
    condition: {
      text: 'Partly Cloudy',
      icon: '//cdn.weatherapi.com/weather/64x64/day/116.png',
    },
  },
};

/**
 * Standard daytime forecast projection card.
 */
export const DaytimeSunny: Story = {
  args: {
    time: '2026-09-16 16:00',
    temp: 24,
    humidity: 45,
    windSpeed: 11.2,
    isCurrentHour: false,
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
    },
  },
};

/**
 * Nighttime projection card with moon/clear sky condition.
 */
export const NightClear: Story = {
  args: {
    time: '2026-09-16 22:00',
    temp: 16,
    humidity: 78,
    windSpeed: 8.0,
    isCurrentHour: false,
    condition: {
      text: 'Clear',
      icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
    },
  },
};

/**
 * Rainy projection with elevated humidity and precipitation.
 */
export const RainyCondition: Story = {
  args: {
    time: '2026-09-17 06:00',
    temp: 14,
    humidity: 92,
    windSpeed: 21.6,
    isCurrentHour: false,
    condition: {
      text: 'Moderate Rain',
      icon: '//cdn.weatherapi.com/weather/64x64/day/302.png',
    },
  },
};

/**
 * Winter/snowy conditions with sub-zero temperatures.
 */
export const FreezingSnow: Story = {
  args: {
    time: '2026-09-17 03:00',
    temp: -4,
    humidity: 86,
    windSpeed: 18.0,
    isCurrentHour: false,
    condition: {
      text: 'Heavy Snow',
      icon: '//cdn.weatherapi.com/weather/64x64/night/338.png',
    },
  },
};

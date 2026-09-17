import { getAtmosphericTheme } from '@/lib/utils/weatherTheme';
import type { Meta, StoryObj } from '@storybook/react';
import CurrentForecast from './CurrentForecast';

/**
 * `CurrentForecast` is the hero panel of the application. It highlights the current
 * live temperature, condition badge, local timestamp, dynamic atmospheric theme gradient,
 * relative humidity, and wind speed.
 */
const meta = {
  title: 'Weather/CurrentForecast',
  component: CurrentForecast,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Hero weather summary panel featuring dynamic gradient backgrounds, condition status chips, and real-time atmospheric metrics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    temp: { control: 'number', description: 'Current temperature' },
    humidity: { control: 'number', description: 'Relative humidity percentage' },
    windSpeed: { control: 'number', description: 'Wind speed in km/h' },
  },
} satisfies Meta<typeof CurrentForecast>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Sunny daytime condition with bright aqua and green gradient hero.
 */
export const SunnyDay: Story = {
  render: (args) => (
    <div className="h-[520px] max-w-sm">
      <CurrentForecast {...args} />
    </div>
  ),
  args: {
    windSpeed: 12.5,
    last_updated: '2026-09-16 14:30',
    temp: 24,
    humidity: 48,
    tz_id: 'Asia/Kathmandu',
    condition: {
      text: 'Sunny',
      icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
    },
    theme: getAtmosphericTheme('Sunny', true),
  },
};

/**
 * Stormy rainy condition with dark dramatic theme.
 */
export const Thunderstorm: Story = {
  render: (args) => (
    <div className="h-[520px] max-w-sm">
      <CurrentForecast {...args} />
    </div>
  ),
  args: {
    windSpeed: 38.0,
    last_updated: '2026-09-16 19:45',
    temp: 17,
    humidity: 94,
    tz_id: 'Europe/London',
    condition: {
      text: 'Thunderstorm with heavy rain',
      icon: '//cdn.weatherapi.com/weather/64x64/night/389.png',
    },
    theme: getAtmosphericTheme('Thunderstorm', false),
  },
};

/**
 * Clear starry night with deep indigo aesthetic.
 */
export const ClearNight: Story = {
  render: (args) => (
    <div className="h-[520px] max-w-sm">
      <CurrentForecast {...args} />
    </div>
  ),
  args: {
    windSpeed: 6.2,
    last_updated: '2026-09-16 23:15',
    temp: 13,
    humidity: 82,
    tz_id: 'Pacific/Auckland',
    condition: {
      text: 'Clear',
      icon: '//cdn.weatherapi.com/weather/64x64/night/113.png',
    },
    theme: getAtmosphericTheme('Clear', false),
  },
};


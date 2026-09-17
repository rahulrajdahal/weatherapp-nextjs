import type { Meta, StoryObj } from '@storybook/react';
import MetricsGrid from './MetricsGrid';

/**
 * `MetricsGrid` displays a 6-tile responsive dashboard containing:
 * - Air Quality Index (US-EPA PM2.5, PM10, O3, NO2 with color-coded health status)
 * - UV Index with sun safety advisory badges
 * - Feels Like apparent temperature with wind chill and humidity explanation
 * - Astronomical timings (Sunrise, Sunset, Moon Phase, Illumination)
 * - Barometric atmospheric pressure (hPa / inHg)
 * - Horizontal visibility distance (km / miles)
 */
const meta = {
  title: 'Components/MetricsGrid',
  component: MetricsGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Comprehensive 6-card meteorological details grid adhering to WCAG AA color contrast, providing health and safety advice based on live atmospheric indicators.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isCelsius: { control: 'boolean', description: 'Celsius vs Fahrenheit scale' },
  },
} satisfies Meta<typeof MetricsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockCurrentForecast = {
  last_updated: '2026-09-16 15:00',
  last_updated_epoch: 1789570800,
  temp_c: 23.4,
  temp_f: 74.1,
  feelslike_c: 24.2,
  feelslike_f: 75.6,
  humidity: 55,
  wind_kph: 12.0,
  pressure_mb: 1014,
  pressure_in: 29.94,
  vis_km: 10,
  vis_miles: 6,
  uv: 5,
  condition: {
    text: 'Sunny',
    icon: '//cdn.weatherapi.com/weather/64x64/day/113.png',
  },
  air_quality: {
    pm2_5: 14.2,
    pm10: 22.8,
    o3: 45.1,
    no2: 12.0,
    'us-epa-index': 1,
  },
};

const mockAstronomy = {
  sunrise: '05:48 AM',
  sunset: '06:05 PM',
  moonrise: '08:30 PM',
  moonset: '09:15 AM',
  moon_phase: 'Waxing Gibbous',
  moon_illumination: 78,
};

/**
 * Normal sunny day with good air quality and moderate UV.
 */
export const GoodAirQuality: Story = {
  args: {
    isCelsius: true,
    currentForecast: mockCurrentForecast,
    astronomy: mockAstronomy,
  },
};

/**
 * Poor air quality (unhealthy) and extreme UV index requiring protection.
 */
export const UnhealthyAirAndHighUV: Story = {
  args: {
    isCelsius: true,
    currentForecast: {
      ...mockCurrentForecast,
      uv: 11,
      air_quality: {
        pm2_5: 85.6,
        pm10: 160.0,
        o3: 180.2,
        no2: 65.4,
        'us-epa-index': 4,
      },
    },
    astronomy: mockAstronomy,
  },
};

/**
 * Imperial measurements (Fahrenheit, inHg, miles).
 */
export const ImperialUnits: Story = {
  args: {
    isCelsius: false,
    currentForecast: mockCurrentForecast,
    astronomy: mockAstronomy,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { IHourlyForecast } from '@/lib/types/weather';
import WeatherTrendChart from './WeatherTrendChart';

/**
 * `WeatherTrendChart` renders an interactive dual-axis Recharts `ComposedChart`:
 * - Cubic Bézier spline with ambient gradient fill for temperature (°C / °F)
 * - Precipitation probability bars (0-100%)
 * - Glassmorphic custom tooltip with temperature, feels-like, rain probability, humidity, and wind speed
 * - Hidden `.sr-only` table summary for complete screen reader accessibility
 */
const meta = {
  title: 'Components/WeatherTrendChart',
  component: WeatherTrendChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Responsive 24-hour continuous rolling weather trendline with dual-axis temperature spline and rain probability bars.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isCelsius: { control: 'boolean', description: 'Temperature scale unit' },
  },
} satisfies Meta<typeof WeatherTrendChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// Generate mock 24-hour sequence
const generateMockHourlyData = (): IHourlyForecast[] => {
  const baseTime = new Date('2026-09-16T12:00:00Z');
  const hourly: IHourlyForecast[] = [];

  const tempCurve = [
    24, 25, 26, 25, 23, 21, 19, 18, 17, 16, 15, 15,
    14, 14, 15, 17, 19, 21, 23, 24, 25, 26, 25, 24,
  ];
  const rainCurve = [
    0, 0, 10, 20, 65, 80, 75, 40, 15, 0, 0, 0,
    0, 0, 5, 10, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  for (let i = 0; i < 24; i++) {
    const d = new Date(baseTime.getTime() + i * 3600000);
    const dateStr = d.toISOString().replace('T', ' ').substring(0, 16);
    const tempC = tempCurve[i];
    const rainChance = rainCurve[i];

    hourly.push({
      time: dateStr,
      time_epoch: Math.floor(d.getTime() / 1000),
      temp_c: tempC,
      temp_f: Math.round((tempC * 9) / 5 + 32),
      condition: {
        text: rainChance > 50 ? 'Patchy rain' : 'Partly cloudy',
        icon:
          rainChance > 50
            ? '//cdn.weatherapi.com/weather/64x64/day/296.png'
            : '//cdn.weatherapi.com/weather/64x64/day/116.png',
      },
      wind_kph: 10 + (i % 8),
      humidity: 50 + Math.round(rainChance * 0.4),
      feelslike_c: tempC + (rainChance > 40 ? -1 : 1),
      feelslike_f: Math.round((tempC * 9) / 5 + 32),
      chance_of_rain: rainChance,
    });
  }

  return hourly;
};

const mock24Hours = generateMockHourlyData();

/**
 * Standard 24-hour cycle showing daytime peak, evening showers, and cool overnight temps in Celsius.
 */
export const CelsiusTrendline: Story = {
  args: {
    hourlyForecasts: mock24Hours,
    isCelsius: true,
  },
};

/**
 * Same 24-hour cycle displayed in Fahrenheit scale (°F).
 */
export const FahrenheitTrendline: Story = {
  args: {
    hourlyForecasts: mock24Hours,
    isCelsius: false,
  },
};

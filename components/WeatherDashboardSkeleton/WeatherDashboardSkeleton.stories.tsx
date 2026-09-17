import type { Meta, StoryObj } from '@storybook/react';
import WeatherDashboardSkeleton from './WeatherDashboardSkeleton';

/**
 * `WeatherDashboardSkeleton` provides instant feedback during initial loading
 * and city switches with zero Cumulative Layout Shift (CLS).
 */
const meta = {
  title: 'Components/WeatherDashboardSkeleton',
  component: WeatherDashboardSkeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Shimmer skeleton loader matching the exact dimensional layout of the active dashboard.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof WeatherDashboardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

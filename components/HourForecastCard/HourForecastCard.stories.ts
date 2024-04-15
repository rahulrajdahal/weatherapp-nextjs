import type { Meta, StoryObj } from '@storybook/react';

import HourForecastCard, { initialProps } from './HourForecastCard';

const meta = {
  title: 'Components/HourForecastCard',
  component: HourForecastCard,
  args: initialProps,
} satisfies Meta<typeof HourForecastCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

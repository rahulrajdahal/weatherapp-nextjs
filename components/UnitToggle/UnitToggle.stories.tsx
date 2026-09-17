import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import UnitToggle from './UnitToggle';

/**
 * `UnitToggle` provides a one-tap segmented radio control for toggling
 * temperature scales between Celsius (°C) and Fahrenheit (°F).
 */
const meta = {
  title: 'Components/UnitToggle',
  component: UnitToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dedicated temperature scale switch with animated active elevation, ARIA radio group semantics, and full keyboard focus ring styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isCelsius: {
      control: 'boolean',
      description: 'True for Celsius, false for Fahrenheit',
    },
  },
} satisfies Meta<typeof UnitToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive story where clicking toggles state live.
 */
export const Interactive: Story = {
  render: (args) => {
    const [celsius, setCelsius] = useState(args.isCelsius ?? true);
    return <UnitToggle {...args} isCelsius={celsius} onChange={setCelsius} />;
  },
  args: {
    isCelsius: true,
    onChange: () => {},
  },
};

/**
 * Celsius state active.
 */
export const CelsiusActive: Story = {
  args: {
    isCelsius: true,
    onChange: () => {},
  },
};

/**
 * Fahrenheit state active.
 */
export const FahrenheitActive: Story = {
  args: {
    isCelsius: false,
    onChange: () => {},
  },
};

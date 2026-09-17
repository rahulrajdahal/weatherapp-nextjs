import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SegmentedControl from './SegmentedControl';

/**
 * `SegmentedControl` is a high-accessibility WAI-ARIA radiogroup component that lets
 * users select among discrete mutually-exclusive options with keyboard arrow support.
 */
const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible segmented switch / tablist component with keyboard navigation (Left/Right/Up/Down arrows), active indicator elevation, and customizable sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Scale size variant',
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible name for the radiogroup',
    },
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive 3-way view tab control (e.g. Hourly, 7-Day, Radar).
 */
export const ForecastTabs: Story = {
  render: (args) => {
    const [view, setView] = useState('hourly');
    return (
      <SegmentedControl
        {...args}
        value={view}
        onChange={setView}
        options={[
          { value: 'hourly', label: '24-Hour', icon: '⏱️' },
          { value: 'daily', label: '7-Day', icon: '📅' },
          { value: 'metrics', label: 'Metrics', icon: '📊' },
        ]}
      />
    );
  },
  args: {
    size: 'md',
    ariaLabel: 'Forecast view options',
    value: 'hourly',
    options: [],
    onChange: () => {},
  },
};

/**
 * Small size variant with temperature units.
 */
export const SmallTemperatureScale: Story = {
  render: (args) => {
    const [unit, setUnit] = useState('c');
    return (
      <SegmentedControl
        {...args}
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'c', label: '°C' },
          { value: 'f', label: '°F' },
        ]}
      />
    );
  },
  args: {
    size: 'sm',
    ariaLabel: 'Temperature unit',
    value: 'c',
    options: [],
    onChange: () => {},
  },
};

/**
 * Large size variant.
 */
export const LargeSize: Story = {
  render: (args) => {
    const [active, setActive] = useState('day');
    return (
      <SegmentedControl
        {...args}
        value={active}
        onChange={setActive}
        options={[
          { value: 'day', label: 'Day View', icon: '☀️' },
          { value: 'night', label: 'Night View', icon: '🌙' },
        ]}
      />
    );
  },
  args: {
    size: 'lg',
    ariaLabel: 'Time of day view',
    value: 'day',
    options: [],
    onChange: () => {},
  },
};

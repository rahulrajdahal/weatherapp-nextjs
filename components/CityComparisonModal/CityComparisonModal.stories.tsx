import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CityComparisonModal from './CityComparisonModal';

/**
 * `CityComparisonModal` is a dedicated dialog that enables side-by-side
 * meteorological comparisons of 2 to 3 cities, highlighting temperature differentials
 * (warmer/cooler deltas), condition contrasts, air quality, and hourly curves.
 */
const meta = {
  title: 'Components/CityComparisonModal',
  component: CityComparisonModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Accessible modal dialog with Escape-key dismiss, backdrop click handler, city selector chips, and comparative meteorological metrics.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean', description: 'Whether the modal is visible' },
    isCelsius: { control: 'boolean', description: 'Active temperature scale' },
    initialCity: { control: 'text', description: 'Default city to compare' },
  },
} satisfies Meta<typeof CityComparisonModal>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive story with open/close state trigger.
 */
export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.isOpen ?? false);

    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md cursor-pointer"
        >
          Open City Comparison Modal
        </button>

        <CityComparisonModal
          {...args}
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </div>
    );
  },
  args: {
    isOpen: false,
    onClose: () => {},
    initialCity: 'Kathmandu',
    isCelsius: true,
    favorites: ['Kathmandu', 'Auckland', 'London', 'Tokyo'],
  },
};

/**
 * Open modal view state.
 */
export const OpenModal: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    initialCity: 'Kathmandu',
    isCelsius: true,
    favorites: ['Kathmandu', 'Auckland', 'Tokyo'],
  },
};

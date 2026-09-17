import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FavoritesBar from './FavoritesBar';

/**
 * The `FavoritesBar` provides immediate 1-tap navigation between saved favorite
 * cities, highlights the currently active city, allows deleting bookmarks, and opens
 * the multi-city comparison view.
 */
const meta = {
  title: 'Components/FavoritesBar',
  component: FavoritesBar,
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'Day Sunny Gradient' },
    docs: {
      description: {
        component:
          'Horizontal glassmorphism bookmark toolbar rendered beneath the main navigation with interactive chip pills and compare trigger.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    favorites: { control: 'object', description: 'List of bookmarked city names' },
    activeCity: { control: 'text', description: 'Currently active city' },
  },
} satisfies Meta<typeof FavoritesBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive story where you can select or remove bookmarked cities.
 */
export const Interactive: Story = {
  render: (args) => {
    const [cities, setCities] = useState(
      args.favorites || ['Kathmandu', 'Bhaktapur', 'Auckland', 'Douglas']
    );
    const [active, setActive] = useState(args.activeCity || 'Kathmandu');

    return (
      <FavoritesBar
        {...args}
        favorites={cities}
        activeCity={active}
        onSelectCity={setActive}
        onRemoveFavorite={(city) =>
          setCities(cities.filter((c) => c !== city))
        }
        onOpenCompare={() => alert('Open compare modal clicked')}
      />
    );
  },
  args: {
    favorites: ['Kathmandu', 'Bhaktapur', 'Auckland', 'Douglas'],
    activeCity: 'Kathmandu',
    onSelectCity: () => {},
    onRemoveFavorite: () => {},
    onOpenCompare: () => {},
  },
};

/**
 * Empty favorites list renders nothing (null).
 */
export const Empty: Story = {
  args: {
    favorites: [],
    onSelectCity: () => {},
    onRemoveFavorite: () => {},
    onOpenCompare: () => {},
  },
};

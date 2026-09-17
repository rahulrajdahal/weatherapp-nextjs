import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import LocationHeadline from './LocationHeadline';

/**
 * `LocationHeadline` serves as the primary focal heading on the dashboard.
 * It provides semantic H1 landmark structure, prominent underline accent, and
 * a 1-tap bookmark favorite button.
 */
const meta = {
  title: 'Components/LocationHeadline',
  component: LocationHeadline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Primary H1 location summary heading showing city, country, dynamic condition phrasing, and interactive bookmark button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cityName: { control: 'text', description: 'Name of the city' },
    country: { control: 'text', description: 'Country of the city' },
    conditionText: { control: 'text', description: 'Current condition summary' },
    isFavorite: { control: 'boolean', description: 'Favorite bookmark status' },
  },
} satisfies Meta<typeof LocationHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive story with togglable favorite bookmark star.
 */
export const Interactive: Story = {
  render: (args) => {
    const [fav, setFav] = useState(args.isFavorite ?? false);
    return (
      <LocationHeadline
        {...args}
        isFavorite={fav}
        onToggleFavorite={() => setFav(!fav)}
      />
    );
  },
  args: {
    cityName: 'Kathmandu',
    country: 'Nepal',
    conditionText: 'Sunny',
    isFavorite: false,
    onToggleFavorite: () => {},
  },
};

/**
 * Active bookmarked state with golden star badge.
 */
export const BookmarkedFavorite: Story = {
  args: {
    cityName: 'Auckland',
    country: 'New Zealand',
    conditionText: 'Partly cloudy',
    isFavorite: true,
    onToggleFavorite: () => {},
  },
};

/**
 * Long metropolitan region name handling.
 */
export const LongLocationName: Story = {
  args: {
    cityName: 'Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch',
    country: 'United Kingdom',
    conditionText: 'Light intermittent rain',
    isFavorite: false,
    onToggleFavorite: () => {},
  },
};

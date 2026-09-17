import type { Meta, StoryObj } from '@storybook/react';
import OfflineBadge from './OfflineBadge';

const meta: Meta<typeof OfflineBadge> = {
  title: 'Components/OfflineBadge',
  component: OfflineBadge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    lastUpdated: '12:30 PM',
  },
};

export default meta;
type Story = StoryObj<typeof OfflineBadge>;

export const Default: Story = {};

export const WithoutTimestamp: Story = {
  args: {
    lastUpdated: undefined,
  },
};

export const OnThunderstormBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}>
        <Story />
      </div>
    ),
  ],
};

export const OnSunnyBackground: Story = {
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 100%)' }}>
        <Story />
      </div>
    ),
  ],
};

export const OnClearNightBackground: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="p-8 rounded-2xl" style={{ background: 'linear-gradient(135deg, #020617 0%, #0b1120 40%, #1e1b4b 100%)' }}>
        <Story />
      </div>
    ),
  ],
};

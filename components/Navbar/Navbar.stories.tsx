import type { Meta, StoryObj } from '@storybook/react';
import Navbar from './Navbar';

/**
 * `Navbar` provides the top navigation bar of HawaPani, containing branding and
 * search autocomplete.
 */
const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    backgrounds: { default: 'Day Sunny Gradient' },
    docs: {
      description: {
        component:
          'Primary header landmark navigation with brand identity link and responsive location search input.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="bg-gradient-to-r from-blue-600 via-sky-500 to-teal-400 p-2">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    className: '',
  },
};




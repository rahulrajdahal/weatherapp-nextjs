import type { Meta, StoryObj } from '@storybook/react';
import NotFound from './not-found';

/**
 * `NotFound` displays the 404 error screen when a route or meteorological
 * location cannot be resolved. It provides an accessible recovery flow to
 * return to the main dashboard or select popular cities.
 */
const meta = {
  title: 'Pages/NotFound',
  component: NotFound,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Atmospheric 404 Not Found error page featuring glassmorphic design, accessible skip-link target, and direct links to popular destinations.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

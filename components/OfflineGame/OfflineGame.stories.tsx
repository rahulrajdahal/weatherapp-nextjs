import type { Meta, StoryObj } from '@storybook/react';
import OfflineGame from './OfflineGame';

const meta: Meta<typeof OfflineGame> = {
  title: 'Components/OfflineGame',
  component: OfflineGame,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onRetryConnection: { action: 'retryClicked' },
  },
};

export default meta;
type Story = StoryObj<typeof OfflineGame>;

export const Default: Story = {};

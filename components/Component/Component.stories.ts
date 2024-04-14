import type { Meta, StoryObj } from '@storybook/react';

import Component from './Component';

const meta = {
  title: 'Components/Component',
  component: Component,
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

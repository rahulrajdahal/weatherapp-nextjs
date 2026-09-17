import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import Popover from './Popover';

const meta: Meta<typeof Popover.Root> = {
  title: 'Components/Popover',
  component: Popover.Root,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Popover.Root>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-blue-700 transition cursor-pointer">
            Open Popover
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className="w-64 rounded-2xl bg-white p-4 shadow-xl border border-slate-200 z-50 text-xs text-slate-700"
          >
            <h4 className="font-semibold text-slate-900 mb-1">Popover Header</h4>
            <p className="mb-3 text-slate-500">
              Encapsulated Radix UI popover primitive adhering to project architecture.
            </p>
            <Popover.Close asChild>
              <button className="rounded-lg bg-slate-100 px-2.5 py-1 font-medium text-slate-700 hover:bg-slate-200 transition">
                Close
              </button>
            </Popover.Close>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Input from './Input';

/**
 * `Input` is a debounced HTML input wrapper ensuring performant input handling
 * without unnecessary rerenders or API floods.
 */
const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Debounced input component providing automatic timeout cleanup, forwarded ref support, and accessible labeling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    debounce: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Debounce timeout in milliseconds',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder helper text',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Interactive debounced search text input.
 */
export const DebouncedSearch: Story = {
  render: (args) => {
    const [liveVal, setLiveVal] = useState('');
    const [debouncedVal, setDebouncedVal] = useState('');

    return (
      <div className="flex flex-col gap-3 w-80">
        <Input
          {...args}
          value={liveVal}
          onChangeValue={(val) => {
            setLiveVal(String(val));
            setDebouncedVal(String(val));
          }}
          className="w-full px-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-slate-900 shadow-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
        />
        <p className="text-xs text-slate-500">
          Debounced output: <span className="font-bold text-slate-800">{debouncedVal || '(waiting)'}</span>
        </p>
      </div>
    );
  },
  args: {
    debounce: 300,
    placeholder: 'Search for a city or region...',
    value: '',
    onChangeValue: () => {},
  },
};

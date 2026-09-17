import type { Meta, StoryObj } from '@storybook/react';
import AlertBanner from './AlertBanner';

const meta = {
  title: 'Components/AlertBanner',
  component: AlertBanner,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accessible alert aside element formatted with amber styling, warning icon, severity chip, and interactive expandable instructions drawer.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    alerts: {
      control: 'object',
      description: 'List of weather alert items adhering to IWeatherAlert',
    },
  },
} satisfies Meta<typeof AlertBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Severe thunderstorm warning with emergency instructions.
 */
export const SevereThunderstorm: Story = {
  args: {
    alerts: [
      {
        event: 'Severe Thunderstorm Warning',
        severity: 'Severe',
        headline: 'Severe Thunderstorm Warning in effect until 7:00 PM EDT',
        desc: 'At 5:15 PM EDT, severe thunderstorms capable of producing damaging winds in excess of 60 mph and quarter size hail were located along a line extending near the metropolitan region.\n\nPrecautionary actions: Take shelter immediately in an interior room on the lowest floor of a sturdy building.',
        instruction: 'Move to an interior room on the lowest floor of your home or business. Avoid windows.',
        effective: '2026-09-16 17:15',
        expires: '2026-09-16 19:00',
      },
    ],
  },
};

/**
 * Flash Flood watch with moderate severity.
 */
export const FlashFloodWatch: Story = {
  args: {
    alerts: [
      {
        event: 'Flash Flood Watch',
        severity: 'Moderate',
        headline: 'Flash Flood Watch issued for low-lying coastal and basin areas',
        desc: 'Excessive runoff may result in flooding of rivers, creeks, streams, and other low-lying and flood-prone locations. Flooding may occur in poor drainage and urban areas.',
        instruction: 'Do not drive through flooded roadways. Turn around, dont drown.',
        effective: '2026-09-16 12:00',
        expires: '2026-09-17 06:00',
      },
    ],
  },
};

/**
 * Empty alert list renders nothing (null).
 */
export const NoAlerts: Story = {
  args: {
    alerts: [],
  },
};

export const OnThunderstormBackground: Story = {
  args: SevereThunderstorm.args,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div
        className="p-8 rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const OnSunnyBackground: Story = {
  args: SevereThunderstorm.args,
  parameters: {
    backgrounds: { default: 'light' },
  },
  decorators: [
    (Story) => (
      <div
        className="p-8 rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const OnClearNightBackground: Story = {
  args: FlashFloodWatch.args,
  parameters: {
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div
        className="p-8 rounded-2xl"
        style={{
          background:
            'linear-gradient(135deg, #020617 0%, #0b1120 40%, #1e1b4b 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};


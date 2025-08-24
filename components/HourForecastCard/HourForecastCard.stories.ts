import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import HourForecastCard, { initialProps } from "./HourForecastCard";

const meta = {
  title: "Components/HourForecastCard",
  component: HourForecastCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: initialProps,
} satisfies Meta<typeof HourForecastCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

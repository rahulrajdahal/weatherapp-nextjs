import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import SearchInput from "./SearchInput";

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

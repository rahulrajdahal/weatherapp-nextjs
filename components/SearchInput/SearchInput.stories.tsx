import type { Meta, StoryObj } from "@storybook/react";
import SearchInput from "./SearchInput";

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
        query: { q: "Kathmandu" },
      },
    },
    docs: {
      description: {
        component:
          "Search bar with debounce, Suggestions dropdown, URL query synchronization, and geolocation trigger.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className="w-96">
      <SearchInput {...args} />
    </div>
  ),
};

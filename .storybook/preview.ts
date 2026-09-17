import type { Preview } from "@storybook/react";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: "Sky Light",
      values: [
        {
          name: "Sky Light",
          value: "#f0f6fc",
        },
        {
          name: "Day Sunny Gradient",
          value: "linear-gradient(135deg, #e0f2fe 0%, #f0fdf4 100%)",
        },
        {
          name: "Night Dark",
          value: "#0b1329",
        },
        {
          name: "Overcast",
          value: "#e2e8f0",
        },
        {
          name: "White",
          value: "#ffffff",
        },
      ],
    },
    nextjs: {
      appDirectory: true,
    },
    a11y: {
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;

import type { Meta, StoryObj } from "@storybook/react-vite";

import ThemeShowcase from "./ThemeShowcase";
// @ts-expect-error - Json import
import tailwindExtend from "../../../../../tailwindExtend.json";

const meta = {
  title: "Theme/DesignSystem",
  component: ThemeShowcase,
  parameters: {
    layout: "fullscreen",
    docs: {
      source: {
        code: `
Extended Tailwind Config:

${JSON.stringify(tailwindExtend, null, 2)}
				`,
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

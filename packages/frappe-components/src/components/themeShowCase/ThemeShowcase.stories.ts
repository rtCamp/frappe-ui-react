import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeShowcase from "./ThemeShowcase";

const meta = {
  title: "Theme/DesignSystem",
  component: ThemeShowcase,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

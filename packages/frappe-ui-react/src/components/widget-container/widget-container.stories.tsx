import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetContainer } from "./index";

const meta: Meta<typeof WidgetContainer> = {
  title: "Components/Dashboard/WidgetContainer",
  tags: ["autodocs"],
  component: WidgetContainer,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof WidgetContainer>;

export const Default: Story = {
  parameters:{

  },
  args: {
    title: "Quick Links"
  },
  render: (args) => (
    <WidgetContainer {...args}>
      {/* TODO: Use link buttons. Blocked by issue #38 */}
      <p className="text-ink-gray-8">Create Leave Application</p>
      <p className="text-ink-gray-8">Feedback Recieved/Given</p>
      <p className="text-ink-gray-8">Heldesk</p>
      <p className="text-ink-gray-8">Handbook</p>
    </WidgetContainer>
  ),
  argTypes: {
    title: { control: "text", description: "Title for the widget" },
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { WidgetContainer } from "./index";

import {title as quicklinksTitle , Widget as QuicklinksWidget} from "./widget-quicklinks"
import {title as greetingTitle , Widget as GreetingWidget} from "./widget-greet"
import { WidgetList } from "./widgetList";

const WIDGETS = [
  { id: 1, title: quicklinksTitle, Widget: QuicklinksWidget },
  { id: 2, title: greetingTitle, Widget: GreetingWidget },
]

const meta: Meta<typeof WidgetContainer> = {
  title: "Components/Dashboard/Widget",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof WidgetContainer>;

export const Default: Story = {
  args: {
    title: "Quick Links"
  },
  render: () => (
    <WidgetList widgets={WIDGETS}/>
  ),
  argTypes: {
    title: { control: "text", description: "Title for the widget" },
  },
};

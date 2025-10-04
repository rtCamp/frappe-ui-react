import type { Meta, StoryObj } from "@storybook/react-vite";

import {title as quicklinksTitle , Widget as QuicklinksWidget} from "./widget-quicklinks"
import { WidgetContainer } from "./widgetContainer";

const meta: Meta<typeof WidgetContainer> = {
  title: "Components/Dashboard/WidgetContainer",
  tags:[
    "autodocs"
  ],
};
export default meta;

type Story = StoryObj<typeof WidgetContainer>;

export const Open: Story = {
  render: () => (
    <WidgetContainer id={"1"} title={quicklinksTitle} Widget={QuicklinksWidget} isWidgetOpen={true} toggle={()=>{}}/>
  ),
};

export const Close: Story = {
  render: () => (
    <WidgetContainer id={"1"} title={quicklinksTitle} Widget={QuicklinksWidget} isWidgetOpen={false} toggle={()=>{}}/>
  ),
};

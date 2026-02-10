import type { Meta, StoryObj } from "@storybook/react-vite";
import { RowHeader } from "./rowHeader";

const meta: Meta<typeof RowHeader> = {
  title: "Components/Timesheet/RowHeader",
  component: RowHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

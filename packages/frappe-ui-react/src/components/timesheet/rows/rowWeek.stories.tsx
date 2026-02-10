import type { Meta, StoryObj } from "@storybook/react-vite";
import { RowWeek } from "./rowWeek";

const meta: Meta<typeof RowWeek> = {
  title: "Components/Timesheet/RowWeek",
  component: RowWeek,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    thisWeek: true,
    status: "not-submitted",
    dates: ["Dec 29", "Dec 30", "Dec 31", "Jan 1", "Jan 2", "Jan 3", "Jan 4"],
  },
  render: (args) => {
    return <RowWeek {...args} />;
  },
};

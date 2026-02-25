import type { Meta, StoryObj } from "@storybook/react-vite";
import { RowWeek } from "./rowWeek";
import { useState } from "react";

const meta: Meta<typeof RowWeek> = {
  title: "Components/Timesheet/RowWeek",
  component: RowWeek,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: () => {
    const [collapseds, setCollapseds] = useState({
      "This Week": false,
      "Last Week": false,
      "Dec 15 - Dec 21, 2025": false,
      "Dec 8 - Dec 14, 2025": false,
      "Dec 1 - Dec 7, 2025": false,
    });
    return (
      <div className="w-295 p-4">
        <div className="w-full text-sm">
          <h2 className="py-4">This Week = true</h2>
          <RowWeek
            label="This Week"
            collapsed={collapseds["This Week"]}
            totalHours="40:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "This Week": !prev["This Week"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            thisWeek={true}
            today="Jan 4"
            status={"Not Submitted"}
          />
          <RowWeek
            label="Dec 8 - Dec 14, 2025"
            collapsed={collapseds["Dec 8 - Dec 14, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 8 - Dec 14, 2025": !prev["Dec 8 - Dec 14, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={true}
            status={"Approval Pending"}
          />
          <RowWeek
            label="Dec 15 - Dec 21, 2025"
            collapsed={collapseds["Dec 15 - Dec 21, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 15 - Dec 21, 2025": !prev["Dec 15 - Dec 21, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={true}
            status={"Rejected"}
          />
          <RowWeek
            label="Last Week"
            collapsed={collapseds["Last Week"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Last Week": !prev["Last Week"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"Approved"}
          />
          <RowWeek
            label="Dec 1 - Dec 7, 2025"
            collapsed={collapseds["Dec 1 - Dec 7, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 1 - Dec 7, 2025": !prev["Dec 1 - Dec 7, 2025"],
              }))
            }
            dates={[
              "Dec 29",
              "Dec 30",
              "Dec 31",
              "Jan 1",
              "Jan 2",
              "Jan 3",
              "Jan 4",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"None"}
          />
          <h2 className="py-4">This Week = false</h2>
          <RowWeek
            label="This Week"
            collapsed={collapseds["This Week"]}
            totalHours="40:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "This Week": !prev["This Week"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            thisWeek={false}
            today="Jan 4"
            status={"Not Submitted"}
          />
          <RowWeek
            label="Dec 8 - Dec 14, 2025"
            collapsed={collapseds["Dec 8 - Dec 14, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 8 - Dec 14, 2025": !prev["Dec 8 - Dec 14, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"Approval Pending"}
          />
          <RowWeek
            label="Dec 15 - Dec 21, 2025"
            collapsed={collapseds["Dec 15 - Dec 21, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 15 - Dec 21, 2025": !prev["Dec 15 - Dec 21, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"Rejected"}
          />
          <RowWeek
            label="Last Week"
            collapsed={collapseds["Last Week"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Last Week": !prev["Last Week"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"Approved"}
          />
          <RowWeek
            label="Dec 1 - Dec 7, 2025"
            collapsed={collapseds["Dec 1 - Dec 7, 2025"]}
            totalHours="35:00"
            onToggle={() =>
              setCollapseds((prev) => ({
                ...prev,
                "Dec 1 - Dec 7, 2025": !prev["Dec 1 - Dec 7, 2025"],
              }))
            }
            dates={[
              "Dec 22",
              "Dec 23",
              "Dec 24",
              "Dec 25",
              "Dec 26",
              "Dec 27",
              "Jan 28",
            ]}
            today="Jan 4"
            thisWeek={false}
            status={"None"}
          />
        </div>
      </div>
    );
  },
};

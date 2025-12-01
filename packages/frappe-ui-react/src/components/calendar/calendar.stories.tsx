import type { Meta, StoryObj } from "@storybook/react-vite";

import type { CalendarConfig, CalendarEvent } from "./types";
import { Calendar } from "./calendar";
import TabButtons from "../tabButtons";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "fullscreen" },
  argTypes: {
    config: {
      createNewEvent: { action: "create" },
      updateEventState: { action: "update" },
      deleteEvent: { action: "delete" },
      description: "Configuration object for the calendar",
    },
    events: {
      description: "Array of calendar events to display",
    },
    header: {
      description: "Custom header component for the calendar",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const config: Partial<CalendarConfig> = {
  defaultMode: "Month" as CalendarConfig["defaultMode"],
  isEditMode: true,
  eventIcons: {},
  allowCustomClickEvents: true,
  redundantCellHeight: 0,
  hourHeight: 50,
  enableShortcuts: false,
  timeFormat: "12h",
};
const getCurrentMonthYear = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
};

const currentMonthYear = getCurrentMonthYear();

const events: CalendarEvent[] = [
  {
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    id: "EDU-CSH-2024-00091",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-02`,
    toDate: `${currentMonthYear}-02`,
    fromTime: "16:30",
    toTime: "17:30",
    color: "violet",
  },
  {
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    id: "EDU-CSH-2024-00092",
    venue: "CNF-ROOM-2024-00002",
    fromDate: `${currentMonthYear}-04`,
    toDate: `${currentMonthYear}-04`,
    fromTime: "13:30",
    toTime: "17:30",
    color: "green",
  },
  {
    title: "English by Sheldon",
    participant: "Sheldon",
    id: "EDU-CSH-2024-00093",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-16`,
    toDate: `${currentMonthYear}-16`,
    fromTime: "10:30",
    toTime: "11:30",
    color: "blue",
  },
  {
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    id: "EDU-CSH-2024-00094",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-21`,
    toDate: `${currentMonthYear}-21`,
    fromTime: "16:30",
    toTime: "17:30",
    color: "red",
  },
  {
    title: "Google Meet with John ",
    participant: "John",
    id: "#htrht41",
    venue: "Google Meet",
    fromDate: `${currentMonthYear}-11`,
    toDate: `${currentMonthYear}-11`,
    fromTime: "00:00",
    toTime: "02:00",
    color: "amber",
    isFullDay: true,
  },
  {
    title: "Zoom Meet with Sheldon",
    participant: "Sheldon",
    id: "#htrht42",
    venue: "Google Meet",
    fromDate: `${currentMonthYear}-07`,
    toDate: `${currentMonthYear}-07`,
    fromTime: "00:00",
    toTime: "02:00",
    color: "amber",
    isFullDay: true,
  },
];

export const Default: Story = {
  args: {
    config: {
      ...config,
      createNewEvent: (event: CalendarEvent) => console.log("Create Event", event),
      updateEventState: (event: CalendarEvent) => console.log("Update Event", event),
      deleteEvent: (eventId: string|number) => console.log("Delete Event", eventId),
    },
    events,
  },
  render: (args) => (
    <div className="flex h-screen flex-col overflow-hidden p-5">
      <Calendar {...args} />
    </div>
  ),
};

export const CustomHeader: Story = {
  args: {
    ...Default.args,
    header: ({
      currentMonthYear,
      decrement,
      increment,
      enabledModes,
      activeView,
      updateActiveView,
    }) => (
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-ink-gray-8">
            {currentMonthYear}
          </h1>
          <div className="flex items-center gap-1 text-ink-gray-8">
            <button
              onClick={decrement}
              className="p-2 rounded hover:bg-gray-200"
            >
              Previous
            </button>
            <button
              onClick={increment}
              className="p-2 rounded hover:bg-gray-200"
            >
              Next
            </button>
          </div>
          <TabButtons
            buttons={enabledModes.map(
              (mode: { id: string; label: string }) => ({
                value: mode.id,
                label: mode.label,
              })
            )}
            value={activeView}
            onChange={updateActiveView}
          />
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="flex h-screen flex-col overflow-hidden p-5">
      <Calendar {...args} />
    </div>
  ),
};

export const CustomClickEvents: Story = {
  args: {
    config: {
      ...config,
      allowCustomClickEvents: true,
      onClick: () => {
        console.log("Cell clicked");
      },
      onDblClick: () => {
        console.log("Cell double clicked");
      },
      onCellDblClick: () => {
        console.log("Cell double clicked");
      },
    },
    events,
  },
  render: (args) => (
    <div className="flex h-screen flex-col overflow-hidden p-5">
      <Calendar {...args} />
    </div>
  ),
};

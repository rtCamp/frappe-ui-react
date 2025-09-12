import { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router";
import { action } from "storybook/actions";

import type { CalendarConfig, CalendarEvent } from "./types";
import { Calendar } from "./calendar";
import TabButtons from "../TabButtons";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
  },
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

const config = {
  defaultMode: "Month" as CalendarConfig["defaultMode"],
  isEditMode: true,
  eventIcons: {},
  allowCustomClickEvents: true,
  redundantCellHeight: 100,
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
    id: "EDU-CSH-2024-00091",
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-02 16:30:00`,
    toDate: `${currentMonthYear}-02 17:30:00`,
    color: "violet",
  },
  {
    id: "EDU-CSH-2024-00092",
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    venue: "CNF-ROOM-2024-00002",
    fromDate: `${currentMonthYear}-04 13:30:00`,
    toDate: `${currentMonthYear}-04 17:30:00`,
    color: "green",
  },
  {
    id: "EDU-CSH-2024-00093",
    title: "English by Sheldon",
    participant: "Sheldon",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-16 10:30:00`,
    toDate: `${currentMonthYear}-16 11:30:00`,
    color: "blue",
  },
  {
    id: "EDU-CSH-2024-00094",
    title: "English by Ryan Mathew",
    participant: "Ryan Mathew",
    venue: "CNF-ROOM-2024-00001",
    fromDate: `${currentMonthYear}-21 16:30:00`,
    toDate: `${currentMonthYear}-21 17:30:00`,
    color: "red",
  },
  {
    id: "#htrht41",
    title: "Google Meet with John",
    participant: "John",
    venue: "Google Meet",
    fromDate: `${currentMonthYear}-11 00:00:00`,
    toDate: `${currentMonthYear}-11 23:59:59`,
    color: "amber",
    isFullDay: true,
  },
  {
    id: "#htrht42",
    title: "Zoom Meet with Sheldon",
    participant: "Sheldon",
    venue: "Google Meet",
    fromDate: `${currentMonthYear}-07 00:00:00`,
    toDate: `${currentMonthYear}-07 23:59:59`,
    color: "amber",
    isFullDay: true,
  },
];

export const Default: Story = {
  args: {
    config: {
      ...config,
      createNewEvent: action("createEvent"),
      updateEventState: action("updateEvent"),
      deleteEvent: action("deleteEvent"),
    },
    events,
  },
  render: (args) => (
    <MemoryRouter>
      <div className="flex h-screen flex-col overflow-hidden p-5">
        <Calendar {...args} />
      </div>
    </MemoryRouter>
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
          <h1 className="text-xl font-bold text-ink-gray-1">{currentMonthYear}</h1>
          <div className="flex items-center gap-1 text-ink-gray-1">
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
    <MemoryRouter>
      <div className="flex h-screen flex-col overflow-hidden p-5">
        <Calendar {...args} />
      </div>
    </MemoryRouter>
  ),
};

export const CustomClickEvents: Story = {
  args: {
    config: {
      ...config,
      allowCustomClickEvents: true,
      onClick: action("onClick"),
      onDblClick: action("onDblClick"),
      onCellDblClick: action("onCellDblClick"),
    },
    events,
  },
  render: (args) => (
    <MemoryRouter>
      <div className="flex h-screen flex-col overflow-hidden p-5">
        <Calendar {...args} />
      </div>
    </MemoryRouter>
  ),
};

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";
import {
  Home,
  Settings,
  Users,
  FileText,
  Search,
  Mail,
  Calendar,
  BarChart,
} from "lucide-react";

import { CommandPalette } from "./commandPalette";
import { Button } from "../button";
import type { CommandPaletteGroup } from "./types";

const filterGroups = (
  groups: CommandPaletteGroup[],
  query: string
): CommandPaletteGroup[] =>
  groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0);

const handleSelect = action("onSelect");

const meta: Meta<typeof CommandPalette> = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    show: {
      control: "boolean",
      description: "Controls whether the command palette is visible.",
    },
    onShowChange: {
      description:
        "Callback function called when the visibility state changes.",
    },
    searchQuery: {
      control: "text",
      description: "The current search query string.",
    },
    onSearchQueryChange: {
      description: "Callback function called when the search query changes.",
    },
    groups: {
      control: "object",
      description:
        "Array of groups, each containing a title and an array of items to display.",
    },
    onSelect: {
      description:
        "Callback function called when an item is selected from the palette.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

const navigationItems: CommandPaletteGroup[] = [
  {
    title: "Navigation",
    items: [
      {
        name: "home",
        title: "Home",
        description: "Go to homepage",
        icon: Home,
      },
      {
        name: "settings",
        title: "Settings",
        description: "App settings",
        icon: Settings,
      },
      {
        name: "users",
        title: "Users",
        description: "Manage users",
        icon: Users,
      },
      {
        name: "documents",
        title: "Documents",
        description: "View documents",
        icon: FileText,
      },
    ],
  },
];

const multiGroupItems: CommandPaletteGroup[] = [
  {
    title: "Pages",
    items: [
      {
        name: "home",
        title: "Home",
        description: "Go to homepage",
        icon: Home,
      },
      {
        name: "reports",
        title: "Reports",
        description: "View reports",
        icon: BarChart,
      },
    ],
  },
  {
    title: "Actions",
    items: [
      {
        name: "search",
        title: "Search",
        description: "Search everything",
        icon: Search,
      },
      {
        name: "send-email",
        title: "Send Email",
        description: "Compose new email",
        icon: Mail,
      },
      {
        name: "calendar",
        title: "Open Calendar",
        description: "View calendar",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Settings",
    items: [
      {
        name: "settings",
        title: "Settings",
        description: "App settings",
        icon: Settings,
      },
      {
        name: "users",
        title: "Users",
        description: "Manage users",
        icon: Users,
      },
    ],
  },
];

const itemsWithDisabled: CommandPaletteGroup[] = [
  {
    title: "Actions",
    items: [
      {
        name: "home",
        title: "Home",
        description: "Go to homepage",
        icon: Home,
      },
      {
        name: "settings",
        title: "Settings",
        description: "Requires admin access",
        icon: Settings,
        disabled: true,
      },
      {
        name: "users",
        title: "Users",
        description: "Manage users",
        icon: Users,
      },
      {
        name: "reports",
        title: "Reports",
        description: "Feature coming soon",
        icon: BarChart,
        disabled: true,
      },
    ],
  },
];

export const Default: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div>
        <Button onClick={() => setShow(true)}>Open Command Palette</Button>
        <CommandPalette
          show={show}
          onShowChange={setShow}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          groups={filterGroups(navigationItems, searchQuery)}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

export const MultipleGroups: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div>
        <Button onClick={() => setShow(true)}>Open Multi-Group Palette</Button>
        <CommandPalette
          show={show}
          onShowChange={setShow}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          groups={filterGroups(multiGroupItems, searchQuery)}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div>
        <Button onClick={() => setShow(true)}>
          Open Palette with Disabled Items
        </Button>
        <CommandPalette
          show={show}
          onShowChange={setShow}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          groups={filterGroups(itemsWithDisabled, searchQuery)}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

const hiddenTitleGroups: CommandPaletteGroup[] = [
  {
    title: "Quick Actions",
    hideTitle: true,
    items: [
      {
        name: "home",
        title: "Home",
        description: "Go to homepage",
        icon: Home,
      },
      {
        name: "search",
        title: "Search",
        description: "Search everything",
        icon: Search,
      },
      {
        name: "settings",
        title: "Settings",
        description: "App settings",
        icon: Settings,
      },
    ],
  },
];

export const HiddenGroupTitle: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div>
        <Button onClick={() => setShow(true)}>
          Open Palette (Hidden Title)
        </Button>
        <CommandPalette
          show={show}
          onShowChange={setShow}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          groups={filterGroups(hiddenTitleGroups, searchQuery)}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

export const KeyboardShortcut: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    return (
      <div className="text-center">
        <p className="text-sm text-ink-gray-5 mb-4">
          Press{" "}
          <kbd className="px-1.5 py-0.5 text-xs border rounded bg-surface-gray-2">
            Ctrl/Cmd
          </kbd>{" "}
          +{" "}
          <kbd className="px-1.5 py-0.5 text-xs border rounded bg-surface-gray-2">
            K
          </kbd>{" "}
          to open the command palette
        </p>
        <Button onClick={() => setShow(true)}>Or Click Here</Button>
        <CommandPalette
          show={show}
          onShowChange={setShow}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          groups={filterGroups(navigationItems, searchQuery)}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { KanbanBoard } from "./index";
import type { KanbanColumn } from "./types";

const meta: Meta<typeof KanbanBoard> = {
  title: "Components/KanbanBoard",
  tags: ["autodocs"],
  component: KanbanBoard,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof KanbanBoard>;

const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      { id: "1", title: "Design new feature", description: "Create mockups for the new dashboard" },
      { id: "2", title: "Review PR #123", description: "Check the code changes" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      { id: "3", title: "Implement API", description: "Create endpoints for user management" },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      { id: "4", title: "Write tests", description: "Add unit tests for components" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "5", title: "Fix bug #456", description: "Resolved the authentication issue" },
      { id: "6", title: "Update documentation", description: "Documented the new API" },
    ],
  },
];

export const Default: Story = {
  args: {
    columns: initialColumns,
    enableDragDrop: true,
    showAddCard: false,
  },
  render: (args) => (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <KanbanBoard {...args} />
    </div>
  ),
  argTypes: {
    columns: {
      control: "object",
      description: "Columns configuration",
    },
    enableDragDrop: {
      control: "boolean",
      description: "Whether drag and drop is enabled",
    },
    showAddCard: {
      control: "boolean",
      description: "Whether to show add card button",
    },
    onCardMove: {
      control: false,
      description: "Callback when a card is moved",
    },
    onCardClick: {
      control: false,
      description: "Callback when a card is clicked",
    },
    onCardAdd: {
      control: false,
      description: "Callback when a new card is added",
    },
    renderCard: {
      control: false,
      description: "Custom render function for cards",
    },
    renderColumnHeader: {
      control: false,
      description: "Custom render function for column headers",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
};

export const WithAddCard: Story = {
  args: {
    ...Default.args,
    showAddCard: true,
  },
  render: (args) => (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <KanbanBoard {...args} />
    </div>
  ),
};

export const WithCallbacks: Story = {
  args: {
    ...Default.args,
    onCardMove: (cardId, fromColumnId, toColumnId) => {
      console.log(`Card ${cardId} moved from ${fromColumnId} to ${toColumnId}`);
    },
    onCardClick: (card, columnId) => {
      alert(`Clicked card: ${card.title} in column: ${columnId}`);
    },
    onCardAdd: (columnId, card) => {
      console.log(`Card added to ${columnId}:`, card);
    },
  },
  render: (args) => (
    <div style={{ width: "100%", minHeight: "500px" }}>
      <KanbanBoard {...args} />
    </div>
  ),
};



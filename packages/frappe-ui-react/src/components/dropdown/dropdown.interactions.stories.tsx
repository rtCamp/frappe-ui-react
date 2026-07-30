import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor } from "storybook/test";

import Dropdown from "./dropdown";
import { DotHorizontal } from "../../icons";
import type { DropdownOptions } from "./types";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown/Interactions",
  component: Dropdown,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const onViewSelect = fn();
const onActionSelect = fn();

const views: DropdownOptions = [
  {
    label: "Kanban",
    key: "kanban",
    onClick: () => onViewSelect(),
  },
];

const viewActions: DropdownOptions = [
  {
    label: "Duplicate",
    onClick: () => onActionSelect(),
  },
];

export const NestedDropdownClosesBothMenus: Story = {
  args: {
    options: views,
    button: { label: "Views" },
    renderMenuItem: (props, state) => (
      <div {...props}>
        {props.children}
        <div className="ml-auto">
          <Dropdown options={viewActions} side="right">
            <button
              type="button"
              aria-label={`Actions for ${state.item.label}`}
              className="flex rounded p-0.5 text-ink-gray-6 hover:bg-surface-gray-4"
              onClick={(event) => event.stopPropagation()}
            >
              <DotHorizontal className="h-4 w-4" />
            </button>
          </Dropdown>
        </div>
      </div>
    ),
  },
  play: async ({ canvas }) => {
    onViewSelect.mockClear();
    onActionSelect.mockClear();

    await userEvent.click(canvas.getByRole("button", { name: "Views" }));
    await userEvent.click(await screen.findByRole("button", { name: "Actions for Kanban" }));

    await expect(screen.getAllByRole("menu")).toHaveLength(2);

    await userEvent.click(await screen.findByText("Duplicate"));

    await waitFor(() => expect(screen.queryAllByRole("menu")).toHaveLength(0));
    await expect(onActionSelect).toHaveBeenCalledTimes(1);
    await expect(onViewSelect).not.toHaveBeenCalled();
  },
};

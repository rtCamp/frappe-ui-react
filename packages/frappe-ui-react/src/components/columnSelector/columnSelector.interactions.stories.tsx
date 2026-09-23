import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, screen, userEvent, waitFor, within } from "storybook/test";

import ColumnSelector from "./columnSelector";
import type { ColumnSelectorProps, SelectorColumn } from "./types";

const ticketColumns: SelectorColumn[] = [
  { label: "ID", value: "name" },
  { label: "Subject", value: "subject" },
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
  { label: "Customer", value: "customer" },
];

const ticketFields: SelectorColumn[] = [
  ...ticketColumns,
  { label: "Description", value: "description" },
  { label: "Team", value: "agent_group" },
];

function StatefulColumnSelector(props: ColumnSelectorProps) {
  const [columns, setColumns] = useState(props.columns);

  return (
    <ColumnSelector
      {...props}
      columns={columns}
      onColumnsChange={(next) => {
        setColumns(next);
        props.onColumnsChange(next);
      }}
      onReset={
        props.onReset &&
        (() => {
          setColumns(props.columns);
          props.onReset?.();
        })
      }
    />
  );
}

const meta: Meta<typeof ColumnSelector> = {
  title: "Components/ColumnSelector/Interactions",
  component: ColumnSelector,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  args: {
    columns: ticketColumns,
    availableColumns: ticketFields,
    onColumnsChange: fn(),
  },
  render: (args) => <StatefulColumnSelector {...args} />,
};

export default meta;
type Story = StoryObj<typeof ColumnSelector>;

const values = (columns: SelectorColumn[]) => columns.map((c) => c.value);

const openSelector = async (canvas: ReturnType<typeof within>) => {
  await userEvent.click(canvas.getByRole("button", { name: "Columns" }));
  return screen.findByRole("dialog");
};

const addColumnTrigger = () =>
  screen.getByRole("combobox", { name: /toggle options/i });

const listedLabels = () =>
  screen
    .getAllByRole("listitem")
    .map((item) => item.querySelector(".truncate")?.textContent);

export const RemovesColumn: Story = {
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    await userEvent.click(
      screen.getByRole("button", { name: "Remove column: Status" })
    );

    await waitFor(() =>
      expect(listedLabels()).toEqual(["ID", "Subject", "Priority", "Customer"])
    );
    await expect(args.onColumnsChange).toHaveBeenCalledTimes(1);
    await expect(
      values(
        (args.onColumnsChange as ReturnType<typeof fn>).mock
          .lastCall?.[0] as SelectorColumn[]
      )
    ).toEqual(["name", "subject", "priority", "customer"]);
  },
};

export const AddsUnusedColumn: Story = {
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    await userEvent.click(addColumnTrigger());

    const options = await screen.findAllByRole("option");
    await expect(options.map((o) => o.textContent?.trim())).toEqual([
      "Description",
      "Team",
    ]);

    await userEvent.click(screen.getByRole("option", { name: "Team" }));

    await waitFor(() =>
      expect(listedLabels()).toEqual([
        "ID",
        "Subject",
        "Status",
        "Priority",
        "Customer",
        "Team",
      ])
    );
    await expect(args.onColumnsChange).toHaveBeenCalledTimes(1);
  },
};

export const HidesRemoveAtMinimum: Story = {
  args: { columns: [ticketColumns[0]] },
  play: async ({ canvas }) => {
    await openSelector(canvas);

    await expect(listedLabels()).toEqual(["ID"]);
    await expect(
      screen.queryByRole("button", { name: /^Remove column/ })
    ).not.toBeInTheDocument();
    await expect(addColumnTrigger()).toHaveTextContent("Add Column");
  },
};

export const ReportsWhenEveryColumnIsAdded: Story = {
  args: { columns: ticketFields },
  play: async ({ canvas }) => {
    await openSelector(canvas);

    await userEvent.click(addColumnTrigger());

    await expect(
      await screen.findByText("All columns added")
    ).toBeInTheDocument();
    await expect(screen.queryAllByRole("option")).toHaveLength(0);
  },
};

export const ResetFiresCallbackOnly: Story = {
  args: { onReset: fn() },
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    await userEvent.click(
      screen.getByRole("button", { name: "Remove column: Customer" })
    );
    await waitFor(() => expect(listedLabels()).toHaveLength(4));

    await userEvent.click(
      screen.getByRole("button", { name: "Reset to Default" })
    );

    await expect(args.onReset).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(listedLabels()).toHaveLength(5));
    await expect(args.onColumnsChange).toHaveBeenCalledTimes(1);
  },
};

export const OmitsResetWithoutHandler: Story = {
  play: async ({ canvas }) => {
    await openSelector(canvas);

    await expect(
      screen.queryByRole("button", { name: "Reset to Default" })
    ).not.toBeInTheDocument();
  },
};

export const ReordersWithKeyboard: Story = {
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    screen.getByRole("button", { name: "Reorder column: Subject" }).focus();
    await userEvent.keyboard("[Space]");
    await userEvent.keyboard("[ArrowDown]");
    await userEvent.keyboard("[Space]");

    await waitFor(() =>
      expect(listedLabels()).toEqual([
        "ID",
        "Status",
        "Subject",
        "Priority",
        "Customer",
      ])
    );
    await expect(args.onColumnsChange).toHaveBeenCalledTimes(1);
  },
};

export const HidesDragHandlesWhenNotReorderable: Story = {
  args: { reorderable: false },
  play: async ({ canvas }) => {
    await openSelector(canvas);

    await expect(
      screen.queryByRole("button", { name: /^Reorder column/ })
    ).not.toBeInTheDocument();
  },
};

export const PinsAndUnpinsColumn: Story = {
  args: { pinnable: true },
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    await userEvent.click(
      screen.getByRole("button", { name: "Pin column: Status" })
    );

    await waitFor(() =>
      expect(listedLabels()).toEqual([
        "Status",
        "ID",
        "Subject",
        "Priority",
        "Customer",
      ])
    );
    const unpin = screen.getByRole("button", { name: "Unpin column: Status" });
    await expect(unpin).toHaveAttribute("aria-pressed", "true");
    await expect(
      (
        (args.onColumnsChange as ReturnType<typeof fn>).mock
          .lastCall?.[0] as SelectorColumn[]
      )[0]
    ).toMatchObject({ value: "status", pinned: true });

    await userEvent.click(unpin);

    await waitFor(() =>
      expect(listedLabels()).toEqual([
        "Status",
        "ID",
        "Subject",
        "Priority",
        "Customer",
      ])
    );
    await expect(
      screen.getByRole("button", { name: "Pin column: Status" })
    ).toHaveAttribute("aria-pressed", "false");
    await expect(
      screen.queryByRole("button", { name: /^Unpin column/ })
    ).not.toBeInTheDocument();
  },
};

export const ListsPinnedColumnsFirst: Story = {
  args: {
    pinnable: true,
    columns: ticketColumns.map((column) => ({
      ...column,
      pinned: column.value === "priority",
    })),
  },
  play: async ({ canvas }) => {
    await openSelector(canvas);

    await expect(listedLabels()).toEqual([
      "Priority",
      "ID",
      "Subject",
      "Status",
      "Customer",
    ]);
    await expect(
      screen.getByRole("button", { name: "Unpin column: Priority" })
    ).toHaveAttribute("aria-pressed", "true");
  },
};

export const KeepsKeyboardReorderWithinGroup: Story = {
  args: {
    pinnable: true,
    columns: ticketColumns.map((column) => ({
      ...column,
      pinned: column.value === "name",
    })),
  },
  play: async ({ canvas, args }) => {
    await openSelector(canvas);

    screen.getByRole("button", { name: "Reorder column: Subject" }).focus();
    await userEvent.keyboard("[Space]");
    await userEvent.keyboard("[ArrowUp]");
    await userEvent.keyboard("[Space]");

    await new Promise((resolve) => setTimeout(resolve, 300));
    await expect(listedLabels()).toEqual([
      "ID",
      "Subject",
      "Status",
      "Priority",
      "Customer",
    ]);
    await expect(args.onColumnsChange).not.toHaveBeenCalled();
  },
};

export const DisabledTriggerStaysClosed: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    const trigger = canvas.getByRole("button", { name: "Columns" });
    await expect(trigger).toBeDisabled();

    await userEvent.click(trigger, { pointerEventsCheck: 0 });

    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const UsesTranslatedLabels: Story = {
  args: {
    pinnable: true,
    onReset: fn(),
    labels: {
      trigger: "Colonnes",
      addColumn: "Ajouter une colonne",
      resetToDefault: "Réinitialiser",
      remove: "Supprimer la colonne",
      reorder: "Réordonner la colonne",
      pin: "Épingler la colonne",
    },
  },
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Colonnes" }));
    await screen.findByRole("dialog");

    await expect(addColumnTrigger()).toHaveTextContent("Ajouter une colonne");
    await expect(
      screen.getByRole("button", { name: "Réinitialiser" })
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Supprimer la colonne: ID" })
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Réordonner la colonne: ID" })
    ).toBeInTheDocument();
    await expect(
      screen.getByRole("button", { name: "Épingler la colonne: ID" })
    ).toBeInTheDocument();
  },
};

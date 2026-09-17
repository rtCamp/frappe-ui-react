import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ColumnSelector from "./columnSelector";
import type { ColumnSelectorProps, SelectorColumn } from "./types";

const ticketColumns: SelectorColumn[] = [
  { label: "ID", value: "name" },
  { label: "Subject", value: "subject" },
  { label: "Status", value: "status" },
  { label: "Priority", value: "priority" },
  { label: "Customer", value: "customer" },
];

function StatefulColumnSelector(props: ColumnSelectorProps) {
  const [columns, setColumns] = useState(props.columns);
  const [rows, setRows] = useState(props.rows);

  return (
    <ColumnSelector
      {...props}
      columns={columns}
      rows={rows}
      onColumnsChange={(next) => {
        setColumns(next);
        props.onColumnsChange(next);
      }}
      onRowsChange={(next) => {
        setRows(next);
        props.onRowsChange?.(next);
      }}
      onReset={
        props.onReset &&
        (() => {
          setColumns(props.columns);
          setRows(props.rows);
          props.onReset?.();
        })
      }
    />
  );
}

const meta: Meta<typeof ColumnSelector> = {
  title: "Components/ColumnSelector",
  component: ColumnSelector,
  tags: ["autodocs"],
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    columns: { description: "Active columns, in display order. Controlled." },
    minColumns: {
      control: "number",
      description: "Removal is refused below this count.",
    },
    hideLabel: {
      control: "boolean",
      description: "Render the trigger as an icon-only button.",
    },
    disabled: { control: "boolean" },
  },
  render: (args) => <StatefulColumnSelector {...args} />,
};

export default meta;
type Story = StoryObj<typeof ColumnSelector>;

export const Default: Story = {
  args: {
    columns: ticketColumns,
    onColumnsChange: () => {},
    onReset: () => {},
  },
};

export const IconOnlyTrigger: Story = {
  args: { ...Default.args, hideLabel: true },
};

export const AtMinimumColumns: Story = {
  args: {
    ...Default.args,
    columns: [ticketColumns[0]],
  },
};

export const WithoutReset: Story = {
  args: { ...Default.args, onReset: undefined },
};

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
};

export const TranslatedLabels: Story = {
  args: {
    ...Default.args,
    labels: {
      trigger: "Colonnes",
      resetToDefault: "Réinitialiser",
      remove: "Supprimer la colonne",
    },
  },
};

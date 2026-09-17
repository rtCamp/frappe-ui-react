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

const ticketFields: SelectorColumn[] = [
  ...ticketColumns,
  { label: "Description", value: "description" },
  { label: "Team", value: "agent_group" },
  { label: "Type", value: "ticket_type" },
  { label: "Total Hold Time", value: "total_hold_time" },
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
  title: "Components/ColumnSelector",
  component: ColumnSelector,
  tags: ["autodocs"],
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    minColumns: { control: "number" },
    hideLabel: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  render: (args) => <StatefulColumnSelector {...args} />,
};

export default meta;
type Story = StoryObj<typeof ColumnSelector>;

export const Default: Story = {
  args: {
    columns: ticketColumns,
    availableColumns: ticketFields,
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

export const AllColumnsAdded: Story = {
  args: { ...Default.args, columns: ticketFields },
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
      addColumn: "Ajouter une colonne",
      noColumnsAvailable: "Toutes les colonnes sont ajoutées",
      resetToDefault: "Réinitialiser",
      remove: "Supprimer la colonne",
    },
  },
};

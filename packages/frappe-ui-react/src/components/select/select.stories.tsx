import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Select from "./select";
import { User } from "lucide-react";
import { SelectOption } from "./types";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
};

export default meta;

const options: SelectOption[] = [
  { label: "John Doe", value: "john-doe" },
  { label: "Jane Doe", value: "jane-doe" },
  { label: "Disabled User", value: "disabled", disabled: true },
];

export const Default = () => {
  const [selected, setSelected] = useState<SelectOption | undefined>(undefined);
  return (
    <div className="w-72">
      <Select
        label="Assignee"
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};

export const WithPrefix = () => {
  const [selected, setSelected] = useState<SelectOption>(options[0]);
  return (
    <div className="w-72">
      <Select
        label="User"
        prefix={<User size={14} />}
        options={options}
        value={selected}
        onChange={setSelected}
      />
    </div>
  );
};
import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Password from "./password"; // Assuming your component is in Password.tsx
import { PasswordProps } from "./types"; // Assuming your types are in types/password.ts

export default {
  title: "Components/Password",
  component: Password,
  argTypes: {
    value: {
      control: "text",
      description: "The current value of the password input.",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the password input.",
    },
    onChange: {
      action: "changed",
      description: "Event handler called when the value changes.",
    },
    prefix: { description: "Element to display at the start of the input." },
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} as Meta<typeof Password>;

const Template: StoryObj<PasswordProps> = {
  render: (args) => {
    const [value, setValue] = useState(args.value || "");

    return (
      <div className="p-4 w-[300px]">
        <Password
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
    );
  },
};

export const Default = {
  ...Template,
  args: {
    value: "",
  },
};

import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import Password from "./password"; // Assuming your component is in Password.tsx
import { PasswordProps } from "./types"; // Assuming your types are in types/password.ts

export default {
  title: "Components/Password",
  component: Password,
  argTypes: {

    value: { control: "text" },
    placeholder: { control: "text" },
  },
  parameters: {
    layout: "centered",
  },
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

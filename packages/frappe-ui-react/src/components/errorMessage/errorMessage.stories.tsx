import type { Meta, StoryObj } from "@storybook/react-vite";
import ErrorMessage from "./errorMessage";
import type { ErrorMessageProps } from "./types";

export default {
  title: "Components/ErrorMessage",
  component: ErrorMessage,
  argTypes: {
    message: {
      control: "text",
      description:
        "The error message to display, can be a string or an Error object.",
    },
  },
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  tags: ["autodocs"],
} as Meta<typeof ErrorMessage>;

export const StringMessage: StoryObj<ErrorMessageProps> = {
  render: (args) => <ErrorMessage {...args} />,
  args: {
    message: "Invalid value",
  },
};

export const ErrorObject: StoryObj<ErrorMessageProps> = {
  render: (args) => <ErrorMessage {...args} />,
  args: {
    message: new Error("There was an error"),
  },
};

export const FalsyValue: StoryObj<ErrorMessageProps> = {
  render: (args) => <ErrorMessage {...args} />,
  args: {
    message: "",
  },
};

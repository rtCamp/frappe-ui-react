import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";
import { Field } from "@base-ui/react/field";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Label Text",
  },
  render: ({ children }) => {
    return (
      <Field.Root>
        <Label>{children}</Label>
      </Field.Root>
    );
  },
};

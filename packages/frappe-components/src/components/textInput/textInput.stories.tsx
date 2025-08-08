import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextInput } from "./index";
import FeatherIcon from "../featherIcon";
import { Avatar } from "../avatar";
import { Story, Variant } from "../Story";

const meta: Meta<typeof TextInput> = {
  title: "Components/TextInput",
  tags: ["autodocs"],
  component: TextInput,
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

const inputTypes = [
  "text",
  "number",
  "email",
  "date",
  "datetime-local",
  "password",
  "search",
  "tel",
  "time",
  "url",
] as const;
const sizes = ["sm", "md", "lg", "xl"] as const;
const variants = ["subtle", "outline"] as const;

export const AllTypes: Story = {
  args: {
    size: "sm",
    variant: "subtle",
    placeholder: "Placeholder",
    disabled: false,
    value: "",
    className: "",
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      {inputTypes.map((type) => (
        <Variant key={type} title={type}>
          <TextInput {...args} type={type} />
        </Variant>
      ))}
    </Story>
  ),
  argTypes: {
    type: { control: false, description: "Input type" },
    size: {
      control: "select",
      options: sizes,
      description: "Input size",
    },
    variant: {
      control: "select",
      options: variants,
      description: "Visual style variant",
    },
    value: {
      control: "text",
      description: "Input value",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disable input",
    },
    onChange: {
      action: "onChange",
      description: "Callback when value changes",
    },
    className: {
      control: "text",
      description: "CSS classes for the input container",
    },
  },
};

export const PrefixIcon: Story = {
  args: {
    type: "text",
    size: "md",
    variant: "subtle",
    value: "",
    placeholder: "Search...",
    className: "",
    prefix: <FeatherIcon className="w-4" name="search" />,
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="Prefix slot icon">
        <TextInput {...args} />
      </Variant>
    </Story>
  ),
  argTypes: { ...AllTypes.argTypes },
};

export const SuffixIcon: Story = {
  args: {
    type: "text",
    size: "md",
    variant: "subtle",
    value: "",
    placeholder: "Search...",
    className: "",
    suffix: <FeatherIcon className="w-4" name="search" />,
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="Suffix slot icon">
        <TextInput {...args} />
      </Variant>
    </Story>
  ),
  argTypes: { ...AllTypes.argTypes },
};

export const PrefixAvatar: Story = {
  args: {
    type: "text",
    size: "md",
    variant: "subtle",
    value: "",
    placeholder: "With Avatar...",
    className: "",
    prefix: (
      <Avatar
        size="sm"
        image="https://avatars.githubusercontent.com/u/499550?s=60&v=4"
      />
    ),
    onChange: () => {},
  },
  render: (args) => (
    <Story layout={{ type: "grid", width: 700 }}>
      <Variant title="Prefix slot avatar">
        <TextInput {...args} />
      </Variant>
    </Story>
  ),
  argTypes: { ...AllTypes.argTypes },
};

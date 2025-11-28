import type { Meta, StoryObj } from "@storybook/react-vite";
import Label from "./index";
import { TextInput } from "../textInput";
import { Textarea } from "../textarea";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A configurable label component based on Radix UI with support for different sizes, weights, variants, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the label",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
      description: "The font weight of the label",
    },
    variant: {
      control: "select",
      options: ["default", "required", "optional"],
      description: "The variant of the label",
    },
    disabled: {
      control: "boolean",
      description: "Whether the label is disabled",
    },
    required: {
      control: "boolean",
      description: "Whether to show required indicator",
    },
    optional: {
      control: "boolean",
      description: "Whether to show optional indicator",
    },
    children: {
      control: "text",
      description: "The label text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Username",
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label size="sm" className="block">
          Small Label
        </Label>
        <Label size="md" className="block">
          Medium Label
        </Label>
        <Label size="lg" className="block">
          Large Label
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes available for labels.",
      },
    },
  },
};

export const Weights: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label weight="normal" className="block">
          Normal Weight
        </Label>
        <Label weight="medium" className="block">
          Medium Weight
        </Label>
        <Label weight="semibold" className="block">
          Semibold Weight
        </Label>
        <Label weight="bold" className="block">
          Bold Weight
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different font weights available for labels.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label variant="default" className="block">
          Default Label
        </Label>
        <Label variant="required" className="block">
          Required Field
        </Label>
        <Label variant="optional" className="block">
          Optional Field
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different variants with required/optional indicators.",
      },
    },
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="block">Normal State</Label>
        <Label disabled className="block">
          Disabled State
        </Label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different states of the label component.",
      },
    },
  },
};

export const WithFormElements: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div className="space-y-2">
        <Label htmlFor="username" variant="required">
          Username
        </Label>
        <TextInput htmlId="username" type="text" placeholder="Enter username" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" variant="optional">
          Email Address
        </Label>
        <TextInput htmlId="email" type="email" placeholder="Enter email" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio" size="lg" weight="semibold">
          Biography
        </Label>
        <Textarea htmlId="bio" rows={3} placeholder="Tell us about yourself" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="disabled" disabled>
          Disabled Field
        </Label>
        <TextInput
          htmlId="disabled"
          type="text"
          disabled
          placeholder="This field is disabled"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of labels used with various form elements.",
      },
    },
  },
};

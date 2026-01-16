import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper, Wizard } from "./index";
import { TextInput } from "../textInput";
import { Textarea } from "../textarea";

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  tags: ["autodocs"],
  component: Stepper,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { id: "1", title: "Account", description: "Create your account" },
  { id: "2", title: "Profile", description: "Complete your profile" },
  { id: "3", title: "Preferences", description: "Set your preferences" },
  { id: "4", title: "Review", description: "Review and submit" },
];

export const Default: Story = {
  args: {
    steps,
    currentStep: 1,
    orientation: "horizontal",
    variant: "default",
  },
  render: (args) => <Stepper {...args} />,
  argTypes: {
    steps: {
      control: "object",
      description: "Array of steps",
    },
    currentStep: {
      control: { type: "number", min: 0, max: 3, step: 1 },
      description: "Current active step index",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the stepper",
    },
    variant: {
      control: "select",
      options: ["default", "dots", "numbers"],
      description: "Variant of the stepper",
    },
    onStepClick: {
      control: false,
      description: "Callback when a step is clicked",
    },
    className: {
      control: "text",
      description: "Custom class name",
    },
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    orientation: "vertical",
  },
  render: (args) => <Stepper {...args} />,
};

export const Dots: Story = {
  args: {
    ...Default.args,
    variant: "dots",
  },
  render: (args) => <Stepper {...args} />,
};

export const Numbers: Story = {
  args: {
    ...Default.args,
    variant: "numbers",
  },
  render: (args) => <Stepper {...args} />,
};

export const WithCompleted: Story = {
  args: {
    steps: steps.map((step, index) => ({
      ...step,
      completed: index < 2,
    })),
    currentStep: 2,
  },
  render: (args) => <Stepper {...args} />,
};

export const WizardExample: Story = {
  render: () => {
    const wizardSteps = [
      {
        id: "1",
        title: "Account",
        description: "Create your account",
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Account Information</h3>
            <TextInput label="Email" placeholder="Enter your email" />
            <TextInput label="Password" type="password" placeholder="Enter your password" />
          </div>
        ),
      },
      {
        id: "2",
        title: "Profile",
        description: "Complete your profile",
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Information</h3>
            <TextInput label="First Name" placeholder="Enter your first name" />
            <TextInput label="Last Name" placeholder="Enter your last name" />
            <Textarea label="Bio" placeholder="Tell us about yourself" />
          </div>
        ),
      },
      {
        id: "3",
        title: "Review",
        description: "Review and submit",
        content: (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Review Your Information</h3>
            <p className="text-gray-600">Please review all the information before submitting.</p>
          </div>
        ),
      },
    ];

    return (
      <div style={{ width: "100%", maxWidth: "800px" }}>
        <Wizard
          steps={wizardSteps}
          onComplete={() => alert("Wizard completed!")}
        />
      </div>
    );
  },
};



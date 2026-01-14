import type { Meta, StoryObj } from "@storybook/react-vite";
import Skeleton from "./index";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A configurable skeleton loading component with support for different sizes, variants, animations, and custom dimensions.",
      },
      source: { type: "dynamic" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "The size of the skeleton",
    },
    variant: {
      control: "select",
      options: ["default", "rounded", "circular", "text"],
      description: "The visual style of the skeleton",
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
      description: "The animation type",
    },
    width: {
      control: "text",
      description: "Custom width (CSS value or number in px)",
    },
    height: {
      control: "text",
      description: "Custom height (CSS value or number in px)",
    },
    lines: {
      control: "number",
      description: "Number of lines for text variant",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Small</p>
        <Skeleton size="sm" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Medium</p>
        <Skeleton size="md" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Large</p>
        <Skeleton size="lg" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Extra Large</p>
        <Skeleton size="xl" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes available for skeleton components.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Default (Rounded)</p>
        <Skeleton variant="default" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">More Rounded</p>
        <Skeleton variant="rounded" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Circular</p>
        <Skeleton variant="circular" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Text (Single Line)</p>
        <Skeleton variant="text" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Text (Multiple Lines)</p>
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual styles available for skeleton components.",
      },
    },
  },
};

export const Animations: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Pulse Animation</p>
        <Skeleton animation="pulse" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Wave Animation</p>
        <Skeleton animation="wave" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">No Animation</p>
        <Skeleton animation="none" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different animation types available for skeleton components.",
      },
    },
  },
};

export const CustomDimensions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Custom Width & Height</p>
        <Skeleton width="200px" height="60px" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Full Width</p>
        <Skeleton width="100%" height="40px" />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Square</p>
        <Skeleton width={80} height={80} />
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Tall Rectangle</p>
        <Skeleton width="60px" height="120px" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples with custom width and height dimensions.",
      },
    },
  },
};

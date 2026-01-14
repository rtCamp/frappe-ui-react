import type { Meta, StoryObj } from "@storybook/react-vite";
import Separator from "./index";

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A configurable separator component based on Radix UI with support for different sizes, variants, colors, and orientations.",
      },
      source: { type: "dynamic" },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size/thickness of the separator",
    },
    variant: {
      control: "select",
      options: ["default", "dashed", "dotted", "gradient"],
      description: "The visual style of the separator",
    },
    color: {
      control: "select",
      options: ["default", "gray", "brand", "success", "warning", "danger"],
      description: "The color theme of the separator",
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "The orientation of the separator",
    },
    decorative: {
      control: "boolean",
      description: "Whether the separator is purely decorative",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <div className="w-80 p-4">
      <div>Content above</div>
      <Separator {...args} />
      <div>Content below</div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Small (1px)</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator size="sm" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Medium (2px)</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator size="md" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Large (4px)</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator size="lg" />
          <div>Content below</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different sizes (thickness) available for separators.",
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Default (Solid)</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator variant="default" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Dashed</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator variant="dashed" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Dotted</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator variant="dotted" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Gradient</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator variant="gradient" />
          <div>Content below</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different visual styles available for separators.",
      },
    },
  },
};

export const Colors: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Default</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="default" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Gray</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="gray" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Brand</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="brand" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Success</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="success" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Warning</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="warning" />
          <div>Content below</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-2">Danger</p>
        <div className="space-y-2">
          <div>Content above</div>
          <Separator color="danger" />
          <div>Content below</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different color themes available for separators.",
      },
    },
  },
};

export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-ink-gray-6 mb-4">Horizontal</p>
        <div className="w-80 space-y-2">
          <div>Left content</div>
          <Separator orientation="horizontal" />
          <div>Right content</div>
        </div>
      </div>

      <div>
        <p className="text-sm text-ink-gray-6 mb-4">Vertical</p>
        <div className="flex items-center space-x-4 h-20">
          <div>Left content</div>
          <Separator orientation="vertical" />
          <div>Right content</div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Separators can be oriented horizontally or vertically.",
      },
    },
  },
};

export const InContent: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-surface-gray-1 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">Card Header</h2>
        <Separator />
        <p className="mt-3 text-ink-gray-7">
          This is some content inside a card. The separator helps create visual
          hierarchy.
        </p>
      </div>

      <div className="bg-surface-gray-1 p-6 rounded-lg">
        <div className="flex items-start space-x-4">
          <div className="flex-1">
            <h3 className="font-medium">Left Section</h3>
            <p className="text-sm text-ink-gray-6">
              Some content on the left side.
            </p>
          </div>
          <Separator orientation="vertical" className="!h-16" />
          <div className="flex-1">
            <h3 className="font-medium">Right Section</h3>
            <p className="text-sm text-ink-gray-6">
              Some content on the right side.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Navigation Menu</h3>
          <p className="text-sm text-ink-gray-6">Home</p>
        </div>
        <Separator variant="dashed" color="gray" />
        <div>
          <h3 className="font-medium">Products</h3>
          <p className="text-sm text-ink-gray-6">Our product catalog</p>
        </div>
        <Separator variant="dashed" color="gray" />
        <div>
          <h3 className="font-medium">Contact</h3>
          <p className="text-sm text-ink-gray-6">Get in touch with us</p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Examples of separators used in real content scenarios.",
      },
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { userEvent, expect, within } from "storybook/test";
import { AlertCircle } from "lucide-react";

import Alert from "./alert";
import { Button } from "../button";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert/Interactions",
  component: Alert,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  argTypes: {
    title: {
      control: "text",
      description: "The title text of the alert",
    },
    theme: {
      control: {
        type: "select",
        options: ["yellow", "blue", "red", "green", "default"],
      },
      description: "Color theme of the alert",
    },
    variant: {
      control: {
        type: "select",
        options: ["subtle", "outline"],
      },
      description: "Visual variant of the alert",
    },
    renderDescription: {
      control: "text",
      description:
        "Description text displayed below the title, can be a string or a render function for dynamic content",
    },
    dismissable: {
      control: "boolean",
      description: "Whether the alert can be dismissed by the user",
    },
    visible: {
      control: "boolean",
      description: "Controls the visibility of the alert (controlled mode)",
    },
    onVisibleChange: {
      action: "changed",
      description:
        "Callback when the visibility of the alert changes (for controlled mode)",
    },
    renderIcon: {
      control: false,
      description: "Custom icon to display in the alert",
    },
    renderFooter: {
      control: false,
      description: "Custom footer content for the alert",
    },
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the alert container",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const DismissAlert: Story = {
  args: {
    title: "This alert can be dismissed",
    renderDescription: "Click the X button to dismiss this alert",
    theme: "blue",
    dismissable: true,
  },
  render: (args) => (
    <div className="min-w-125 w-125">
      <Alert {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertElement = canvas.getByRole("alert");
    expect(alertElement).toBeInTheDocument();
    expect(canvas.getByText("This alert can be dismissed")).toBeInTheDocument();

    // Find and click the dismiss button
    const dismissButton = canvas.getByLabelText("Dismiss alert");
    expect(dismissButton).toBeInTheDocument();

    await userEvent.click(dismissButton);

    // Verify alert is gone
    expect(alertElement).not.toBeInTheDocument();
  },
};

export const Description: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="min-w-125 w-125">
          <Alert
            title="String Description"
            renderDescription="This is a simple string description"
            theme="blue"
            dismissable={false}
          />
        </div>
        <div className="min-w-125 w-125">
          <Alert
            title="Function Description"
            renderDescription={() => (
              <div>
                <p>This is a dynamic description rendered from a function.</p>
                <p className="text-sm mt-2">It can contain rich content!</p>
              </div>
            )}
            theme="green"
            dismissable={false}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify string description is rendered
    expect(canvas.getByText("String Description")).toBeInTheDocument();
    expect(
      canvas.getByText("This is a simple string description")
    ).toBeInTheDocument();

    // Verify function-based description is rendered
    expect(canvas.getByText("Function Description")).toBeInTheDocument();
    expect(
      canvas.getByText(
        "This is a dynamic description rendered from a function."
      )
    ).toBeInTheDocument();
    expect(
      canvas.getByText("It can contain rich content!")
    ).toBeInTheDocument();
  },
};

export const CustomIcon: Story = {
  args: {
    title: "Custom Icon Alert",
    renderDescription:
      "This alert has a custom icon instead of the default theme icon",
    renderIcon: () => <AlertCircle className="w-5 h-5 text-purple-600" />,
    dismissable: false,
  },
  render: (args) => (
    <div className="min-w-125 w-125">
      <Alert {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertElement = canvas.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    // Verify custom icon is rendered
    const icons = canvasElement.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
    expect(canvas.getByText("Custom Icon Alert")).toBeInTheDocument();
  },
};

export const AlertWithFooter: Story = {
  args: {
    title: "Trial Version",
    renderDescription:
      "Your trial period is ending soon. Upgrade to continue using this feature.",
    theme: "yellow",
    variant: "outline",
    renderFooter: () => (
      <Button variant="solid" label="Upgrade Now" className="w-full" />
    ),
    dismissable: true,
  },
  render: (args) => (
    <div className="min-w-125 w-125">
      <Alert {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alertElement = canvas.getByRole("alert");
    expect(alertElement).toBeInTheDocument();

    // Verify footer button is rendered
    const upgradeButton = canvas.getByRole("button", { name: /upgrade now/i });
    expect(upgradeButton).toBeInTheDocument();

    // Click the footer button
    await userEvent.click(upgradeButton);
  },
};

export const ThemeVariants: Story = {
  render: () => {
    const themes = ["yellow", "blue", "red", "green", "default"] as const;

    return (
      <div className="space-y-4">
        {themes.map((theme) => (
          <div key={theme} className="min-w-125 w-125">
            <Alert
              title={`${theme.charAt(0).toUpperCase() + theme.slice(1)} Alert`}
              renderDescription={`This is a ${theme} themed alert`}
              theme={theme}
              dismissable={false}
            />
          </div>
        ))}
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const themes = [
      "Yellow Alert",
      "Blue Alert",
      "Red Alert",
      "Green Alert",
      "Default Alert",
    ];
    themes.forEach((title) => {
      expect(canvas.getByText(title)).toBeInTheDocument();
    });

    // Verify all alerts are visible
    const alerts = canvas.getAllByRole("alert");
    expect(alerts).toHaveLength(5);

    const themeClasses = [
      "bg-surface-amber-2",
      "bg-surface-blue-2",
      "bg-surface-red-2",
      "bg-surface-green-2",
      "bg-surface-gray-2",
    ];

    // Verify each theme has the correct background class
    alerts.forEach((alert, index) => {
      expect(alert).toHaveClass(themeClasses[index]);
    });

    const iconData = [
      { class: "lucide-triangle-alert", color: "text-ink-amber-3" },
      { class: "lucide-info", color: "text-ink-blue-3" },
      { class: "lucide-circle-x", color: "text-ink-red-3" },
      { class: "lucide-circle-check", color: "text-ink-green-3" },
      { class: "lucide-info", color: "text-ink-gray-6" },
    ];

    // Verify each theme has the correct icon with proper classes
    alerts.forEach((alert, index) => {
      const icon = alert.querySelector(`svg.${iconData[index].class}`);
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass(iconData[index].color);
    });
  },
};

export const ControlledVisibility: Story = {
  render: () => {
    const [visible, setVisible] = useState(true);

    return (
      <div className="min-w-125 w-125">
        <div className="mb-4">
          <Button
            variant="solid"
            label={visible ? "Hide Alert" : "Show Alert"}
            onClick={() => setVisible(!visible)}
          />
        </div>
        <Alert
          title="Controlled Alert"
          renderDescription="Use the button above to control this alert's visibility"
          visible={visible}
          onVisibleChange={setVisible}
          dismissable={true}
          theme="blue"
        />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Verify alert is initially visible
    expect(canvas.getByRole("alert")).toBeInTheDocument();

    // Click the hide button
    const toggleButton = canvas.getByRole("button", { name: /hide alert/i });
    await userEvent.click(toggleButton);

    // Verify alert is hidden
    expect(canvas.queryByRole("alert")).not.toBeInTheDocument();

    // Click the show button
    const showButton = canvas.getByRole("button", { name: /show alert/i });
    await userEvent.click(showButton);

    // Verify alert is visible again
    expect(canvas.getByRole("alert")).toBeInTheDocument();
  },
};

export const VariantStyling: Story = {
  render: () => {
    return (
      <div className="space-y-4">
        <div className="min-w-125 w-125">
          <Alert
            title="Subtle Variant"
            renderDescription="This alert uses the subtle styling variant"
            variant="subtle"
            theme="green"
            dismissable={false}
          />
        </div>
        <div className="min-w-125 w-125">
          <Alert
            title="Outline Variant"
            renderDescription="This alert uses the outline styling variant"
            variant="outline"
            theme="red"
            dismissable={false}
          />
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const alerts = canvas.getAllByRole("alert");
    expect(alerts).toHaveLength(2);

    // Verify subtle variant with green theme has correct classes
    const subtleAlert = alerts[0];
    expect(subtleAlert).toHaveClass("bg-surface-green-2");
    expect(canvas.getByText("Subtle Variant")).toBeInTheDocument();

    // Verify subtle alert has green theme icon
    const subtleIcon = subtleAlert.querySelector("svg.lucide-circle-check");
    expect(subtleIcon).toBeInTheDocument();
    expect(subtleIcon).toHaveClass("text-ink-green-3");

    // Verify outline variant with red theme has correct classes
    const outlineAlert = alerts[1];
    expect(outlineAlert).toHaveClass("border");
    expect(outlineAlert).toHaveClass("border-outline-red-2");
    expect(canvas.getByText("Outline Variant")).toBeInTheDocument();

    // Verify outline alert has red theme icon
    const outlineIcon = outlineAlert.querySelector("svg.lucide-circle-x");
    expect(outlineIcon).toBeInTheDocument();
    expect(outlineIcon).toHaveClass("text-ink-red-3");
  },
};

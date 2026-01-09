import type { Meta, StoryObj } from "@storybook/react-vite";
import { SignaturePad } from "./index";
import { useRef } from "react";
import { Button } from "../button";

const meta: Meta<typeof SignaturePad> = {
  title: "Components/SignaturePad",
  tags: ["autodocs"],
  component: SignaturePad,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof SignaturePad>;

export const Default: Story = {
  args: {
    width: "100%",
    height: 200,
    backgroundColor: "#ffffff",
    penColor: "#000000",
    penWidth: 2,
    minWidth: 0.5,
    maxWidth: 2.5,
    disabled: false,
    showClearButton: true,
    showDownloadButton: false,
  },
  render: (args) => (
    <div style={{ width: "500px" }}>
      <SignaturePad {...args} />
    </div>
  ),
  argTypes: {
    width: {
      control: "text",
      description: "Width of the signature pad canvas",
    },
    height: {
      control: "number",
      description: "Height of the signature pad canvas",
    },
    backgroundColor: {
      control: "color",
      description: "Background color of the canvas",
    },
    penColor: {
      control: "color",
      description: "Color of the pen stroke",
    },
    penWidth: {
      control: { type: "number", min: 1, max: 10, step: 0.5 },
      description: "Thickness of the pen stroke",
    },
    minWidth: {
      control: { type: "number", min: 0.1, max: 5, step: 0.1 },
      description: "Minimum width between points for drawing",
    },
    maxWidth: {
      control: { type: "number", min: 0.1, max: 10, step: 0.1 },
      description: "Maximum width between points for drawing",
    },
    disabled: {
      control: "boolean",
      description: "Whether the pad is disabled",
    },
    showClearButton: {
      control: "boolean",
      description: "Show clear button",
    },
    showDownloadButton: {
      control: "boolean",
      description: "Show download button",
    },
    onChange: {
      control: false,
      description: "Callback when signature changes",
    },
    onClear: {
      control: false,
      description: "Callback when signature is cleared",
    },
    className: {
      control: "text",
      description: "Custom class name for the container",
    },
  },
};

export const WithDownload: Story = {
  args: {
    ...Default.args,
    showDownloadButton: true,
  },
  render: (args) => (
    <div style={{ width: "500px" }}>
      <SignaturePad {...args} />
    </div>
  ),
};

export const WithRef: Story = {
  render: () => {
    const signatureRef = useRef<{ clear: () => void; getDataURL: () => string; isEmpty: () => boolean }>(null);

    return (
      <div style={{ width: "500px" }} className="space-y-4">
        <SignaturePad ref={signatureRef} height={200} />
        <div className="flex gap-2">
          <Button
            label="Clear via Ref"
            theme="red"
            variant="outline"
            size="sm"
            onClick={() => signatureRef.current?.clear()}
          />
          <Button
            label="Get Data URL"
            theme="blue"
            variant="outline"
            size="sm"
            onClick={() => {
              const dataURL = signatureRef.current?.getDataURL();
              console.log("Data URL:", dataURL);
              alert("Check console for data URL");
            }}
          />
          <Button
            label="Check Empty"
            theme="gray"
            variant="outline"
            size="sm"
            onClick={() => {
              const empty = signatureRef.current?.isEmpty();
              alert(`Is Empty: ${empty}`);
            }}
          />
        </div>
      </div>
    );
  },
};



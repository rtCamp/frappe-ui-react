import type { Meta, StoryObj } from "@storybook/react-vite";
import TextEditor from "./index";
import { useState } from "react";

const meta: Meta<typeof TextEditor> = {
  title: "Components/TextEditor",
  component: TextEditor,
  parameters: { docs: { source: { type: "dynamic" } }, layout: "centered" },
  argTypes: {
    allowImageUpload: {
      control: "boolean",
      description: "Enable image upload functionality",
    },
    allowVideoUpload: {
      control: "boolean",
      description: "Enable video upload functionality",
    },
    hideToolbar: {
      control: "boolean",
      description: "Hide the formatting toolbar",
    },
    value: {
      control: "text",
      description: "Initial content of the editor",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    allowImageUpload: true,
    placeholder: "Write something...",
    value: `
		<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
		<p style="text-align: center;">This text is center-aligned.</p>
		<p style="text-align: right;">This text is right-aligned.</p>
		<ul>
			<li>This is a bullet point</li>
			<li>Another bullet point</li>
		</ul>
		<ol>
			<li>This is a numbered list</li>
			<li>Second item in numbered list</li>
		</ol>
		<p>This paragraph has a <a href="https://frappe.io" target="_blank">link to Frappe</a>.</p>
		`,
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState(args.value as string);

    return (
      <div className="w-3xl mx-auto">
        <TextEditor
          {...args}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </div>
    );
  },
};

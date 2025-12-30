import type { Meta, StoryObj } from "@storybook/react-vite";
import TextEditor from "./textEditor";
import { Button } from "../button";
import { EditorContent } from "@tiptap/react";

import TextEditorFixedMenu from "./textEditorFixedMenu";
import { useState } from "react";

const meta: Meta<typeof TextEditor> = {
  title: "Components/TextEditor",
  component: TextEditor,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "text",
      description: "HTML content of the editor",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text when editor is empty",
    },
    editorClass: {
      control: "text",
      description: "CSS classes to apply to the editor content area",
    },
    editable: {
      control: "boolean",
      description: "Whether the editor is editable",
    },
    autofocus: {
      control: "boolean",
      description: "Whether to autofocus the editor on mount",
    },
    bubbleMenu: {
      control: "boolean",
      description: "Show bubble menu on text selection",
    },
    fixedMenu: {
      control: "boolean",
      description: "Show fixed menu toolbar",
    },
    floatingMenu: {
      control: "boolean",
      description: "Show floating menu for slash commands",
    },
    className: {
      control: "text",
      description: "CSS class for the root element",
    },
    onChange: {
      action: "changed",
      description: "Callback when content changes",
    },
    onFocus: {
      action: "focused",
      description: "Callback when editor receives focus",
    },
    onBlur: {
      action: "blurred",
      description: "Callback when editor loses focus",
    },
    onTransaction: {
      control: false,
      description: "Callback on editor transaction",
    },
    mentions: {
      control: "object",
      description: "Array of mention suggestions or configuration object",
    },
    tags: {
      control: "object",
      description: "Array of tag suggestions",
    },
    extensions: {
      control: false,
      description: "Additional TipTap extensions",
    },
    starterkitOptions: {
      control: "object",
      description: "Configuration for StarterKit extension",
    },
    uploadFunction: {
      control: false,
      description: "Custom upload function for images/videos",
    },
    uploadArgs: {
      control: "object",
      description: "Additional arguments passed to upload function",
    },
    bubbleMenuOptions: {
      control: "object",
      description: "Options for bubble menu",
    },
    children: {
      control: false,
      description: "Render function or React node",
    },
    style: {
      control: "object",
      description: "Inline styles for the root element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor>;

const mentions = [
  { id: "1", label: "John Doe", value: "john.doe@example.com" },
  { id: "2", label: "Jane Smith", value: "jane.smith@example.com" },
  { id: "3", label: "Bob Johnson", value: "bob.johnson@example.com" },
  { id: "4", label: "Alice Williams", value: "alice.williams@example.com" },
];

const tags = [
  { id: "bug", label: "Bug", value: "bug" },
  { id: "feature", label: "Feature", value: "feature" },
  { id: "enhancement", label: "Enhancement", value: "enhancement" },
  { id: "documentation", label: "Documentation", value: "documentation" },
  { id: "question", label: "Question", value: "question" },
];

const buttons = [
  "Paragraph",
  ["Heading 2", "Heading 3", "Heading 4"],
  "Separator",
  "Bold",
  "Italic",
  "Separator",
  "Bullet List",
  "Numbered List",
  "Separator",
  "Link",
  "Image",
];

export const Basic: Story = {
  args: {
    mentions: mentions,
    tags: tags,
    placeholder: "Type something...",
    bubbleMenu: true,
    fixedMenu: true,
    editorClass: "prose-sm min-h-[4rem] border rounded-b-lg border-t-0 p-2",
  },
  render: function BasicRender(args) {
    const [content, setContent] = useState(`<div>
  <h2>Heading 2</h2>
  <p>
    This is a paragraph with <strong>bold</strong> and <em>italic</em> text.
  </p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
  <p>
    <a href="https://frappe.io">Frappe</a>
  </p>
  <pre><code class="language-javascript">import { Button } from '@rtcamp/frappe-ui-react'
const value = ref(true);</code>
  </pre>
</div>`);

    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} content={content} onChange={setContent} />
      </div>
    );
  },
};

export const CommentEditor: Story = {
  args: {
    content: "",
    mentions: mentions,
    tags: tags,
    placeholder: "Write something amazing...",
    editorClass: "prose-sm max-w-none min-h-[4rem]",
    starterkitOptions: { heading: { levels: [2, 3, 4] } },
  },
  render: function CommentEditorRender(args) {
    const [content, setContent] = useState("");

    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} content={content} onChange={setContent}>
          {({ editor }) => (
            <>
              <EditorContent
                editor={editor}
                className="max-h-[50vh] overflow-y-auto border border-outline-gray-1 rounded-lg p-4"
              />
              <div className="mt-2 flex flex-col justify-between sm:flex-row sm:items-center">
                <TextEditorFixedMenu
                  editor={editor}
                  className="-ml-1 overflow-x-auto"
                  buttons={buttons}
                />
                <div className="mt-2 flex items-center justify-end space-x-2 sm:mt-0">
                  <Button>Cancel</Button>
                  <Button variant="solid">Submit</Button>
                </div>
              </div>
            </>
          )}
        </TextEditor>
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import TextEditor from "./textEditor";

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
    extensions: {
      control: false,
      description: "Additional TipTap extensions",
    },
    starterkitOptions: {
      control: "object",
      description: "Configuration for StarterKit extension",
    },
    fixedMenu: {
      control: "boolean",
      description: "Show fixed menu toolbar",
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
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor>;
export const Basic: Story = {
  args: {
    content: `
    <div>
    <h2>Heading 2</h2>
    <p>
        This is a paragraph with <strong>bold</strong> and <em>italic</em> text.
    </p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
        <pre>
            <code class="language-javascript">
                import { Button } from '@rtcamp/frappe-ui-react'
                const value = ref(true);
            </code>
        </pre>
    </ul>
  `,
    editorClass: "prose-sm min-h-[4rem] border rounded-b-lg border-t-0 p-2",
    fixedMenu: true,
  },
  render: function BasicRender(args) {
    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} />
      </div>
    );
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import TextEditor from "./textEditor";
import StaticTextEditor from "./staticTextEditor";

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
    mentions: {
      control: false,
      description: "Async callback returning mention suggestions for a query; typing @ opens the suggestion list",
    },
  },
};

const CONTENT: string = `
 <div>
    <h2>Heading 2</h2>
    <p>
        This is a paragraph with <strong>bold</strong> and <em>italic</em> text.
    </p>
    <ul>
        <li>Item 1</li>
        <li>Item 2</li>
    </ul>
        <pre><code class="language-javascript">import { Button } from '@rtcamp/frappe-ui-react'
const value = ref(true);</code></pre>
    </ul>
</div>
`;

export default meta;
type Story = StoryObj<typeof TextEditor>;

export const Basic: Story = {
  args: {
    content: CONTENT,
    editorClass: "prose-sm min-h-[4rem] border rounded-b-lg border-t-0 p-2",
    fixedMenu: true,
  },
  render: function BasicRender(args) {
    return (
      <div className="m-2 w-137.5">
        <TextEditor {...args} />
      </div>
    );
  },
};

const MENTION_USERS = [
  { id: "alice@example.com", label: "Alice Anderson" },
  { id: "bob@example.com", label: "Bob Brown" },
  { id: "carol@example.com", label: "Carol Clark" },
  { id: "dave@example.com", label: "Dave Davis" },
];

export const Mentions: Story = {
  args: {
    placeholder: "Type @ to mention someone",
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
    mentions: async (query) => MENTION_USERS.filter((user) => user.label.toLowerCase().includes(query.toLowerCase())),
  },
  render: function MentionsRender(args) {
    return (
      <div className="m-2 w-137.5">
        <TextEditor {...args} />
      </div>
    );
  },
};

export const StaticRenderer: StoryObj<typeof StaticTextEditor> = {
  args: {
    content: CONTENT,
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
  },
  render: (args) => {
    return (
      <div className="m-2 w-137.5 flex flex-col">
        <StaticTextEditor {...args} />
      </div>
    );
  },
};

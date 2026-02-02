import type { Meta, StoryObj } from "@storybook/react-vite";
import { screen, userEvent, expect } from "@storybook/test";
import TextEditor from "./textEditor";
import { within } from "@storybook/test";

const meta: Meta<typeof TextEditor> = {
  title: "Components/TextEditor/Interactions",
  component: TextEditor,
  parameters: {
    docs: { source: { type: "dynamic" } },
    layout: "centered",
  },
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

export const EditorHeading: Story = {
  args: {
    content: CONTENT,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Select the text to apply the heading
    const text = canvas.getByText((content) => {
      return content.includes("paragraph");
    });
    await userEvent.tripleClick(text);

    // Find the heading dropdown or button
    const headingButton = await canvas.findByRole("button", {
      name: "heading",
    });
    await userEvent.click(headingButton);

    // Select a heading option (e.g., Heading 2). Popups are outside canvas
    const headingOption = await screen.findByRole("menuitem", {
      name: /heading 2/i,
    });
    await userEvent.click(headingOption);

    const newText = canvas.getByText((content) => {
      return content.includes("paragraph");
    });

    expect(newText.tagName).toBe("H2");
  },
};

export const EditorBold: Story = {
  args: {
    content: CONTENT,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Select the text to apply bold formatting
    const text = canvas.getByText((content) => {
      return content.includes("paragraph");
    });
    await userEvent.tripleClick(text);

    // Find the bold button
    const boldButton = await screen.findByTitle("Bold");
    await userEvent.click(boldButton);

    // Verify the text is bold
    const boldText = canvas.getByText((content) => {
      return content.includes("paragraph");
    });

    expect(boldText).toHaveStyle("font-weight: 600");
  },
};

export const EditorItalic: Story = {
  args: {
    content: CONTENT,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText((content) => {
      return content.includes("paragraph");
    });
    await userEvent.tripleClick(text);
    const button = await screen.findByTitle("Italic");
    await userEvent.click(button);

    const newText = canvas.getByText((content) => {
      return content.includes("paragraph");
    });

    expect(newText).toHaveStyle("font-style: italic");
  },
};

export const EditorStrike: Story = {
  args: {
    content: CONTENT,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText((content) => {
      return content.includes("paragraph");
    });
    await userEvent.tripleClick(text);
    const button = await screen.findByTitle("Strike");
    await userEvent.click(button);

    const newText = canvas.getByText((content) => {
      return content.includes("paragraph");
    });

    expect(newText.tagName).toBe("S");
  },
};

export const EditorFontColor: Story = {
  args: {
    content: CONTENT,
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText((content) => {
      return content.includes("paragraph");
    });
    await userEvent.tripleClick(text);

    const button = await screen.findByTitle("Font Color");
    await userEvent.click(button);

    const colorButton = await screen.findByTitle("Red");
    await userEvent.click(colorButton);

    await userEvent.click(button);

    const highlightButton = await screen.findByTitle("Highlight Red");
    await userEvent.click(highlightButton);

    const newText = canvas.getByText((content) => {
      return content.includes("paragraph");
    });

    expect(newText).toHaveStyle("color: rgb(204, 41, 41)");
    expect(newText.tagName).toBe("MARK");
    expect(newText).toHaveStyle("background-color: #ffe7e7");
  },
};

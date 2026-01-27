import type { Meta, StoryObj } from "@storybook/react-vite";
import TextEditor from "./textEditor";

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
  },
};

export default meta;
type Story = StoryObj<typeof TextEditor>;
export const Basic: Story = {
  args: {
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
    <pre><code class="language-javascript">import { Button } from '@rtcamp/frappe-ui-react'
const value = ref(true);</code>
  </pre>
  `);
    return (
      <div className="m-2 w-[550px]">
        <TextEditor
          {...args}
          content={content}
          onChange={setContent}
          fixedMenu={true}
        />
      </div>
    );
  },
};

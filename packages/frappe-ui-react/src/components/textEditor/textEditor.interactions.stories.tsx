import { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { screen, userEvent, expect, fn, waitFor, within } from "storybook/test";
import TextEditor from "./textEditor";
import StaticTextEditor from "./staticTextEditor";
import type { MentionItem, TextEditorHandle } from "./types";

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
    mentions: {
      control: false,
      description:
        "Async callback returning mention suggestions for a query; typing @ opens the suggestion list",
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

const TASK_LIST_CONTENT: string = `
<p>Task list paragraph</p>
<ul data-type="taskList">
    <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked><span></span></label><div><p>Done item</p></div></li>
    <li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Pending item</p></div></li>
</ul>
`;

const getTaskCheckboxes = (canvasElement: HTMLElement) =>
  Array.from(
    canvasElement.querySelectorAll<HTMLInputElement>(
      'ul[data-type="taskList"] input[type="checkbox"]'
    )
  );

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

export const StaticTaskList: StoryObj<typeof StaticTextEditor> = {
  args: {
    content: TASK_LIST_CONTENT,
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
  },
  render: function StaticTaskListRender(args) {
    return (
      <div className="m-2 w-[550px]">
        <StaticTextEditor {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const [doneBox, pendingBox] = getTaskCheckboxes(canvasElement);

    expect(doneBox.checked).toBe(true);
    expect(pendingBox.checked).toBe(false);

    // Out of the tab order, and the label swallows pointer events.
    expect(pendingBox.tabIndex).toBe(-1);
    expect(
      getComputedStyle(pendingBox.closest("label") as HTMLElement).pointerEvents
    ).toBe("none");

    // Forced past the pointer-events guard, a click still changes nothing.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await user.click(pendingBox);
    await user.click(doneBox);

    expect(pendingBox.checked).toBe(false);
    expect(doneBox.checked).toBe(true);
  },
};

export const ReadOnlyTaskList: Story = {
  args: {
    content: TASK_LIST_CONTENT,
    editable: false,
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
    extensionOptions: { taskItem: { toggleWhenReadOnly: true } },
    onChange: fn(),
  },
  render: function ReadOnlyTaskListRender(args) {
    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} />
      </div>
    );
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const [doneBox, pendingBox] = getTaskCheckboxes(canvasElement);

    await userEvent.click(pendingBox);

    await waitFor(() => expect(pendingBox.checked).toBe(true));
    expect(args.onChange).toHaveBeenLastCalledWith(
      expect.stringMatching(/data-checked="true"[\s\S]*data-checked="true"/)
    );

    await userEvent.click(doneBox);

    await waitFor(() => expect(doneBox.checked).toBe(false));
    expect(args.onChange).toHaveBeenLastCalledWith(
      expect.not.stringMatching(/data-checked="true"[\s\S]*data-checked="true"/)
    );

    // Everything else stays read-only.
    const editorContent = canvasElement.querySelector(".ProseMirror");
    expect(editorContent).toHaveAttribute("contenteditable", "false");

    const paragraph = canvas.getByText("Task list paragraph");
    await userEvent.click(paragraph);
    await userEvent.keyboard("typed");

    expect(paragraph.textContent).toBe("Task list paragraph");
  },
};

const MENTION_USERS = [
  { id: "alice@example.com", label: "Alice Anderson" },
  { id: "bob@example.com", label: "Bob Brown" },
  { id: "carol@example.com", label: "Carol Clark" },
];

export const EditorMentions: Story = {
  args: {
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
    autofocus: true,
    mentions: async (query) =>
      MENTION_USERS.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase())
      ),
  },
  render: function MentionsRender(args) {
    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    // Typing the trigger character should open the suggestion list with all
    // users. The popup is appended to document.body, outside the canvas.
    await userEvent.keyboard("@");

    await screen.findByRole("button", { name: "Alice Anderson" });
    await screen.findByRole("button", { name: "Bob Brown" });
    await screen.findByRole("button", { name: "Carol Clark" });

    // Typing a query should filter the list down to matching users.
    await userEvent.keyboard("bob");

    await screen.findByRole("button", { name: "Bob Brown" });
    expect(screen.queryByRole("button", { name: "Alice Anderson" })).toBeNull();

    // Enter should insert the highlighted suggestion as a mention node and
    // close the popup.
    await userEvent.keyboard("{Enter}");

    const mention = canvasElement.querySelector(".mention");
    expect(mention).not.toBeNull();
    expect(mention?.textContent).toBe("@Bob Brown");
    expect(mention?.getAttribute("data-id")).toBe("bob@example.com");
    expect(screen.queryByRole("button", { name: "Bob Brown" })).toBeNull();
  },
};

type PendingMentionRequest = {
  query: string;
  resolve: (items: MentionItem[]) => void;
};

const pendingMentionRequests: PendingMentionRequest[] = [];

export const EditorMentionsSlowRequest: Story = {
  args: {
    editorClass: "prose-sm min-h-[4rem] border rounded-lg p-2",
    // Mocked user lookup that never resolves on its own — the play function
    // resolves each captured request manually to simulate slow responses.
    mentions: (query) =>
      new Promise((resolve) => {
        pendingMentionRequests.push({ query, resolve });
      }),
  },
  render: function MentionsSlowRequestRender(args) {
    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    pendingMentionRequests.length = 0;

    const editorEl = await waitFor(() => {
      const el = canvasElement.querySelector<HTMLElement>(
        "[contenteditable='true']"
      );
      expect(el).not.toBeNull();
      return el as HTMLElement;
    });
    await userEvent.click(editorEl);

    // Typing the trigger should show the loading row while the request is
    // still in flight.
    await userEvent.keyboard("@");

    await screen.findByText("Loading...");
    await waitFor(() => expect(pendingMentionRequests.length).toBe(1));

    // Each keystroke fires a new lookup while the previous ones are still
    // pending.
    await userEvent.keyboard("bo");
    await waitFor(() => expect(pendingMentionRequests.length).toBe(3));

    const [first, second, latest] = pendingMentionRequests;
    expect(latest.query).toBe("bo");

    // Resolving the latest request replaces the loading row with the users.
    latest.resolve([MENTION_USERS[1]]);

    await screen.findByRole("button", { name: "Bob Brown" });
    expect(screen.queryByText("Loading...")).toBeNull();

    // Superseded requests resolving late must not overwrite the current
    // list with stale results.
    first.resolve(MENTION_USERS);
    second.resolve(MENTION_USERS);
    await new Promise((resolve) => setTimeout(resolve, 100));

    expect(screen.queryByRole("button", { name: "Alice Anderson" })).toBeNull();
    await screen.findByRole("button", { name: "Bob Brown" });

    // Selecting a result fetched by the slow request still inserts the
    // mention node.
    await userEvent.keyboard("{Enter}");

    const mention = canvasElement.querySelector(".mention");
    expect(mention).not.toBeNull();
    expect(mention?.textContent).toBe("@Bob Brown");
    expect(mention?.getAttribute("data-id")).toBe("bob@example.com");
  },
};

export const EditorMentionsScrollContainer: Story = {
  args: {
    content: CONTENT,
    editorClass: "prose-sm border rounded-lg p-2",
    mentions: async (query) =>
      MENTION_USERS.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase())
      ),
  },
  render: function MentionsScrollRender(args) {
    return (
      <div
        data-testid="scroll-container"
        className="m-2 h-40 w-[550px] overflow-y-auto"
      >
        <TextEditor {...args} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const scrollContainer = canvas.getByTestId("scroll-container");

    // Place the caret inside a visible line and trigger the suggestion
    // after a space.
    await userEvent.click(canvas.getByText("Item 1"));
    await userEvent.keyboard(" @");

    const item = await screen.findByRole("button", { name: "Alice Anderson" });
    const popup = item.parentElement as HTMLElement;
    const before = popup.getBoundingClientRect();

    // Scrolling the container must keep the list anchored to the caret
    // instead of leaving it at its original viewport position.
    scrollContainer.scrollTop += 40;

    await waitFor(() => {
      const after = popup.getBoundingClientRect();
      expect(Math.abs(after.top - (before.top - 40))).toBeLessThanOrEqual(2);
    });
  },
};

export const EditorListItemHandle: Story = {
  args: {
    editorClass: "prose-sm min-h-[4rem] border rounded-b-lg border-t-0 p-2",
  },
  render: function ListItemHandleRender(args) {
    const ref = useRef<TextEditorHandle>(null);
    return (
      <div className="m-2 w-[550px]">
        <TextEditor {...args} ref={ref} />
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={() => ref.current?.addListItem("item-1", "First item")}
          >
            Add Item 1
          </button>
          <button
            type="button"
            onClick={() => ref.current?.addListItem("item-2", "Second item")}
          >
            Add Item 2
          </button>
          <button
            type="button"
            onClick={() => ref.current?.removeListItem("item-1")}
          >
            Remove Item 1
          </button>
          <button
            type="button"
            onClick={() => ref.current?.removeListItem("item-2")}
          >
            Remove Item 2
          </button>
        </div>
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Adding the first item on a blank editor should create a new list,
    // replacing the placeholder paragraph instead of appending after it.
    await userEvent.click(canvas.getByRole("button", { name: "Add Item 1" }));

    let item1 = canvasElement.querySelector('li[data-item-id="item-1"]');
    expect(item1).not.toBeNull();
    expect(item1?.textContent).toBe("First item");
    expect(canvasElement.querySelectorAll("ul").length).toBe(1);

    // Adding a second item should append to the existing tagged list.
    await userEvent.click(canvas.getByRole("button", { name: "Add Item 2" }));

    expect(canvasElement.querySelectorAll("ul").length).toBe(1);
    expect(canvasElement.querySelectorAll("li").length).toBe(2);

    const item2 = canvasElement.querySelector('li[data-item-id="item-2"]');
    expect(item2).not.toBeNull();
    expect(item2?.textContent).toBe("Second item");

    // Removing one of two items should only delete that item, leaving the
    // wrapping list intact.
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove Item 1" })
    );

    item1 = canvasElement.querySelector('li[data-item-id="item-1"]');
    expect(item1).toBeNull();
    expect(canvasElement.querySelectorAll("li").length).toBe(1);
    expect(canvasElement.querySelectorAll("ul").length).toBe(1);

    // Removing the last remaining item should also remove the now-empty
    // wrapping list, leaving no leftover empty list behind.
    await userEvent.click(
      canvas.getByRole("button", { name: "Remove Item 2" })
    );

    expect(canvasElement.querySelectorAll("li").length).toBe(0);
    expect(canvasElement.querySelectorAll("ul").length).toBe(0);
  },
};

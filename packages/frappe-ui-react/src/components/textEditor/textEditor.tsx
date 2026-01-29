/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import { normalizeClasses } from "../../utils";
import type { TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";
import { ExtendedCodeBlock } from "./extension/codeBlock";

const TextEditor = ({
  content,
  placeholder = "",
  editorClass = "",
  editable = true,
  autofocus = false,
  extensions = [],
  starterkitOptions = {},
  fixedMenu = false,
  onChange,
  onFocus,
  onBlur,
  onTransaction,
  Top,
  Editor,
  Bottom,
}: TextEditorProps) => {
  const editor = useEditor(
    {
      content,
      editable,
      autofocus,
      editorProps: {
        attributes: {
          class: clsx(
            "prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1",
            normalizeClasses(editorClass)
          ),
        },
      },
      extensions: [
        StarterKit.configure({
          codeBlock: false,
          horizontalRule: {
            HTMLAttributes: {
              class: "not-prose border-outline-gray-1 m-0",
            },
          },
          ...starterkitOptions,
        }),
        Placeholder.configure({
          placeholder:
            typeof placeholder === "function" ? placeholder() : placeholder,
        }),
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        TableKit,
        TextStyleKit,
        Highlight.configure({ multicolor: true }),
        ExtendedCodeBlock,
        ...extensions,
      ],
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      onFocus: ({ event }) => {
        onFocus?.(event);
      },
      onBlur: ({ event }) => {
        onBlur?.(event);
      },
      onTransaction: () => {
        onTransaction?.(editor);
      },
    },
    [
      content,
      editable,
      autofocus,
      editorClass,
      starterkitOptions,
      extensions,
      onChange,
      onFocus,
      onBlur,
      onTransaction,
    ]
  );

  return (
    <EditorContext.Provider value={{ editor }}>
      {Top && <Top />}
      {fixedMenu && <FixedMenu />}
      {Editor ? <Editor editor={editor} /> : <EditorContent editor={editor} />}
      {Bottom && <Bottom />}
    </EditorContext.Provider>
  );
};

export default TextEditor;

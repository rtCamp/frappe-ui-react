/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Strike from "@tiptap/extension-strike";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import { normalizeClasses } from "../../utils";
import type { TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";

const TextEditor = ({ content, editorClass = "" }: TextEditorProps) => {
  const editor = useEditor({
    content,
    editorProps: {
      attributes: {
        class: clsx(
          "prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1",
          normalizeClasses(editorClass)
        ),
      },
    },
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Strike,
      HorizontalRule,
    ],
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <FixedMenu />
      <EditorContent editor={editor} />
    </EditorContext.Provider>
  );
};

export default TextEditor;

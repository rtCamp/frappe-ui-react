/**
 * External dependencies.
 */
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import { normalizeClasses } from "../../utils";
import type { TextEditorProps } from "./types";

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
    extensions: [StarterKit],
  });

  return <EditorContent editor={editor} />;
};

export default TextEditor;

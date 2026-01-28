/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Strike from "@tiptap/extension-strike";
import Image from "@tiptap/extension-image";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import { normalizeClasses } from "../../utils";
import type { TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";
import Placeholder from "@tiptap/extension-placeholder";
import type { ChangeEventHandler } from "react";

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
          strike: false,
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
        Strike,
        Image.configure({
          allowBase64: true,
          resize: {
            enabled: true,
          },
        }),
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

  const handleUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        editor.chain().focus().setImage({ src: base64Url }).run();
      }
    };
    reader.readAsDataURL(file);

    e.target.value = "";
  };

  return (
    <EditorContext.Provider value={{ editor }}>
      <input
        id="fileInput"
        type="file"
        style={{
          visibility: "hidden",
        }}
        onChange={handleUpload}
      />
      {Top && <Top />}
      {fixedMenu && <FixedMenu />}
      {Editor ? <Editor editor={editor} /> : <EditorContent editor={editor} />}
      {Bottom && <Bottom />}
    </EditorContext.Provider>
  );
};

export default TextEditor;

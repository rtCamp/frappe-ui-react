/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Strike from "@tiptap/extension-strike";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";
import Image from "@tiptap/extension-image";
import clsx from "clsx";
import type { ChangeEventHandler } from "react";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import { normalizeClasses } from "../../utils";
import type { TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";
import { ExtendedCodeBlock } from "./extension/codeBlock/codeBlock";
import { getBase64File } from "./utils/getBase64File";

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
  uploadFunction = getBase64File,
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
          strike: false,
          blockquote: false,
          horizontalRule: false,
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
        TextStyleKit,
        Highlight.configure({ multicolor: true }),
        Strike,
        Blockquote,
        TableKit,
        HorizontalRule.configure({
          HTMLAttributes: {
            class: "not-prose border-outline-gray-1 m-0",
          },
        }),
        ExtendedCodeBlock,
        Image.configure({
          allowBase64: true,
          resize: {
            enabled: true,
            directions: ["bottom-right"], // can be any direction or diagonal combination
            minWidth: 50,
            minHeight: 50,
            alwaysPreserveAspectRatio: true,
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
      onTransaction: ({ editor }) => {
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

  const handleUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    if (!file.type.startsWith("image/")) {
      return;
    }

    const res = await uploadFunction(file);
    const url = res.file_url;

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }

    e.target.value = "";
  };

  return (
    <EditorContext.Provider value={{ editor }}>
      {/* Invisible field to provide upload functionality */}
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

/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { useMemo } from "react";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import type { TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";
import { cn } from "../../utils";
import {
  DEFAULT_EDITOR_CLASS,
  EMPTY_EXTENSIONS,
  EMPTY_STARTERKIT_OPTIONS,
  getTextEditorExtensions,
} from "./editorConfig";

const TextEditor = ({
  content,
  placeholder = "",
  editorClass = "",
  editable = true,
  autofocus = false,
  extensions = EMPTY_EXTENSIONS,
  starterkitOptions = EMPTY_STARTERKIT_OPTIONS,
  fixedMenu = false,
  onChange,
  onFocus,
  onBlur,
  onTransaction,
  Top,
  Editor,
  Bottom,
}: TextEditorProps) => {
  const editorExtensions = useMemo(
    () =>
      getTextEditorExtensions({ extensions, starterkitOptions, placeholder }),
    [extensions, starterkitOptions, placeholder]
  );

  const editor = useEditor(
    {
      content,
      editable,
      autofocus,
      editorProps: {
        attributes: {
          class: cn(DEFAULT_EDITOR_CLASS, editorClass),
        },
      },
      extensions: editorExtensions,
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
    [editable, autofocus, editorClass, editorExtensions]
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

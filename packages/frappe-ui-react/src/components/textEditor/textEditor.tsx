/**
 * External dependencies.
 */
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { forwardRef, useImperativeHandle, useMemo } from "react";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import type { TextEditorHandle, TextEditorProps } from "./types";
import FixedMenu from "./menu/fixedMenu";
import { cn } from "../../utils";
import {
  DEFAULT_EDITOR_CLASS,
  EMPTY_EXTENSIONS,
  EMPTY_EXTENSION_OPTIONS,
  EMPTY_STARTERKIT_OPTIONS,
  getTextEditorExtensions,
} from "./editorConfig";
import {
  findIdentifiedBulletListEnd,
  findListItemById,
  isDocEmpty,
} from "./extension/utils";

const TextEditor = forwardRef<TextEditorHandle, TextEditorProps>(
  function TextEditor(
    {
      content,
      placeholder = "",
      editorClass = "",
      editable = true,
      autofocus = false,
      extensions = EMPTY_EXTENSIONS,
      starterkitOptions = EMPTY_STARTERKIT_OPTIONS,
      extensionOptions = EMPTY_EXTENSION_OPTIONS,
      fixedMenu = false,
      onChange,
      onFocus,
      onBlur,
      onTransaction,
      Top,
      Editor,
      Bottom,
    },
    ref
  ) {
    const editorExtensions = useMemo(
      () =>
        getTextEditorExtensions({
          extensions,
          starterkitOptions,
          placeholder,
          extensionOptions,
        }),
      [extensions, starterkitOptions, placeholder, extensionOptions]
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
          clipboardTextSerializer: (slice) =>
            slice.content.textBetween(0, slice.content.size, "\n"),
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

    useImperativeHandle(
      ref,
      () => ({
        addListItem: (id, text) => {
          if (!editor) return;

          const listItemContent = {
            type: "listItem",
            attrs: { itemId: id },
            content: [
              {
                type: "paragraph",
                content: text ? [{ type: "text", text }] : [],
              },
            ],
          };

          const listEndPos = findIdentifiedBulletListEnd(editor);

          if (listEndPos !== null) {
            editor.chain().insertContentAt(listEndPos, listItemContent).run();
          } else {
            const { doc } = editor.state;

            // On a blank editor, replace the placeholder paragraph instead of
            // inserting after it - otherwise the list ends up under a stray
            // leading blank line.
            const range = isDocEmpty(editor)
              ? { from: 0, to: doc.content.size }
              : { from: doc.content.size, to: doc.content.size };

            editor
              .chain()
              .insertContentAt(range, {
                type: "bulletList",
                content: [listItemContent],
              })
              .run();
          }
        },
        removeListItem: (id) => {
          if (!editor) return;

          const found = findListItemById(editor, id);
          if (!found) return;

          const itemPos: number = found.pos;
          const itemNode: ProseMirrorNode = found.node;
          const parent = editor.state.doc.resolve(itemPos).parent;

          if (parent.type.name === "bulletList" && parent.childCount === 1) {
            const listStart = editor.state.doc.resolve(itemPos).before();
            editor
              .chain()
              .deleteRange({ from: listStart, to: listStart + parent.nodeSize })
              .run();
          } else {
            editor
              .chain()
              .deleteRange({ from: itemPos, to: itemPos + itemNode.nodeSize })
              .run();
          }
        },
      }),
      [editor]
    );

    return (
      <EditorContext.Provider value={{ editor }}>
        {Top && <Top />}
        {fixedMenu && <FixedMenu />}
        {Editor ? (
          <Editor editor={editor} />
        ) : (
          <EditorContent editor={editor} />
        )}
        {Bottom && <Bottom />}
      </EditorContext.Provider>
    );
  }
);

export default TextEditor;

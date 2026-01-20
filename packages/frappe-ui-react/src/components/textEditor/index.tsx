/**
 * External dependencies.
 */
import { useMemo, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import clsx from "clsx";
/**
 * Internal dependencies.
 */
import type { TextEditorProps } from "./types";
import Toolbar from "./toolbar";

/**
 * TextEditor component using Tiptap.
 */
const TextEditor = ({
  className,
  onChange,
  hideToolbar = false,
  value,
  placeholder = "Write something...",
  disabled = false,
}: TextEditorProps) => {
  /**
   * Configure extensions based on props.
   */
  const extensions = useMemo(() => {
    const baseExtensions = [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4",
          },
        },
      }),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ];

    return baseExtensions;
  }, [placeholder]);

  /**
   * Initialize Tiptap editor.
   */
  const editor = useEditor({
    extensions,
    content: value || "",
    editable: !disabled,
    onUpdate: ({ editor: updatedEditor }) => {
      const html = updatedEditor.getHTML();
      onChange(html);
    },
    editorProps: {
      attributes: {
        class: clsx(
          "prose prose-sm max-w-none focus:outline-none p-2",
          "whitespace-normal",
          disabled && "opacity-60 pointer-events-none"
        ),
      },
    },
  });

  /**
   * Sync external value changes to editor.
   */
  useEffect(() => {
    if (editor && value !== undefined) {
      const currentContent = editor.getHTML();
      if (currentContent !== value) {
        // Update content without emitting update event
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  /**
   * Cleanup editor on unmount.
   */
  useEffect(() => {
    return () => {
      editor?.destroy();
    };
  }, [editor]);

  const containerClasses = clsx(
    "border rounded-md border-input bg-background text-foreground overflow-hidden",
    {
      "border-none !resize-none": hideToolbar,
      "flex flex-col": true,
    },
    className
  );

  return (
    <div
      className={containerClasses}
      style={{ resize: "vertical", overflow: "auto" }}
    >
      {!hideToolbar && <Toolbar editor={editor} />}
      <div
        className={clsx(
          "flex-1 overflow-auto",
          hideToolbar && "border-none [&_.ql-editor]:min-h-0 [&_.ql-editor]:p-2"
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TextEditor;

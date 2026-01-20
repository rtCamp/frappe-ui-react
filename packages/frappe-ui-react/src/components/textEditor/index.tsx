/**
 * External dependencies.
 */
import { useMemo, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import clsx from "clsx";
import { Node as TiptapNode } from "@tiptap/core";

/**
 * Internal dependencies.
 */
import type { TextEditorProps } from "./types";
import Toolbar from "./toolbar";

/**
 * Custom video extension for Tiptap.
 */

const VideoExtension = TiptapNode.create({
  name: "video",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: "560" },
      height: { default: "315" },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="youtube.com"]',
      },
      {
        tag: 'iframe[src*="vimeo.com"]',
      },
      {
        tag: "iframe[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      {
        style:
          "position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden;",
      },
      [
        "iframe",
        {
          src: HTMLAttributes.src,
          frameborder: "0",
          allow:
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
          allowfullscreen: "true",
          style:
            "position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; border-radius: 0.5rem;",
        },
      ],
    ];
  },

  addCommands() {
    return {
      insertVideo:
        (options: { src: string }) =>
        ({ commands }: any) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
            },
          });
        },
    } as any;
  },
}) as any;

/**
 * TextEditor component using Tiptap.
 */
const TextEditor = ({
  allowImageUpload = false,
  allowVideoUpload = false,
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
      StarterKit.configure(),
      TextStyle,
      Color.configure({
        types: ["textStyle"],
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class: "text-blue-500 hover:text-blue-700 underline",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: "rounded-md",
        },
      }),
      Placeholder.configure({
        placeholder,
        emptyEditorClass: "is-editor-empty",
      }),
    ];

    if (allowVideoUpload) {
      baseExtensions.push(VideoExtension);
    }

    return baseExtensions;
  }, [allowVideoUpload, placeholder]);

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
      {!hideToolbar && (
        <Toolbar
          editor={editor}
          allowImageUpload={allowImageUpload}
          allowVideoUpload={allowVideoUpload}
        />
      )}
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

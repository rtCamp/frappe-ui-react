/**
 * External dependencies.
 */
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Typography from "@tiptap/extension-typography";
import { TextStyle } from "@tiptap/extension-text-style";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import { ImageExtension } from "./extensions/image";
import { ImageViewerExtension } from "./extensions/image-viewer";
import { VideoExtension } from "./extensions/video";
import IframeExtension from "./extensions/iframe";
import LinkExtension from "./extensions/link";
import NamedColorExtension from "./extensions/color";
import NamedHighlightExtension from "./extensions/highlight";
import improvedList from "./extensions/list";
import { MentionExtension } from "./extensions/mention";
import TextEditorFixedMenu from "./textEditorFixedMenu";
import TextEditorBubbleMenu from "./textEditorBubbleMenu";
import TextEditorFloatingMenu from "./textEditorFloatingMenu";
import EmojiExtension from "./extensions/emoji";
import SlashCommands from "./extensions/slash-commands";
import { ContentPasteExtension } from "./extensions/content-paste";
import { TagNode, TagExtension } from "./extensions/tag";
import { Heading } from "./extensions/heading";
import { ImageGroup } from "./extensions/image-group";
import { ExtendedCode, ExtendedCodeBlock } from "./extensions/code-block";
import { useFileUpload } from "../../utils/useFileUpload";
import {
  TextEditorProps,
  TextEditorRef,
  UploadedFile,
  TextEditorInstance,
} from "./types";

import "./textEditor.css";
import "./extensions/color/color-styles.css";
import "./extensions/highlight/highlight-styles.css";

const TextEditor = forwardRef<TextEditorRef, TextEditorProps>(
  (
    {
      content = null,
      placeholder = "",
      editorClass = "",
      editable = true,
      autofocus = false,
      bubbleMenu = false,
      bubbleMenuOptions = {},
      fixedMenu = false,
      floatingMenu = false,
      extensions = [],
      starterkitOptions = {},
      mentions = null,
      tags = [],
      uploadFunction,
      uploadArgs = {},
      onChange,
      onFocus,
      onBlur,
      onTransaction,
      className,
      style,
      children,
      ...attrs
    },
    ref
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);

    // useFileUpload hook for default upload function
    const fileUpload = useFileUpload();
    const defaultUploadFunction = (file: File): Promise<UploadedFile> => {
      return fileUpload.upload(file, uploadArgs);
    };

    const uploadFunc = uploadFunction || defaultUploadFunction;

    const normalizeEditorClass = (cls: string | string[] | object): string => {
      if (typeof cls === "string") return cls;
      if (Array.isArray(cls)) return cls.join(" ");
      if (typeof cls === "object") {
        return Object.entries(cls)
          .filter(([, value]) => value)
          .map(([key]) => key)
          .join(" ");
      }
      return "";
    };

    const editor = useEditor({
      content: content || null,
      editorProps: {
        attributes: {
          class: clsx(
            "prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1",
            normalizeEditorClass(editorClass)
          ),
        },
      },
      editable,
      autofocus,
      extensions: [
        StarterKit.configure({
          ...starterkitOptions,
          code: false,
          codeBlock: false,
          heading: false,
        }).extend({
          addKeyboardShortcuts() {
            return {
              Backspace: () => improvedList(this.editor),
            };
          },
        }),
        Heading.configure({
          ...(typeof starterkitOptions?.heading === "object" &&
          starterkitOptions.heading !== null
            ? starterkitOptions.heading
            : {}),
        }),
        Table.configure({
          resizable: true,
        }),
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Typography,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        TextStyle,
        NamedColorExtension,
        NamedHighlightExtension,
        ExtendedCode,
        ExtendedCodeBlock,
        ImageExtension.configure({
          uploadFunction: uploadFunc,
        }),
        ImageGroup.configure({
          uploadFunction: uploadFunc,
        }),
        ImageViewerExtension,
        VideoExtension.configure({
          uploadFunction: uploadFunc,
        }),
        IframeExtension,
        LinkExtension.configure({
          openOnClick: false,
        }),
        Placeholder.configure({
          placeholder:
            typeof placeholder === "function"
              ? placeholder
              : () => placeholder as string,
        }),
        ...(mentions
          ? [
              MentionExtension.configure(
                Array.isArray(mentions)
                  ? { mentions }
                  : {
                      mentions: mentions.mentions,
                      component: mentions.component,
                    }
              ),
            ]
          : []),
        EmojiExtension,
        SlashCommands,
        TagNode,
        TagExtension.configure({
          tags: () => tags,
        }),
        ContentPasteExtension.configure({
          enabled: true,
          uploadFunction: uploadFunc,
        }),
        ...extensions,
      ],
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      onTransaction: ({ editor }) => {
        onTransaction?.(editor as TextEditorInstance);
      },
      onFocus: ({ event }) => {
        onFocus?.(event);
      },
      onBlur: ({ event }) => {
        onBlur?.(event);
      },
    }) as TextEditorInstance | null;

    // Expose editor and rootRef via ref
    useImperativeHandle(ref, () => ({
      editor: editor,
      rootRef: rootRef.current,
    }));

    // Watch content changes
    useEffect(() => {
      if (editor && content !== null) {
        const currentHTML = editor.getHTML();
        if (currentHTML !== content) {
          editor.commands.setContent(content);
        }
      }
    }, [content, editor]);

    // Watch editable changes
    useEffect(() => {
      if (editor) {
        editor.setEditable(editable);
      }
    }, [editable, editor]);

    // Watch editorClass changes
    useEffect(() => {
      if (editor) {
        editor.setOptions({
          editorProps: {
            attributes: {
              class: clsx(
                "prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1",
                normalizeEditorClass(editorClass)
              ),
            },
          },
        });
      }
    }, [editorClass, editor]);

    if (!editor) {
      return null;
    }

    return (
      <div
        ref={rootRef}
        className={clsx("relative w-full", className)}
        style={style}
        {...attrs}
      >
        {bubbleMenu && (
          <TextEditorBubbleMenu
            editor={editor}
            buttons={bubbleMenu}
            options={bubbleMenuOptions}
          />
        )}
        {fixedMenu && (
          <TextEditorFixedMenu
            editor={editor}
            className="w-full overflow-x-auto rounded-t-lg border border-outline-gray-modals"
            buttons={fixedMenu}
          />
        )}
        {floatingMenu && (
          <TextEditorFloatingMenu editor={editor} buttons={floatingMenu} />
        )}
        {children ? (
          typeof children === "function" ? (
            children({ editor: editor })
          ) : (
            children
          )
        ) : (
          <EditorContent editor={editor} />
        )}
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";

export default TextEditor;

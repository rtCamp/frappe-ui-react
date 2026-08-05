/**
 * External dependencies.
 */
import type { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TaskList } from "@tiptap/extension-list";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import { TableKit } from "@tiptap/extension-table";

/**
 * Internal dependencies.
 */
import "./extension/codeBlock.css";
import type { TextEditorProps } from "./types";
import { ExtendedCodeBlock } from "./extension/codeBlock";
import { IdentifiedListItem } from "./extension/identifiedListItem";
import { ExtendedTaskItem } from "./extension/taskItem";

export const DEFAULT_EDITOR_CLASS =
  "ProseMirror prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1";

export const EMPTY_EXTENSIONS: NonNullable<TextEditorProps["extensions"]> = [];
export const EMPTY_STARTERKIT_OPTIONS: NonNullable<
  TextEditorProps["starterkitOptions"]
> = {};
export const EMPTY_EXTENSION_OPTIONS: NonNullable<
  TextEditorProps["extensionOptions"]
> = {};

type GetExtensionsArgs = Pick<
  TextEditorProps,
  "extensions" | "starterkitOptions" | "placeholder" | "extensionOptions"
>;

export const getTextEditorExtensions = ({
  extensions = EMPTY_EXTENSIONS,
  starterkitOptions = EMPTY_STARTERKIT_OPTIONS,
  placeholder = "",
  extensionOptions = EMPTY_EXTENSION_OPTIONS,
}: GetExtensionsArgs): Extensions => [
  StarterKit.configure({
    codeBlock: false,
    listItem: false,
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
    ...extensionOptions.placeholder,
  }),
  TaskList.configure({ ...extensionOptions.taskList }),
  ExtendedTaskItem.configure({
    nested: true,
    ...extensionOptions.taskItem,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    ...extensionOptions.textAlign,
  }),
  TextStyleKit,
  Highlight.configure({ multicolor: true, ...extensionOptions.highlight }),
  TableKit.configure({ ...extensionOptions.table }),
  ExtendedCodeBlock,
  IdentifiedListItem,
  ...extensions,
];

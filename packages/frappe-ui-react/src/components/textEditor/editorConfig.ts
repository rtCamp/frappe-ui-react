/**
 * External dependencies.
 */
import type { Extensions } from "@tiptap/react";
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

/**
 * Internal dependencies.
 */
import "./extension/codeBlock.css";
import type { TextEditorProps } from "./types";
import { ExtendedCodeBlock } from "./extension/codeBlock";

export const DEFAULT_EDITOR_CLASS =
  "ProseMirror prose prose-table:table-fixed prose-td:p-2 prose-th:p-2 prose-td:border prose-th:border prose-td:border-outline-gray-2 prose-th:border-outline-gray-2 prose-td:relative prose-th:relative prose-th:bg-surface-gray-2 border-outline-gray-1";

export const EMPTY_EXTENSIONS: NonNullable<TextEditorProps["extensions"]> = [];
export const EMPTY_STARTERKIT_OPTIONS: NonNullable<
  TextEditorProps["starterkitOptions"]
> = {};

type EditorExtensionOptions = Pick<
  TextEditorProps,
  "extensions" | "starterkitOptions" | "placeholder"
>;

export const getTextEditorExtensions = ({
  extensions = EMPTY_EXTENSIONS,
  starterkitOptions = EMPTY_STARTERKIT_OPTIONS,
  placeholder = "",
}: EditorExtensionOptions): Extensions => [
  StarterKit.configure({
    codeBlock: false,
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
  ...extensions,
];

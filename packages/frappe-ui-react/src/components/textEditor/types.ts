/**
 * External dependencies.
 */
import { Editor, type Extension } from "@tiptap/react";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import type { TaskListOptions } from "@tiptap/extension-list";
import type { TextAlignOptions } from "@tiptap/extension-text-align";
import type { HighlightOptions } from "@tiptap/extension-highlight";
import type { PlaceholderOptions } from "@tiptap/extension-placeholder";
import type { TableKitOptions } from "@tiptap/extension-table";
import type { FC } from "react";

/**
 * Internal dependencies.
 */
import type { ExtendedTaskItemOptions } from "./extension/taskItem";

export interface EditorExtensionOptions {
  placeholder?: Partial<PlaceholderOptions>;
  taskList?: Partial<TaskListOptions>;
  taskItem?: Partial<ExtendedTaskItemOptions>;
  textAlign?: Partial<TextAlignOptions>;
  highlight?: Partial<HighlightOptions>;
  table?: Partial<TableKitOptions>;
}

export interface TextEditorProps {
  // Props
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  extensions?: Extension[];
  starterkitOptions?: Partial<StarterKitOptions>;
  extensionOptions?: EditorExtensionOptions;
  fixedMenu?: boolean;
  // Events
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: Editor) => void;
  // Slots
  Top?: FC;
  Editor?: FC<{ editor: Editor }>;
  Bottom?: FC;
}

export type StaticTextEditorProps = Pick<
  TextEditorProps,
  | "editorClass"
  | "extensions"
  | "starterkitOptions"
  | "placeholder"
  | "content"
  | "extensionOptions"
>;

export interface EditorCommand {
  label: string;
  text?: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  component?: React.ComponentType<{
    children: (props: {
      isActive?: boolean;
      onClick?: () => void;
    }) => React.ReactNode;
  }>;
}

export interface TextEditorHandle {
  addListItem: (id: string, text: string) => void;
  removeListItem: (id: string) => void;
}

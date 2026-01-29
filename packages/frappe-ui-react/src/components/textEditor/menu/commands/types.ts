/**
 * External dependencies.
 */
import type { Editor } from "@tiptap/react";
import type { FC } from "react";

export const COMMANDS_KEYS = [
  "paragraph",
  "heading_1",
  "heading_2",
  "heading_3",
  "heading_4",
  "heading_5",
  "heading_6",
  "bold",
  "italic",
  "bullet_list",
  "numbered_list",
  "task_list",
  "align_left",
  "align_center",
  "align_right",
  "font_color",
  "strike",
  "insert_table",
  "add_column_before",
  "add_column_after",
  "delete_column",
  "add_row_before",
  "add_row_after",
  "delete_row",
  "merge_cells",
  "split_cell",
  "toggle_header_column",
  "toggle_header_row",
  "toggle_header_cell",
  "delete_table",
  "blockquote",
  "undo",
  "redo",
] as const;

export type TYPE_COMMANDS_KEYS = (typeof COMMANDS_KEYS)[number];

export interface EditorCommand {
  label: string;
  text?: string;
  icon?: FC<{ className?: string }>;
  isActive: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor) => boolean;
  action?: (editor: Editor) => void;
  component?: FC<{
    children: (props: {
      isActive?: boolean;
      onClick?: () => void;
    }) => React.ReactNode;
  }>;
}

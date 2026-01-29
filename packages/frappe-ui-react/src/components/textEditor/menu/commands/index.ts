/**
 * External dependencies.
 */
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ItalicIcon,
  ListCheckIcon,
  ListIcon,
  ListOrderedIcon,
  PaintBucketIcon,
  QuoteIcon,
  Redo2Icon,
  SeparatorHorizontal,
  StrikethroughIcon,
  TableIcon,
  TypeIcon,
  Undo2Icon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import type { TYPE_COMMANDS_KEYS, EditorCommand } from "./types";
import FontColor from "./fontColor";

export const COMMANDS: Record<TYPE_COMMANDS_KEYS, EditorCommand> = {
  paragraph: {
    label: "Paragraph",
    icon: TypeIcon,
    action: (editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor) => editor.isActive("paragraph"),
  },
  heading_1: {
    label: "Heading 1",
    text: "H1",
    icon: Heading1Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  heading_2: {
    label: "Heading 2",
    text: "H2",
    icon: Heading2Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  heading_3: {
    label: "Heading 3",
    text: "H3",
    icon: Heading3Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  heading_4: {
    label: "Heading 4",
    text: "H4",
    icon: Heading4Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 4 }),
  },
  heading_5: {
    label: "Heading 5",
    text: "H5",
    icon: Heading5Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 5 }),
  },
  heading_6: {
    label: "Heading 6",
    text: "H6",
    icon: Heading6Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 6 }),
  },
  bold: {
    label: "Bold",
    icon: BoldIcon,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  italic: {
    label: "Italic",
    icon: ItalicIcon,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  bullet_list: {
    label: "Bullet List",
    icon: ListIcon,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  numbered_list: {
    label: "Numbered List",
    icon: ListOrderedIcon,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  task_list: {
    label: "Task List",
    icon: ListCheckIcon,
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskList"),
  },
  align_center: {
    label: "Align Center",
    icon: AlignCenterIcon,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
  },
  align_left: {
    label: "Align Left",
    icon: AlignLeftIcon,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
  },
  align_right: {
    label: "Align Right",
    icon: AlignRightIcon,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
  },
  font_color: {
    label: "Font Color",
    icon: PaintBucketIcon,
    isActive: (editor) =>
      editor.isActive("textStyle") || editor.isActive("highlight"),
    component: FontColor,
  },
  strike: {
    label: "Strike",
    icon: StrikethroughIcon,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  codeblock: {
    label: "Code Block",
    icon: CodeIcon,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  horizontal_rule: {
    label: "Horizontal Rule",
    icon: SeparatorHorizontal,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  insert_table: {
    label: "Insert Table",
    icon: TableIcon,
    action: (editor) =>
      editor
        .chain()
        .focus()
        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
        .run(),
    isActive: () => false,
  },
  add_column_before: {
    label: "Add Column Before",
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addColumnBefore(),
  },
  add_column_after: {
    label: "Add Column After",
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addColumnAfter(),
  },
  delete_column: {
    label: "Delete Column",
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteColumn(),
  },
  add_row_before: {
    label: "Add Row Before",
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addRowBefore(),
  },
  add_row_after: {
    label: "Add Row After",
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addRowAfter(),
  },
  delete_row: {
    label: "Delete Row",
    action: (editor) => editor.chain().focus().deleteRow().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteRow(),
  },
  delete_table: {
    label: "Delete Table",
    action: (editor) => editor.chain().focus().deleteTable().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteTable(),
  },
  merge_cells: {
    label: "Merge Cells",
    action: (editor) => editor.chain().focus().mergeCells().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().mergeCells(),
  },
  split_cell: {
    label: "Split Cell",
    action: (editor) => editor.chain().focus().splitCell().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().splitCell(),
  },
  toggle_header_column: {
    label: "Toggle Header Column",
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderColumn(),
  },
  toggle_header_row: {
    label: "Toggle Header Row",
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderRow(),
  },
  toggle_header_cell: {
    label: "Toggle Header Cell",
    action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderCell(),
  },
  blockquote: {
    label: "Blockquote",
    icon: QuoteIcon,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  undo: {
    label: "Undo",
    icon: Undo2Icon,
    action: (editor) => editor.chain().focus().undo().run(),
    isDisabled: (editor) => !editor.can().undo(),
    isActive: () => false,
  },
  redo: {
    label: "Undo",
    icon: Redo2Icon,
    action: (editor) => editor.chain().focus().redo().run(),
    isDisabled: (editor) => !editor.can().redo(),
    isActive: () => false,
  },
};

export default COMMANDS;

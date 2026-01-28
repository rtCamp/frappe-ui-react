/**
 * External dependencies.
 */
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  Image,
  ItalicIcon,
  ListCheckIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
  TypeIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import type { TYPE_COMMANDS_KEYS, EditorCommand } from "./types";

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
  strike: {
    label: "Strike",
    icon: StrikethroughIcon,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  image: {
    label: "Image",
    icon: Image,
    action: () => {
      const inpEle = document.getElementById("fileInput");
      if (inpEle) {
        inpEle.click();
      }
    },
    isActive: () => false,
  },
};

export default COMMANDS;

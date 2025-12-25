/**
 * External dependencies.
 */
import { lazy } from "react";

/**
 * Internal dependencies.
 */
import { EditorCommand } from "./types";
import H1Icon from "./icons/h1";
import H2Icon from "./icons/h2";
import H3Icon from "./icons/h3";
import H4Icon from "./icons/h4";
import H5Icon from "./icons/h5";
import H6Icon from "./icons/h6";
import TextIcon from "./icons/text";
import BoldIcon from "./icons/bold";
import ItalicIcon from "./icons/italic";
import UnderlineIcon from "./icons/underline";
import StrikethroughIcon from "./icons/strikethrough";
import AlignCenterIcon from "./icons/alignCenter";
import AlignLeftIcon from "./icons/alignLeft";
import AlignRightIcon from "./icons/alignRight";
import FontColorIcon from "./icons/fontColor";
import ListOrderedIcon from "./icons/listOrdered";
import ListUnorderedIcon from "./icons/listUnordered";
import ListTaskIcon from "./icons/listTask";
import DoubleQuotesIcon from "./icons/doubleQuotes";
import CodeViewIcon from "./icons/codeView";
import LinkIcon from "./icons/link";
import ImageAddLineIcon from "./icons/imageAddLine";
import VideoAddLineIcon from "./icons/videoAddLine";
import GalleryVerticalIcon from "./icons/galleryVertical";
import ArrowGoBackIcon from "./icons/arrowGoBack";
import ArrowGoForwardIcon from "./icons/arrowGoForward";
import SeparatorIcon from "./icons/separator";
import TableIcon from "./icons/table";

const FontColor = lazy(() => import("./fontColor"));
const InsertLink = lazy(() => import("./insertLink"));
const InsertImage = lazy(() => import("./insertImage"));
const InsertVideo = lazy(() => import("./insertVideo"));
const InsertIframe = lazy(() => import("./extensions/iframe").then(m => ({ default: m.InsertIframe })));

const commands: Record<string, EditorCommand> = {
  Paragraph: {
    label: "Paragraph",
    icon: TextIcon,
    action: (editor) => editor.chain().focus().setParagraph().run(),
    isActive: (editor) => editor.isActive("paragraph"),
  },
  "Heading 1": {
    label: "Heading 1",
    text: "H1",
    icon: H1Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 1 }),
  },
  "Heading 2": {
    label: "Heading 2",
    text: "H2",
    icon: H2Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  "Heading 3": {
    label: "Heading 3",
    text: "H3",
    icon: H3Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  "Heading 4": {
    label: "Heading 4",
    text: "H4",
    icon: H4Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 4 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 4 }),
  },
  "Heading 5": {
    label: "Heading 5",
    text: "H5",
    icon: H5Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 5 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 5 }),
  },
  "Heading 6": {
    label: "Heading 6",
    text: "H6",
    icon: H6Icon,
    action: (editor) =>
      editor.chain().focus().toggleHeading({ level: 6 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 6 }),
  },
  Bold: {
    label: "Bold",
    icon: BoldIcon,
    action: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  Italic: {
    label: "Italic",
    icon: ItalicIcon,
    action: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  Underline: {
    label: "Underline",
    icon: UnderlineIcon,
    action: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  Strikethrough: {
    label: "Strikethrough",
    icon: StrikethroughIcon,
    action: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive("strike"),
  },
  "Bullet List": {
    label: "Bullet List",
    icon: ListUnorderedIcon,
    action: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  "Numbered List": {
    label: "Numbered List",
    icon: ListOrderedIcon,
    action: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  "Task List": {
    label: "Task List",
    icon: ListTaskIcon,
    action: (editor) => editor.chain().focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive("taskList"),
  },
  "Align Center": {
    label: "Align Center",
    icon: AlignCenterIcon,
    action: (editor) => editor.chain().focus().setTextAlign("center").run(),
    isActive: (editor) => editor.isActive({ textAlign: "center" }),
  },
  "Align Left": {
    label: "Align Left",
    icon: AlignLeftIcon,
    action: (editor) => editor.chain().focus().setTextAlign("left").run(),
    isActive: (editor) => editor.isActive({ textAlign: "left" }),
  },
  "Align Right": {
    label: "Align Right",
    icon: AlignRightIcon,
    action: (editor) => editor.chain().focus().setTextAlign("right").run(),
    isActive: (editor) => editor.isActive({ textAlign: "right" }),
  },
  FontColor: {
    label: "Font Color",
    icon: FontColorIcon,
    isActive: (editor) =>
      editor.isActive("textStyle") || editor.isActive("highlight"),
    component: FontColor,
  },
  Blockquote: {
    label: "Blockquote",
    icon: DoubleQuotesIcon,
    action: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  Code: {
    label: "Code",
    icon: CodeViewIcon,
    action: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
  "Horizontal Rule": {
    label: "Horizontal Rule",
    icon: SeparatorIcon,
    action: (editor) => editor.chain().focus().setHorizontalRule().run(),
    isActive: () => false,
  },
  Link: {
    label: "Link",
    icon: LinkIcon,
    isActive: (editor) => editor.isActive("link"),
    component: InsertLink,
  },
  Image: {
    label: "Image",
    icon: ImageAddLineIcon,
    isActive: () => false,
    component: InsertImage,
  },
  Video: {
    label: "Video",
    icon: VideoAddLineIcon,
    isActive: () => false,
    component: InsertVideo,
  },
  Iframe: {
    label: "Embed",
    icon: GalleryVerticalIcon,
    isActive: (editor) => editor.isActive("iframe"),
    component: InsertIframe,
  },
  Undo: {
    label: "Undo",
    icon: ArrowGoBackIcon,
    action: (editor) => editor.chain().focus().undo().run(),
    isActive: () => false,
  },
  Redo: {
    label: "Redo",
    icon: ArrowGoForwardIcon,
    action: (editor) => editor.chain().focus().redo().run(),
    isActive: () => false,
  },
  InsertTable: {
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
  AddColumnBefore: {
    label: "Add Column Before",
    action: (editor) => editor.chain().focus().addColumnBefore().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addColumnBefore(),
  },
  AddColumnAfter: {
    label: "Add Column After",
    action: (editor) => editor.chain().focus().addColumnAfter().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addColumnAfter(),
  },
  DeleteColumn: {
    label: "Delete Column",
    action: (editor) => editor.chain().focus().deleteColumn().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteColumn(),
  },
  AddRowBefore: {
    label: "Add Row Before",
    action: (editor) => editor.chain().focus().addRowBefore().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addRowBefore(),
  },
  AddRowAfter: {
    label: "Add Row After",
    action: (editor) => editor.chain().focus().addRowAfter().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().addRowAfter(),
  },
  DeleteRow: {
    label: "Delete Row",
    action: (editor) => editor.chain().focus().deleteRow().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteRow(),
  },
  DeleteTable: {
    label: "Delete Table",
    action: (editor) => editor.chain().focus().deleteTable().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().deleteTable(),
  },
  MergeCells: {
    label: "Merge Cells",
    action: (editor) => editor.chain().focus().mergeCells().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().mergeCells(),
  },
  SplitCell: {
    label: "Split Cell",
    action: (editor) => editor.chain().focus().splitCell().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().splitCell(),
  },
  ToggleHeaderColumn: {
    label: "Toggle Header Column",
    action: (editor) => editor.chain().focus().toggleHeaderColumn().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderColumn(),
  },
  ToggleHeaderRow: {
    label: "Toggle Header Row",
    action: (editor) => editor.chain().focus().toggleHeaderRow().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderRow(),
  },
  ToggleHeaderCell: {
    label: "Toggle Header Cell",
    action: (editor) => editor.chain().focus().toggleHeaderCell().run(),
    isActive: () => false,
    isDisabled: (editor) => !editor.can().toggleHeaderCell(),
  },
  Separator: {
    label: "",
    type: "separator",
    isActive: () => false,
  },
};

export default commands;

/**
 * External dependencies.
 */
import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { Popover } from "@headlessui/react";

/**
 * Internal dependencies.
 */
import { Button } from "../button";
import { Bold, Italic } from "lucide-react";

/**
 * Toolbar props interface.
 */
interface ToolbarProps {
  editor: Editor | null;
  allowImageUpload?: boolean;
  allowVideoUpload?: boolean;
}

/**
 * Color palette matching Quill's default colors.
 */
const COLOR_PALETTE = [
  "#000000",
  "#ffffff",
  "#e0e0e0",
  "#808080",
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
];

/**
 * ColorPicker component for selecting text color.
 */
const ColorPicker = ({ editor }: { editor: Editor }) => {
  const currentColor = editor.getAttributes("textStyle").color || "#000000";

  return (
    <Popover className="relative">
      <Popover.Button as={Button} variant="ghost" size="sm">
        <div className="flex items-center gap-1">
          <div
            className="w-4 h-4 rounded border border-outline-gray-2"
            style={{ backgroundColor: currentColor }}
          />
        </div>
      </Popover.Button>
      <Popover.Panel className="absolute z-50 bg-background border border-input rounded-md p-2 shadow-lg">
        <div className="grid grid-cols-8 gap-1">
          {COLOR_PALETTE.map((color) => (
            <button
              key={color}
              className={clsx(
                "w-6 h-6 rounded border-2 transition-all hover:scale-110",
                currentColor === color
                  ? "border-foreground"
                  : "border-outline-gray-2"
              )}
              style={{ backgroundColor: color }}
              onClick={() => editor.chain().focus().setColor(color).run()}
              title={color}
            />
          ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
};

/**
 * Toolbar component for the text editor.
 */
export const Toolbar = ({
  editor,
  allowImageUpload = false,
  allowVideoUpload = false,
}: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addImage = () => {
    const url = window.prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addVideo = () => {
    const url = window.prompt("Enter video URL (YouTube/Vimeo/etc):");
    if (url) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (editor.chain().focus() as any).insertVideo({ src: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap gap-1 items-center border-b border-input bg-background p-2">
      {/* Formatting section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "bg-color-gray-400" : ""}
          title="Bold (Ctrl+B)"
        >
          <Bold className="size-5" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "bg-surface-gray-3" : ""}
          title="Italic (Ctrl+I)"
        >
          <Italic className="size-5" />
        </Button>
      </div>

      {/* Color section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
        <ColorPicker editor={editor} />
      </div>

      {/* Lists section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "bg-surface-gray-3" : ""}
          title="Bullet list"
        >
          •
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "bg-surface-gray-3" : ""}
          title="Ordered list"
        >
          1.
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
          title="Decrease indent"
        >
          ←
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
          title="Increase indent"
        >
          →
        </Button>
      </div>

      {/* Alignment section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "bg-surface-gray-3" : ""
          }
          title="Align left"
        >
          ◀
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "bg-surface-gray-3" : ""
          }
          title="Align center"
        >
          ≡
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "bg-surface-gray-3" : ""
          }
          title="Align right"
        >
          ▶
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "bg-surface-gray-3" : ""
          }
          title="Justify"
        >
          ≣
        </Button>
      </div>

      {/* Link section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={editor.isActive("link") ? removeLink : setLink}
          className={editor.isActive("link") ? "bg-surface-gray-3" : ""}
          title={editor.isActive("link") ? "Remove link" : "Add link"}
        >
          🔗
        </Button>
      </div>

      {/* Media section */}
      <div className="flex gap-1 items-center">
        {allowImageUpload && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addImage}
            title="Add image"
          >
            🖼️
          </Button>
        )}
        {allowVideoUpload && (
          <Button
            variant="ghost"
            size="sm"
            onClick={addVideo}
            title="Add video"
          >
            ▶️
          </Button>
        )}
      </div>
    </div>
  );
};

export default Toolbar;

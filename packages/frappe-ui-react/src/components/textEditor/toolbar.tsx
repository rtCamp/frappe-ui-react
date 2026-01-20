/**
 * External dependencies.
 */
import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { Popover } from "@base-ui/react";
import {
  Bold,
  Italic,
  List as ListIcon,
  ListOrdered,
  IndentDecrease,
  IndentIncrease,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
} from "lucide-react";

/**
 * Internal dependencies.
 */
import { Button } from "../button";
import { useEffect, useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(
    editor.getAttributes("textStyle").color || "#000000"
  );

  useEffect(() => {
    const updateColor = ({ editor }: { editor: Editor }) => {
      setCurrentColor(editor.getAttributes("textStyle").color || "#000000");
    };

    editor.on("transaction", updateColor);
    return () => {
      editor.off("transaction", updateColor);
    };
  }, [editor]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger className="relative">
        <button
          className="size-4 rounded border border-outline-gray-2 pt-1"
          style={{ backgroundColor: currentColor }}
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner sideOffset={8}>
          <Popover.Popup className="bg-white border border-input rounded-md p-2 shadow-lg">
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
                  onClick={() => {
                    editor.chain().focus().setColor(color).run();
                    setIsOpen(false);
                  }}
                  title={color}
                />
              ))}
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};

/**
 * Link component for text editor toolbar.
 */
const Link = ({ editor }: { editor: Editor }) => {
  const [isLinkActive, setIsLinkActive] = useState(
    editor.isActive("link") || false
  );

  useEffect(() => {
    const updateLink = ({ editor }: { editor: Editor }) => {
      setIsLinkActive(editor.isActive("link"));
    };

    editor.on("transaction", updateLink);
    return () => {
      editor.off("transaction", updateLink);
    };
  }, [editor]);

  const setLink = () => {
    const url = window.prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={editor.isActive("link") ? removeLink : setLink}
      className={isLinkActive ? "bg-surface-gray-4!" : ""}
      title={isLinkActive ? "Remove link" : "Add link"}
    >
      <LinkIcon />
    </Button>
  );
};

/**
 * Formatting component for text editor toolbar.
 */
const Format = ({ editor }: { editor: Editor }) => {
  const [isBoldActive, setIsBoldActive] = useState(
    editor.isActive("bold") || false
  );
  const [isItalicActive, setIsItalicActive] = useState(
    editor.isActive("italic") || false
  );

  useEffect(() => {
    const updateState = ({ editor }: { editor: Editor }) => {
      setIsBoldActive(editor.isActive("bold"));
      setIsItalicActive(editor.isActive("italic"));
    };
    editor.on("transaction", updateState);
    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={isBoldActive ? "bg-surface-gray-4!" : ""}
        title="Bold (Ctrl+B)"
      >
        <Bold className="size-5" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={isItalicActive ? "bg-surface-gray-4!" : ""}
        title="Italic (Ctrl+I)"
      >
        <Italic className="size-5" />
      </Button>
    </>
  );
};

/**
 * List options component for text editor toolbar.
 */
const List = ({ editor }: { editor: Editor }) => {
  const [isBulletListActive, setIsBulletListActive] = useState(
    editor.isActive("bold") || false
  );
  const [isOrderedListActive, setIsOrderedListActive] = useState(
    editor.isActive("italic") || false
  );

  useEffect(() => {
    const updateState = ({ editor }: { editor: Editor }) => {
      setIsBulletListActive(editor.isActive("bulletList"));
      setIsOrderedListActive(editor.isActive("orderedList"));
    };
    editor.on("transaction", updateState);
    return () => {
      editor.off("transaction", updateState);
    };
  }, [editor]);

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={isBulletListActive ? "bg-surface-gray-4!" : ""}
        title="Bullet list"
      >
        <ListOrdered />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={isOrderedListActive ? "bg-surface-gray-4!" : ""}
        title="Ordered list"
      >
        <ListIcon />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().liftListItem("listItem").run()}
        disabled={!editor.can().liftListItem("listItem")}
        title="Decrease indent"
      >
        <IndentDecrease />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
        disabled={!editor.can().sinkListItem("listItem")}
        title="Increase indent"
      >
        <IndentIncrease />
      </Button>
    </>
  );
};

/**
 * Toolbar component for the text editor.
 */
export const Toolbar = ({ editor }: ToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-1 items-center border-b border-input bg-background p-2">
      {/* Formatting section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-1">
        <Format editor={editor} />
      </div>

      {/* Color section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-1">
        <ColorPicker editor={editor} />
      </div>

      {/* Lists section */}
      <div className="flex gap-1 items-center border-r border-outline-gray-2">
        <List editor={editor} />
      </div>

      {/* Alignment section */}
      <div className="flex gap-1 items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "bg-surface-gray-4" : ""
          }
          title="Align left"
        >
          <AlignLeft />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "bg-surface-gray-4" : ""
          }
          title="Align center"
        >
          <AlignCenter />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "bg-surface-gray-4" : ""
          }
          title="Align right"
        >
          <AlignRight />
        </Button>
        {/* Link section */}
        <div className="flex gap-1 items-center border-r border-outline-gray-2 pr-2">
          <Link editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;

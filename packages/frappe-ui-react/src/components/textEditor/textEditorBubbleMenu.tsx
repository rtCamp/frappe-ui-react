/**
 * External dependencies.
 */
import { useMemo } from "react";
import { BubbleMenu } from "@tiptap/react/menus";

/**
 * Internal dependencies.
 */
import { createEditorButton } from "./utils";
import Menu from "./menu";
import {
  EditorButtonOption,
  EditorCommand,
  TextEditorBubbleMenuProps,
} from "./types";

const TextEditorBubbleMenu = ({
  editor,
  buttons,
  options = {},
}: TextEditorBubbleMenuProps) => {
  const bubbleMenuButtons = useMemo(() => {
    if (!buttons) return null;

    let buttonList: EditorButtonOption[];
    if (Array.isArray(buttons)) {
      buttonList = buttons;
    } else {
      buttonList = [
        "Paragraph",
        "Heading 2",
        "Heading 3",
        "Separator",
        "Bold",
        "Italic",
        "Strikethrough",
        "FontColor",
        "Link",
        "Separator",
        "Bullet List",
        "Numbered List",
        "Task List",
        "Separator",
        "Align Left",
        "Align Center",
        "Align Right",
        "Separator",
        "Image",
        "Video",
        "Blockquote",
        "Code",
        [
          "InsertTable",
          "AddColumnBefore",
          "AddColumnAfter",
          "DeleteColumn",
          "AddRowBefore",
          "AddRowAfter",
          "DeleteRow",
          "MergeCells",
          "SplitCell",
          "ToggleHeaderColumn",
          "ToggleHeaderRow",
          "ToggleHeaderCell",
          "DeleteTable",
        ],
      ];
    }
    return buttonList.map(createEditorButton) as (
      | EditorCommand
      | EditorCommand[]
    )[];
  }, [buttons]);

  if (!bubbleMenuButtons) {
    return null;
  }

  return (
    <BubbleMenu editor={editor} {...options}>
      <Menu
        editor={editor}
        className="bubble-menu rounded-md border-gray-100 shadow-lg"
        buttons={bubbleMenuButtons}
      />
    </BubbleMenu>
  );
};

export default TextEditorBubbleMenu;

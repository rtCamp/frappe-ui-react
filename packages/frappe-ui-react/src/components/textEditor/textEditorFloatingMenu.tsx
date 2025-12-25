/**
 * External dependencies.
 */
import { useMemo } from "react";
import { FloatingMenu } from "@tiptap/react/menus";

/**
 * Internal dependencies.
 */
import { createEditorButton } from "./utils";
import Menu from "./menu";
import {
  TextEditorFloatingMenuProps,
  EditorButtonOption,
  EditorCommand,
} from "./types";

const TextEditorFloatingMenu = ({
  editor,
  buttons,
}: TextEditorFloatingMenuProps) => {
  const floatingMenuButtons = useMemo(() => {
    if (!buttons) return null;

    const buttonList: EditorButtonOption[] = Array.isArray(buttons)
      ? buttons
      : [
          "Paragraph",
          "Heading 2",
          "Heading 3",
          "Bullet List",
          "Numbered List",
          "Task List",
          "Blockquote",
          "Code",
          "Horizontal Rule",
        ];

    return buttonList.map(createEditorButton) as (
      | EditorCommand
      | EditorCommand[]
    )[];
  }, [buttons]);

  if (!floatingMenuButtons) {
    return null;
  }

  return (
    <FloatingMenu editor={editor}>
      <Menu editor={editor} buttons={floatingMenuButtons} />
    </FloatingMenu>
  );
};

export default TextEditorFloatingMenu;

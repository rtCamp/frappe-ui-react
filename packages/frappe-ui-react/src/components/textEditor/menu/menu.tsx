/**
 * External dependencies.
 */

import { useCurrentEditor, useEditorState } from "@tiptap/react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import COMMANDS from "./commands";
import { Popover } from "../../popover";
import type { TYPE_COMMANDS_KEYS, EditorCommand } from "./commands/types";

export interface MenuProps {
  className?: string;
}

const DEFAULT_COMMANDS: Array<
  TYPE_COMMANDS_KEYS | "separator" | Array<TYPE_COMMANDS_KEYS>
> = [
  "paragraph",
  [
    "heading_1",
    "heading_2",
    "heading_3",
    "heading_4",
    "heading_5",
    "heading_6",
  ],
  "separator",
  "bold",
  "italic",
  "strike",
  "separator",
  "bullet_list",
  "numbered_list",
  "task_list",
  "separator",
  "align_left",
  "align_center",
  "align_right",
  "separator",
  "font_color",
];

const Menu = ({ className }: MenuProps) => {
  const { editor } = useCurrentEditor();
  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      selection: ctx?.editor?.state?.selection,
      focused: ctx?.editor?.state?.selection,
    }),
  });

  const isButtonActive = (button: EditorCommand): boolean => {
    if (editor && editorState && editorState.focused && button.isActive) {
      return button.isActive(editor);
    }
    return false;
  };

  if (!editor) {
    return null;
  }

  return (
    <div
      className={clsx(
        "flex bg-surface-white px-1 py-1 w-full overflow-x-auto rounded-t-lg border border-outline-gray-modals items-center",
        className
      )}
    >
      {DEFAULT_COMMANDS.map((command_key, index) => {
        if (Array.isArray(command_key)) {
          const activeCommand = editorState?.focused
            ? command_key.find((b) => COMMANDS[b].isActive(editor)) ||
              command_key[0]
            : command_key[0];

          const ActiveIcon = COMMANDS[activeCommand].icon;

          return (
            <div key={index} className="shrink-0">
              <Popover
                transition="default"
                target={({ togglePopover }) => (
                  <button
                    className="rounded px-2 py-1 text-base font-medium text-ink-gray-8 transition-colors hover:bg-surface-gray-2"
                    onClick={() => togglePopover()}
                  >
                    <ActiveIcon className="h-4 w-4" />
                  </button>
                )}
                body={({ close }) => (
                  <ul className="w-fit p-1.5 mt-2 rounded-lg bg-surface-modal shadow-2xl ring-1 ring-black/5 focus:outline-none">
                    {command_key.map((command_key, optionIndex) => {
                      const command = COMMANDS[command_key];
                      return (
                        <li key={optionIndex}>
                          <button
                            className="w-full h-7 rounded px-2 text-base flex items-center gap-2 hover:bg-surface-gray-3"
                            onClick={() => {
                              command.action(editor);
                              close();
                            }}
                            title={command.label}
                          >
                            <command.icon className="size-4 shrink-0 text-ink-gray-6" />
                            <span className="whitespace-nowrap text-ink-gray-7">
                              {command.label}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              />
            </div>
          );
        }
        if (command_key == "separator") {
          return (
            <div
              key={index}
              className="h-4 w-0.5 border-l border-outline-gray-1"
            ></div>
          );
        }

        const command: EditorCommand = COMMANDS[command_key];

        if (command.component) {
          return (
            <command.component>
              {({ isActive, onClick }) => (
                <button
                  className={clsx(
                    "flex rounded p-1 text-ink-gray-8 transition-colors",
                    isButtonActive(command) || isActive
                      ? "bg-surface-gray-3"
                      : "hover:bg-surface-gray-2"
                  )}
                  onClick={() => onClick?.()}
                  title={command.label}
                >
                  <command.icon className="h-4 w-4" />
                </button>
              )}
            </command.component>
          );
        }
        const label = command.label;
        const Icon = command.icon;
        return (
          <button
            key={index}
            className={clsx(
              "flex rounded text-ink-gray-8 transition-colors focus-within:ring-0 p-1 hover:bg-surface-gray-2",
              isButtonActive(command)
                ? "bg-surface-gray-3"
                : "hover:bg-surface-gray-2"
            )}
            onClick={() => command.action?.(editor)}
            title={label}
          >
            <Icon className="size-4" />
          </button>
        );
      })}
    </div>
  );
};

export default Menu;

import commands from "./commands";
import { EditorButtonOption, EditorCommand } from "./types";

export function createEditorButton(
  option: EditorButtonOption
): EditorCommand | EditorCommand[] {
  if (Array.isArray(option)) {
    return option.map(createEditorButton) as EditorCommand[];
  }
  if (typeof option === "object") {
    return option;
  }
  return commands[option];
}

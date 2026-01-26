/**
 * External dependencies.
 */
import type { Editor } from "@tiptap/react";

export interface TextEditorProps {
  // Props
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  bubbleMenu?: boolean;
  bubbleMenuOptions?: Record<string, unknown>;
  fixedMenu?: boolean;
  floatingMenu?: boolean;
  className?: string;
  // Events
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: Editor) => void;
}

/**
 * External dependencies.
 */
import type { Editor, Extension } from "@tiptap/react";
import type { StarterKitOptions } from "@tiptap/starter-kit";

export interface TextEditorProps {
  // Props
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  extensions?: Extension[];
  starterKitOptions?: Partial<StarterKitOptions>;
  fixedMenu?: boolean;
  // Events
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: Editor) => void;
}

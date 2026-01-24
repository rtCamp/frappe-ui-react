import type { Editor } from "@tiptap/react";

export interface TextEditorProps {
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  bubbleMenu?: boolean;
  bubbleMenuOptions?: Record<string, unknown>;
  fixedMenu?: boolean;
  floatingMenu?: boolean;
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: Editor) => void;
  className?: string;
}

export interface EditorCommand {
  label: string;
  text?: string;
  icon: React.ComponentType<{ className?: string }>;
  action?: (editor: Editor) => void;
  isActive: (editor: Editor) => boolean;
  component?: React.ComponentType<{
    children: (props: {
      isActive?: boolean;
      onClick?: () => void;
    }) => React.ReactNode;
  }>;
}

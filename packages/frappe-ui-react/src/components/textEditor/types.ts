import { Editor, Extensions } from "@tiptap/react";
import { type UploadedFile } from "../../utils/useFileUpload";
import { type MentionSuggestionItem } from "./extensions/mention/mention-extension";

export type { UploadedFile };

export interface CustomCommands {
  openLinkEditor: () => boolean;
  openImageViewer: (src: string) => boolean;
  setColorByName: (colorName: string) => boolean;
  setHighlightByName: (highlightName: string) => boolean;
}

export type TextEditorInstance = Editor & {
  commands: Editor['commands'] & CustomCommands;
};

export type ConfigureMentionOptions =
  | {
      mentions: MentionSuggestionItem[];
      component?: React.ComponentType<unknown>;
    }
  | MentionSuggestionItem[]
  | null;

export interface TextEditorProps {
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  bubbleMenu?: boolean | EditorButtonOption[];
  bubbleMenuOptions?: Record<string, unknown>;
  fixedMenu?: boolean | EditorButtonOption[];
  floatingMenu?: boolean | EditorButtonOption[];
  extensions?: Extensions;
  starterkitOptions?: Record<string, unknown>;
  mentions?: ConfigureMentionOptions;
  tags?: Array<{ id: string; label: string; value: string }>;
  uploadFunction?: (file: File) => Promise<UploadedFile>;
  uploadArgs?: Record<string, unknown>;
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: TextEditorInstance) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode | ((props: { editor: TextEditorInstance }) => React.ReactNode);
}

export interface TextEditorRef {
  editor: TextEditorInstance | null;
  rootRef: HTMLDivElement | null;
}

export interface EditorCommand {
  label: string;
  text?: string;
  icon?: React.ComponentType<{ className?: string }>;
  action?: (editor: TextEditorInstance) => void;
  isActive: (editor: TextEditorInstance) => boolean;
  isDisabled?: (editor: TextEditorInstance) => boolean;
  component?: React.ComponentType<{ 
    editor: TextEditorInstance;
    children: (props: { isActive?: boolean; onClick?: (button: EditorCommand) => void }) => React.ReactNode;
  }>;
  class?: string;
  type?: string;
}

export type EditorButtonOption =
  | string
  | EditorCommand
  | EditorButtonOption[];

export interface TextEditorBubbleMenuProps {
  editor: TextEditorInstance;
  buttons?: boolean | EditorButtonOption[];
  options?: Record<string, unknown>;
}

export interface TextEditorFixedMenuProps {
  editor: TextEditorInstance;
  buttons?: boolean | EditorButtonOption[];
  className?: string;
}

export interface TextEditorFloatingMenuProps {
  editor: TextEditorInstance;
  buttons?: boolean | EditorButtonOption[];
}

export interface MenuProps {
  editor: TextEditorInstance;
  buttons: (EditorCommand | EditorCommand[])[];
  className?: string;
}
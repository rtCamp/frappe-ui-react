/**
 * External dependencies.
 */
import { Editor, type Extension } from "@tiptap/react";
import type { StarterKitOptions } from "@tiptap/starter-kit";

export interface UploadedFile {
  file_name: string;
  file_size: number;
  file_url: string;
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  is_private?: 0 | 1;
  file_type?: string;
  folder?: string;
  is_folder?: 0 | 1;
  content_hash?: string;
}

export interface TextEditorProps {
  // Props
  content?: string | null;
  placeholder?: string | (() => string);
  editorClass?: string | string[] | Record<string, boolean>;
  editable?: boolean;
  autofocus?: boolean;
  extensions?: Extension[];
  starterkitOptions?: Partial<StarterKitOptions>;
  fixedMenu?: boolean;
  // Events
  onChange?: (content: string) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onTransaction?: (editor: Editor) => void;
  // Slots
  Top?: React.FC;
  Editor?: React.FC<{ editor: Editor }>;
  Bottom?: React.FC;
  // handlers
  uploadFunction?: (file: File) => Promise<UploadedFile>;
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

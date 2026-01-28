/**
 * External dependencies.
 */
import { Editor, type Extension } from "@tiptap/react";
import type { StarterKitOptions } from "@tiptap/starter-kit";
import type { FC } from "react";

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
  Top?: FC;
  Editor?: FC<{ editor: Editor }>;
  Bottom?: FC;
  // handlers
  uploadFunction?: (file: File) => Promise<UploadedFile>;
}

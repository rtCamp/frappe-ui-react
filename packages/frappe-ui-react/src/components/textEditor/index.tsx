export interface TextEditorProps {
  allowImageUpload?: boolean;
  allowVideoUpload?: boolean;
  className?: string;
  hideToolbar?: boolean;
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

/* eslint-disable @typescript-eslint/no-unused-vars */
const TextEditor = (_props: TextEditorProps) => {
    return (
        <div></div>
    );
}

export default TextEditor;
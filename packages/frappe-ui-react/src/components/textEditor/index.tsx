/**
 * External dependencies.
 */
import { useEffect, useState } from "react";
import ReactQuill, {
  Quill,
  type DeltaStatic,
  type EmitterSource,
} from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "quill-paste-smart";

/**
 * Internal dependencies.
 */
import { preProcessLink } from "./utils";
export interface TextEditorProps extends ReactQuill.ReactQuillProps {
  allowImageUpload?: boolean;
  allowVideoUpload?: boolean;
  className?: string;
  hideToolbar?: boolean;
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
}

Quill.register("modules/imageResize", ImageResize);

const TextEditor = ({
  allowImageUpload = false,
  allowVideoUpload = false,
  className,
  onChange,
  hideToolbar = false,
  ...props
}: TextEditorProps) => {
  const [editorValue, setEditorValue] = useState(props.value || "");

  useEffect(() => {
    if (props?.value) {
      setEditorValue(props.value);
    }
  }, [props?.value]);

  const toolbarOptions = [
    ["bold", "italic"],
    [{ color: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link"],
  ];

  if (allowImageUpload) {
    toolbarOptions.push(["image"]);
  }

  if (allowVideoUpload) {
    toolbarOptions.push(["video"]);
  }

  const modules = {
    toolbar: hideToolbar ? false : toolbarOptions,
  };

  if (allowImageUpload) {
    // @ts-expect-error expected
    modules.imageResize = {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    };
  }

  const formatHtml = (html: string) => {
    return preProcessLink(html);
  };

  const handleChange = (
    value: string,
    _: DeltaStatic,
    __: EmitterSource,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    const formattedValue = formatHtml(value);
    setEditorValue(formattedValue);
    if (editor.getText()?.trim()) {
      onChange(formattedValue);
    } else {
      onChange("");
    }
  };

  return (
    <>
      <ReactQuill
        {...props}
        style={{ resize: "vertical", overflow: "auto" }}
        className={`
          border rounded-md border-input [&>div:first-child]:border-t-0 [&>div:first-child]:border-r-0 [&>div:first-child]:border-l-0 [&>div:first-child]:border-input [&>div:first-child]:border-bottom [&>div:last-child]:border-none text-foreground bg-background whitespace-normal
          ${
            hideToolbar &&
            "border-none !resize-none [&_.ql-editor]:min-h-0 [&_.ql-editor]:p-2"
          }
          ${!hideToolbar && "break-all"}
          ${className}
        `}
        theme="snow"
        modules={modules}
        onChange={handleChange}
        value={editorValue}
      />
    </>
  );
};

export default TextEditor;

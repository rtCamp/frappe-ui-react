/**
 * External dependencies.
 */
import { useMemo } from "react";
import ReactQuill, { Quill, type QuillOptionsStatic } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import ImageResize from "quill-image-resize-module-react";
import "quill-paste-smart";

/**
 * Internal dependencies.
 */
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
  value,
  ...props
}: TextEditorProps) => {
  const modules = useMemo<QuillOptionsStatic["modules"]>(() => {
    const modules: QuillOptionsStatic["modules"] = {};

    if (allowImageUpload) {
      modules.imageResize = {
        modules: ["Resize", "DisplaySize", "Toolbar"],
      };
    }

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

    if (!hideToolbar) {
      modules.toolbar = toolbarOptions;
    }

    return modules;
  }, [allowImageUpload, hideToolbar, allowVideoUpload]);

  return (
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
      onChange={onChange}
      value={value}
    />
  );
};

export default TextEditor;

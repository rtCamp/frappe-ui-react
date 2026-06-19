/**
 * External dependencies.
 */
import { generateJSON } from "@tiptap/react";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import DOMPurify from "dompurify";
import { useMemo } from "react";

/**
 * Internal dependencies.
 */
import "./textEditor.css";
import type { StaticTextEditorProps } from "./types";
import { cn } from "../../utils";
import {
  DEFAULT_EDITOR_CLASS,
  EMPTY_EXTENSIONS,
  EMPTY_STARTERKIT_OPTIONS,
  getTextEditorExtensions,
} from "./editorConfig";
import { renderStaticCodeBlock } from "./extension/staticCodeBlock";

const StaticTextEditor = ({
  content = "",
  editorClass = "",
  extensions = EMPTY_EXTENSIONS,
  starterkitOptions = EMPTY_STARTERKIT_OPTIONS,
  placeholder = "",
}: StaticTextEditorProps) => {
  const editorExtensions = useMemo(
    () =>
      getTextEditorExtensions({ extensions, starterkitOptions, placeholder }),
    [extensions, starterkitOptions, placeholder]
  );

  const staticContent = useMemo(
    () =>
      renderToReactElement({
        content: generateJSON(
          DOMPurify.sanitize(content ?? ""),
          editorExtensions
        ),
        extensions: editorExtensions,
        options: {
          nodeMapping: {
            codeBlock: renderStaticCodeBlock,
          },
        },
      }),
    [content, editorExtensions]
  );

  return (
    <div className={cn(DEFAULT_EDITOR_CLASS, editorClass)}>{staticContent}</div>
  );
};

export default StaticTextEditor;

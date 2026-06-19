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

const StaticTextEditor = ({
  html = "",
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

  const content = useMemo(
    () =>
      renderToReactElement({
        content: generateJSON(DOMPurify.sanitize(html), editorExtensions),
        extensions: editorExtensions,
      }),
    [html, editorExtensions]
  );

  return <div className={cn(DEFAULT_EDITOR_CLASS, editorClass)}>{content}</div>;
};

export default StaticTextEditor;

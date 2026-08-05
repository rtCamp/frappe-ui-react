/**
 * External dependencies.
 */
import { generateJSON, getSchema } from "@tiptap/react";
import { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import DOMPurify from "dompurify";
import { useCallback, useMemo } from "react";

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
      getTextEditorExtensions({
        extensions,
        starterkitOptions,
        placeholder,
        staticRender: true,
      }),
    [extensions, starterkitOptions, placeholder]
  );

  /**
   * Handle copy event to copy both plain text and HTML content.
   *
   * Remove extra line breaks and spaces from the plain text copied content.
   */
  const handleCopy = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const container = document.createElement("div");
      container.appendChild(selection.getRangeAt(0).cloneContents());
      const html = container.innerHTML;
      const doc = ProseMirrorNode.fromJSON(
        getSchema(editorExtensions),
        generateJSON(html, editorExtensions)
      );

      event.clipboardData.setData(
        "text/plain",
        doc.textBetween(0, doc.content.size, "\n")
      );
      event.clipboardData.setData("text/html", html);
      event.preventDefault();
    },
    [editorExtensions]
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
    <div className={cn(DEFAULT_EDITOR_CLASS, editorClass)} onCopy={handleCopy}>
      {staticContent}
    </div>
  );
};

export default StaticTextEditor;

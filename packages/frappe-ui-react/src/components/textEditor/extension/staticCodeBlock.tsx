/**
 * External dependencies.
 */
import { createElement, type ReactNode } from "react";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

/**
 * Internal dependencies.
 */
import { lowlight } from "./codeBlock";

type HastNode = ReturnType<typeof lowlight.highlight>["children"][number];

/**
 * Converts a lowlight HAST node to a React node.
 */
const hastToReactNode = (node: HastNode, key: number): ReactNode => {
  if (node.type === "text") {
    return node.value;
  }

  if (node.type === "element") {
    const className = node.properties?.className;

    return createElement(
      node.tagName,
      {
        key,
        className: Array.isArray(className)
          ? className.join(" ")
          : typeof className === "string"
            ? className
            : undefined,
      },
      node.children.map((child, index) => hastToReactNode(child, index))
    );
  }

  return null;
};

/**
 * Renders a static code block as a React node using lowlight for syntax highlighting.
 */
export const renderStaticCodeBlock = ({
  node,
}: {
  node: ProseMirrorNode;
}): ReactNode => {
  const language = (node.attrs.language as string | null) ?? "";
  const code = node.textContent;

  const tree =
    language && lowlight.registered(language)
      ? lowlight.highlight(language, code)
      : lowlight.highlightAuto(code);

  return (
    <pre>
      <code className={language ? `language-${language}` : undefined}>
        {tree.children.map((child, index) => hastToReactNode(child, index))}
      </code>
    </pre>
  );
};

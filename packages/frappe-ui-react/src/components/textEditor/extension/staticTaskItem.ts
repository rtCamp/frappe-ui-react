/**
 * External dependencies.
 */
import { mergeAttributes } from "@tiptap/react";
import { TaskItem } from "@tiptap/extension-list";
import type { DOMOutputSpec } from "@tiptap/pm/model";

const STATIC_CHECKBOX_CLASS = "static-checkbox";

/**
 * Merges props into the matching elements of a DOMOutputSpec, leaving the rest
 * of the spec produced by the parent extension untouched.
 */
const withProps = (
  spec: unknown,
  propsByTag: Record<string, Record<string, unknown>>
): unknown => {
  if (!Array.isArray(spec)) {
    return spec;
  }

  const [tag, ...rest] = spec as [string, ...unknown[]];
  const children = rest.map((part) => withProps(part, propsByTag));
  const props = propsByTag[tag];

  if (!props) {
    return [tag, ...children];
  }

  const [attrs, ...tail] = children;
  const isAttrsObject =
    typeof attrs === "object" && attrs !== null && !Array.isArray(attrs);

  return isAttrsObject
    ? [tag, mergeAttributes(attrs as Record<string, unknown>, props), ...tail]
    : [tag, props, ...children];
};

/**
 * Extends the TaskItem extension to render a static checkbox for the task item, rather than an interactive one.
 * This is used for static rendering of task items in the text editor, where the checkboxes should not be interactive.
 */
export const StaticTaskItem = TaskItem.extend({
  renderHTML(props) {
    const spec = this.parent?.(props);

    if (!spec) {
      throw new Error("[taskItem]: parent renderHTML is missing");
    }

    return withProps(spec, {
      label: { class: STATIC_CHECKBOX_CLASS },
      input: {
        checked: Boolean(props.node.attrs.checked),
        readOnly: true,
        tabIndex: -1,
      },
    }) as DOMOutputSpec;
  },
});

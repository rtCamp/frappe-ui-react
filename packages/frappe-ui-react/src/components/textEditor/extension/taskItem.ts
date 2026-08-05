/**
 * External dependencies.
 */
import { mergeAttributes, type NodeViewRenderer } from "@tiptap/react";
import { TaskItem, type TaskItemOptions } from "@tiptap/extension-list";
import type { DOMOutputSpec } from "@tiptap/pm/model";

export interface ExtendedTaskItemOptions extends TaskItemOptions {
  /** Renders an inert checkbox, for renderers without a node view. */
  staticCheckbox?: boolean;
  /** Applies checkbox clicks while the editor is not editable. */
  toggleWhenReadOnly?: boolean;
}

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
export const ExtendedTaskItem = TaskItem.extend<ExtendedTaskItemOptions>({
  renderHTML(props) {
    const spec = this.parent?.(props);

    if (!spec) {
      throw new Error("[taskItem]: parent renderHTML is missing");
    }

    if (!this.options.staticCheckbox) {
      return spec;
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

  /**
   * Extends the default node view to allow toggling the checkbox while the editor is not editable.
   */
  addNodeView() {
    const renderNodeView = this.parent?.() as NodeViewRenderer | undefined;

    if (!renderNodeView || !this.options.toggleWhenReadOnly) {
      return renderNodeView as NodeViewRenderer;
    }

    return (props) => {
      const nodeView = renderNodeView(props);
      const { editor, getPos } = props;

      (nodeView.dom as HTMLElement)
        .querySelector('input[type="checkbox"]')
        ?.addEventListener("change", () => {
          if (editor.isEditable) return;

          const position = getPos();
          if (typeof position !== "number") return;

          const node = editor.state.doc.nodeAt(position);
          if (!node) return;

          editor.view.dispatch(
            editor.state.tr.setNodeMarkup(position, undefined, {
              ...node.attrs,
              checked: !node.attrs.checked,
            })
          );
        });

      return nodeView;
    };
  },
});

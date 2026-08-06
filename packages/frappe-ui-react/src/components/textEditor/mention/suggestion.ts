/**
 * External dependencies.
 */
import { ReactRenderer } from "@tiptap/react";
import { computePosition, flip, offset, shift } from "@floating-ui/react";
import type {
  MentionNodeAttrs,
  MentionOptions,
} from "@tiptap/extension-mention";
import type { SuggestionProps } from "@tiptap/suggestion";

/**
 * Internal dependencies.
 */
import MentionList, {
  type MentionListHandle,
  type MentionListProps,
} from "./mentionList";
import type {
  MentionItem,
  MentionItemRenderer,
  TextEditorProps,
} from "../types";

type MentionSuggestion = MentionOptions<
  MentionItem,
  MentionNodeAttrs
>["suggestion"];

const updatePosition = (
  element: HTMLElement,
  clientRect: SuggestionProps["clientRect"]
) => {
  if (!clientRect) return;

  const virtualElement = {
    getBoundingClientRect: () => clientRect() ?? new DOMRect(),
  };

  computePosition(virtualElement, element, {
    placement: "bottom-start",
    strategy: "absolute",
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  }).then(({ x, y, strategy }) => {
    Object.assign(element.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`,
    });
  });
};

export const createMentionSuggestion = (
  mentions: NonNullable<TextEditorProps["mentions"]>,
  ItemRenderer?: MentionItemRenderer
): MentionSuggestion => ({
  items: ({ query }) => mentions(query),
  render: () => {
    let component: ReactRenderer<MentionListHandle, MentionListProps>;

    return {
      onStart: (props) => {
        component = new ReactRenderer(MentionList, {
          props: { ...props, ItemRenderer },
          editor: props.editor,
        });

        if (!props.clientRect) return;

        const element = component.element as HTMLElement;
        element.style.position = "absolute";
        element.style.zIndex = "100";
        document.body.appendChild(element);
        updatePosition(element, props.clientRect);
      },
      onUpdate: (props) => {
        component.updateProps(props);
        updatePosition(component.element as HTMLElement, props.clientRect);
      },
      onKeyDown: (props) => {
        if (props.event.key === "Escape") {
          component.destroy();
          return true;
        }
        return component.ref?.onKeyDown(props) ?? false;
      },
      onExit: () => {
        component.element.remove();
        component.destroy();
      },
    };
  },
});

import type { EmojiItem } from "@tiptap/extension-emoji";
import type { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { computePosition } from "@floating-ui/dom";
import { ReactRenderer } from "@tiptap/react";
import { EmojiList } from "./emojiList";

type EmojiStorage = {
  emojis: EmojiItem[];
};

const EmojiSuggestions: Omit<SuggestionOptions, "editor"> = {
  items: ({ editor, query }) => {
    const storage = editor.storage.emoji as EmojiStorage;

    return storage.emojis
      .filter(({ shortcodes, tags }) => {
        const lowerQuery = query.toLowerCase();

        return (
          shortcodes.some((shortcode) => shortcode.startsWith(lowerQuery)) ||
          tags.some((tag) => tag.startsWith(lowerQuery))
        );
      })
      .slice(0, 5);
  },

  allowSpaces: false,

  render: () => {
    let component: ReactRenderer<unknown, SuggestionProps> | null = null;

    const repositionComponent = (clientRect: DOMRect | null) => {
      if (!clientRect || !component) {
        return;
      }

      const virtualElement = {
        getBoundingClientRect() {
          return clientRect;
        },
      };

      computePosition(virtualElement, component.element, {
        placement: "bottom-start",
      }).then((pos) => {
        if (!component) {
          return;
        }

        Object.assign(component.element.style, {
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          position: pos.strategy === "fixed" ? "fixed" : "absolute",
        });
      });
    };

    return {
      onStart: (props) => {
        component = new ReactRenderer(EmojiList, {
          props,
          editor: props.editor,
        });

        document.body.appendChild(component.element);
        if (props.clientRect) {
          repositionComponent(props.clientRect());
        }
      },

      onUpdate(props) {
        if (!component) {
          return;
        }

        component.updateProps(props);
        repositionComponent(props.clientRect?.() ?? null);
      },

      onKeyDown(props) {
        if (!component) {
          return;
        }

        if (props.event.key === "Escape" && component) {
          if (document.body.contains(component.element)) {
            document.body.removeChild(component.element);
          }
          component.destroy();
          return true;
        }
        if (!component.ref) {
          return;
        }

        return component.ref.onKeyDown(props) ?? false;
      },

      onExit() {
        if (component) {
          if (document.body.contains(component.element)) {
            document.body.removeChild(component.element);
          }
          component.destroy();
          component = null;
        }
      },
    };
  },
};

export default EmojiSuggestions;

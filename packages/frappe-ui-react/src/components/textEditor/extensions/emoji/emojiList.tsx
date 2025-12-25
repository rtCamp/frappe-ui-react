/**
 * External dependencies.
 */
import { forwardRef, useRef, useImperativeHandle } from "react";

/**
 * Internal dependencies.
 */
import { SuggestionList } from "../suggestion/suggestionList";
import type { BaseSuggestionItem } from "../suggestion/createSuggestionExtension";
import type { Editor, Range } from "@tiptap/core";
import type { EmojiItem } from "./emoji-extension";

interface EmojiListProps {
  items: EmojiItem[];
  editor: Editor;
  range: Range;
  command: (item: EmojiItem) => void;
}

export const EmojiList = forwardRef<any, EmojiListProps>(
  ({ items, command }, ref) => {
    const suggestionListRef = useRef<any>(null);

    const onItemSelect = (item: EmojiItem) => {
      if (item) {
        command(item);
      }
    };

    const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
      return suggestionListRef.current?.onKeyDown({ event }) ?? false;
    };

    useImperativeHandle(ref, () => ({
      onKeyDown,
    }));

    return (
      <SuggestionList
        ref={suggestionListRef}
        items={items}
        command={(item) => onItemSelect(item as EmojiItem)}
        itemClass="py-2"
      >
        {(item: BaseSuggestionItem) => {
          const emojiItem = item as EmojiItem;
          return (
            <>
              <span className="mr-2">{emojiItem.emoji}</span>
              <span>{emojiItem.name}</span>
            </>
          );
        }}
      </SuggestionList>
    );
  }
);

EmojiList.displayName = "EmojiList";

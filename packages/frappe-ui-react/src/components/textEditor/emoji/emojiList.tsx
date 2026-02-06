/**
 * External dependencies.
 */
import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";
import clsx from "clsx";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

export type EmojiListRef = {
  onKeyDown: (props: SuggestionKeyDownProps) => boolean;
};

export const EmojiList = forwardRef<EmojiListRef, SuggestionProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = useCallback(
      (index: number) => {
        const item = items[index];

        if (item) {
          command({ name: item.name });
        }
      },
      [items, command]
    );

    useImperativeHandle(ref, () => {
      const upHandler = () => {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
      };

      const downHandler = () => {
        setSelectedIndex((selectedIndex + 1) % items.length);
      };

      const enterHandler = () => {
        selectItem(selectedIndex);
      };

      return {
        onKeyDown: (x: SuggestionKeyDownProps) => {
          if (x.event.key === "ArrowUp") {
            upHandler();
            return true;
          }

          if (x.event.key === "ArrowDown") {
            downHandler();
            return true;
          }

          if (x.event.key === "Enter") {
            enterHandler();
            return true;
          }

          return false;
        },
      };
    }, [items, selectedIndex, selectItem]);

    return (
      <div
        role="listbox"
        className="relative max-h-[300px] min-w-40 overflow-y-auto rounded-lg bg-surface-white p-1 text-base shadow-lg"
      >
        {items.map((item, index) => (
          <button
            type="button"
            key={index}
            className={clsx(
              "flex w-full items-center whitespace-nowrap rounded-md px-2 py-1.5 text-sm text-ink-gray-9 gap-1",
              index === selectedIndex && "bg-surface-gray-2"
            )}
            onClick={() => selectItem(index)}
            onMouseOver={() => setSelectedIndex(index)}
          >
            <span>{item.emoji}</span>
            <span>{item.display || item.title || item.name}</span>
          </button>
        ))}
      </div>
    );
  }
);

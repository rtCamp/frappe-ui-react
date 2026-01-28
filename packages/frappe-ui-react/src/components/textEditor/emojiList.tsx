import type {
  SuggestionKeyDownProps,
  SuggestionProps,
} from "@tiptap/suggestion";
import clsx from "clsx";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";

export const EmojiList = forwardRef((props: SuggestionProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = useCallback(
    (index: number) => {
      const item = props.items[index];

      if (item) {
        props.command({ name: item.name });
      }
    },
    [props]
  );

  useImperativeHandle(ref, () => {
    const upHandler = () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      );
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length);
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
  }, [props, selectedIndex, selectItem]);

  return (
    <div className="relative max-h-[300px] min-w-40 overflow-y-auto rounded-lg bg-surface-white p-1 text-base shadow-lg">
      {props.items.map((item, index) => (
        <button
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
});

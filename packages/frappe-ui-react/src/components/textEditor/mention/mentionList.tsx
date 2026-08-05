/**
 * External dependencies.
 */
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

/**
 * Internal dependencies.
 */
import { cn } from "../../../utils";
import type { MentionItem } from "../types";

export interface MentionListProps {
  items: MentionItem[];
  command: (item: MentionItem) => void;
}

export interface MentionListHandle {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

const MentionList = forwardRef<MentionListHandle, MentionListProps>(function MentionList({ items, command }, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  const selectItem = (index: number) => {
    const item = items[index];
    if (item) {
      command(item);
    }
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        setSelectedIndex((selectedIndex + items.length - 1) % items.length);
        return true;
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((selectedIndex + 1) % items.length);
        return true;
      }

      if (event.key === "Enter") {
        selectItem(selectedIndex);
        return true;
      }

      return false;
    },
  }));

  if (!items.length) {
    return null;
  }

  return (
    <div className="min-w-40 max-h-60 overflow-y-auto rounded-lg bg-surface-modal p-1.5 shadow-2xl border border-outline-gray-1">
      {items.map((item, index) => (
        <button
          key={item.id}
          type="button"
          className={cn(
            "flex h-7 w-full items-center rounded px-2 text-base text-ink-gray-7 focus:outline-none",
            index === selectedIndex && "bg-surface-gray-3"
          )}
          onMouseEnter={() => setSelectedIndex(index)}
          onClick={() => selectItem(index)}
        >
          <span className="whitespace-nowrap truncate">{item.label}</span>
        </button>
      ))}
    </div>
  );
});

export default MentionList;

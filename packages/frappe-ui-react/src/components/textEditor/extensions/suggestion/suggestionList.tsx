/**
 * External dependencies.
 */
import {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import clsx from "clsx";

/**
 * Internal dependencies.
 */
import type { BaseSuggestionItem } from "./createSuggestionExtension";

export interface SuggestionListProps {
  items: BaseSuggestionItem[];
  command: (item: BaseSuggestionItem) => void;
  containerClass?: string;
  itemClass?: string;
  showNoResults?: boolean;
  children?: (item: BaseSuggestionItem, index: number) => React.ReactNode;
}

export interface SuggestionListRef {
  onKeyDown: (params: { event: KeyboardEvent }) => boolean;
}

export const SuggestionList = forwardRef<
  SuggestionListRef,
  SuggestionListProps
>(
  (
    {
      items,
      command,
      containerClass = "",
      itemClass = "",
      showNoResults = false,
      children,
    },
    ref
  ) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
      setSelectedIndex(0);
    }, [items]);

    useEffect(() => {
      const selectedElement = itemRefs.current[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest" });
      }
    }, [selectedIndex]);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    };

    const upHandler = () => {
      setSelectedIndex((selectedIndex + items.length - 1) % items.length);
    };

    const downHandler = () => {
      setSelectedIndex((selectedIndex + 1) % items.length);
    };

    const enterHandler = () => {
      selectItem(selectedIndex);
    };

    const onKeyDown = ({ event }: { event: KeyboardEvent }) => {
      if (!items.length) return false;

      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }
      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }
      if (event.key === "Enter") {
        enterHandler();
        return true;
      }
      return false;
    };

    useImperativeHandle(ref, () => ({
      onKeyDown,
    }));

    if (!items.length) {
      return null;
    }

    return (
      <div
        ref={containerRef}
        className={clsx(
          "relative max-h-[300px] min-w-40 overflow-y-auto rounded-lg bg-surface-white p-1 text-base shadow-lg",
          containerClass
        )}
      >
        {items.map((item, index) => (
          <button
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={clsx(
              "flex w-full items-center whitespace-nowrap rounded-md px-2 py-1.5 text-sm text-ink-gray-9",
              index === selectedIndex && "bg-surface-gray-2",
              itemClass
            )}
            onClick={() => selectItem(index)}
            onMouseOver={() => setSelectedIndex(index)}
          >
            {children ? (
              children(item, index)
            ) : (
              <span>{item.display || item.title || item.name}</span>
            )}
          </button>
        ))}
        {!items.length && showNoResults && (
          <div className="px-3 py-1.5 text-sm text-ink-gray-5">No results</div>
        )}
      </div>
    );
  }
);

SuggestionList.displayName = "SuggestionList";

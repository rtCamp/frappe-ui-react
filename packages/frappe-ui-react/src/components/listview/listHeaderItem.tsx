import React, {
  useContext,
  useRef,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";

import { ListContext } from "./listContext";
import { alignmentMap } from "./utils";
import { cn, debounce } from "../../utils";

interface ListHeaderItemProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "prefix"> {
  item: any;
  debounce?: number;
  onColumnWidthUpdated?: (width: number) => void;
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
  lastItem?: boolean;
}

const ListHeaderItem: React.FC<ListHeaderItemProps> = ({
  item,
  lastItem = false,
  debounce: debounceTime = 300,
  onColumnWidthUpdated,
  children,
  prefix,
  suffix,
  ...attrs
}) => {
  const { options: list } = useContext(ListContext);

  if (!list) {
    throw new Error("ListHeaderItem must be used within a ListProvider");
  }

  const columnRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const updateWidth = debounce((width: number) => {
    if (!onColumnWidthUpdated) {
      return;
    }

    onColumnWidthUpdated(width);
  }, debounceTime);

  const getWidthInPx = useCallback(() => {
    if (typeof item.width === "string") {
      const parsedWidth = parseInt(item.width, 10);

      if (item.width.includes("rem")) {
        return parsedWidth * 16;
      } else if (item.width.includes("px")) {
        return parsedWidth;
      }
    }
    return columnRef.current?.offsetWidth || 0;
  }, [item.width]);

  const startResizing = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      const initialX = e.clientX;
      const initialWidth = getWidthInPx();

      const onMouseMove = (e: MouseEvent) => {
        const newWidth = initialWidth + (e.clientX - initialX);
        const newWidthPx = Math.max(50, newWidth);

        if (columnRef.current) {
          columnRef.current.style.width = `${newWidthPx}px`;
        }

        updateWidth(newWidthPx);
      };

      const onMouseUp = () => {
        setIsResizing(false);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [getWidthInPx, updateWidth]
  );

  const headerContent = useMemo(() => {
    const defaultContent = <div className="truncate">{item.label}</div>;

    return children || defaultContent;
  }, [item.label, children]);

  const rootClasses = useMemo(() => {
    return cn(
      "group relative flex min-w-0 items-center",
      item.align
        ? alignmentMap[item.align as keyof typeof alignmentMap]
        : "justify-between"
    );
  }, [item.align]);

  return (
    <div {...attrs} ref={columnRef} className={rootClasses}>
      <div
        className={cn(
          "flex min-w-0 items-center space-x-2 text-sm text-ink-gray-5",
          isResizing && "cursor-col-resize"
        )}
      >
        {prefix}
        {headerContent}
        {suffix}
      </div>
      {list.options.resizeColumn && !lastItem && (
        <div
          className={cn(
            "flex h-4 absolute right-0 w-0.5 cursor-col-resize justify-center bg-outline-gray-3 hover:bg-outline-gray-5",
            isResizing && "bg-outline-gray-5"
          )}
          onMouseDown={startResizing}
        >
          <div
            className={cn(
              "h-full w-0.5 rounded-full transition-all duration-300 ease-in-out group-hover:bg-gray-400",
              isResizing && "bg-gray-400"
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ListHeaderItem;

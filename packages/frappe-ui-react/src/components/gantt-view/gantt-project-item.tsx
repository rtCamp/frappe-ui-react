import { Folder } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { cn } from "../../utils";
import { Badge } from "../badge";
import type { GanttProjectData } from "./types";

export interface GanttProjectItemProps extends GanttProjectData {
  onResizeStart?: (e: MouseEvent) => void;
  onResizeHandleEnter?: () => void;
  onResizeHandleLeave?: () => void;
  highlightResizeHandle?: boolean;
  style?: CSSProperties;
}

export function GanttProjectItem({
  name,
  dateRange,
  client,
  badge,
  onResizeStart,
  onResizeHandleEnter,
  onResizeHandleLeave,
  highlightResizeHandle,
  style,
}: GanttProjectItemProps) {
  const subtext = [dateRange, client].filter(Boolean).join(" · ");
  return (
    <th
      className="sticky left-0 z-10 bg-surface-white border-b border-r border-outline-gray-2 pl-8 pr-3 font-normal text-left align-middle flex items-center gap-2 w-full overflow-hidden"
      style={style}
    >
      <Folder size={16} />

      <div className="flex flex-col flex-1 min-w-0 leading-tight">
        <span className="text-sm font-medium text-ink-gray-8 truncate">
          {name}
        </span>
        {subtext && (
          <span className="text-xs text-ink-gray-6 truncate">{subtext}</span>
        )}
      </div>

      {badge && <Badge label={badge} size="sm" variant="subtle" theme="gray" />}
      {onResizeStart && (
        <div
          className={cn("absolute top-0 right-0 h-full w-1 cursor-col-resize", {
            "bg-outline-gray-3": highlightResizeHandle,
          })}
          onMouseDown={onResizeStart}
          onMouseEnter={onResizeHandleEnter}
          onMouseLeave={onResizeHandleLeave}
        />
      )}
    </th>
  );
}

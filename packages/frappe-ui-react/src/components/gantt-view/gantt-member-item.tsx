import { ChevronRight } from "lucide-react";
import type { CSSProperties, MouseEvent } from "react";
import { cn } from "../../utils";
import { Avatar } from "../avatar";
import { Badge } from "../badge";
import type { Member } from "./types";

export interface GanttMemberItemProps extends Member {
  expanded: boolean;
  hasProjects: boolean;
  onToggle: () => void;
  onResizeStart?: (e: MouseEvent) => void;
  onResizeHandleEnter?: () => void;
  onResizeHandleLeave?: () => void;
  highlightResizeHandle?: boolean;
  style?: CSSProperties;
}

export function GanttMemberItem({
  name,
  role,
  image,
  badge,
  expanded,
  hasProjects,
  onToggle,
  onResizeStart,
  onResizeHandleEnter,
  onResizeHandleLeave,
  highlightResizeHandle,
  style,
}: GanttMemberItemProps) {
  return (
    <th
      className="sticky left-0 z-10 bg-surface-white border-b border-r border-outline-gray-2 px-3 font-normal text-left align-middle flex items-center gap-1 w-full overflow-hidden"
      style={style}
    >
      <button
        onClick={onToggle}
        className={cn(
          "shrink-0 text-ink-gray-4 transition-transform duration-150",
          { "opacity-0 pointer-events-none": !hasProjects },
          { "rotate-90": expanded }
        )}
        aria-label={expanded ? "Collapse" : "Expand"}
      >
        <ChevronRight size={16} />
      </button>

      <div className="flex items-center gap-2 flex-1 min-w-0 overflow-hidden">
        <Avatar size="xs" shape="circle" image={image} label={name} />

        <div className="flex flex-col flex-1 min-w-0 leading-tight">
          <span className="text-sm font-medium text-ink-gray-8 truncate">
            {name}
          </span>
          {role && (
            <span className="text-xs text-ink-gray-6 truncate">{role}</span>
          )}
        </div>
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

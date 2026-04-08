import { ChevronRight } from "lucide-react";
import { cn } from "../../utils";
import { Avatar } from "../avatar";
import { Badge } from "../badge";
import type { GanttRowData } from "./gantt-grid";

export interface GanttMemberItemProps extends GanttRowData {
  expanded: boolean;
  hasProjects: boolean;
  onToggle: () => void;
}

export function GanttMemberItem({
  name,
  role,
  image,
  badge,
  expanded,
  hasProjects,
  onToggle,
}: GanttMemberItemProps) {
  return (
    <div className="flex items-center gap-1 w-full overflow-hidden">
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
    </div>
  );
}

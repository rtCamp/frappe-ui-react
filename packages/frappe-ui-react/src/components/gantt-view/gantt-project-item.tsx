import { Folder } from "lucide-react";
import { Badge } from "../badge";
import type { GanttProjectData } from "./types";

export function GanttProjectItem({
  name,
  dateRange,
  client,
  badge,
}: GanttProjectData) {
  const subtext = [dateRange, client].filter(Boolean).join(" · ");
  return (
    <div className="flex items-center gap-2 w-full overflow-hidden">
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
    </div>
  );
}

import { Badge } from "../badge";
import type { GanttProjectData } from "./gantt-grid";

export function GanttProjectItem({
  name,
  dateRange,
  client,
  badge,
}: GanttProjectData) {
  const subtext = [dateRange, client].filter(Boolean).join(" · ");
  return (
    <div className="flex items-center gap-2 w-full overflow-hidden pl-5">
      {/* Folder icon */}
      <svg
        className="shrink-0 text-ink-gray-4"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M2 4.5A1.5 1.5 0 013.5 3h2.586a1 1 0 01.707.293L7.914 4.5H12.5A1.5 1.5 0 0114 6v5.5A1.5 1.5 0 0112.5 13h-9A1.5 1.5 0 012 11.5v-7z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col flex-1 min-w-0 leading-tight">
        <span className="text-sm font-medium text-ink-gray-8 truncate">
          {name}
        </span>
        {subtext && (
          <span className="text-xs text-ink-gray-5 truncate">{subtext}</span>
        )}
      </div>

      {badge && <Badge label={badge} size="sm" variant="subtle" theme="gray" />}
    </div>
  );
}

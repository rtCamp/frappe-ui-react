import { differenceInCalendarDays, addDays, isWeekend } from "date-fns";
import { cn } from "../../utils";
import { CELL_WIDTH, CELL_HEIGHT } from "./constants";
import { useGanttStore } from "./gantt-store";
import { getUTCDateTime } from "../../utils";
import type { Allocation } from "./types";

interface GanttBlockProps {
  allocation: Allocation;
}

/**
 * Returns the number of visible columns from `weekStart` to `date` (exclusive).
 * Negative when `date` is before `weekStart`.
 * Skips weekend days when `showWeekend` is false.
 */
function visibleColumnsBefore(
  dateString: string,
  weekStart: Date,
  showWeekend: boolean
): number {
  const date = getUTCDateTime(dateString);
  const calDays = differenceInCalendarDays(date, weekStart);
  if (showWeekend) return calDays;
  // count visible (non-weekend) days between weekStart and date
  const forward = calDays >= 0;
  const steps = Math.abs(calDays);
  let visible = 0;
  for (let d = 0; d < steps; d++) {
    const day = forward ? addDays(weekStart, d) : addDays(date, d);
    if (!isWeekend(day)) visible++;
  }
  return forward ? visible : -visible;
}

/**
 * Counts visible (non-weekend when showWeekend=false) days in [start, end] inclusive.
 */
function countVisibleDays(
  startString: string,
  endString: string,
  showWeekend: boolean
): number {
  const start = getUTCDateTime(startString);
  const end = getUTCDateTime(endString);
  const totalDays = differenceInCalendarDays(end, start) + 1;
  if (showWeekend) return totalDays;
  let count = 0;
  for (let d = 0; d < totalDays; d++) {
    if (!isWeekend(addDays(start, d))) count++;
  }
  return count;
}

export function GanttBlock({ allocation }: GanttBlockProps) {
  const { weekStart, showWeekend, columnCount } = useGanttStore((s) => ({
    weekStart: s.weekStart,
    showWeekend: s.showWeekend,
    columnCount: s.columnCount,
  }));

  // Column index (may be negative if before grid start)
  const startCol = visibleColumnsBefore(
    allocation.startDate,
    weekStart,
    showWeekend
  );
  const totalVisibleDays = countVisibleDays(
    allocation.endDate,
    allocation.endDate,
    showWeekend
  );
  const endCol = startCol + totalVisibleDays - 1;

  // Clamp to visible grid
  const clampedStart = Math.max(startCol, 0);
  const clampedEnd = Math.min(endCol, columnCount - 1);

  if (clampedStart > columnCount - 1 || clampedEnd < 0) return null;

  const left = clampedStart * CELL_WIDTH;
  const width = (clampedEnd - clampedStart + 1) * CELL_WIDTH;

  return (
    <div
      className={cn(
        "absolute flex items-center gap-1.5",
        "bg-white rounded-[9px] px-2.5 py-2",
        "shadow-[0px_0px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.14)]",
        "overflow-hidden whitespace-nowrap"
      )}
      style={{
        left,
        width,
        height: CELL_HEIGHT - 16,
        top: 8,
      }}
    >
      <span className="text-[13px] font-medium tracking-[0.02em] text-[#7c7c7c] truncate">
        {allocation.hours}h/day for {totalVisibleDays} day
        {totalVisibleDays !== 1 ? "s" : ""}
      </span>
      <span className="size-1.5 rounded-full bg-[#7c7c7c] shrink-0" />
    </div>
  );
}

GanttBlock.displayName = "GanttBlock";

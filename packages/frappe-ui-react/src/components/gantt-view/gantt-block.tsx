import { differenceInCalendarDays, addDays, isWeekend } from "date-fns";
import { cn } from "../../utils/cn";
import { CELL_WIDTH, CELL_HEIGHT } from "./constants";
import { useGanttStore } from "./gantt-store";
import type { Allocation } from "./types";

interface GanttBlockProps {
  allocation: Allocation;
}

/**
 * Returns the pixel left offset for a block starting on `date` within the visible grid.
 * Skips weekend days when `showWeekend` is false.
 */
function getBlockLeft(
  date: Date,
  weekStart: Date,
  showWeekend: boolean
): number {
  const calDays = differenceInCalendarDays(date, weekStart);
  let visibleCols: number;
  if (showWeekend) {
    visibleCols = calDays;
  } else {
    const forward = calDays >= 0;
    const steps = Math.abs(calDays);
    let visible = 0;
    for (let d = 0; d < steps; d++) {
      const day = forward ? addDays(weekStart, d) : addDays(date, d);
      if (!isWeekend(day)) visible++;
    }
    visibleCols = forward ? visible : -visible;
  }
  return Math.max(visibleCols, 0) * CELL_WIDTH;
}

/**
 * Returns the number of visible (non-weekend when `showWeekend` is false) days in [start, end] inclusive.
 */
function countVisibleDays(
  start: Date,
  end: Date,
  showWeekend: boolean
): number {
  const totalDays = differenceInCalendarDays(end, start) + 1;
  if (showWeekend) return totalDays;
  let count = 0;
  for (let d = 0; d < totalDays; d++) {
    if (!isWeekend(addDays(start, d))) count++;
  }
  return count;
}

/**
 * Returns the pixel width for the visible portion of a block spanning `start` to `end` (inclusive),
 * clamped to the grid. Returns null when the block is entirely outside the visible range.
 * Skips weekend days when `showWeekend` is false.
 */
function getBlockWidth(
  start: Date,
  end: Date,
  weekStart: Date,
  showWeekend: boolean,
  columnCount: number
): number | null {
  const totalVisibleDays = countVisibleDays(start, end, showWeekend);

  const calDays = differenceInCalendarDays(start, weekStart);
  let startCol: number;
  if (showWeekend) {
    startCol = calDays;
  } else {
    const forward = calDays >= 0;
    const steps = Math.abs(calDays);
    let visible = 0;
    for (let d = 0; d < steps; d++) {
      const day = forward ? addDays(weekStart, d) : addDays(start, d);
      if (!isWeekend(day)) visible++;
    }
    startCol = forward ? visible : -visible;
  }
  const endCol = startCol + totalVisibleDays - 1;

  const clampedStart = Math.max(startCol, 0);
  const clampedEnd = Math.min(endCol, columnCount - 1);

  if (clampedStart > columnCount - 1 || clampedEnd < 0) return null;

  return (clampedEnd - clampedStart + 1) * CELL_WIDTH;
}

export function GanttBlock({ allocation }: GanttBlockProps) {
  const { weekStart, showWeekend, columnCount } = useGanttStore((s) => ({
    weekStart: s.weekStart,
    showWeekend: s.showWeekend,
    columnCount: s.columnCount,
  }));

  const totalVisibleDays = countVisibleDays(
    allocation.startDate,
    allocation.endDate,
    showWeekend
  );

  const left = getBlockLeft(allocation.startDate, weekStart, showWeekend);
  const width = getBlockWidth(
    allocation.startDate,
    allocation.endDate,
    weekStart,
    showWeekend,
    columnCount
  );

  if (width === null) return null;

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

import React, { useState } from "react";
import { addDays, format, isToday, startOfWeek } from "date-fns";
import { cn, getUTCDateTime } from "../../utils";
import { GanttMemberItem } from "./gantt-member-item";
import { GanttProjectItem } from "./gantt-project-item";
import { CELL_HEIGHT, CELL_WIDTH } from "./constants";

const ROW_HEADER_WIDTH = 240;
const ROW_HEIGHT = 52;

export interface GanttProjectData {
  name: string;
  dateRange?: string;
  client?: string;
  badge?: string;
}

export interface GanttRowData {
  name: string;
  role?: string;
  image?: string;
  badge?: string;
  projects?: GanttProjectData[];
}

export interface GanttGridProps {
  /** ISO date string (YYYY-MM-DD) for any date within the first week displayed. */
  startDate: string;
  /** Number of weeks to display. */
  weekCount?: number;
  /** Row data. If omitted, falls back to rowCount placeholder rows. */
  rows: GanttRowData[];
  /** Whether to include Saturday and Sunday columns. When false, week boundary is every 5th column. */
  showWeekend?: boolean;
}

export const GanttGrid: React.FC<GanttGridProps> = ({
  startDate,
  weekCount = 3,
  rows,
  showWeekend = true,
}) => {
  const daysPerWeek = showWeekend ? 7 : 5;
  const columnCount = weekCount * daysPerWeek;

  const weekStart = startOfWeek(getUTCDateTime(startDate), { weekStartsOn: 1 });

  const weeks = Array.from({ length: weekCount }, (_, i) => i);
  const columns = Array.from({ length: columnCount }, (_, i) => i);

  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const toggleRow = (index: number) => {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <table
      className="relative w-screen h-screen overflow-scroll border-separate border-spacing-0"
      style={{ width: ROW_HEADER_WIDTH + columnCount * CELL_WIDTH }}
    >
      <thead className="sticky top-0 z-10" data-testid="gantt-header">
        {/* Row 1: corner + week range labels */}
        <tr>
          <th
            rowSpan={2}
            className="sticky left-0 z-20 bg-surface-white border-b border-r border-outline-gray-2 font-normal"
            style={{
              width: ROW_HEADER_WIDTH,
              minWidth: ROW_HEADER_WIDTH,
              height: CELL_HEIGHT * 2,
            }}
          />

          {weeks.map((weekIndex) => {
            const weekStartDay = addDays(weekStart, weekIndex * daysPerWeek);
            const weekEndDay = addDays(weekStartDay, daysPerWeek - 1);
            const label =
              format(weekStartDay, "MMM d") + " - " + format(weekEndDay, "d");
            return (
              <th
                key={weekIndex}
                colSpan={daysPerWeek}
                className="border-b border-r border-outline-gray-2 bg-surface-white px-2 py-1.5 font-normal"
                style={{ height: CELL_HEIGHT, width: daysPerWeek * CELL_WIDTH }}
              >
                <span className="truncate text-xs text-ink-gray-4">
                  {label}
                </span>
              </th>
            );
          })}
        </tr>

        {/* Row 2: individual day numbers */}
        <tr>
          {columns.map((i) => {
            const day = addDays(weekStart, i);
            const isTodayDate = isToday(day);
            const isSaturday = (i + 2) % daysPerWeek === 0;
            const isSunday = (i + 1) % daysPerWeek === 0;
            return (
              <th
                key={i}
                className={cn(
                  "font-normal relative border-b border-outline-gray-2",
                  {
                    "border-r border-outline-gray-2 bg-surface-gray-1 rounded-tr-md":
                      isSunday,
                    "bg-surface-gray-1 rounded-tl-md": isSaturday,
                  }
                )}
                style={{ height: CELL_HEIGHT, width: CELL_WIDTH }}
              >
                <span
                  className={cn(
                    "px-1 py-0.5 rounded-sm text-xs text-ink-gray-4",
                    {
                      "text-white bg-surface-gray-6": isTodayDate,
                    }
                  )}
                >
                  {format(day, "d")}
                </span>
                <span className="absolute bottom-0 right-0 w-1 h-1 border-r border-outline-gray-modals" />
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => {
          const isExpanded = expandedRows.has(rowIndex);
          const hasProjects = Boolean(row.projects?.length);

          return (
            <React.Fragment key={rowIndex}>
              {/* Member row */}
              <tr>
                <th
                  className="sticky left-0 z-10 bg-surface-white border-b border-r border-outline-gray-2 px-2 font-normal text-left"
                  style={{
                    height: ROW_HEIGHT,
                    width: ROW_HEADER_WIDTH,
                    minWidth: ROW_HEADER_WIDTH,
                  }}
                >
                  <GanttMemberItem
                    {...row}
                    expanded={isExpanded}
                    hasProjects={hasProjects}
                    onToggle={() => toggleRow(rowIndex)}
                  />
                </th>
                {columns.map((i) => {
                  const isSaturday = (i + 2) % daysPerWeek === 0;
                  const isSunday = (i + 1) % daysPerWeek === 0;
                  return (
                    <td
                      key={i}
                      className={cn({
                        "border-r border-outline-gray-2": isSunday,
                        "bg-surface-gray-1": isSaturday || isSunday,
                      })}
                      style={{ height: ROW_HEIGHT, width: CELL_WIDTH }}
                    />
                  );
                })}
              </tr>

              {/* Project child rows */}
              {isExpanded &&
                row.projects?.map((project, projectIndex) => (
                  <tr key={`${rowIndex}-project-${projectIndex}`}>
                    <th
                      className="sticky left-0 z-10 bg-surface-white border-b border-r border-outline-gray-2 px-2 font-normal text-left"
                      style={{
                        height: ROW_HEIGHT,
                        width: ROW_HEADER_WIDTH,
                        minWidth: ROW_HEADER_WIDTH,
                      }}
                    >
                      <GanttProjectItem {...project} />
                    </th>
                    {columns.map((i) => {
                      const isSaturday = (i + 2) % daysPerWeek === 0;
                      const isSunday = (i + 1) % daysPerWeek === 0;
                      return (
                        <td
                          key={i}
                          className={cn({
                            "bg-surface-gray-1 ": isSaturday,
                            "bg-surface-gray-1 border-r border-outline-gray-2":
                              isSunday,
                          })}
                          style={{ height: ROW_HEIGHT, width: CELL_WIDTH }}
                        />
                      );
                    })}
                  </tr>
                ))}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

GanttGrid.displayName = "GanttGrid";

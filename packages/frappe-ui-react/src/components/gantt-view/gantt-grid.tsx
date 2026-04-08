import React, { useState } from "react";
import { cn } from "../../utils";
import { GanttMemberItem } from "./gantt-member-item";
import { GanttProjectItem } from "./gantt-project-item";
import { GanttWeekHeader } from "./gantt-week-header";
import { createGanttStore, GanttContext, useGanttStore } from "./gantt-store";
import { CELL_HEIGHT, CELL_WIDTH } from "./constants";
import type { GanttGridProps } from "./types";

const GanttGridInner: React.FC = () => {
  const {
    rows,
    expandedRows,
    headerWidth,
    resizeHandleActive,
    toggleRow,
    setResizeHandleActive,
    startResize,
    daysPerWeek,
    columnCount,
    weeks,
    columns,
    showWeekend,
  } = useGanttStore((s) => ({
    rows: s.rows,
    expandedRows: s.expandedRows,
    headerWidth: s.headerWidth,
    resizeHandleActive: s.resizeHandleActive,
    toggleRow: s.toggleRow,
    setResizeHandleActive: s.setResizeHandleActive,
    startResize: s.startResize,
    daysPerWeek: s.daysPerWeek,
    columnCount: s.columnCount,
    weeks: s.weeks,
    columns: s.columns,
    showWeekend: s.showWeekend,
  }));

  const onResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startResize(e.clientX);
  };

  return (
    <div className="h-screen w-screen overflow-auto">
      <table
        className="relative border-separate border-spacing-0"
        style={{ width: headerWidth + columnCount * CELL_WIDTH }}
      >
        <thead className="sticky top-0 z-10" data-testid="gantt-header">
          {/* Row 1: corner + week range labels */}
          <tr>
            <th
              rowSpan={2}
              className="sticky left-0 z-20 bg-surface-white border-b border-r border-outline-gray-2 font-normal"
              style={{ width: headerWidth, minWidth: headerWidth }}
            >
              Members
              <div
                className={cn(
                  "absolute top-0 right-0 h-full w-1 cursor-col-resize",
                  {
                    "bg-outline-gray-3": resizeHandleActive,
                  }
                )}
                onMouseDown={onResizeMouseDown}
                onMouseEnter={() => setResizeHandleActive(true)}
                onMouseLeave={() => setResizeHandleActive(false)}
              />
            </th>

            {weeks.map((weekIndex) => (
              <GanttWeekHeader key={weekIndex} weekIndex={weekIndex} />
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => {
            const isExpanded = expandedRows.has(rowIndex);
            const hasProjects = Boolean(row.projects?.length);
            const isLastMember = rowIndex === rows.length - 1;
            const isMemberLastRow =
              isLastMember && !(isExpanded && hasProjects);

            return (
              <React.Fragment key={rowIndex}>
                {/* Member row */}
                <tr>
                  <GanttMemberItem
                    {...row}
                    expanded={isExpanded}
                    hasProjects={hasProjects}
                    onToggle={() => toggleRow(rowIndex)}
                    onResizeStart={onResizeMouseDown}
                    onResizeHandleEnter={() => setResizeHandleActive(true)}
                    onResizeHandleLeave={() => setResizeHandleActive(false)}
                    highlightResizeHandle={resizeHandleActive}
                    style={{
                      height: CELL_HEIGHT,
                      width: headerWidth,
                      minWidth: headerWidth,
                    }}
                  />
                  {columns.map((i) => {
                    const isSaturday =
                      (i + 2) % daysPerWeek === 0 && showWeekend;
                    const isSunday = (i + 1) % daysPerWeek === 0 && showWeekend;
                    const isLastday = (i + 1) % daysPerWeek === 0;
                    return (
                      <td
                        key={i}
                        className={cn({
                          "border-r border-outline-gray-2": isLastday,
                          "border-b border-outline-gray-2": isMemberLastRow,
                          "bg-surface-gray-1": isSaturday || isSunday,
                        })}
                        style={{ height: CELL_HEIGHT, width: CELL_WIDTH }}
                      />
                    );
                  })}
                </tr>

                {/* Project child rows */}
                {isExpanded &&
                  row.projects?.map((project, projectIndex) => {
                    const isLastProjectRow =
                      isLastMember &&
                      projectIndex === (row.projects?.length ?? 0) - 1;
                    return (
                      <tr key={`${rowIndex}-project-${projectIndex}`}>
                        <GanttProjectItem
                          {...project}
                          onResizeStart={onResizeMouseDown}
                          onResizeHandleEnter={() =>
                            setResizeHandleActive(true)
                          }
                          onResizeHandleLeave={() =>
                            setResizeHandleActive(false)
                          }
                          highlightResizeHandle={resizeHandleActive}
                          style={{
                            height: CELL_HEIGHT,
                            width: headerWidth,
                            minWidth: headerWidth,
                          }}
                        />
                        {columns.map((i) => {
                          const isSaturday =
                            (i + 2) % daysPerWeek === 0 && showWeekend;
                          const isSunday =
                            (i + 1) % daysPerWeek === 0 && showWeekend;
                          const isLastday = (i + 1) % daysPerWeek === 0;
                          return (
                            <td
                              key={i}
                              className={cn({
                                "border-r border-outline-gray-2": isLastday,
                                "border-b border-outline-gray-2":
                                  isLastProjectRow,
                                "bg-surface-gray-1": isSaturday || isSunday,
                              })}
                              style={{ height: CELL_HEIGHT, width: CELL_WIDTH }}
                            />
                          );
                        })}
                      </tr>
                    );
                  })}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export const GanttGrid: React.FC<GanttGridProps> = (props) => {
  const [store] = useState(() =>
    createGanttStore({
      rows: props.rows,
      showWeekend: props.showWeekend ?? true,
      startDate: props.startDate,
      weekCount: props.weekCount ?? 3,
    })
  );
  return (
    <GanttContext.Provider value={store}>
      <GanttGridInner />
    </GanttContext.Provider>
  );
};

GanttGrid.displayName = "GanttGrid";

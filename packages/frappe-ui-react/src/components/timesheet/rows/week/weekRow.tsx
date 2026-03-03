/**
 * External dependencies.
 */
import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Badge } from "../../../badge";
import { Button } from "../../../button";
import { cn } from "../../../../utils";
import {
  buttonVariants,
  statusIcon,
  statusTheme,
  totalHoursVariants,
} from "./constants";
import {
  BASE_PADDING,
  NESTING_OFFSET,
  statusLabel,
  type RowStatus,
} from "../constants";

export interface WeekRowProps {
  /** Label for the week row. */
  label?: string;
  /** Nesting level for the week row, used for indentation. */
  nesting?: number;
  /** Whether the week row is collapsed or expanded. */
  collapsed?: boolean;
  /** Status of the timesheet for the week. */
  status?: RowStatus;
  /** Whether the week row represents the current week. */
  thisWeek?: boolean;
  /** Callback function when the week row is toggled between collapsed and expanded. */
  onToggle?: () => void;
  /** Callback function when the action button is clicked. */
  onButtonClick?: () => void;
  /** Array of date strings representing the days in the week. */
  dates: string[];
  /** The date string representing today's date, used for highlighting. */
  today?: string;
  /** Total hours logged for the week. */
  totalHours?: string;
  /** Additional class names for the week row container. */
  className?: string;
}

export const WeekRow: React.FC<WeekRowProps> = ({
  label = "This Week",
  nesting = 0,
  collapsed = false,
  status = "not-submitted",
  thisWeek = false,
  dates,
  today = "",
  onToggle,
  onButtonClick,
  totalHours = "",
  className,
}) => {
  const isStatusNone = status === "none";

  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2",
        className
      )}
      style={{ paddingLeft: `${BASE_PADDING + nesting * NESTING_OFFSET}px` }}
    >
      <div className="min-w-0 align-middle flex flex-1 items-center">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "shrink-0 border-none outline-none focus:ring-0 focus-visible:ring-0 transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={16} />}
          aria-label="Toggle week"
        />
        <div className="min-w-0 flex items-center gap-2">
          <span className="text-sm font-semibold text-ink-gray-9 truncate">
            {label}
          </span>
          {status !== "none" && (
            <Badge theme={statusTheme[status]} className="shrink-0">
              {statusLabel[status]}
            </Badge>
          )}
        </div>
      </div>
      {!collapsed &&
        dates.map((date) => {
          const monthAndDay = date.split(" ");
          const isToday = thisWeek && date === today;
          return (
            <div
              key={date}
              className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5"
            >
              <span>
                {monthAndDay[0]}{" "}
                <span
                  className={cn(
                    isToday &&
                      "w-4.25 h-4.25 px-1 py-px rounded-sm bg-surface-red-5 text-ink-white"
                  )}
                >
                  {monthAndDay[1]}
                </span>
              </span>
            </div>
          );
        })}

      {!(isStatusNone && collapsed) && (
        <div className="shrink-0 text-end align-middle w-16 px-2 py-1.5">
          <span
            className={cn(
              "w-full text-sm text-ink-gray-5 whitespace-nowrap",
              collapsed && totalHoursVariants({ status, thisWeek })
            )}
          >
            {collapsed ? totalHours : "Total"}
          </span>
        </div>
      )}

      <div className="shrink-0 align-middle w-12 h-7 flex justify-end items-center whitespace-nowrap">
        {!isStatusNone ? (
          <Button
            onClick={onButtonClick}
            className={cn(
              buttonVariants({
                status,
                thisWeek,
                variant: statusIcon[status]?.variant,
                collapsed,
              })
            )}
            variant={statusIcon[status]?.variant}
            size="sm"
            icon={() => {
              const IconComponent = statusIcon[status]?.icon;
              return IconComponent ? <IconComponent size={16} /> : null;
            }}
            aria-label="Submit week"
            title={statusLabel[status]}
          />
        ) : null}
      </div>
    </div>
  );
};

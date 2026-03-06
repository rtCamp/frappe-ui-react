/**
 * External dependencies.
 */
import { Plus, Star } from "lucide-react";
import { Popover } from "@base-ui/react";

/**
 * Internal dependencies.
 */
import { Button } from "../../../button";
import { cn } from "../../../../utils";
import {
  statusIcon,
  statusIconVariants,
  type TaskRowTimeEntry,
  type TaskStatus,
} from "./constants";
import { BASE_PADDING, NESTING_OFFSET } from "../constants";

export interface TaskRowProps {
  /** Optional index of the task, used for identifying the task in callbacks. */
  taskIndex?: number;
  /** Label for the task row. */
  label?: string;
  /** Nesting level for the task row, used for indentation. */
  nesting?: number;
  /** Whether the task row is starred. */
  starred?: boolean;
  /** Array of time entries for each day of the week for the task. */
  timeEntries: TaskRowTimeEntry[];
  /** Optional function to handle cell click events, receiving the task index and day index. */
  onCellClick?: (taskIndex: number | undefined, dayIndex: number) => void;
  /** Optional function to render popover content for a time entry, receiving the task index and day index. */
  popoverContent?: (
    taskIndex: number | undefined,
    dayIndex: number
  ) => React.ReactNode;
  /** Total hours logged for the week. */
  totalHours?: string;
  /** Status of the timesheet for the task row. */
  status?: TaskStatus;
  /** Additional class names for the task row container. */
  className?: string;
}

export const TaskRow: React.FC<TaskRowProps> = ({
  taskIndex,
  label,
  nesting = 0,
  starred = false,
  timeEntries,
  onCellClick,
  popoverContent,
  totalHours = "",
  status = "open",
  className,
}) => {
  const StatusIcon = statusIcon[status];
  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2",
        className
      )}
      style={{ paddingLeft: `${BASE_PADDING + nesting * NESTING_OFFSET}px` }}
    >
      <div className="min-w-0 flex flex-1 items-center">
        <div className="min-w-0 flex items-center gap-2">
          <span className="shrink-0">
            <StatusIcon
              strokeWidth={1.5}
              size={16}
              className={statusIconVariants({ status })}
            />
          </span>
          <span className="text-base font-medium truncate min-w-0">
            {label}
          </span>
          {starred ? (
            <span className="shrink-0">
              <Star
                strokeWidth={1.5}
                size={16}
                className="fill-current text-ink-amber-2"
              />
            </span>
          ) : null}
        </div>
      </div>
      {timeEntries.map((timeEntry, index) => {
        return (
          <div
            key={index}
            className="shrink-0 flex justify-end items-center text-base text-ink-gray-6 whitespace-nowrap w-16 h-7 pl-2 py-1.5 leading-3.5"
          >
            <Popover.Root>
              <Popover.Trigger openOnHover>
                <Button
                  variant="ghost"
                  className="w-14.25 relative group flex justify-center items-center !disabled:hover:bg-surface-gray-2 !disabled:focus:bg-surface-gray-2 !disabled:active:bg-surface-gray-3 disabled:cursor-default! lining-nums tabular-nums [&_span]:overflow-visible [&_span]:whitespace-normal"
                  disabled={timeEntry.disabled}
                  onClick={() => onCellClick?.(taskIndex, index)}
                >
                  {timeEntry.time === "" ? (
                    <>
                      <span className="group-hover:hidden group-disabled:group-hover:flex flex-1 text-center text-ink-gray-4">
                        -
                      </span>
                      <span className="group-hover:flex group-disabled:group-hover:hidden hidden absolute w-full h-full top-0 left-0 justify-center items-center">
                        <Plus strokeWidth={1.5} size={16} className="" />
                      </span>
                    </>
                  ) : (
                    <span>{timeEntry.time}</span>
                  )}
                  {timeEntry.nonBillable ? (
                    <span className="block absolute z-10 -bottom-0.5 left-1/2 w-1 h-1 rounded-full bg-surface-amber-3 transform -translate-x-1/2"></span>
                  ) : null}
                </Button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Positioner sideOffset={8} align="end">
                  <Popover.Popup>
                    {popoverContent?.(taskIndex, index)}
                  </Popover.Popup>
                </Popover.Positioner>
              </Popover.Portal>
            </Popover.Root>
          </div>
        );
      })}

      <div className="shrink-0 flex justify-end items-center text-base text-end text-ink-gray-6 whitespace-nowrap w-16 h-7 px-2 py-1.5 lining-nums tabular-nums">
        <span>{totalHours}</span>
      </div>

      <div className="shrink-0 w-12 h-7"></div>
    </div>
  );
};

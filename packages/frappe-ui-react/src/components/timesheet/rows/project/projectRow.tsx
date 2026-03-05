/**
 * External dependencies.
 */
import { ChevronDown, Folder } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Button } from "../../../button";
import { cn } from "../../../../utils";
import { totalHoursVariants } from "./constants";
import { BASE_PADDING, NESTING_OFFSET, type RowStatus } from "../constants";

export interface ProjectRowProps {
  /** Label for the project row. */
  label?: string;
  /** Nesting level for the project row, used for indentation. */
  nesting?: number;
  /** Whether the project row is collapsed or expanded. */
  collapsed?: boolean;
  /** Callback function when the project row is toggled between collapsed and expanded. */
  onToggle?: () => void;
  /** Array of time entries for each day of the week. */
  timeEntries: string[];
  /** Total hours logged for the week. */
  totalHours?: string;
  /** Status of the timesheet for the project row. */
  status?: RowStatus;
  /** Optional function to render a prefix icon next to the label. */
  renderPrefix?: () => React.ReactNode;
  /** Additional class names for the project row container. */
  className?: string;
}

export const ProjectRow: React.FC<ProjectRowProps> = ({
  label,
  nesting = 0,
  collapsed = false,
  onToggle,
  timeEntries,
  totalHours = "",
  status = "not-submitted",
  renderPrefix,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2",
        className
      )}
      style={{ paddingLeft: `${BASE_PADDING + nesting * NESTING_OFFSET}px` }}
    >
      <div className="min-w-0 flex flex-1 items-center">
        <Button
          onClick={onToggle}
          disabled={!onToggle}
          variant="ghost"
          className={cn(
            "shrink-0 border-none outline-none focus:ring-0 focus-visible:ring-0 transition-transform bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent",
            collapsed ? "-rotate-90" : "rotate-0"
          )}
          icon={() => <ChevronDown strokeWidth={1.5} size={16} />}
          aria-label="Toggle project"
        />
        <div className="min-w-0 flex items-center text-ink-gray-9 gap-2">
          <span className="shrink-0">
            {renderPrefix ? (
              renderPrefix()
            ) : (
              <Folder strokeWidth={1.5} size={16} />
            )}
          </span>
          <span className="text-base font-medium truncate min-w-0">
            {label}
          </span>
        </div>
      </div>
      {timeEntries.map((timeEntry, index) => {
        return (
          <div
            key={`${timeEntry}-${index}`}
            className="shrink-0 flex justify-end items-center text-base text-ink-gray-6 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5"
          >
            {timeEntry === "" ? (
              <span className="flex-1 ml-1.5 text-center text-ink-gray-4">
                -
              </span>
            ) : (
              <span>{timeEntry}</span>
            )}
          </div>
        );
      })}

      <div className="shrink-0 flex justify-end items-center text-base text-end font-medium text-ink-gray-5 whitespace-nowrap w-16 h-7 px-2 py-1.5">
        <span className={cn(totalHoursVariants({ status }))}>{totalHours}</span>
      </div>

      <div className="shrink-0 w-12 h-7"></div>
    </div>
  );
};

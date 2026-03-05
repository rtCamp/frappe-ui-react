/**
 * External dependencies.
 */
import { CalendarX2 } from "lucide-react";

/**
 * Internal dependencies.
 */
import { cn } from "../../../../utils";
import { BASE_PADDING, NESTING_OFFSET } from "../constants";

export interface TimeOffRowProps {
  /** Label for the time-off row. */
  label?: string;
  /** Nesting level for the time-off row, used for indentation. */
  nesting?: number;
  /** Array of time-off entries for each day of the week. */
  timeOffEntries: string[];
  /** Total time-off hours logged for the week. */
  totalHours?: string;
  /** Optional icon to display next to the label. */
  renderPrefix?: () => React.ReactNode;
  /** Additional class names for the time-off row container. */
  className?: string;
}

export const TimeOffRow: React.FC<TimeOffRowProps> = ({
  label = "Time-off",
  nesting = 0,
  timeOffEntries,
  totalHours = "",
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
      data-testid="time-off-row"
    >
      <div className="min-w-0 flex flex-1 items-center text-ink-gray-9">
        <span className="shrink-0 px-2 py-1.5">
          {renderPrefix ? (
            renderPrefix()
          ) : (
            <CalendarX2 strokeWidth={1.5} size={16} />
          )}
        </span>
        <span className="text-base font-medium truncate min-w-0">{label}</span>
      </div>
      {timeOffEntries.map((timeOffEntry, index) => {
        return (
          <div
            key={index}
            className="shrink-0 flex justify-end items-center text-base text-ink-gray-6 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5"
          >
            {timeOffEntry === "" ? (
              <span className="flex-1 ml-1.5 text-center text-ink-gray-4">
                -
              </span>
            ) : (
              <span>{timeOffEntry}</span>
            )}
          </div>
        );
      })}

      <div className="shrink-0 flex justify-end items-center text-base text-end font-medium text-ink-amber-4 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5">
        <span>{totalHours}</span>
      </div>

      <div className="shrink-0 w-12 h-7"></div>
    </div>
  );
};

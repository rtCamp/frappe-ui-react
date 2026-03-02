/**
 * External dependencies.
 */
import { ChevronDown, Folder } from "lucide-react";
import { cva } from "class-variance-authority";

/**
 * Internal dependencies.
 */
import { Button } from "../../button";
import { cn } from "../../../utils";

type ProjectRowStatus =
  | "Not Submitted"
  | "Approved"
  | "Rejected"
  | "Approval Pending"
  | "None";

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
  status?: ProjectRowStatus;
  /** Optional icon to display next to the label. */
  prefixIcon?: React.ReactNode;
  /** Optional icon to display next to the label. */
  suffixIcon?: React.ReactNode;
}

const totalHoursVariants = cva("", {
  variants: {
    status: {
      "Not Submitted": "text-ink-gray-6",
      Approved: "text-ink-green-4",
      Rejected: "text-ink-red-4",
      "Approval Pending": "text-ink-amber-4",
      None: "",
    },
  },
});

const NESTING_OFFSET = 10;
const BASE_PADDING = 4;

export const ProjectRow: React.FC<ProjectRowProps> = ({
  label,
  nesting = 0,
  collapsed = false,
  onToggle,
  timeEntries,
  totalHours = "",
  status = "Not Submitted",
  prefixIcon,
  suffixIcon,
}) => {
  return (
    <div
      className="flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 py-2"
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
          aria-label="Toggle project"
        />
        <div className="min-w-0 flex items-center text-ink-gray-9 gap-2">
          <span className="shrink-0">
            {prefixIcon || <Folder strokeWidth={1.5} size={16} />}
          </span>
          <span className="text-sm font-semibold truncate min-w-0">
            {label}
          </span>
          <span className="shrink-0">{suffixIcon ? suffixIcon : null}</span>
        </div>
      </div>
      {timeEntries.map((timeEntry, index) => {
        return (
          <div
            key={`${timeEntry}-${index}`}
            className="shrink-0 flex justify-end w-16 text-sm text-ink-gray-6 whitespace-nowrap px-2 py-1.5"
          >
            {timeEntry === "" ? (
              <span className="w-10.25 text-center text-ink-gray-4">-</span>
            ) : (
              <span>{timeEntry}</span>
            )}
          </div>
        );
      })}

      <div className="shrink-0 align-middle w-16 text-sm text-end text-ink-gray-5 whitespace-nowrap px-2 py-1.5">
        <span className={totalHoursVariants({ status })}>{totalHours}</span>
      </div>

      <div className="shrink-0 align-middle w-12"></div>
    </div>
  );
};

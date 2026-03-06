/**
 * External dependencies.
 */
import { Star, StarOff } from "lucide-react";

/**
 * Internal dependencies.
 */
import { cn } from "../../../../utils";
import { totalHoursVariants } from "./constants";
import { BASE_PADDING, NESTING_OFFSET, type RowStatus } from "../constants";
import { Breadcrumbs, type BreadcrumbsProps } from "../../../breadcrumbs";

export interface TotalRowProps {
  /** Nesting level for the total row, used for indentation. */
  nesting?: number;
  /** Props configuration for the Breadcrumbs component displayed in the total row. */
  breadcrumbs: BreadcrumbsProps;
  /** Whether the total row is starred or not. */
  starred?: boolean;
  /** Array of total time entries for each day of the week. */
  totalTimeEntries: string[];
  /** Total hours logged for the week. */
  totalHours?: string;
  /** Status of the timesheet for the total row. */
  status?: RowStatus;
  /** Optional function to render a prefix icon next to the breadcrumbs. */
  renderPrefix?: () => React.ReactNode;
  /** Additional class names for the total row container. */
  className?: string;
}

export const TotalRow: React.FC<TotalRowProps> = ({
  nesting = 0,
  breadcrumbs,
  starred = false,
  totalTimeEntries,
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
        <div className="min-w-0 flex items-center text-ink-gray-9 gap-2">
          <span className="shrink-0">
            {renderPrefix ? (
              renderPrefix()
            ) : starred ? (
              <Star
                strokeWidth={1.5}
                size={16}
                className="fill-current text-ink-amber-2"
              />
            ) : (
              <StarOff
                strokeWidth={1.5}
                size={16}
                className="text-ink-gray-4 scale-x-[-1]"
              />
            )}
          </span>
          <Breadcrumbs compactCrumbs={false} {...breadcrumbs} />
        </div>
      </div>

      {totalTimeEntries.map((totalTimeEntry, index) => {
        return (
          <div
            key={index}
            className="shrink-0 flex justify-end items-center text-base font-medium text-ink-gray-9 whitespace-nowrap w-16 h-7 px-2 py-1.5 leading-3.5 lining-nums tabular-nums"
          >
            <span>{totalTimeEntry}</span>
          </div>
        );
      })}

      <div className="shrink-0 flex justify-end items-center text-base font-medium text-end text-ink-gray-5 whitespace-nowrap w-16 h-7 px-2 py-1.5">
        <span className={cn(totalHoursVariants({ status }))}>{totalHours}</span>
      </div>

      <div className="shrink-0 w-12 h-7"></div>
    </div>
  );
};

/**
 * Internal dependencies.
 */
import { Breadcrumbs, type BreadcrumbsProps } from "../../../breadcrumbs";
import { cn } from "../../../../utils";
import { BASE_PADDING, NESTING_OFFSET } from "../constants";

export interface HeaderRowProps {
  /** Props configuration for the Breadcrumbs component displayed in the header row. */
  breadcrumbs: BreadcrumbsProps;
  /** Nesting level for the week row, used for indentation. */
  nesting?: number;
  /** Array of day labels for each day of the week. */
  days: string[];
  /** Additional class names for the header row container. */
  className?: string;
}

export const HeaderRow: React.FC<HeaderRowProps> = ({
  breadcrumbs,
  nesting = 0,
  days,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center border-b border-outline-gray-1 transition-colors w-full justify-between px-1 h-7",
        className
      )}
      style={{ paddingLeft: `${BASE_PADDING + nesting * NESTING_OFFSET}px` }}
      data-testid="header-row"
    >
      <div className="shrink-0 align-middle flex flex-1 items-center">
        <Breadcrumbs compactCrumbs={false} {...breadcrumbs} />
      </div>
      {days.map((day, index) => (
        <div
          key={`${day}-${index}`}
          className="shrink-0 flex justify-end text-sm w-16 h-7 px-2 py-1.5"
        >
          <span className="text-ink-gray-6 whitespace-nowrap leading-3.5">
            {day}
          </span>
        </div>
      ))}

      <div className="shrink-0 align-middle w-16 h-7 text-sm text-end px-2 py-1.5">
        <span className="text-ink-gray-5 whitespace-nowrap leading-3.5">
          Total
        </span>
      </div>

      <div className="shrink-0 align-middle w-12 h-7"></div>
    </div>
  );
};

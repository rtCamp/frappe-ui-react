/**
 * External dependencies.
 */
import clsx from "clsx";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx("animate-pulse rounded-md bg-surface-gray-4", className)}
      {...props}
    />
  );
};

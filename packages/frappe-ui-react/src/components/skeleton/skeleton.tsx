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
      className={clsx(
        "animate-pulse rounded-md bg-slate-200 dark:bg-accent",
        className
      )}
      {...props}
    />
  );
};

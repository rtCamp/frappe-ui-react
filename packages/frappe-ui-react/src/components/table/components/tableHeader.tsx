import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableHeader = ({
  className,
  children,
}: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) => (
  <thead
    className={classNames(
      "[&_tr]:border-b bg-slate-50 dark:bg-slate-500 border-t",
      className
    )}
  >
    {children}
  </thead>
);

export default TableHeader;

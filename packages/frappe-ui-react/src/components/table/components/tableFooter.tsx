import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableFooter = ({
  className,
  children,
}: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) => (
  <tfoot
    className={classNames(
      "border-t bg-slate-500/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
  >
    {children}
  </tfoot>
);

export default TableFooter;

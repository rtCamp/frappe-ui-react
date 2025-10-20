import { PropsWithChildren } from "react";
import classNames from "classnames";

const TableRow = ({
  className,
  children,
}: PropsWithChildren<React.HTMLAttributes<HTMLTableRowElement>>) => (
  <tr
    className={classNames(
      "border-b transition-colors hover:bg-slate-500/50 data-[state=selected]:bg-slate-500",
      className
    )}
  >
    {children}
  </tr>
);

export default TableRow;

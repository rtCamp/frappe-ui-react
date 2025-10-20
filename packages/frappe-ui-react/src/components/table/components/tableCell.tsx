import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableCell = ({
  className,
  children,
}: PropsWithChildren<React.TdHTMLAttributes<HTMLTableDataCellElement>>) => (
  <td
    className={classNames(
      "px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0",
      className
    )}
  >
    {children}
  </td>
);

export default TableCell;

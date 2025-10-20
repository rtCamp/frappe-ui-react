import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableHead = ({
  className,
  children,
  ...props
}: PropsWithChildren<React.ThHTMLAttributes<HTMLTableCellElement>>) => (
  <th
    className={classNames(
      "h-12 px-4 text-left align-middle font-medium text-gray-900 [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  >
    {children}
  </th>
);

export default TableHead;

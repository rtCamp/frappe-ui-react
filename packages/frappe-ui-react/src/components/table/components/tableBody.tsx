import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableBody = ({
  className,
  children,
  ...props
}: PropsWithChildren<React.HTMLAttributes<HTMLTableSectionElement>>) => (
  <tbody
    className={classNames("[&_tr:last-child]:border-0", className)}
    {...props}
  >
    {children}
  </tbody>
);

export default TableBody;

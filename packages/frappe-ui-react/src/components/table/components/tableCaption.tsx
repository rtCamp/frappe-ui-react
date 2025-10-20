import classNames from "classnames";
import { PropsWithChildren } from "react";

const TableCaption = ({
  className,
  children,
}: PropsWithChildren<React.HTMLAttributes<HTMLTableCaptionElement>>) => (
  <caption className={classNames("mt-4 text-sm text-slate-400", className)}>
    {children}
  </caption>
);

export default TableCaption;

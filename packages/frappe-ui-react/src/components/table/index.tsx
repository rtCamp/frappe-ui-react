import { forwardRef } from "react";
import classNames from "classnames";

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={classNames("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={classNames("[&_tr]:border-b bg-slate-50 dark:bg-slate-500 border-t", className)}
    {...props}
  />
));

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={classNames("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={classNames("border-t bg-slate-500/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props}
  />
));

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={classNames("border-b transition-colors hover:bg-slate-500/50 data-[state=selected]:bg-slate-500", className)}
    {...props}
  />
));

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={classNames("h-12 px-4 text-left align-middle font-medium text-gray-900 [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={classNames("px-4 py-2 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={classNames("mt-4 text-sm text-slate-400", className)}
    {...props}
  />
));

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

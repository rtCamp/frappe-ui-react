import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  OnChangeFn,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components";

interface TableProps<TData> {
  className?: string;
  columns: ColumnDef<TData>[];
  data: TData[];
  enablePagination?: boolean;
  paginationState?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: OnChangeFn<{
    pageIndex: number;
    pageSize: number;
  }>;
  componentClassNames?: {
    caption?: string;
    header?: string;
    body?: string;
    footer?: string;
    head?: string;
    row?: string;
    cell?: string;
  };
}

function Table<TData>({
  className,
  columns,
  data,
  enablePagination = false,
  paginationState = { pageIndex: 0, pageSize: 10 },
  onPaginationChange,
  componentClassNames,
}: TableProps<TData>) {
  const table = useReactTable<TData>({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: enablePagination,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    onPaginationChange: enablePagination ? onPaginationChange : undefined,
    state: {
      pagination:
        enablePagination ? paginationState : undefined,
    },
  });

  return (
    <div className="relative w-full overflow-auto">
      <table className={classNames("w-full caption-bottom text-sm", className)}>
        <TableCaption className={componentClassNames?.caption} />

        <TableHeader className={componentClassNames?.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={componentClassNames?.row}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={componentClassNames?.head}
                  colSpan={header.colSpan}
                  rowSpan={header.rowSpan}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody className={componentClassNames?.body}>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={componentClassNames?.row}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className={componentClassNames?.cell}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter className={componentClassNames?.footer}>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id} className={componentClassNames?.row}>
              {footerGroup.headers.map((header) => (
                <TableCell
                  key={header.id}
                  className={componentClassNames?.cell}
                >
                  {flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </table>
    </div>
  );
}

export default Table;

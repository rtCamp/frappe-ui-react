import { useMemo, useCallback, useContext, ReactNode } from "react";

import { TableContext } from "./tableContext";
import TabButtons from "../tabButtons";
import { Button } from "../button";

interface ListViewFooterProps {
  left?: ReactNode;
  right?: ReactNode;
  onLoadMore?: () => void;
}

const ListViewFooter = ({ left, right, onLoadMore }: ListViewFooterProps) => {
  const tableContext = useContext(TableContext);

  if (!tableContext) {
    throw new Error("TableControls must be used within a TableProvider");
  }

  const { options, pageLength, setPageLength } = tableContext;

  const pageLengthOptions = useMemo(() => {
    return options.pageLengthOptions.map((o) => ({
      label: o.toString(),
      value: o,
    }));
  }, [options.pageLengthOptions]);

  const showLoadMore = useMemo(() => {
    return (
      options.rowCount &&
      options.totalCount &&
      options.rowCount < options.totalCount
    );
  }, [options.rowCount, options.totalCount]);

  const handleLoadMore = useCallback(() => {
    if (onLoadMore) {
      onLoadMore();
    }
  }, [onLoadMore]);

  return (
    <div className="flex justify-between gap-2">
      {left ? (
        <div>{left}</div>
      ) : (
        <TabButtons
          value={pageLength}
          onChange={setPageLength as (value: string | number) => void}
          buttons={pageLengthOptions}
        />
      )}

      {right ? (
        <div>{right}</div>
      ) : (
        <div className="flex items-center">
          {showLoadMore && (
            <Button label="Load More" onClick={handleLoadMore} />
          )}
          {showLoadMore && <div className="mx-3 h-[80%] border-l" />}
          <div className="flex items-center gap-1 text-base text-ink-gray-5">
            <div>{options.rowCount || "0"}</div>
            <div>of</div>
            <div>{options.totalCount || "0"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListViewFooter;

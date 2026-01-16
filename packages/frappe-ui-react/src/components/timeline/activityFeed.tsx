import React, { useState, useMemo } from "react";
import { Timeline } from "./timeline";
import { Button } from "../button";
import type { ActivityFeedProps } from "./types";

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  maxItems = 0,
  showLoadMore = false,
  onLoadMore,
  emptyMessage = "No activity to display",
  ...timelineProps
}) => {
  const [displayCount, setDisplayCount] = useState(maxItems || items.length);

  const displayedItems = useMemo(() => {
    if (maxItems === 0) return items;
    return items.slice(0, displayCount);
  }, [items, maxItems, displayCount]);

  const hasMore = maxItems > 0 && displayCount < items.length;

  const handleLoadMore = () => {
    if (maxItems > 0) {
      setDisplayCount((prev) => Math.min(prev + maxItems, items.length));
    }
    onLoadMore?.();
  };

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Timeline items={displayedItems} {...timelineProps} />
      {hasMore && showLoadMore && (
        <div className="flex justify-center mt-4">
          <Button
            label="Load More"
            theme="gray"
            variant="outline"
            size="sm"
            onClick={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
};



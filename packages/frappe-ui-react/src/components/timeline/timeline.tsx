import React from "react";
import FeatherIcon from "../featherIcon";
import type { TimelineProps, TimelineItem } from "./types";
import { dayjs } from "../../utils/dayjs";

export const Timeline: React.FC<TimelineProps> = ({
  items,
  orientation = "vertical",
  variant = "default",
  showTimestamps = true,
  showIcons = true,
  renderItem,
  className = "",
}) => {
  const formatTimestamp = (timestamp: string | Date) => {
    const date = dayjs(timestamp);
    const now = dayjs();
    const diffInDays = now.diff(date, "day");

    if (diffInDays === 0) {
      return date.format("h:mm A");
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return date.format("dddd");
    } else if (diffInDays < 365) {
      return date.format("MMM D");
    } else {
      return date.format("MMM D, YYYY");
    }
  };

  const getColorClasses = (color: string = "blue") => {
    const colorMap = {
      blue: { bg: "bg-blue-500", border: "border-blue-500", text: "text-blue-500" },
      green: { bg: "bg-green-500", border: "border-green-500", text: "text-green-500" },
      red: { bg: "bg-red-500", border: "border-red-500", text: "text-red-500" },
      yellow: { bg: "bg-yellow-500", border: "border-yellow-500", text: "text-yellow-500" },
      gray: { bg: "bg-gray-500", border: "border-gray-500", text: "text-gray-500" },
      purple: { bg: "bg-purple-500", border: "border-purple-500", text: "text-purple-500" },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const defaultRenderItem = (item: TimelineItem, index: number) => {
    const isLast = index === items.length - 1;
    const colorClasses = getColorClasses(item.color);

    return (
      <div key={item.id} className="flex relative">
        <div className="flex flex-col items-center mr-6 relative z-10">
          {showIcons && (
            <div
              className={`w-12 h-12 rounded-full border-4 flex items-center justify-center ${colorClasses.bg} ${colorClasses.border} text-white shadow-lg`}
            >
              {item.icon || (
                <FeatherIcon name="circle" height={20} width={20} className="text-white" />
              )}
            </div>
          )}
          {!isLast && (
            <div
              className={`w-1 flex-1 ${colorClasses.border} opacity-30 mt-2`}
              style={{ minHeight: variant === "compact" ? "60px" : "80px" }}
            />
          )}
        </div>
        <div className="flex-1 pb-6">
          <div className="flex items-start justify-between mb-1">
            <div className={`font-medium ${colorClasses.text}`}>{item.title}</div>
            {showTimestamps && (
              <div className="text-xs text-gray-500 ml-4">{formatTimestamp(item.timestamp)}</div>
            )}
          </div>
          {item.description && (
            <div className="text-sm text-gray-600 mb-2">{item.description}</div>
          )}
          {item.content && <div className="mt-2">{item.content}</div>}
        </div>
      </div>
    );
  };

  if (orientation === "horizontal") {
    return (
      <div className={`flex overflow-x-auto pb-4 ${className}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const colorClasses = getColorClasses(item.color);

          return (
            <React.Fragment key={item.id}>
              <div className="flex-shrink-0 flex flex-col items-center" style={{ minWidth: "200px" }}>
                {showIcons && (
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${colorClasses.bg} ${colorClasses.border} text-white mb-2`}
                  >
                    {item.icon || (
                      <FeatherIcon name="circle" height={12} width={12} className="text-white" />
                    )}
                  </div>
                )}
                <div className={`font-medium text-sm ${colorClasses.text} mb-1`}>
                  {item.title}
                </div>
                {showTimestamps && (
                  <div className="text-xs text-gray-500 mb-2">{formatTimestamp(item.timestamp)}</div>
                )}
                {item.description && (
                  <div className="text-xs text-gray-600 text-center">{item.description}</div>
                )}
              </div>
              {!isLast && (
                <div
                  className={`flex-shrink-0 w-12 h-0.5 ${colorClasses.border} opacity-30 mx-2 mt-4`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  return (
    <div className={className}>
      {items.map((item, index) =>
        renderItem ? renderItem(item, index) : defaultRenderItem(item, index)
      )}
    </div>
  );
};


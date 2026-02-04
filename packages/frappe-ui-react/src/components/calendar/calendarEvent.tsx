import React, { useContext, useMemo } from "react";
import clsx from "clsx";
import { createPortal } from "react-dom";

import {
  calculateDiff,
  calculateMinutes,
  colorMap,
  formattedDuration,
} from "./calendarUtils";
import { CalendarContext } from "./calendarContext";
import type { CalendarEventProps } from "./types";
import { EventModalContent } from "./eventModalContent";
import NewEventModal from "./newEventModalContent";
import { useEventInteraction } from "./hooks/useEventInteraction";

export const CalendarEvent = ({
  event,
  date,
  extraClassName = "",
  onDragStart = () => {},
  onDragEnd = () => {},
}: CalendarEventProps) => {
  const { activeView, config, deleteEvent, updateEventState, createNewEvent } =
    useContext(CalendarContext);
  const {
    eventTime,
    isPopoverOpen,
    isEditModalOpen,
    isResizing,
    isRepositioning,
    repositionState,
    eventRef,
    floatingRefs,
    floatingStyles,
    setEditModalOpen,
    handleEventClick,
    handleEventDelete,
    handleResizeMouseDown,
    setPopoverOpen,
    handleRepositionMouseDown,
  } = useEventInteraction(event, {
    ...config,
    activeView,
    deleteEvent,
    updateEventState,
    createNewEvent,
  });

  const eventStyles = useMemo(() => {
    const commonStyles = {
      transform: `translate(${repositionState.xAxis}px, ${repositionState.yAxis}px)`,
      zIndex: isRepositioning ? 100 : (event.idx || 0) + 1,
    };

    if (event.isFullDay || activeView === "Month") {
      return commonStyles;
    }

    if (!event.from_time || !event.to_time) {
      return;
    }

    const minuteHeight = config.hourHeight / 60;
    const diff = calculateDiff(event.from_time, event.to_time);
    const height = Math.max(32.5, diff * minuteHeight);
    let top = calculateMinutes(event.from_time) * minuteHeight;

    if (activeView === "Day") {
      top += config.redundantCellHeight;
    }

    const width =
      isResizing || isRepositioning
        ? "100%"
        : `${80 - (event.hallNumber || 0) * 20}%`;
    const left =
      isResizing || isRepositioning ? "0" : `${(event.hallNumber || 0) * 20}%`;

    return {
      ...commonStyles,
      height: `${height}px`,
      top: `${top}px`,
      width,
      left,
    };
  }, [
    repositionState.xAxis,
    repositionState.yAxis,
    isRepositioning,
    event.idx,
    event.isFullDay,
    event.from_time,
    event.to_time,
    event.hallNumber,
    activeView,
    config.hourHeight,
    config.redundantCellHeight,
    isResizing,
  ]);

  const EventContent = (
    <div
      className={clsx(
        "relative flex h-full select-none items-start gap-2 overflow-hidden px-2",
        event.from_time && [
          "border-l-2",
          colorMap[event?.color ?? "blue"]?.border_color || "border-green-600",
        ]
      )}
    >
      {config.showIcon &&
        config.eventIcons?.[event.type] &&
        React.createElement(config.eventIcons[event.type], {
          className: "h-4 w-4 text-black",
        })}
      <div className="flex w-fit flex-col overflow-hidden whitespace-nowrap text-gray-800 text-start">
        <p className="truncate text-sm font-medium">
          {event.title || "New Event"}
        </p>
        {!event.isFullDay && (
          <p className="text-ellipsis text-xs font-normal">
            {eventTime?.from_time &&
              eventTime?.to_time &&
              formattedDuration(
                eventTime.from_time,
                eventTime.to_time,
                config.timeFormat
              )}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div
        ref={eventRef}
        draggable={isResizing ? false : true}
        className={clsx(
          "mx-px shadow rounded h-min-[6px] rounded-lg p-2 transition-all duration-75 cursor-pointer shrink-0 w-[90%]",
          extraClassName,
          colorMap[event?.color ?? "blue"]?.background_color || "bg-green-100",
          activeView !== "Month" && "shadow-lg absolute",
          event.isFullDay && "relative",
          isPopoverOpen && "!z-20 drop-shadow-xl"
        )}
        style={eventStyles}
        onClick={handleEventClick}
        onDragStart={(e) => onDragStart(e, event.id)}
        onDragEnd={(e) => onDragEnd(e, event.id)}
        onMouseDown={
          activeView !== "Month" && config.isEditMode
            ? handleRepositionMouseDown
            : undefined
        }
      >
        {EventContent}
        {activeView !== "Month" && config.isEditMode && !event.isFullDay && (
          <div
            className="absolute bottom-0 h-[8px] w-full cursor-row-resize"
            onMouseDown={handleResizeMouseDown}
          />
        )}
      </div>

      {isPopoverOpen &&
        createPortal(
          <div
            ref={floatingRefs.setFloating}
            style={floatingStyles}
            className="z-[100] rounded shadow-xl"
          >
            <EventModalContent
              calendarEvent={event}
              date={date}
              isEditMode={config.isEditMode}
              onClose={() => setPopoverOpen(false)}
              onEdit={() => {
                setPopoverOpen(false);
                setEditModalOpen(true);
              }}
              onDelete={handleEventDelete}
            />
          </div>,
          document.body
        )}

      {isEditModalOpen && (
        <NewEventModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          event={event}
        />
      )}
    </>
  );
};

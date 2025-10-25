import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from "@floating-ui/react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import type { CalendarConfig, CalendarEvent } from "../types";
import { calculateMinutes, convertMinutesToHours } from "../calendarUtils";

const repositionReducer = (
  state: { xAxis: number; yAxis: number },
  action: { type: string; payload?: { x: number; y: number } }
) => {
  switch (action.type) {
    case "MOVE":
      if (!action.payload) {
        return state;
      }
      return { xAxis: action.payload.x, yAxis: action.payload.y };
    case "RESET":
      return { xAxis: 0, yAxis: 0 };
    default:
      return state;
  }
};

export const useEventInteraction = (
  event: CalendarEvent,
  config: CalendarConfig
) => {
  const [updatedEvent, setUpdatedEvent] = useState(event);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isRepositioning, setIsRepositioning] = useState(false);
  const [repositionState, dispatchReposition] = useReducer(repositionReducer, {
    xAxis: 0,
    yAxis: 0,
  });

  const preventClickRef = useRef(false);
  const eventRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUpdatedEvent(event);
  }, [event]);

  const { refs, floatingStyles } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setPopoverOpen,
    placement: config.activeView === "Day" ? "top" : "right",
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
    elements: {
      reference: eventRef.current,
    },
  });

  useEffect(() => {
    if (!isPopoverOpen) {
      return;
    }

    const handleClickOutside = (_event: MouseEvent) => {
      if (!_event.target) {
        return;
      }

      if (
        refs.floating.current &&
        !refs.floating.current.contains(_event.target as Node) &&
        eventRef.current &&
        !eventRef.current.contains(_event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isPopoverOpen, refs.floating]);

  const handleEventClick = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>) => {
      if (preventClickRef.current) {
        preventClickRef.current = false;
        return;
      }

      if (_event.detail === 1) {
        if (config?.onClick) {
          config.onClick({ event: _event, calendarEvent: event });
        } else {
          setPopoverOpen((p) => !p);
        }
      } else if (_event.detail === 2) {
        if (config?.onDblClick) {
          config.onDblClick({ event: _event, calendarEvent: event });
        } else if (config.isEditMode) {
          setPopoverOpen(false);
          setEditModalOpen(true);
        }
      }
    },
    [config, event]
  );

  const handleEventDelete = useCallback(() => {
    if (config?.deleteEvent) {
      config.deleteEvent(event.id);
    }
    setPopoverOpen(false);
  }, [config, event.id]);

  const handleResizeMouseDown = useCallback(
    (_event: React.MouseEvent<HTMLDivElement>) => {
      if (!eventRef.current) {
        return;
      }

      const startY = _event.clientY;
      const initialHeight = eventRef.current.offsetHeight;
      let finalEndTime = updatedEvent.to_time;

      const resize = (moveEvent: MouseEvent) => {
        if (!eventRef.current || !event.from_time) {
          return;
        }
        preventClickRef.current = true;
        setIsResizing(true);
        const minuteHeight = config.hourHeight / 60;
        const height_15_min = minuteHeight * 15;
        const deltaY = moveEvent.clientY - startY;
        const newHeight = Math.max(height_15_min, initialHeight + deltaY);
        const snappedHeight =
          Math.round(newHeight / height_15_min) * height_15_min;

        eventRef.current.style.height = `${snappedHeight}px`;

        const newEndTimeMinutes =
          calculateMinutes(event.from_time) + snappedHeight / minuteHeight;
        finalEndTime = convertMinutesToHours(Math.min(1440, newEndTimeMinutes));
        setUpdatedEvent((prev) => ({ ...prev, to_time: finalEndTime }));
      };

      const stopResize = () => {
        setIsResizing(false);
        if (config?.updateEventState) {
          config.updateEventState({ ...event, to_time: finalEndTime });
        }
        window.removeEventListener("mousemove", resize);
        window.removeEventListener("mouseup", stopResize);
      };

      window.addEventListener("mousemove", resize);
      window.addEventListener("mouseup", stopResize, { once: true });
    },
    [event, config, updatedEvent.to_time]
  );

  const handleRepositionMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const startY = e.clientY;
      let finalEventState = { ...updatedEvent };

      const mousemove = (moveEvent: MouseEvent) => {
        if (!event.from_time || !event.to_time) {
          return;
        }
        preventClickRef.current = true;
        setIsRepositioning(true);
        setPopoverOpen(false);

        const minuteHeight = config.hourHeight / 60;
        const height_15_min = minuteHeight * 15;
        const deltaY = moveEvent.clientY - startY;
        const snappedY = Math.round(deltaY / height_15_min) * height_15_min;
        dispatchReposition({ type: "MOVE", payload: { x: 0, y: snappedY } });

        const minuteDelta = Math.round(snappedY / minuteHeight);
        const fromMinutes = calculateMinutes(event.from_time) + minuteDelta;
        const toMinutes = calculateMinutes(event.to_time) + minuteDelta;

        finalEventState = {
          ...finalEventState,
          from_time: convertMinutesToHours(fromMinutes),
          to_time: convertMinutesToHours(toMinutes),
        };
        setUpdatedEvent(finalEventState);
      };

      const mouseup = () => {
        setIsRepositioning(false);
        if (config?.updateEventState) {
          config?.updateEventState(finalEventState);
        }
        dispatchReposition({ type: "RESET" });
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup, { once: true });
    },
    [updatedEvent, event.from_time, event.to_time, config]
  );

  return {
    updatedEvent,
    isPopoverOpen,
    isEditModalOpen,
    isResizing,
    isRepositioning,
    repositionState,
    eventRef,
    floatingRefs: refs,
    floatingStyles,
    setEditModalOpen,
    setPopoverOpen,
    handleEventClick,
    handleEventDelete,
    handleResizeMouseDown,
    handleRepositionMouseDown,
  };
};

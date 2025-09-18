import React, { useCallback, useContext, useEffect, useState } from "react";
import clsx from "clsx";

import { calculateDiff, colorMap, handleSeconds } from "./calendarUtils";
import { Button } from "../button";
import type { CalendarEvent } from "./types";
import { Dialog } from "../dialog";
import { ErrorMessage } from "../errorMessage";
import { FormControl } from "../formControl";

import "./eventFormModal.css";
import { CalendarContext } from "./calendarContext";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Partial<CalendarEvent>;
}

const EventFormModal = ({
  isOpen,
  onClose,
  event,
}: EventFormModalProps) => {
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const { updateEventState, createNewEvent } = useContext(CalendarContext);

  useEffect(() => {
    setNewEvent({
      title: event?.title || "",
      date: event?.date || new Date(),
      participant: event?.participant || "",
      from_time: event?.from_time || "",
      to_time: event?.to_time || "",
      venue: event?.venue || "",
      color: event?.color || "green",
      isFullDay: event?.isFullDay || false,
      id: event?.id,
    });
    setErrorMessage("");
  }, [isOpen, event]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFieldChange = useCallback((field: keyof CalendarEvent, value: any) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateFields = useCallback((): boolean => {
    if (!newEvent.date) {
      setErrorMessage("Date is required");
      return false;
    }
    if (!newEvent.isFullDay) {
      if (!newEvent.from_time) {
        setErrorMessage("Start Time is required");
        return false;
      }
      if (!newEvent.to_time) {
        setErrorMessage("End Time is required");
        return false;
      }
      const timeDiff = calculateDiff(newEvent.from_time, newEvent.to_time);
      if (timeDiff <= 0) {
        setErrorMessage("Start time must be before End Time");
        return false;
      }
    }
    setErrorMessage("");
    return true;
  }, [newEvent.date, newEvent.from_time, newEvent.isFullDay, newEvent.to_time]);

  const handleSubmit = useCallback(() => {
    if (!validateFields()) {
      return;
    }

    const finalEvent = { ...newEvent };

    if (finalEvent.isFullDay) {
      finalEvent.from_time = "";
      finalEvent.to_time = "";
    } else {
      finalEvent.from_time = handleSeconds(finalEvent.from_time || "00:00");
      finalEvent.to_time = handleSeconds(finalEvent.to_time || "00:00");
    }

    if (event.id) {
      updateEventState(finalEvent as CalendarEvent);
    } else {
      const id = "#" + Math.random().toString(36).substring(3, 9);
      finalEvent.id = id;
      createNewEvent(finalEvent as CalendarEvent);
    }
    onClose();
  }, [createNewEvent, event.id, newEvent, onClose, updateEventState, validateFields]);

  const colorOptions = Object.keys(colorMap).map((color) => ({
    label: color,
    value: color,
  }));

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
      options={{
        title: event.id ? "Edit Event" : "New Event",
      }}
      actions={
        <div className="flex w-full flex-row-reverse">
          <Button variant="solid" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-4">
        <FormControl
          type="text"
          value={newEvent.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("title", e.target.value)
          }
          label="Title"
          placeholder="e.g., Meet with John Doe"
        />
        <FormControl
          type="date"
          value={newEvent.date}
          onChange={(val: React.ChangeEvent<HTMLInputElement>) => handleFieldChange("date", val)}
          label="Date"
          required={true}
          onBlur={validateFields}
        />
        <FormControl
          type="text"
          value={newEvent.participant}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("participant", e.target.value)
          }
          label="Person"
          placeholder="e.g., John Doe"
        />
        {!newEvent.isFullDay && (
          <>
            <FormControl
              type="time"
              value={newEvent.from_time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("from_time", e.target.value)
              }
              label="Start Time"
              onBlur={validateFields}
            />
            <FormControl
              type="time"
              value={newEvent.to_time}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFieldChange("to_time", e.target.value)
              }
              label="End Time"
              onBlur={validateFields}
            />
          </>
        )}
        <FormControl
          type="text"
          value={newEvent.venue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("venue", e.target.value)
          }
          label="Venue"
          placeholder="e.g., Frappe, Neelkanth Business Park"
        />
        <FormControl
          type="select"
          value={newEvent.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFieldChange("color", e.target.value)
          }
          options={colorOptions}
          label="Color"
          className="form-control-prefix"
          prefix={() => (
            <div
              className={clsx(
                "h-5 w-5 rounded-full shadow-md",
                colorMap[newEvent.color || "green"]?.background_color ||
                  "bg-green-100"
              )}
            />
          )}
        />
        <FormControl
          type="checkbox"
          label="Full Day Event?"
          value={newEvent.isFullDay}
          onChange={(value: boolean) => 
            handleFieldChange("isFullDay", value)
          }
        />
        {errorMessage && <ErrorMessage message={errorMessage} />}
      </div>
    </Dialog>
  );
};

export default EventFormModal;
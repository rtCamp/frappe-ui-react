import {
  Calendar as CalendarIcon,
  Clock,
  Edit2,
  MapPin,
  Trash2,
  User,
  X,
} from "lucide-react";

import type { CalendarEvent } from "./types";
import { parseDateEventPopupFormat } from "./calendarUtils";

// Define the component's props interface
interface EventModalContentProps {
  calendarEvent: CalendarEvent;
  date: Date;
  isEditMode?: boolean;
  onClose: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const EventModalContent = ({
  calendarEvent,
  date,
  isEditMode = false,
  onClose,
  onEdit,
  onDelete,
}: EventModalContentProps) => {
  return (
    <div className="w-80 rounded bg-surface-white p-4 text-ink-gray-8 shadow-lg">
      <div className="flex flex-row-reverse gap-3 text-ink-gray-5">
        <button onClick={onClose} className="hover:text-ink-gray-8">
          <X size={16} />
        </button>
        {isEditMode && (
          <>
            <button onClick={onEdit} className="hover:text-ink-gray-8">
              <Edit2 size={16} />
            </button>
            <button onClick={onDelete} className="hover:text-ink-gray-8">
              <Trash2 size={16} />
            </button>
          </>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-5">
        <div className="flex justify-between text-xl font-semibold break-all">
          <span>{calendarEvent.title || "New Event"}</span>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-ink-gray-5" />
            <span className="text-sm">{parseDateEventPopupFormat(date)}</span>
          </div>
          {calendarEvent.participant && (
            <div className="flex items-center gap-2 break-all">
              <User size={16} className="text-ink-gray-5 shrink-0" />
              <span className="text-sm">{calendarEvent.participant}</span>
            </div>
          )}
          {calendarEvent.from_time && calendarEvent.to_time && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-ink-gray-5" />
              <span className="text-sm">
                {calendarEvent.from_time} - {calendarEvent.to_time}
              </span>
            </div>
          )}
          {calendarEvent.venue && (
            <div className="flex items-center gap-2 break-all">
              <MapPin size={16} className="text-ink-gray-5 shrink-0" />
              <span className="text-sm">{calendarEvent.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * External dependencies.
 */
import { useState } from "react";
import { GripVertical, X } from "lucide-react";

/**
 * Internal dependencies.
 */
import type { WidgetWrapperProps } from "./types";
import { Button } from "../button";

export const WidgetWrapper: React.FC<WidgetWrapperProps> = ({
  widgetId,
  onRemove,
  layoutLock = false,
  dragHandle = false,
  dragHandleOnHover = false,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const showDragHandle =
    dragHandle && !layoutLock && (!dragHandleOnHover || isHovered);
  const showRemoveButton = !layoutLock && isHovered && onRemove;

  return (
    <div
      className="w-full h-full relative"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {(showRemoveButton || showDragHandle) && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
          {showRemoveButton && (
            <Button
              onClick={() => onRemove(widgetId)}
              icon={() => <X className="w-4 h-4" />}
            />
          )}
          {showDragHandle && (
            <Button
              className="dashboard-drag-handle cursor-grab! active:cursor-grabbing!"
              icon={() => <GripVertical className="w-4 h-4" />}
            />
          )}
        </div>
      )}
      <div className="w-full h-full overflow-auto">{children}</div>
    </div>
  );
};

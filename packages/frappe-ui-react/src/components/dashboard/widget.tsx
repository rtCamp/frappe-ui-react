import { useDraggable } from "@dnd-kit/core";
import type { WidgetProps } from "./types";

export const Widget: React.FC<WidgetProps> = ({ layout }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: layout.id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-full h-full"
    >
      <layout.component {...layout.props} />
    </div>
  );
};

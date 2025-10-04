import { createContext, useContext, useMemo } from "react";
import type { CSSProperties } from "react";
import type {
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WidgetContainerProps } from "./widgetList";
import { DownSolid } from "../../icons";

interface Context {
  attributes: Record<string, any>;
  listeners: DraggableSyntheticListeners;
  ref(node: HTMLElement | null): void;
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() { }
});

export function WidgetContainer({
  id,
  title,
  Widget,
  isWidgetOpen,
  toggle
}: WidgetContainerProps) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition
  } = useSortable({ id });
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef
    }),
    [attributes, listeners, setActivatorNodeRef]
  );
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition
  };

  return (
    <SortableItemContext.Provider value={context}>
      <li className="flex flex-col px-2 py-1.5 rounded-lg border border-black list-none" ref={setNodeRef} style={style}>
        <div className='w-full flex justify-between cursor-pointer px-2 py-1.5'>
          <DragHandle title={title} />
          <button onClick={toggle}>
            <DownSolid className={`${isWidgetOpen && "rotate-180"}`} />
          </button>
        </div>
        {/* Separator */}
        <hr className={`${!isWidgetOpen && "hidden"} my-2 border-t border-outline-gray-1`} />
        {/* Content */}
        <div className={`${!isWidgetOpen && "hidden"}`} >
          <Widget />
        </div>
      </li>
    </SortableItemContext.Provider>
  );
}

export function DragHandle({ title }: { title: string }) {
  const { attributes, listeners, ref } = useContext(SortableItemContext);

  {/* TODO: Use icon button. Blocked by issue #38 */ }
  return (
    <button className="text-black font-normal" {...attributes} {...listeners} ref={ref}>
      <h2>
        {title}
      </h2>
    </button>
  );
}

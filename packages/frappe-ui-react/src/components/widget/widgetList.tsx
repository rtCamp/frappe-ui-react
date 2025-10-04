import React, { useMemo, useState } from "react";
import type { JSX } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

import { Overlay } from "./overlay";
import { WidgetContainer } from "./widgetContainer";

export interface Widget {
  id: UniqueIdentifier;
  title: string;
  Widget: ()=> JSX.Element;
}

export interface WidgetContainerProps extends Widget{
  isWidgetOpen: boolean
  toggle: ()=> void
}

interface WidgetListProps {
  widgets: Widget[];
}

export function WidgetList({
  widgets,
}: WidgetListProps) {
  const [items, setItems] = useState(widgets.map((widget) => ({ ...widget, isWidgetOpen: false })));

  const toggleWidget = (widgetid: Widget["id"]) => {
    setItems((items) =>
      items.map(item =>
        item.id === widgetid
          ? { ...item, isWidgetOpen: !item.isWidgetOpen }
          : item
      )
    )
  }

  const swapWidgets = (activeId: Widget["id"], overId: Widget["id"]) => {
    setItems((items) => {
      const activeIndex = items.findIndex(({ id }) => id === activeId);
      const overIndex = items.findIndex(({ id }) => id === overId);
      return arrayMove(items, activeIndex, overIndex)
    })
  }

  const [active, setActive] = useState<Active | null>(null);
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  );


  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
      }}
      onDragEnd={({ active, over }) => {
        if (!over || !active || active.id === over.id) {
          return;
        }
        swapWidgets(active.id, over.id)
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        <ul className="m-10 flex flex-col gap-1.5 list-none" role="application">
          {items.map(({id,title,Widget,isWidgetOpen}) => (
            <React.Fragment key={id}>
              <WidgetContainer id={id} title={title} Widget={Widget} isWidgetOpen={isWidgetOpen} toggle={() => toggleWidget(id)} />
            </React.Fragment>
          ))}
        </ul>
      </SortableContext>
      <Overlay>
        {activeItem &&(
          <WidgetContainer id={activeItem.id} title={activeItem.title} Widget={activeItem.Widget} isWidgetOpen={activeItem.isWidgetOpen} toggle={() => { }} />
        )}
      </Overlay>
    </DndContext>
  );
}

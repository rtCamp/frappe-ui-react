import { useState } from 'react';
import { BaseItem, WidgetList } from './widgetList';
import { Triangle } from 'lucide-react';

export function WidgetDropArea({ widgets }: { widgets: BaseItem[] }) {
  const [items, setItems] = useState(widgets.map((widget) => ({ ...widget, isWidgetOpen: false })));

  return (
      <WidgetList
        items={items}
        onChange={setItems}
        renderItem={({ id, title, Widget, isWidgetOpen }) => {
          const toggle = () => {
            setItems((items) =>
              items.map(item =>
                item.id === id
                  ? { ...item, isWidgetOpen: !item.isWidgetOpen }
                  : item
              )
            )
          }
          return (
            <WidgetContainer id={id} title={title} Widget={Widget} isWidgetOpen={isWidgetOpen} toggle={toggle} />
          )
        }}
      />
  );
};

export const WidgetContainer = ({
  id,
  title,
  Widget,
  isWidgetOpen,
  toggle
}: BaseItem) => {
  return (
    <WidgetList.Item id={id}>
      <div className='w-full flex justify-between cursor-pointer '>
        <WidgetList.DragHandle title={title} />
        <button onClick={toggle}>
          <Triangle className={`${!isWidgetOpen && "rotate-180"}`} />
        </button>
      </div>
      {/* Separator */}
      <hr className={`${!isWidgetOpen && "hidden"} my-2 border-t border-outline-gray-1`} />
      {/* Content */}
      <div className={`${!isWidgetOpen && "hidden"}`} >
        <Widget />
      </div>
    </WidgetList.Item>
  );
};

import { LayoutItem } from "./types";

export const flattenLayout = (layout: LayoutItem) => {
  const flatListMap = new Map();

  const flatten = (
    item: LayoutItem,
    path: number[] = [],
    parentId: string | null = null
  ) => {
    flatListMap.set(item.id, {
  	...item,
  	path: path,
  	parentId: parentId,
  	index: path[path.length - 1] ?? 0,
    });

    if ("slots" in item && item.slots && item.slots.length > 0) {
  	item.slots.forEach((slotItem, index) => {
  	  if (slotItem.type !== "empty") {
  		flatten(slotItem, [...path, index], item.id);
  	  }
  	});
    }
  };  
  flatten(layout, [0], null);
  return flatListMap;
}

export const deepClone = (item: LayoutItem): LayoutItem => {
  if (item.type === "empty" || item.type === "component") {
    return { ...item };
  }
  return {
    ...item,
    slots: item.slots.map((slotItem) => deepClone(slotItem)),
  };
};

export const findContainerById = (
  item: LayoutItem,
  id: string
): LayoutItem | null => {
  if (item.id === id) return item;
  if (item.type !== "empty" && "slots" in item) {
    for (const slotItem of item.slots) {
      const found = findContainerById(slotItem, id);
      if (found) return found;
    }
  }
  return null;
};
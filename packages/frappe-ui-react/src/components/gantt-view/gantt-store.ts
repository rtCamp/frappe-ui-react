import { createContext, useContext } from "react";
import { createStore, useStore } from "zustand";
import { useShallow } from "zustand/react/shallow";
import { startOfWeek } from "date-fns";
import { ROW_HEADER_WIDTH } from "./constants";
import type { Member } from "./types";

interface GanttProps {
  members: Member[];
  showWeekend: boolean;
  startDate: Date;
  weekCount: number;
}

interface GanttState extends GanttProps {
  // derived
  daysPerWeek: number;
  columnCount: number;
  weekStart: Date;
  weeks: number[];
  columns: number[];
  // ui state
  expandedRows: Set<number>;
  headerWidth: number;
  resizeHandleActive: boolean;

  toggleRow: (index: number) => void;
  setHeaderWidth: (width: number) => void;
  setResizeHandleActive: (active: boolean) => void;
  startResize: (startX: number) => void;
}

export type GanttStore = ReturnType<typeof createGanttStore>;

export const createGanttStore = (initProps: GanttProps) => {
  const daysPerWeek = initProps.showWeekend ? 7 : 5;
  const columnCount = initProps.weekCount * daysPerWeek;
  const weekStart = startOfWeek(initProps.startDate, {
    weekStartsOn: 1,
  });
  const weeks = Array.from({ length: initProps.weekCount }, (_, i) => i);
  const columns = Array.from({ length: columnCount }, (_, i) => i);

  return createStore<GanttState>()((set, get) => ({
    ...initProps,
    daysPerWeek,
    columnCount,
    weekStart,
    weeks,
    columns,
    expandedRows: new Set(),
    headerWidth: ROW_HEADER_WIDTH,
    resizeHandleActive: false,

    toggleRow: (index) =>
      set((state) => {
        const next = new Set(state.expandedRows);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return { expandedRows: next };
      }),

    setHeaderWidth: (width) => set({ headerWidth: width }),

    setResizeHandleActive: (active) => set({ resizeHandleActive: active }),

    startResize: (startX) => {
      const startWidth = get().headerWidth;
      set({ resizeHandleActive: true });

      const onMouseMove = (e: MouseEvent) => {
        get().setHeaderWidth(Math.max(120, startWidth + (e.clientX - startX)));
      };
      const onMouseUp = () => {
        set({ resizeHandleActive: false });
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
  }));
};

export const GanttContext = createContext<GanttStore | null>(null);

export function useGanttStore<T>(
  selector: (state: GanttState) => T,
  deep?: true
): T {
  const store = useContext(GanttContext);
  if (!store) throw new Error("Missing GanttContext.Provider in the tree");
  const shallowSelector = useShallow(selector);
  return useStore(store, deep ? selector : shallowSelector);
}

/** A column the selector can show, add or remove. */
export type SelectorColumn = {
  /** Text shown in the selector row and in the Add Column search. */
  label: string;
  /** Stable identifier; used for keys and de-duplication. */
  value: string;
};

/** Every user-facing string, overridable for i18n via `ColumnSelectorProps.labels`. */
export type ColumnSelectorLabels = {
  /** Trigger button text and its `aria-label`. */
  trigger: string;
  /** Footer action that opens the Add Column search. */
  addColumn: string;
  /** Shown in the Add Column search when every available column is already active. */
  noColumnsAvailable: string;
  /** Footer action wired to `onReset`. */
  resetToDefault: string;
  /** Prefix of each row's remove-button `aria-label`, followed by the column label. */
  remove: string;
  /** Prefix of each row's drag-handle `aria-label`, followed by the column label. */
  reorder: string;
};

/** Props for `ColumnSelector`. */
export interface ColumnSelectorProps {
  /** Active columns, in display order. */
  columns: SelectorColumn[];
  /** Receives the full next `columns` array after an add or remove. */
  onColumnsChange: (columns: SelectorColumn[]) => void;
  /**
   * Every column the user may add. Entries whose `value` is already in
   * `columns` are hidden from the Add Column search.
   */
  availableColumns: SelectorColumn[];

  /**
   * Show a drag handle on each row and allow reordering by pointer or
   * keyboard (focus the handle, Space to lift, arrows to move, Space to drop).
   * @default true
   */
  reorderable?: boolean;
  /**
   * Remove buttons are hidden once `columns.length` reaches this count.
   * @default 1
   */
  minColumns?: number;
  /**
   * Renders the "Reset to Default" footer action when provided. The
   * component only fires it; restoring the default `columns` is
   * the consumer's job.
   */
  onReset?: () => void;

  /**
   * Render the trigger as an icon-only button. The label stays available
   * to assistive tech via `aria-label`.
   * @default false
   */
  hideLabel?: boolean;
  /**
   * Disables the trigger.
   * @default false
   */
  disabled?: boolean;
  /** Partial overrides merged over the English defaults. */
  labels?: Partial<ColumnSelectorLabels>;
}

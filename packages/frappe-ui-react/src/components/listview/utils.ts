export function getGridTemplateColumns(
  columns: { width?: number | string }[],
  withCheckbox = true
) {
  const checkBoxWidth = withCheckbox ? "14px " : "";
  const columnsWidth = columns
    .map((col) => {
      const width = col.width || 1;
      if (typeof width === "number") {
        return width + "fr";
      }
      return width;
    })
    .join(" ");
  return checkBoxWidth + columnsWidth;
}

export const alignmentMap = {
  left: "justify-start",
  start: "justify-start",
  center: "justify-center",
  middle: "justify-center",
  right: "justify-end",
  end: "justify-end",
};

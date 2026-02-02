/**
 * External dependencies.
 */
import clsx from "clsx";
import { useCurrentEditor } from "@tiptap/react";

/**
 * Internal dependencies.
 */
import { Popover } from "../../../popover";

interface FontColorProps {
  children: (props: {
    isActive?: boolean;
    onClick?: () => void;
  }) => React.ReactNode;
}

type Color = {
  name: string;
  value: string;
};

const foregroundColors: Color[] = [
  { name: "Default", value: "#171717" },
  { name: "Red", value: "#cc2929" },
  { name: "Orange", value: "#d45a08" },
  { name: "Yellow", value: "#d1930d" },
  { name: "Green", value: "#278f5e" },
  { name: "Teal", value: "#0b9e92" },
  { name: "Cyan", value: "#32a4c7" },
  { name: "Blue", value: "#007be0" },
  { name: "Purple", value: "#8642c2" },
  { name: "Pink", value: "#cf3a96" },
  { name: "Gray", value: "#7c7c7c" },
];

const backgroundColors: Color[] = [
  { name: "Default", value: "#ffffff" },
  { name: "Red", value: "#ffe7e7" },
  { name: "Orange", value: "#ffefe4" },
  { name: "Yellow", value: "#fff7d3" },
  { name: "Green", value: "#e4faeb" },
  { name: "Teal", value: "#e6f7f4" },
  { name: "Cyan", value: "#ddf7ff" },
  { name: "Blue", value: "#e6f4ff" },
  { name: "Purple", value: "#f6e9ff" },
  { name: "Pink", value: "#fde8f5" },
  { name: "Gray", value: "#f3f3f3" },
];

const FontColor = ({ children }: FontColorProps) => {
  const { editor } = useCurrentEditor();

  const setForegroundColor = (color: Color) => {
    if (!editor) {
      return;
    }
    editor.chain().focus().setColor(color.value).run();
  };

  const setBackgroundColor = (color: Color) => {
    if (!editor) {
      return;
    }
    editor.chain().focus().setHighlight({ color: color.value }).run();
  };

  return (
    <Popover
      transition="default"
      target={({ togglePopover, isOpen }) =>
        children({
          isActive: isOpen,
          onClick: () => togglePopover(),
        })
      }
      body={({ close }) => (
        <div className="w-max rounded-lg border border-outline-gray-1 bg-surface-modal shadow-xl">
          <div className="p-2">
            <div className="text-sm text-ink-gray-7">Text Color</div>
            <div className="mt-1 grid grid-cols-6 gap-1">
              {foregroundColors.map((color) => (
                <button
                  key={color.name}
                  aria-label={color.name}
                  className={clsx(
                    "flex shrink-0 h-5 w-5 items-center justify-center rounded border border-outline-gray-1 text-base"
                  )}
                  style={{
                    color: color.value,
                  }}
                  onClick={() => {
                    setForegroundColor(color);
                    close();
                  }}
                  title={color.name}
                >
                  A
                </button>
              ))}
            </div>
            <div className="text-sm text-ink-gray-7">Background Color</div>
            <div className="mt-1 grid grid-cols-6 gap-1">
              {backgroundColors.map((color) => (
                <div key={color.name} className="flex">
                  <button
                    title={"Highlight " + color.name}
                    aria-label={"Highlight " + color.name}
                    className={clsx(
                      "flex shrink-0 h-5 w-5 items-center justify-center rounded border border-outline-gray-1 text-base",
                      {
                        "border-transparent": color.name !== "Default",
                      }
                    )}
                    style={{
                      backgroundColor: color.value,
                    }}
                    onClick={() => {
                      setBackgroundColor(color);
                      close();
                    }}
                  >
                    A
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default FontColor;

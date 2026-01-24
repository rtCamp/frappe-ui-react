/**
 * External dependencies.
 */
import clsx from "clsx";
import { useCurrentEditor } from "@tiptap/react";

/**
 * Internal dependencies.
 */
import { Popover } from "../../../popover";
import { Tooltip } from "../../../tooltip";

interface FontColorProps {
  children: (props: {
    isActive?: boolean;
    onClick?: () => void;
  }) => React.ReactNode;
}

const foregroundColors: string[] = [
  "#171717",
  "#cc2929",
  "#d45a08",
  "#d1930d",
  "#0f814a",
  "#13564f",
  "#0b9e92",
  "#007be0",
  "#8642c2",
  "#cf3a96",
  "#343434",
];

const backgroundColors: string[] = [
  "#000000b8",
  "#ffe7e7",
  "#ffefe4",
  "#fff7d3",
  "#e4faeb",
  "#e6f7f4",
  "#ddf7ff",
  "#e6f4ff",
  "#f6e9ff",
  "#fde8f5",
  "#d4d4d4",
];

const FontColor = ({ children }: FontColorProps) => {
  const { editor } = useCurrentEditor();

  const setForegroundColor = (color: string) => {
    if (!editor) {
      return;
    }
    editor.chain().focus().setColor(color).run();
  };

  const setBackgroundColor = (color: string) => {
    if (!editor) {
      return;
    }
    editor.chain().focus().setHighlight({ color }).run();
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
                <div key={color} className="flex">
                  <Tooltip text={color}>
                    <button
                      aria-label={color}
                      className={clsx(
                        "flex shrink-0 h-5 w-5 items-center justify-center rounded border border-outline-gray-1 text-base"
                      )}
                      style={{
                        color,
                      }}
                      onClick={() => {
                        setForegroundColor(color);
                        close();
                      }}
                    >
                      A
                    </button>
                  </Tooltip>
                </div>
              ))}
            </div>
            <div className="text-sm text-ink-gray-7">Background Color</div>
            <div className="mt-1 grid grid-cols-6 gap-1">
              {backgroundColors.map((color) => (
                <div key={color} className="flex">
                  <Tooltip text={color}>
                    <button
                      aria-label={color}
                      className={clsx(
                        "flex shrink-0 h-5 w-5 items-center justify-center rounded border border-outline-gray-1 text-base"
                      )}
                      style={{
                        backgroundColor: color,
                      }}
                      onClick={() => {
                        setBackgroundColor(color);
                        close();
                      }}
                    >
                      A
                    </button>
                  </Tooltip>
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

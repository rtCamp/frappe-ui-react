import { useCallback, useState, type FC } from "react";
import type { WidgetContainerProps } from "./types";
import { Triangle } from "lucide-react";

const WidgetContainer: FC<WidgetContainerProps> = ({
  title,
  children,
}) => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((isOpen) => !isOpen)
  }, [setIsOpen])

  return (
    <div className="w-full p-1.5 rounded-lg bg-surface-modal ring-1 ring-black focus:outline-none border border-outline-gray-1">
      {/* Header */}
      <div className="text-ink-gray-8 active:bg-surface-gray-4">
        <button onClick={toggleOpen} className={`w-full flex justify-between`}>
          <h2 className="text-ink-gray-8">
            {title}
          </h2>
          {/* TODO: Use icon button. Blocked by issue #38 */}
          <Triangle className={`${isOpen ? "rotate-0" : "rotate-180"}`} />
        </button>
      </div>
      {/* Separator */}
      <hr className={`${!isOpen && "hidden"} my-2 border-t border-outline-gray-1`} />
      {/* Content */}
      <div className={`${!isOpen && "hidden"}`}>
        {children}
      </div>
    </div>
  );
};

export default WidgetContainer;

import React, { useState, useMemo, useEffect, useRef } from "react";
import { FormControl } from "../formControl";
import { Tooltip } from "../tooltip";
import KeyboardShortcut from "../keyboardShortcut";
import { PasswordProps } from "./types";
import { Eye, EyeOff } from "lucide-react";

const Password: React.FC<PasswordProps> = ({ value, ...attrs }) => {
  const [show, setShow] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showEye = useMemo(() => {
    return !value?.includes("*");
  }, [value]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "i") {
        e.preventDefault();
        setShow((prevShow) => !prevShow);
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("keydown", handleKeyDown);
      return () => {
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <FormControl
      htmlId={"1"}
      type={show ? "text" : "password"}
      value={value}
      {...attrs}
      ref={inputRef}
      prefix={
        attrs?.prefix
          ? () => attrs?.prefix && <div slot="prefix">{attrs?.prefix()}</div>
          : undefined
      }
      suffix={() => {
        return (
          <Tooltip
            body={
              <div className="rounded bg-surface-gray-7 py-1.5 px-2 text-xs text-ink-white shadow-xl">
                <span className="flex items-center gap-1">
                  {show ? "Hide Password" : "Show Password"}
                  <KeyboardShortcut
                    bg
                    ctrl
                    className="!bg-surface-gray-5 !text-ink-gray-2 px-1"
                  >
                    <span className="font-mono leading-none tracking-widest">
                      +I
                    </span>
                  </KeyboardShortcut>
                </span>
              </div>
            }
          >
            <div>
              {showEye && (
                <div
                  data-testid="eye-icon"
                  className="h-3 w-3 cursor-pointer mr-1"
                  onClick={() => setShow(!show)}
                >
                  {show ? (
                    <EyeOff className="h-full w-full" />
                  ) : (
                    <Eye className="h-full w-full" />
                  )}
                </div>
              )}
            </div>
          </Tooltip>
        );
      }}
    ></FormControl>
  );
};

export default Password;

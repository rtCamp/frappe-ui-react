/**
 * External dependencies.
 */
import { useState, useEffect, useRef } from "react";
import { Check, X, Copy, Pencil, Link2Off } from "lucide-react";

/**
 * Internal dependencies.
 */
import { Button } from "../../../button";
import { TextInput } from "../../../textInput";
import { isValidUrl } from "../../../../utils/urlValidation";

interface LinkPopupProps {
  href: string;
  onClose: () => void;
  onUpdateHref: (href: string) => void;
}

export const LinkPopup = ({ href, onClose, onUpdateHref }: LinkPopupProps) => {
  const [_href, setHref] = useState(href);
  const [edit, setEdit] = useState(href === "");
  const inputRef = useRef<HTMLInputElement>(null);

  const submitLink = () => {
    if (_href === "" || isValidUrl(_href)) {
      onUpdateHref(_href);
    }
  };

  const copyLink = async () => {
    if (_href) await navigator.clipboard.writeText(_href);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edit]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      submitLink();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div className="p-2 w-72 flex items-center gap-2 bg-surface-white shadow-xl rounded">
      {edit ? (
        <div className="w-full">
          <TextInput
            ref={inputRef}
            type="text"
            placeholder="https://example.com"
            value={_href}
            onChange={(e) => setHref(e.target.value)}
            onKeyDown={handleKeyDown}
            variant="subtle"
          />
        </div>
      ) : (
        <a
          className="text-ink-gray-700 underline text-sm flex-1 truncate pl-1"
          title={_href}
          href={_href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {_href}
        </a>
      )}
      <div className="shrink-0 flex items-center gap-1.5 ml-auto">
        {edit ? (
          <>
            <Button
              onClick={submitLink}
              tooltip="Save"
              icon={() => <Check className="w-4 h-4" />}
              variant="subtle"
            />
            <Button
              onClick={() => (href ? setEdit(false) : onUpdateHref(""))}
              tooltip="Exit"
              icon={() => <X className="w-4 h-4" />}
              variant="subtle"
            />
          </>
        ) : (
          <>
            <Button
              onClick={copyLink}
              tooltip="Copy"
              icon={() => <Copy className="w-4 h-4" />}
              variant="subtle"
            />
            <Button
              onClick={() => setEdit(true)}
              tooltip="Edit"
              icon={() => <Pencil className="w-4 h-4" />}
              variant="subtle"
            />
            <Button
              tooltip="Remove"
              variant="subtle"
              onClick={() => onUpdateHref("")}
              icon={() => <Link2Off className="w-4 h-4" />}
            />
          </>
        )}
      </div>
    </div>
  );
};

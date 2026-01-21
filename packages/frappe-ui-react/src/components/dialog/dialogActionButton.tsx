import { useState } from "react";
import { Button } from "../button";
import type { DialogActionButtonProps } from "./types";

export const DialogActionButton = ({
  action,
  close,
}: DialogActionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!action.onClick) {
      close();
      return;
    }

    setLoading(true);
    try {
      await action.onClick({ close });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      {...action}
      className="w-full"
      disabled={action.disabled || loading}
      loading={loading}
      onClick={handleClick}
      data-testid="dialog-action"
    >
      {action.label}
    </Button>
  );
};

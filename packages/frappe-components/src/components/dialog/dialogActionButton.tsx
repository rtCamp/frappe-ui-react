import { useState } from 'react';
import { Button, type ButtonProps } from '../button';

export interface DialogActionContext {
  close: () => void;
}


export type DialogAction = Omit<ButtonProps, 'onClick'> & {
  label: string;
  onClick?: (context: DialogActionContext) => void | Promise<void>;
};

interface DialogActionButtonProps {
  action: DialogAction;
  close: () => void;
}

export const DialogActionButton = ({ action, close }: DialogActionButtonProps) => {
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
      style={{ cursor: "pointer" }}
      extraClassName="w-full"
      disabled={action.disabled || loading}
      loading={loading}
      onClick={handleClick}
    >
      {action.label}
    </Button>
  );
};
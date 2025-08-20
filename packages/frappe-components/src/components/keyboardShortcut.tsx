import React, { useMemo, ReactNode } from 'react';
import FeatherIcon from './featherIcon';

interface KeyboardShortcutProps {
  meta?: boolean;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  bg?: boolean;
  children?: ReactNode;
  className?: string;
}

const KeyboardShortcut: React.FC<KeyboardShortcutProps> = ({
  meta = false,
  ctrl = false,
  shift = false,
  alt = false,
  bg = false,
  children,
  className,
}) => {
  const isMac = useMemo(() => {
    if (typeof window !== 'undefined') {
      return navigator.userAgent.includes('Mac');
    }
    return false;
  }, []);

  const wrapperClasses = useMemo(() => {
    const baseClasses = 'inline-flex items-center gap-0.5 text-sm';
    const backgroundClasses = bg
      ? 'bg-surface-gray-2 rounded-sm text-ink-gray-5 py-0.5 px-1'
      : 'text-ink-gray-4';

    return `${baseClasses} ${backgroundClasses} ${className || ''}`;
  }, [bg, className]);

  return (
    <div className={wrapperClasses}>
      {(ctrl || meta) && (
        <span className="flex items-center">
          {isMac ? (
            <FeatherIcon name="Command" className="w-3 h-3" />
          ) : (
            <span>Ctrl</span>
          )}
        </span>
      )}
      {shift && (
        <span className="flex items-center">
          <FeatherIcon name="arrow-up" className="w-3 h-3" />
        </span>
      )}
      {alt && (
        <span className="flex items-center">
          <FeatherIcon name="Option"  className="w-3 h-3" />
        </span>
      )}
      {children}
    </div>
  );
};

export default KeyboardShortcut;

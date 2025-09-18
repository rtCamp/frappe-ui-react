import {
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
} from '@floating-ui/react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';

import type { CalendarEvent } from './types';
import { EventModalContent } from './eventModalContent';

interface FloatingEventModalProps {
  isOpen: boolean;
  targetElement: HTMLElement | null;
  calendarEvent: CalendarEvent;
  date: Date;
  activeView: 'monthly' | 'weekly' | 'daily';
  onClose: () => void;
}

const FloatingEventModal = ({
  isOpen,
  targetElement,
  calendarEvent,
  date,
  activeView,
  onClose,
}: FloatingEventModalProps) => {
  const { refs, floatingStyles } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
        if (!open) onClose();
    },
    elements: {
      reference: targetElement,
    },
    placement: activeView === 'daily' ? 'top' : 'right',
    middleware: [offset(10), flip(), shift()],
    whileElementsMounted: autoUpdate,
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const floatingElement = refs.floating.current;
      const target = e.target as Node;

      if (
        floatingElement &&
        !floatingElement.contains(target) &&
        targetElement &&
        !targetElement.contains(target)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, refs.floating, targetElement, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      ref={refs.setFloating}
      style={{ ...floatingStyles, zIndex: 100 }}
    >
      <EventModalContent
        calendarEvent={calendarEvent}
        date={date}
        onClose={onClose}
      />
    </div>,
    document.body
  );
};

export default FloatingEventModal;
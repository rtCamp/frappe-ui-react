import React, { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { Button } from '../button';
import type { DropdownProps, DropdownOption, DropdownGroupOption, DropdownOptions } from './types';
import FeatherIcon from '../featherIcon';

const cssClasses = {
  dropdownContent:
    'min-w-40 divide-y divide-(--outline-gray-modals) rounded-lg bg-(--surface-modal) shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dropdown-content',
  groupContainer: 'p-1.5',
  groupLabel: 'flex h-7 items-center px-2 text-sm font-medium text-(--ink-gray-6)',
  itemLabel: 'whitespace-nowrap text-(--ink-gray-7)',
  itemIcon: 'mr-2 h-4 w-4 flex-shrink-0 text-(--ink-gray-6)',
  chevronIcon: 'ml-auto h-4 w-4 flex-shrink-0 text-(--ink-gray-6)',
  itemButton:
    'group flex h-7 w-full items-center rounded px-2 text-base text-(--ink-gray-6) focus:bg-(--surface-gray-3) focus:outline-none data-[highlighted]:bg-(--surface-gray-3)',
  submenuTrigger:
    'group flex h-7 w-full items-center rounded px-2 text-base text-(--ink-gray-6) focus:bg-(--surface-gray-3) focus:outline-none data-[highlighted]:bg-(--surface-gray-3) data-[state=open]:bg-(--surface-gray-3)',
};

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  placement = 'left',
  button,
  children,
  ...attrs
}) => {
  const navigate = useNavigate();

  const handleItemClick = useCallback(
    (item: DropdownOption) => {
      if (item.route) {
        navigate(item.route);
      } else if (item.link) {
        window.open(item.link, '_blank');
      } else if (item.onClick) {
        item.onClick();
      }
    },
    [navigate]
  );

  const normalizeDropdownItem = useCallback(
    (option: DropdownOption): DropdownOption => {
      return {
        label: option.label,
        icon: option.icon,
        component: option.component,
        onClick: () => handleItemClick(option),
        submenu: option.submenu,
        condition: option.condition,
      };
    },
    [handleItemClick]
  );

  const filterAndNormalizeOptions = useCallback(
    (opts: DropdownOptions): DropdownOption[] => {
      return (opts || [])
        .filter(Boolean)
        .filter(
          (option) =>
            !('group' in option) &&
            ('condition' in option ? (option as DropdownOption).condition?.() ?? true : true)
        )
        .map((option) => normalizeDropdownItem(option as DropdownOption));
    },
    [normalizeDropdownItem]
  );

  const processOptionsIntoGroups = useCallback(
    (opts: DropdownOptions): DropdownGroupOption[] => {
      const groups: DropdownGroupOption[] = [];
      let currentGroup: DropdownGroupOption | null = null;
      let i = 0;

      for (const option of opts) {
        if (option == null) {
          continue;
        }

        if ('group' in option) {
          if (currentGroup && currentGroup.items.length > 0) {
            groups.push(currentGroup);
            currentGroup = null;
          }
          const groupOption: DropdownGroupOption = {
            ...option,
            key: `group-${i}`,
            items: filterAndNormalizeOptions(option.items),
          } as DropdownGroupOption;
          groups.push(groupOption);
        } else {
          if (!currentGroup) {
            currentGroup = {
              key: `nogroup-${i}`,
              group: '',
              hideLabel: true,
              items: [],
            };
          }
          const normalizedItems = filterAndNormalizeOptions([option]);
          if (normalizedItems.length > 0) {
            currentGroup.items.push(...normalizedItems);
          }
        }
        i++;
      }

      if (currentGroup && currentGroup.items.length > 0) {
        groups.push(currentGroup);
      }

      return groups;
    },
    [filterAndNormalizeOptions]
  );

  const groups = useMemo(() => processOptionsIntoGroups(options), [options, processOptionsIntoGroups]);

  const contentSide = 'bottom';
  const contentAlign = useMemo(() => {
    if (placement === 'left') return 'start';
    if (placement === 'right') return 'end';
    if (placement === 'center') return 'center';
    return 'start';
  }, [placement]);

  const renderDropdownItem = (item: DropdownOption) => {
    if (item.component) {
      const CustomComponent = item.component;
      return <CustomComponent active={false} />;
    } else if (item.submenu) {
      return (
        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger asChild>
            <button className={cssClasses.submenuTrigger}>
              {item.icon && <FeatherIcon name={item.icon} className={cssClasses.itemIcon} />}
              <span className={cssClasses.itemLabel}>{item.label}</span>
              <FeatherIcon name="chevron-right" className={cssClasses.chevronIcon} aria-hidden="true" />
            </button>
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent className={cssClasses.dropdownContent} sideOffset={4}>
              {processOptionsIntoGroups(item.submenu).map((submenuGroup) => (
                <div key={submenuGroup.key} className={cssClasses.groupContainer}>
                  {submenuGroup.group && !submenuGroup.hideLabel && (
                    <DropdownMenu.Label className={cssClasses.groupLabel}>
                      {submenuGroup.group}
                    </DropdownMenu.Label>
                  )}
                  {submenuGroup.items.map((subItem) => (
                    <DropdownMenu.Item key={subItem.label} asChild onSelect={subItem.onClick}>
                      {renderDropdownItem(subItem)}
                    </DropdownMenu.Item>
                  ))}
                </div>
              ))}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    } else {
      return (
        <button className={cssClasses.itemButton}>
          {item.icon && <FeatherIcon name={item.icon} className={cssClasses.itemIcon} />}
          <span className={cssClasses.itemLabel}>{item.label}</span>
        </button>
      );
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children ? (
          React.cloneElement(children as React.ReactElement, { ...attrs })
        ) : (
          <Button active={false} {...button} {...attrs}>
            {button?.label || 'Options'}
          </Button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${cssClasses.dropdownContent} ${
            placement === 'left'
              ? 'origin-top-left'
              : placement === 'right'
              ? 'origin-top-right'
              : 'origin-top'
          }`}
          side={contentSide}
          align={contentAlign}
          sideOffset={4}
        >
          {groups.map((group) => (
            <div key={group.key} className={cssClasses.groupContainer}>
              {group.group && !group.hideLabel && (
                <DropdownMenu.Label className={cssClasses.groupLabel}>
                  {group.group}
                </DropdownMenu.Label>
              )}
              {group.items.map((item) => (
                <DropdownMenu.Item key={item.label} asChild onSelect={item.onClick}>
                  {renderDropdownItem(item)}
                </DropdownMenu.Item>
              ))}
            </div>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
import React, { useMemo, useCallback } from "react";
import { Menu } from "@base-ui/react/menu";

import { Button, type ButtonProps } from "../button";
import { Switch } from "../switch";
import type {
  DropdownProps,
  DropdownOption,
  DropdownGroupOption,
  DropdownOptions,
} from "./types";
import FeatherIcon, { type FeatherIconProps } from "../featherIcon";
import clsx from "clsx";

const cssClasses = {
  dropdownContent:
    "min-w-40 divide-y divide-outline-gray-modals rounded-lg bg-surface-modal shadow-2xl ring-black focus:outline-none dropdown-content border border-outline-gray-1",
  groupContainer: "p-1.5",
  groupLabel: "flex h-7 items-center px-2 text-sm font-medium text-ink-gray-7",
  itemLabel: "whitespace-nowrap",
  itemIcon: "mr-2 h-4 w-4 flex-shrink-0",
  chevronIcon: "ml-auto h-4 w-4 flex-shrink-0",
  itemButton:
    "group flex h-7 w-full items-center rounded px-2 text-base focus:outline-none",
  submenuTrigger:
    "group flex h-7 w-full items-center rounded px-2 text-base text-ink-gray-6 focus:outline-none",
  dropdownPositioner: "z-100",
};

const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  placement = "left",
  button,
  children,
  ...attrs
}) => {
  const handleItemClick = useCallback((item: DropdownOption) => {
    if (item.link) {
      window.open(item.link, "_blank");
    } else if (item.onClick) {
      item.onClick();
    }
  }, []);

  const getIconColor = (item: DropdownOption) =>
    item.theme === "red" ? "text-ink-red-3" : "text-ink-gray-6";

  const getTextColor = (item: DropdownOption) =>
    item.theme === "red" ? "text-ink-red-3" : "text-ink-gray-7";

  const getBackgroundColor = (item: DropdownOption) =>
    item.theme === "red"
      ? "focus:bg-surface-red-3 data-[highlighted]:bg-surface-red-3 data-[state=open]:bg-surface-red-3"
      : "focus:bg-surface-gray-4 data-[highlighted]:bg-surface-gray-4 data-[state=open]:bg-surface-gray-4";

  const getSubmenuBackgroundColor = (item: DropdownOption) =>
    getBackgroundColor(item) +
    " data-[state=open]:bg-surface-" +
    (item.theme === "red" ? "red-3" : "gray-4");

  const normalizeDropdownItem = useCallback(
    (option: DropdownOption): DropdownOption => {
      return {
        label: option.label,
        icon: option.icon,
        component: option.component,
        onClick: option.switch ? option.onClick : () => handleItemClick(option),
        submenu: option.submenu,
        condition: option.condition,
        theme: option.theme,
        disabled: option.disabled,
        switch: option.switch,
        switchValue: option.switchValue,
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
            !("group" in option) &&
            ("condition" in option
              ? ((option as DropdownOption).condition?.() ?? true)
              : true)
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

        if ("group" in option) {
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
              group: "",
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

  const groups = useMemo(
    () => processOptionsIntoGroups(options),
    [options, processOptionsIntoGroups]
  );

  const contentSide = "bottom";
  const contentAlign = useMemo(() => {
    if (placement === "left") return "start";
    if (placement === "right") return "end";
    if (placement === "center") return "center";
    return "start";
  }, [placement]);

  const renderDropdownItem = (item: DropdownOption) => {
    if (item.component) {
      const CustomComponent = item.component;
      return <CustomComponent active={false} />;
    } else if (item.switch) {
      return (
        <div
          className={`${cssClasses.itemButton} ${getTextColor(item)}`}
          onClick={(e) => e.preventDefault()}
        >
          {item.icon &&
            (typeof item.icon === "string" ? (
              <FeatherIcon
                name={item.icon as FeatherIconProps["name"]}
                className={`${cssClasses.itemIcon} ${getIconColor(item)}`}
              />
            ) : React.isValidElement(item.icon) ? (
              item.icon
            ) : null)}
          <span className={cssClasses.itemLabel}>{item.label}</span>
          <Switch
            className="ml-auto"
            value={item.switchValue || false}
            onChange={(checked) => item.onClick?.(checked)}
          />
        </div>
      );
    } else if (item.submenu) {
      return (
        <Menu.SubmenuRoot>
          <Menu.SubmenuTrigger
            render={
              <Button
                variant="ghost"
                iconLeft={() =>
                  item.icon &&
                  (typeof item.icon === "string" ? (
                    <FeatherIcon
                      name={item.icon as FeatherIconProps["name"]}
                      className={clsx(cssClasses.itemIcon, getIconColor(item))}
                    />
                  ) : React.isValidElement(item.icon) ? (
                    item.icon
                  ) : null)
                }
                iconRight={() => (
                  <FeatherIcon
                    name="chevron-right"
                    className={cssClasses.chevronIcon}
                    aria-hidden="true"
                  />
                )}
                className={clsx(
                  cssClasses.submenuTrigger,
                  getSubmenuBackgroundColor(item)
                )}
              >
                <span
                  className={cssClasses.itemLabel}
                  data-testid="dropdown-submenu-trigger"
                >
                  {item.label}
                </span>
              </Button>
            }
            nativeButton={true}
          />
          <Menu.Portal>
            <Menu.Positioner
              sideOffset={4}
              className={cssClasses.dropdownPositioner}
            >
              <Menu.Popup className={cssClasses.dropdownContent}>
                {processOptionsIntoGroups(item.submenu).map((submenuGroup) => (
                  <Menu.Group
                    key={submenuGroup.key}
                    className={cssClasses.groupContainer}
                  >
                    {submenuGroup.group && !submenuGroup.hideLabel && (
                      <Menu.GroupLabel className={cssClasses.groupLabel}>
                        {submenuGroup.group}
                      </Menu.GroupLabel>
                    )}
                    {submenuGroup.items.map((subItem) => (
                      <Menu.Item
                        key={subItem.label}
                        onClick={() => subItem.onClick?.()}
                        render={renderDropdownItem(subItem)}
                        nativeButton={
                          !subItem.switch &&
                          !subItem.submenu &&
                          !subItem.component
                        }
                      />
                    ))}
                  </Menu.Group>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.SubmenuRoot>
      );
    } else {
      return (
        <button
          className={`${cssClasses.itemButton} ${getTextColor(
            item
          )} ${getSubmenuBackgroundColor(item)}`}
          data-testid="dropdown-item-button"
        >
          {item.icon &&
            (typeof item.icon === "string" ? (
              <FeatherIcon
                name={item.icon as FeatherIconProps["name"]}
                className={cssClasses.itemIcon}
              />
            ) : React.isValidElement(item.icon) ? (
              item.icon
            ) : null)}
          <span className={cssClasses.itemLabel}>{item.label}</span>
        </button>
      );
    }
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        render={
          children ? (
            React.cloneElement(children as React.ReactElement, { ...attrs })
          ) : (
            <Button
              {...(button as ButtonProps)}
              {...attrs}
              data-testid="dropdown-trigger"
            >
              {button?.label || "Options"}
            </Button>
          )
        }
      />

      <Menu.Portal>
        <Menu.Positioner
          side={contentSide}
          align={contentAlign}
          sideOffset={0}
          className={cssClasses.dropdownPositioner}
        >
          <Menu.Popup
            className={clsx(cssClasses.dropdownContent, {
              "origin-top-left": placement === "left",
              "origin-top-right": placement === "right",
              "origin-top": placement === "center",
            })}
          >
            {groups.map((group) => (
              <Menu.Group key={group.key} className={cssClasses.groupContainer}>
                {group.group && !group.hideLabel && (
                  <Menu.GroupLabel className={cssClasses.groupLabel}>
                    {group.group}
                  </Menu.GroupLabel>
                )}
                {group.items.map((item) => (
                  <div data-testid="dropdown-item" key={item.label}>
                    <Menu.Item
                      closeOnClick={!item.switch}
                      onClick={() => !item.switch && item.onClick?.()}
                      render={renderDropdownItem(item)}
                      nativeButton={
                        !item.switch && !item.submenu && !item.component
                      }
                    />
                  </div>
                ))}
              </Menu.Group>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
};

export default Dropdown;

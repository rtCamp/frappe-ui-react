/**
 * External dependencies.
 */
import React, { useMemo } from "react";

/**
 * Internal dependencies.
 */
import useWindowSize from "../hooks/useWindowSize";
import {
  Dropdown,
  type DropdownOption,
  type DropdownOptions,
} from "../dropdown";
import { Button } from "../button";
import type { BreadcrumbsProps, BreadcrumbItem } from "./types";
import { cn } from "../../utils";
import { crumbVariants, separatorVariants } from "./variants";
import { ThreeDotsIcon } from "./threeDotsIcon";

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  size = "lg",
  highlightLastItem = true,
  highlightAllItems = false,
  compactCrumbs = true,
  className,
  crumbClassName,
  separatorClassName,
  renderPrefix,
  renderSuffix,
}) => {
  const { width } = useWindowSize();

  const filteredItems = useMemo(() => {
    return (items || []).filter(Boolean);
  }, [items]);

  const dropdownItems: DropdownOption[] = useMemo(() => {
    if (width > 640 || !compactCrumbs) return [];

    const allExceptLastTwo = filteredItems.slice(0, -2);
    return allExceptLastTwo.map((item) => {
      const onClick = () => {
        if (item.onClick) {
          item.onClick();
        }
      };
      return {
        label: item.label,
        onClick: onClick,
      };
    });
  }, [width, filteredItems, compactCrumbs]);

  const crumbs: BreadcrumbItem[] = useMemo(() => {
    if (width > 640 || !compactCrumbs) return filteredItems;
    return filteredItems.slice(-2);
  }, [width, filteredItems, compactCrumbs]);

  return (
    <div className="flex min-w-0 items-center">
      {dropdownItems.length > 0 && (
        <div className="h-7 flex items-center">
          <Dropdown options={dropdownItems as unknown as DropdownOptions}>
            <Button variant="ghost">
              <ThreeDotsIcon />
            </Button>
          </Dropdown>
          <span
            className={cn(
              "ml-1 mr-0.5",
              separatorVariants({ size, highlightItem: highlightAllItems }),
              separatorClassName
            )}
            aria-hidden="true"
          >
            /
          </span>
        </div>
      )}

      <div
        className={cn(
          "flex min-w-0 items-center text-ellipsis whitespace-nowrap",
          className
        )}
      >
        {crumbs.map((item, i) => {
          const isLast = i === crumbs.length - 1;

          const handleClick = (
            e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
          ) => {
            e.preventDefault();
            if (item.onClick && item?.interactive !== false) {
              item.onClick();
            }
          };

          const crumbContent = (
            <button
              type="button"
              onClick={handleClick}
              disabled={item?.interactive === false}
              className={cn(
                crumbVariants({
                  size,
                  highlightItem:
                    (isLast && highlightLastItem) || highlightAllItems,
                  interactive: item?.interactive !== false,
                }),
                crumbClassName
              )}
            >
              {renderPrefix ? (
                renderPrefix(item)
              ) : item?.prefixIcon ? (
                <span className="mr-1">{item.prefixIcon}</span>
              ) : null}
              <span>{item.label}</span>
              {renderSuffix ? (
                renderSuffix(item)
              ) : item?.suffixIcon ? (
                <span className="ml-1">{item.suffixIcon}</span>
              ) : null}
            </button>
          );

          return (
            <React.Fragment key={item.id || item.label}>
              {item.dropdown ? (
                <Dropdown {...item.dropdown}>{crumbContent}</Dropdown>
              ) : (
                crumbContent
              )}
              {!isLast && (
                <span
                  className={cn(
                    "mx-0.5",
                    separatorVariants({
                      size,
                      highlightItem: highlightAllItems,
                    }),
                    separatorClassName
                  )}
                  aria-hidden="true"
                >
                  /
                </span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;

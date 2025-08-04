import React, { useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import useWindowSize from "../hooks/useWindowSize";
import {
  Dropdown,
  type DropdownOption,
  type DropdownOptions,
} from "../dropdown";
import { Button } from "../Button";
import type { BreadcrumbsProps, BreadcrumbItem } from "./types";

const ThreeDotsIcon: React.FC = () => (
  <svg
    className="w-4 text-(--ink-gray-5)"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const filteredItems = useMemo(() => {
    return (items || []).filter(Boolean);
  }, [items]);

  const dropdownItems: DropdownOption[] = useMemo(() => {
    if (width > 640) return [];

    const allExceptLastTwo = filteredItems.slice(0, -2);
    return allExceptLastTwo.map((item) => {
      const onClick = () => {
        if (item.onClick) {
          item.onClick();
        }
        if (item.route) {
          navigate(item.route);
        }
      };
      return {
        label: item.label,
        onClick: onClick,
      };
    });
  }, [width, filteredItems, navigate]);

  const crumbs: BreadcrumbItem[] = useMemo(() => {
    if (width > 640) return filteredItems;
    return filteredItems.slice(-2);
  }, [width, filteredItems]);

  const renderSuffix = useCallback((item: BreadcrumbItem) => {
    if (!item.suffixIcon) {
      return null;
    }
    return <span className="mr-1">{item.suffixIcon}</span>;
  }, []);

  const renderPrefix = useCallback((item: BreadcrumbItem) => {
    if (!item.prefixIcon) {
      return null;
    }
    return <span className="mr-1">{item.prefixIcon}</span>;
  }, []);

  return (
    <div className="flex min-w-0 items-center">
      {dropdownItems.length > 0 && (
        <div className="h-7">
          <Dropdown options={dropdownItems as unknown as DropdownOptions}>
            <Button variant="ghost">
              <ThreeDotsIcon />
            </Button>
          </Dropdown>
          <span
            className="ml-1 mr-0.5 text-base text-(--ink-gray-4)"
            aria-hidden="true"
          >
            /
          </span>
        </div>
      )}

      <div className="flex min-w-0 items-center overflow-hidden text-ellipsis whitespace-nowrap">
        {crumbs.map((item, i) => {
          const isLast = i === crumbs.length - 1;
          const commonClasses = `flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-(--outline-gray-3) ${
            isLast
              ? "text-(--ink-gray-9)"
              : "text-(--ink-gray-5) hover:text-(--ink-gray-7)"
          }`;

          const handleClick = (
            e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
          ) => {
            if (item.onClick) {
              item.onClick();
            }

            if (!item.route && item.onClick) {
              e.preventDefault();
            }
          };

          return (
            <React.Fragment key={item.label}>
              {item.route ? (
                <Link
                  to={item.route}
                  onClick={handleClick}
                  className={`${commonClasses} cursor-default`}
                >
                  {renderPrefix(item)}
                  <span>{item.label}</span>
                  {renderSuffix(item)}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleClick}
                  className={`${commonClasses} cursor-pointer`}
                >
                  {renderPrefix(item)}
                  <span>{item.label}</span>
                  {renderSuffix(item)}
                </button>
              )}
              {!isLast && (
                <span
                  className="mx-0.5 text-base text-(--ink-gray-4) select-none"
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

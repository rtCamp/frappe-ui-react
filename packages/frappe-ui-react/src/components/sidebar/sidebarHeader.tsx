import React from "react";
import Dropdown from "../dropdown/dropdown";
import FeatherIcon from "../featherIcon";

export type SidebarHeaderProps = {
  isCollapsed: boolean;
  title: string;
  subtitle?: string;
  logo?: React.ReactNode | string;
  menuItems?: any[];
  children?: React.ReactNode;
};

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  title,
  subtitle,
  logo,
  menuItems,
  children,
}) => {
  // We can't use open state from Dropdown, so just style as if closed
  return (
    <Dropdown options={menuItems || []}>
      <button
        className={`flex h-12 items-center rounded-md py-2 duration-300 ease-in-out w-[14rem] ${
          isCollapsed ? "w-auto px-0" : "px-2 hover:bg-surface-gray-3"
        }`}
      >
        <div className="w-8 h-8 rounded overflow-hidden">
          {/* header-logo slot */}
          {children}
          {typeof logo === "string" ? (
            <img src={logo} className="w-full h-full object-cover" alt="Logo" />
          ) : !logo ? (
            <div className="w-full h-full bg-surface-gray-4 flex items-center justify-center text-ink-gray-7">
              {title.charAt(0).toUpperCase()}
            </div>
          ) : React.isValidElement(logo) ? (
            logo
          ) : null}
        </div>
        <div
          className={`flex flex-1 flex-col text-left duration-300 ease-in-out truncate ${
            isCollapsed
              ? "ml-0 w-0 overflow-hidden opacity-0"
              : "ml-2 w-auto opacity-100"
          }`}
        >
          <div className="text-base font-medium text-ink-gray-8 leading-none">
            {title}
          </div>
          <div className="mt-1 text-sm text-ink-gray-6 leading-none">
            {subtitle}
          </div>
        </div>
        <div
          className={`duration-300 ease-in-out ${
            isCollapsed
              ? "ml-0 w-0 overflow-hidden opacity-0"
              : "ml-2 w-auto opacity-100"
          }`}
        >
          <FeatherIcon
            name="chevron-down"
            className="h-4 w-4 text-ink-gray-7"
          />
        </div>
      </button>
    </Dropdown>
  );
};

export default SidebarHeader;

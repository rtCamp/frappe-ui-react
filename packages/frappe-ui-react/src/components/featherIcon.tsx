import React from "react";
import feather from "feather-icons";

import { htmlAttrsToJsx } from "../utils";

export interface FeatherIconProps extends React.SVGProps<SVGSVGElement> {
  name: keyof typeof feather.icons;
  color?: string;
  strokeWidth?: number;
}

const FeatherIcon = ({
  name,
  color = "currentColor",
  strokeWidth = 1.5,
  ...props
}: FeatherIconProps) => {
  const validIcons = Object.keys(feather.icons);
  const iconName: keyof typeof feather.icons = validIcons.includes(name)
    ? name
    : "circle";
  const icon = feather.icons[iconName];

  if (!validIcons.includes(name)) {
    console.groupCollapsed(
      "[frappe-ui] name property for feather-icon must be one of "
    );
    console.dir(validIcons);
    console.groupEnd();
  }

  // Parse the icon SVG content
  const svgContent = icon.contents;

  return (
    <svg
      {...htmlAttrsToJsx(icon.attrs)}
      fill="none"
      stroke="currentColor"
      color={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      className={`${icon.attrs.class || ""} shrink-0`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

export default FeatherIcon;

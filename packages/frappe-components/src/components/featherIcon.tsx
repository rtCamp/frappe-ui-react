import React from "react";
import feather from "feather-icons";

interface FeatherIconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
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
  const iconName = validIcons.includes(name) ? name : "circle";
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
      {...icon.attrs}
      fill="none"
      stroke="currentColor"
      color={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      width={null}
      height={null}
      className={`${icon.attrs.class || ""} shrink-0`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
      {...props}
    />
  );
};

export default FeatherIcon;

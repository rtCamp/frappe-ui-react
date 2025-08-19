import React from "react";

export interface StoryLayoutConfig {
  type?: "single" | "grid" | "list";
  width?: number | string;
  height?: number | string;
  iframe?: boolean;
}

export interface StoryProps {
  layout?: StoryLayoutConfig;
  children: React.ReactNode;
  controls?: React.ReactNode;
}

export const Story: React.FC<StoryProps> = ({
  layout = { type: "single" },
  children,
  controls,
}) => {
  const getLayoutStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      padding: "16px",
      minHeight: "200px",
    };

    switch (layout.type) {
      case "grid":
        return {
          ...baseStyles,
          display: "grid",
          gridTemplateColumns: layout.width
            ? `repeat(auto-fit, minmax(${
                typeof layout.width === "number"
                  ? `${layout.width}px`
                  : layout.width
              }, 1fr))`
            : "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "16px",
          alignItems: "start",
          height: layout.height ? layout.height : "auto",
        };
      case "list":
        return {
          ...baseStyles,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: layout.width || "100%",
          height: layout.height ? layout.height : "auto",
        };
      default:
        return {
          ...baseStyles,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: layout.width || "100%",
          height: layout.height ? layout.height : "auto",
        };
    }
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={getLayoutStyles()}>{children}</div>
      {controls && (
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "16px",
            backgroundColor: "#f9fafb",
            marginTop: "16px",
          }}
        >
          <h4
            style={{
              margin: "0 0 12px 0",
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Controls
          </h4>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            {controls}
          </div>
        </div>
      )}
    </div>
  );
};

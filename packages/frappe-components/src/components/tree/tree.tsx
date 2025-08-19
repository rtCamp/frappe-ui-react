import React, { useState, useMemo, useCallback } from "react";
import type { TreeProps } from "./types";
import FeatherIcon from "../featherIcon";

export const Tree: React.FC<TreeProps> = ({
  node,
  nodeKey,
  options = {
    rowHeight: "25px",
    indentWidth: "20px",
    showIndentationGuides: true,
    defaultCollapsed: true,
  },
  renderNode,
  renderIcon,
  renderLabel,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    options.defaultCollapsed ?? true
  );

  const hasChildren = useMemo(() => node.children?.length > 0, [node]);
  const toggleCollapsed = useCallback(() => setIsCollapsed((c) => !c), []);

  // For indentation guides
  const linePadding = options.indentWidth || "20px";

  // Node slot
  const defaultRenderNode = () => (
    <div
      className="flex items-center cursor-pointer gap-1"
      style={{ height: options.rowHeight }}
      onClick={toggleCollapsed}
    >
      <div>
        {/* Icon slot */}
        {renderIcon ? (
          renderIcon({ hasChildren, isCollapsed })
        ) : hasChildren && !isCollapsed ? (
          <FeatherIcon name="chevron-down" className="h-3.5 w-3.5" />
        ) : hasChildren ? (
          <FeatherIcon name="chevron-right" className="h-3.5 w-3.5" />
        ) : null}
      </div>
      {/* Label slot */}
      {renderLabel ? (
        renderLabel({ node, hasChildren, isCollapsed })
      ) : (
        <div className={`text-base truncate ${hasChildren ? "" : "pl-3.5"}`}>
          {node.label}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col">
      {renderNode
        ? renderNode({ node, hasChildren, isCollapsed, toggleCollapsed })
        : defaultRenderNode()}
      {hasChildren && !isCollapsed && (
        <div className="flex">
          {options.showIndentationGuides && (
            <div style={{ paddingLeft: linePadding }} className="border-r border-gray-200" />
          )}
          <ul className="w-full" style={{ paddingLeft: options.indentWidth }}>
            {node.children.map((child) => (
              <li key={String(child[nodeKey])}>
                <Tree
                  node={child}
                  nodeKey={nodeKey}
                  options={options}
                  renderNode={renderNode}
                  renderIcon={renderIcon}
                  renderLabel={renderLabel}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

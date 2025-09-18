export type TreeNode = {
  label: string;
  children: TreeNode[];
  [nodeKey: string]: string | number | TreeNode[];
};

export type TreeOptions = {
  rowHeight?: string;
  indentWidth?: string;
  showIndentationGuides?: boolean;
  defaultCollapsed?: boolean;
};

export interface TreeProps {
  node: TreeNode;
  nodeKey: string;
  options?: TreeOptions;
  renderNode?: (args: {
    node: TreeNode;
    hasChildren: boolean;
    isCollapsed: boolean;
    toggleCollapsed: () => void;
  }) => React.ReactNode;
  renderIcon?: (args: {
    hasChildren: boolean;
    isCollapsed: boolean;
  }) => React.ReactNode;
  renderLabel?: (args: {
    node: TreeNode;
    hasChildren: boolean;
    isCollapsed: boolean;
  }) => React.ReactNode;
}

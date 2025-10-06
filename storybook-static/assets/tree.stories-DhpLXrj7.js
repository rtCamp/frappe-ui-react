import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./iframe-BjtiHmwT.js";import{F as g}from"./featherIcon-eOJL9Jb5.js";import"./preload-helper-PPVm8Dsz.js";const i=({node:n,nodeKey:m,options:a={rowHeight:"25px",indentWidth:"20px",showIndentationGuides:!0,defaultCollapsed:!0},renderNode:d,renderIcon:l,renderLabel:u})=>{const[t,h]=c.useState(a.defaultCollapsed??!0),r=c.useMemo(()=>n.children?.length>0,[n]),p=c.useCallback(()=>h(o=>!o),[]),y=a.indentWidth||"20px",b=()=>e.jsxs("div",{className:"flex items-center cursor-pointer gap-1",style:{height:a.rowHeight},onClick:p,children:[e.jsx("div",{className:"text-ink-gray-6",children:l?l({hasChildren:r,isCollapsed:t}):r&&!t?e.jsx(g,{name:"chevron-down",height:14,width:14}):r?e.jsx(g,{name:"chevron-right",height:14,width:14}):null}),u?u({node:n,hasChildren:r,isCollapsed:t}):e.jsx("div",{className:`text-base text-ink-gray-8 truncate ${r?"":"pl-3.5"}`,children:n.label})]});return e.jsxs("div",{className:"flex flex-col",children:[d?d({node:n,hasChildren:r,isCollapsed:t,toggleCollapsed:p}):b(),r&&!t&&e.jsxs("div",{className:"flex",children:[a.showIndentationGuides&&e.jsx("div",{style:{paddingLeft:y},className:"border-r border-outline-gray-1"}),e.jsx("ul",{className:"w-full",style:{paddingLeft:a.indentWidth},children:n.children.map(o=>e.jsx("li",{children:e.jsx(i,{node:o,nodeKey:m,options:a,renderNode:d,renderIcon:l,renderLabel:u})},String(o[m])))})]})]})};i.__docgenInfo={description:"",methods:[],displayName:"Tree",props:{node:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  label: string;
  children: TreeNode[];
  [nodeKey: string]: string | number | TreeNode[];
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]",required:!0}},{key:{name:"string"},value:{name:"union",raw:"string | number | TreeNode[]",elements:[{name:"string"},{name:"number"},{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]"}],required:!0}}]}},description:""},nodeKey:{required:!0,tsType:{name:"string"},description:""},options:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  rowHeight?: string;
  indentWidth?: string;
  showIndentationGuides?: boolean;
  defaultCollapsed?: boolean;
}`,signature:{properties:[{key:"rowHeight",value:{name:"string",required:!1}},{key:"indentWidth",value:{name:"string",required:!1}},{key:"showIndentationGuides",value:{name:"boolean",required:!1}},{key:"defaultCollapsed",value:{name:"boolean",required:!1}}]}},description:"",defaultValue:{value:`{
  rowHeight: "25px",
  indentWidth: "20px",
  showIndentationGuides: true,
  defaultCollapsed: true,
}`,computed:!1}},renderNode:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
  node: TreeNode;
  hasChildren: boolean;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  node: TreeNode;
  hasChildren: boolean;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
}`,signature:{properties:[{key:"node",value:{name:"signature",type:"object",raw:`{
  label: string;
  children: TreeNode[];
  [nodeKey: string]: string | number | TreeNode[];
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]",required:!0}},{key:{name:"string"},value:{name:"union",raw:"string | number | TreeNode[]",elements:[{name:"string"},{name:"number"},{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]"}],required:!0}}]},required:!0}},{key:"hasChildren",value:{name:"boolean",required:!0}},{key:"isCollapsed",value:{name:"boolean",required:!0}},{key:"toggleCollapsed",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"args"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},renderIcon:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
  hasChildren: boolean;
  isCollapsed: boolean;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  hasChildren: boolean;
  isCollapsed: boolean;
}`,signature:{properties:[{key:"hasChildren",value:{name:"boolean",required:!0}},{key:"isCollapsed",value:{name:"boolean",required:!0}}]}},name:"args"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},renderLabel:{required:!1,tsType:{name:"signature",type:"function",raw:`(args: {
  node: TreeNode;
  hasChildren: boolean;
  isCollapsed: boolean;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  node: TreeNode;
  hasChildren: boolean;
  isCollapsed: boolean;
}`,signature:{properties:[{key:"node",value:{name:"signature",type:"object",raw:`{
  label: string;
  children: TreeNode[];
  [nodeKey: string]: string | number | TreeNode[];
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0}},{key:"children",value:{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]",required:!0}},{key:{name:"string"},value:{name:"union",raw:"string | number | TreeNode[]",elements:[{name:"string"},{name:"number"},{name:"Array",elements:[{name:"TreeNode"}],raw:"TreeNode[]"}],required:!0}}]},required:!0}},{key:"hasChildren",value:{name:"boolean",required:!0}},{key:"isCollapsed",value:{name:"boolean",required:!0}}]}},name:"args"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};const x={title:"Components/Tree",tags:["autodocs"],component:i,parameters:{layout:"centered"}},f={name:"guest",label:"Guest",children:[{name:"downloads",label:"Downloads",children:[{name:"download.zip",label:"download.zip",children:[{name:"image.png",label:"image.png",children:[]}]}]},{name:"documents",label:"Documents",children:[{name:"somefile.txt",label:"somefile.txt",children:[]},{name:"somefile.pdf",label:"somefile.pdf",children:[]}]}]},s={args:{node:f,nodeKey:"name",options:{rowHeight:"25px",indentWidth:"15px",showIndentationGuides:!0,defaultCollapsed:!0}},render:n=>e.jsx(i,{...n}),argTypes:{node:{control:!1,description:"Root tree node object"},nodeKey:{control:"text",description:"Key used for node identification"},options:{control:"object",description:"Tree options"},renderNode:{control:!1,description:"Custom node renderer function"},renderIcon:{control:!1,description:"Custom icon renderer function"},renderLabel:{control:!1,description:"Custom label renderer function"}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    node: treeNode,
    nodeKey: "name",
    options: {
      rowHeight: "25px",
      indentWidth: "15px",
      showIndentationGuides: true,
      defaultCollapsed: true
    }
  },
  render: args => <Tree {...args} />,
  argTypes: {
    node: {
      control: false,
      description: "Root tree node object"
    },
    nodeKey: {
      control: "text",
      description: "Key used for node identification"
    },
    options: {
      control: "object",
      description: "Tree options"
    },
    renderNode: {
      control: false,
      description: "Custom node renderer function"
    },
    renderIcon: {
      control: false,
      description: "Custom icon renderer function"
    },
    renderLabel: {
      control: false,
      description: "Custom label renderer function"
    }
  }
}`,...s.parameters?.docs?.source}}};const v=["Default"];export{s as Default,v as __namedExportsOrder,x as default};

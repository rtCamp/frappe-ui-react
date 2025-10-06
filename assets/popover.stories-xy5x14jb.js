import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{P as s}from"./popover-CbeU_aO8.js";import"./iframe-C5ToFRAX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-CtTXlRe_.js";import"./index-CmBHVr2C.js";const u={title:"Components/Popover",component:s,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{show:{control:"boolean",description:"Controls the visibility of the popover."},trigger:{control:"select",options:["click","hover"],description:"Event that triggers the popover to open/close."},hoverDelay:{control:"number",description:"Delay in seconds before opening on hover."},leaveDelay:{control:"number",description:"Delay in seconds before closing on hover."},placement:{control:"select",options:["auto","auto-start","auto-end","top","top-start","top-end","bottom","bottom-start","bottom-end","right","right-start","right-end","left","left-start","left-end"],description:"Placement of the popover relative to the target."},popoverClass:{control:"text",description:"CSS classes to apply to the popover body container."},transition:{control:"boolean",description:"Enable/disable default transition (custom transitions need object)."},hideOnBlur:{control:"boolean",description:"Whether to hide the popover when clicking outside."},onOpen:{action:"opened",description:"Callback when popover opens."},onClose:{action:"closed",description:"Callback when popover closes."},onUpdateShow:{action:"update:show",description:"Callback for controlled `show` prop."}},args:{trigger:"click",hideOnBlur:!0,placement:"bottom-start",hoverDelay:0,leaveDelay:0}},r=()=>e.jsxs("div",{className:"p-4 bg-white rounded-lg shadow-md border border-gray-200",children:[e.jsx("p",{className:"text-gray-800 text-sm",children:"Hello from Popover!"}),e.jsx("button",{className:"mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs",children:"Action"})]}),o={args:{target:({togglePopover:n})=>e.jsx("button",{onClick:n,className:"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",children:"Click Me (Default)"}),body:()=>e.jsx(r,{})}},t={args:{trigger:"hover",hoverDelay:.2,leaveDelay:.1,target:()=>e.jsx("button",{className:"px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",children:"Hover Me"}),body:()=>e.jsx(r,{})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    target: ({
      togglePopover
    }) => <button onClick={togglePopover} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Click Me (Default)
      </button>,
    body: () => <DefaultPopoverContent />
  }
}`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    trigger: "hover",
    hoverDelay: 0.2,
    leaveDelay: 0.1,
    target: () => <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
        Hover Me
      </button>,
    body: () => <DefaultPopoverContent />
  }
}`,...t.parameters?.docs?.source}}};const d=["Default","HoverTrigger"];export{o as Default,t as HoverTrigger,d as __namedExportsOrder,u as default};

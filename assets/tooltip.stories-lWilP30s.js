import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{T as s}from"./tooltip-bmOWK2eJ.js";import{M as a,B as i}from"./button-B1ly99NU.js";import"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DGnss_9L.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./index-CVFSsF3X.js";import"./index-D-NEFJrh.js";import"./floating-ui.react-dom-CqRtmaVQ.js";import"./index-D0BWuQVU.js";import"./featherIcon-eOJL9Jb5.js";const D={title:"Components/Tooltip",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{placement:{control:"select",options:["top","right","bottom","left"],description:"Placement of the tooltip relative to the trigger"},children:{control:!1,description:"Element that triggers the tooltip on hover"},body:{description:"Custom content to render inside the tooltip"},text:{control:"text",description:"Text content of the tooltip"},hoverDelay:{control:"number",description:"Delay in seconds before showing the tooltip on hover"},disabled:{control:"boolean",description:"If true, the tooltip is disabled"},arrowClass:{control:"text",description:"Custom CSS classes for the tooltip arrow"}},args:{placement:"top"}},o={render:t=>e.jsx(a,{children:e.jsx(s,{text:t.text,hoverDelay:t.hoverDelay,children:e.jsx(i,{theme:"red",children:"Delete"})})}),args:{text:"This action cannot be undone",hoverDelay:1,placement:"top",body:null}},r={render:t=>e.jsx(a,{children:e.jsx(s,{...t,children:e.jsx(i,{theme:"red",children:"Delete"})})}),args:{...o.args,text:"disabled tooltip",disabled:!0}},n={render:t=>e.jsx(a,{children:e.jsx(s,{...t,children:e.jsx(i,{theme:"red",children:"Delete"})})}),args:{...o.args,text:"disabled tooltip",arrowClass:"fill-surface-white",body:e.jsx("div",{className:"min-w-[6rem] rounded bg-surface-white px-2 py-1 text-xs text-ink-gray-9 shadow-xl",children:"test"})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <MemoryRouter>
        <Tooltip text={args.text} hoverDelay={args.hoverDelay}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>;
  },
  args: {
    text: "This action cannot be undone",
    hoverDelay: 1,
    placement: "top",
    body: null
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <MemoryRouter>
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>;
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    disabled: true
  }
}`,...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <MemoryRouter>
        <Tooltip {...args}>
          <Button theme="red">Delete</Button>
        </Tooltip>
      </MemoryRouter>;
  },
  args: {
    ...WithText.args,
    text: "disabled tooltip",
    arrowClass: "fill-surface-white",
    body: <div className="min-w-[6rem] rounded bg-surface-white px-2 py-1 text-xs text-ink-gray-9 shadow-xl">
        test
      </div>
  }
}`,...n.parameters?.docs?.source}}};const v=["WithText","Disabled","WithCustomContent"];export{r as Disabled,n as WithCustomContent,o as WithText,v as __namedExportsOrder,D as default};

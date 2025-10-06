import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{E as o}from"./errorMessage-DXZqHEYf.js";import"./iframe-C5ToFRAX.js";import"./preload-helper-PPVm8Dsz.js";const p={title:"Components/ErrorMessage",component:o,argTypes:{message:{control:"text",description:"The error message to display, can be a string or an Error object."}},parameters:{layout:"centered"},tags:["autodocs"]},e={render:r=>n.jsx(o,{...r}),args:{message:"Invalid value"}},s={render:r=>n.jsx(o,{...r}),args:{message:new Error("There was an error")}},a={render:r=>n.jsx(o,{...r}),args:{message:""}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => <ErrorMessage {...args} />,
  args: {
    message: "Invalid value"
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <ErrorMessage {...args} />,
  args: {
    message: new Error("There was an error")
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => <ErrorMessage {...args} />,
  args: {
    message: ""
  }
}`,...a.parameters?.docs?.source}}};const d=["StringMessage","ErrorObject","FalsyValue"];export{s as ErrorObject,a as FalsyValue,e as StringMessage,d as __namedExportsOrder,p as default};

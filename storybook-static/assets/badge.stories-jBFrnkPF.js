import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{B as r}from"./badge-DwP9CpOV.js";import"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";const m={title:"Components/Badge",component:r,argTypes:{label:{control:"text",description:"Text content of the badge"},theme:{control:{type:"select",options:["gray","blue","green","orange","red"]},description:"Color theme of the badge"},size:{control:{type:"select",options:["sm","md","lg"]},description:"Size of the badge"},variant:{control:{type:"select",options:["solid","subtle","outline","ghost"]},description:"Visual variant of the badge"},prefix:{control:"text",description:"Content to display before the label (e.g., an icon)"},suffix:{control:"text",description:"Content to display after the label (e.g., an icon)"},children:{control:"text",description:"Alternative to label prop, rendered as children"}},parameters:{layout:"centered"},tags:["autodocs"]},t={render:e=>a.jsx(r,{...e}),args:{label:"Default Badge",theme:"gray",size:"md",variant:"subtle"}},s={render:e=>a.jsx(r,{...e}),args:{label:"Solid Badge",theme:"gray",size:"md",variant:"solid"}},n={render:e=>a.jsx(r,{...e}),args:{label:"Subtle Badge",theme:"gray",size:"md",variant:"subtle"}},o={render:e=>a.jsx(r,{...e}),args:{label:"Outline Badge",theme:"gray",size:"md",variant:"outline"}},d={render:e=>a.jsx(r,{...e}),args:{label:"Ghost Badge",theme:"gray",size:"md",variant:"ghost"}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => <Badge {...args} />,
  args: {
    label: "Default Badge",
    theme: "gray",
    size: "md",
    variant: "subtle"
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <Badge {...args} />,
  args: {
    label: "Solid Badge",
    theme: "gray",
    size: "md",
    variant: "solid"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => <Badge {...args} />,
  args: {
    label: "Subtle Badge",
    theme: "gray",
    size: "md",
    variant: "subtle"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => <Badge {...args} />,
  args: {
    label: "Outline Badge",
    theme: "gray",
    size: "md",
    variant: "outline"
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: args => <Badge {...args} />,
  args: {
    label: "Ghost Badge",
    theme: "gray",
    size: "md",
    variant: "ghost"
  }
}`,...d.parameters?.docs?.source}}};const p=["Default","Solid","Subtle","Outline","Ghost"];export{t as Default,d as Ghost,o as Outline,s as Solid,n as Subtle,p as __namedExportsOrder,m as default};

import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{B as i,M as c}from"./button-B1ly99NU.js";import"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";import"./featherIcon-eOJL9Jb5.js";const h={title:"Components/Button",component:i,tags:["autodocs"],argTypes:{label:{control:"text",description:"Text content of the button. Overridden by children."},theme:{control:{type:"select",options:["gray","blue","green","red"]},description:"Color theme of the button."},size:{control:{type:"select",options:["sm","md","lg","xl","2xl"]},description:"Size of the button."},variant:{control:{type:"select",options:["solid","subtle","outline","ghost"]},description:"Visual variant of the button."},loading:{control:"boolean",description:"If true, shows a loading indicator and disables the button."},loadingText:{control:"text",description:"Text to display when the button is in a loading state."},disabled:{control:"boolean",description:"If true, disables the button."},route:{control:"text",description:"Internal route for navigation (uses react-router-dom)."},link:{control:"text",description:"External URL for navigation (opens in new tab)."},onClick:{action:"clicked",description:"Function to call when the button is clicked."},prefixIcon:{control:"text",description:'Icon to display before the label (e.g., "plus", "home").'},suffixIcon:{control:"text",description:'Icon to display after the label (e.g., "arrow-right").'},icon:{control:"text",description:"Main icon for icon-only buttons."},children:{control:"text",description:"Content rendered inside the button. Overrides `label` prop."},iconLeft:{control:"text",description:"Left side icon for the button"},iconRight:{control:"text",description:"Right side icon for the button"}},parameters:{layout:"centered"}},t={render:l=>s.jsx(c,{initialEntries:["/"],children:s.jsx("div",{className:"p-4",children:s.jsx(i,{...l})})})},e={...t,args:{label:"Default Button",theme:"gray",size:"md",variant:"subtle"}},o={...t,args:{label:"Solid Button",theme:"blue",size:"md",variant:"solid"}},n={...t,args:{label:"Subtle Button",theme:"gray",size:"md",variant:"subtle"}},r={...t,args:{label:"Outline Button",theme:"gray",size:"md",variant:"outline"}},a={...t,args:{label:"Ghost Button",theme:"red",size:"md",variant:"ghost"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...ButtonTemplate,
  args: {
    label: "Default Button",
    theme: "gray",
    size: "md",
    variant: "subtle"
  }
}`,...e.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...ButtonTemplate,
  args: {
    label: "Solid Button",
    theme: "blue",
    size: "md",
    variant: "solid"
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...ButtonTemplate,
  args: {
    label: "Subtle Button",
    theme: "gray",
    size: "md",
    variant: "subtle"
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...ButtonTemplate,
  args: {
    label: "Outline Button",
    theme: "gray",
    size: "md",
    variant: "outline"
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...ButtonTemplate,
  args: {
    label: "Ghost Button",
    theme: "red",
    size: "md",
    variant: "ghost"
  }
}`,...a.parameters?.docs?.source}}};const g=["Default","Solid","Subtle","Outline","Ghost"];export{e as Default,a as Ghost,r as Outline,o as Solid,n as Subtle,g as __namedExportsOrder,h as default};

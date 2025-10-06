import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{A as a}from"./avatar-u9MTEoHU.js";import"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";const u={title:"Components/Avatar",component:a,parameters:{layout:"centered"},argTypes:{size:{control:{type:"select",options:["xs","sm","md","lg","xl","2xl","3xl"]},description:"Size of the avatar"},shape:{control:{type:"select",options:["circle","square"]},description:"Shape of the avatar"},label:{control:"text",description:"Initials or text to display"},image:{control:"text",description:"URL of the avatar image"}},tags:["autodocs"]},s={render:r=>e.jsx("div",{className:"w-10 h-10",children:e.jsx(a,{...r})}),args:{label:"EY",size:"md",shape:"circle",image:"https://avatars.githubusercontent.com/u/499550?s=60&v=4"}},t={render:r=>e.jsx("div",{className:"w-10 h-10",children:e.jsx(a,{...r})}),args:{label:"EY",size:"md",shape:"circle"}},n={render:r=>e.jsx("div",{className:"w-10 h-10",children:e.jsx(a,{...r})}),args:{label:"EY",size:"md",shape:"square",image:"https://avatars.githubusercontent.com/u/499550?s=60&v=4"}},o={render:r=>e.jsx("div",{className:"w-10 h-10",children:e.jsx(a,{...r})}),args:{label:"EY",size:"md",shape:"square"}},i={render:r=>e.jsx(a,{...r,children:e.jsx("div",{style:{background:"green",width:"10px",height:"10px",borderRadius:"50%"}})}),args:{label:"EY",size:"md",shape:"circle",image:"https://avatars.githubusercontent.com/u/499550?s=60&v=4"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div className="w-10 h-10">
        <Avatar {...args} />
      </div>;
  },
  args: {
    label: "EY",
    size: "md",
    shape: "circle",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4"
  }
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div className="w-10 h-10">
        <Avatar {...args} />
      </div>;
  },
  args: {
    label: "EY",
    size: "md",
    shape: "circle"
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div className="w-10 h-10">
        <Avatar {...args} />
      </div>;
  },
  args: {
    label: "EY",
    size: "md",
    shape: "square",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4"
  }
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div className="w-10 h-10">
        <Avatar {...args} />
      </div>;
  },
  args: {
    label: "EY",
    size: "md",
    shape: "square"
  }
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => <Avatar {...args}>
      <div style={{
      background: "green",
      width: "10px",
      height: "10px",
      borderRadius: "50%"
    }} />
    </Avatar>,
  args: {
    label: "EY",
    size: "md",
    shape: "circle",
    image: "https://avatars.githubusercontent.com/u/499550?s=60&v=4"
  }
}`,...i.parameters?.docs?.source}}};const p=["Default","WithoutImage","Square","SquareWithoutImage","WithIndicator"];export{s as Default,n as Square,o as SquareWithoutImage,i as WithIndicator,t as WithoutImage,p as __namedExportsOrder,u as default};

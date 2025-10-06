import{j as e}from"./jsx-runtime-D_zvdyIk.js";const f=0,c=100,y={sm:"h-0.5",md:"h-1",lg:"h-2",xl:"h-3"},r=({value:s,size:p="sm",label:l="",hint:o,intervals:m=!1,intervalCount:i=6,className:u=""})=>{const g=[y[p],m?"flex space-x-1":"relative bg-surface-gray-2","overflow-hidden rounded-xl",u].filter(Boolean).join(" "),v=s>c?i:Math.round(s/c*i);return e.jsxs("div",{className:"w-full flex flex-col gap-2.5",children:[(l||o)&&e.jsxs("div",{className:"flex items-baseline justify-between",children:[l?e.jsx("span",{className:"text-base font-medium text-ink-gray-8",children:l}):e.jsx("span",{}),o&&e.jsx("span",{className:"self-end",children:o})]}),e.jsx("div",{className:g,"aria-valuemax":c,"aria-valuemin":f,"aria-valuenow":s,role:"progressbar",children:m?Array.from({length:i},(b,d)=>e.jsx("div",{className:`h-full w-full ${d<v?"bg-surface-gray-7":"bg-surface-gray-2"}`},d)):e.jsx("div",{className:"h-full bg-surface-gray-7",style:{width:`${s}%`}})})]})};r.__docgenInfo={description:"",methods:[],displayName:"Progress",props:{value:{required:!0,tsType:{name:"number"},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md" | "lg" | "xl"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'},{name:"literal",value:'"lg"'},{name:"literal",value:'"xl"'}]},description:"",defaultValue:{value:'"sm"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},hint:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},intervals:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},intervalCount:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"6",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const P={title:"Components/Progress",tags:["autodocs"],component:r,parameters:{layout:"centered"},argTypes:{value:{control:{type:"range",min:0,max:100},description:"Current progress value (0-100)",table:{category:"Props"}},size:{control:{type:"select"},options:["sm","md","lg","xl"],description:"Progress bar height/size",table:{category:"Props"}},label:{control:"text",description:"Optional label displayed above the bar",table:{category:"Props"}},hint:{control:!1,description:"Custom hint node (slot-like)",table:{category:"Props"}},intervals:{control:"boolean",description:"Enable interval/step mode",table:{category:"Props"}},intervalCount:{control:{type:"number",min:1,max:20},description:"Number of intervals/steps (if intervals enabled)",table:{category:"Props"}},className:{control:"text",description:"Custom CSS classes for the container",table:{category:"Props"}}}},x=["sm","md","lg","xl"],a={render:s=>e.jsx("div",{className:"w-80",children:e.jsx(r,{...s,label:"Progress"})}),args:{value:50,size:"sm"},argTypes:{value:{control:{type:"range",min:0,max:100},name:"Value"},size:{control:{type:"select"},options:x,name:"Size"}}},n={render:s=>e.jsx("div",{className:"w-80",children:e.jsx(r,{...s,label:"Progress",hint:e.jsxs("span",{className:"text-base font-medium text-ink-gray-4",children:[s.value,"%"]})})}),args:{value:50,size:"sm"},argTypes:a.argTypes},t={render:s=>e.jsx("div",{className:"w-80",children:e.jsx(r,{...s,label:"Progress",intervals:!0,intervalCount:5})}),args:{value:50,size:"sm"},argTypes:a.argTypes};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: (args: React.ComponentProps<typeof Progress>) => <div className="w-80">
      <Progress {...args} label="Progress" />
    </div>,
  args: {
    value: 50,
    size: "sm"
  },
  argTypes: {
    value: {
      control: {
        type: "range",
        min: 0,
        max: 100
      },
      name: "Value"
    },
    size: {
      control: {
        type: "select"
      },
      options: sizes,
      name: "Size"
    }
  }
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: (args: React.ComponentProps<typeof Progress>) => <div className="w-80">
      <Progress {...args} label="Progress" hint={<span className="text-base font-medium text-ink-gray-4">
            {args.value}%
          </span>} />
    </div>,
  args: {
    value: 50,
    size: "sm"
  },
  argTypes: Label.argTypes
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: (args: React.ComponentProps<typeof Progress>) => <div className="w-80">
      <Progress {...args} label="Progress" intervals intervalCount={5} />
    </div>,
  args: {
    value: 50,
    size: "sm"
  },
  argTypes: Label.argTypes
}`,...t.parameters?.docs?.source}}};const N=["Label","Hint","Intervals"];export{n as Hint,t as Intervals,a as Label,N as __namedExportsOrder,P as default};

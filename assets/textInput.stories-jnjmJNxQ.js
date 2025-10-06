import{j as r}from"./jsx-runtime-D_zvdyIk.js";import{r as S}from"./iframe-BjtiHmwT.js";import{T as v}from"./textInput-CNgXm6zK.js";import{F as f}from"./featherIcon-eOJL9Jb5.js";import{A as b}from"./avatar-u9MTEoHU.js";import"./preload-helper-PPVm8Dsz.js";import"./debounce-C-hnF4Z3.js";const A={title:"Components/TextInput",component:v,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{type:{control:{type:"select",options:["text","number","email","date","datetime-local","password","search","tel","time","url"]},description:"Type of the text input"},size:{control:{type:"select",options:["sm","md","lg"]},description:"Size of the text input"},variant:{control:{type:"select",options:["outline","subtle"]},description:"Visual variant of the text input"},disabled:{control:"boolean",description:"If true, disables the text input"},placeholder:{control:"text",description:"Placeholder text for the text input"},htmlId:{control:"text",description:"HTML id attribute for the text input"},value:{control:"text",description:"Current value of the text input"},debounce:{control:"number",description:"Debounce time in milliseconds for the onChange event"},required:{control:"boolean",description:"If true, marks the text input as required"},onChange:{action:"changed",description:"Callback function when the input value changes"},prefix:{control:!1,description:"Function to render a prefix element inside the input"},suffix:{control:!1,description:"Function to render a suffix element inside the input"},className:{control:"text",description:"Custom CSS classes for the text input"},style:{control:"object",description:"Inline styles for the text input"}}},e={render:x=>{const[y,P]=S.useState(x.value||"");return r.jsx("div",{className:"p-4 w-[300px]",children:r.jsx(v,{...x,value:y,onChange:T=>P(T.target.value)})})}},a={...e,args:{type:"text",placeholder:"Placeholder",value:""}},t={...e,args:{type:"number",placeholder:"Placeholder",value:""}},o={...e,args:{type:"email",placeholder:"Placeholder",value:""}},s={...e,args:{type:"date",placeholder:"Placeholder",value:""}},l={...e,args:{type:"datetime-local",value:""}},n={...e,args:{type:"password",placeholder:"Placeholder",value:""}},c={...e,args:{type:"search",placeholder:"Placeholder",value:""}},p={...e,args:{type:"tel",placeholder:"Placeholder",value:""}},i={...e,args:{type:"time",value:""}},u={...e,args:{type:"url",placeholder:"Placeholder",value:""}},d={...e,args:{type:"url",placeholder:"Placeholder",prefix:()=>r.jsx(f,{className:"w-4",name:"search"}),value:""}},m={...e,args:{type:"url",placeholder:"Placeholder",suffix:()=>r.jsx(f,{className:"w-4",name:"search"}),value:""}},h={...e,args:{type:"url",placeholder:"Placeholder",prefix:()=>r.jsx(b,{shape:"circle",image:"https://avatars.githubusercontent.com/u/499550?s=60&v=4"}),value:""}},g={...e,args:{value:""}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "text",
    placeholder: "Placeholder",
    value: ""
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "number",
    placeholder: "Placeholder",
    value: ""
  }
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "email",
    placeholder: "Placeholder",
    value: ""
  }
}`,...o.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "date",
    placeholder: "Placeholder",
    value: ""
  }
}`,...s.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "datetime-local",
    value: ""
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "password",
    placeholder: "Placeholder",
    value: ""
  }
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "search",
    placeholder: "Placeholder",
    value: ""
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "tel",
    placeholder: "Placeholder",
    value: ""
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "time",
    value: ""
  }
}`,...i.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    value: ""
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    prefix: () => <FeatherIcon className="w-4" name="search" />,
    value: ""
  }
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    suffix: () => <FeatherIcon className="w-4" name="search" />,
    value: ""
  }
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "url",
    placeholder: "Placeholder",
    prefix: () => <Avatar shape="circle" image="https://avatars.githubusercontent.com/u/499550?s=60&v=4" />,
    value: ""
  }
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    value: ""
  }
}`,...g.parameters?.docs?.source}}};const E=["Text","Number","Email","Date","DateTimeLocal","Password","Search","Telephone","Time","Url","PrefixSlotIcon","SuffixSlotIcon","PrefixSlotAvatar","Default"];export{s as Date,l as DateTimeLocal,g as Default,o as Email,t as Number,n as Password,h as PrefixSlotAvatar,d as PrefixSlotIcon,c as Search,m as SuffixSlotIcon,p as Telephone,a as Text,i as Time,u as Url,E as __namedExportsOrder,A as default};

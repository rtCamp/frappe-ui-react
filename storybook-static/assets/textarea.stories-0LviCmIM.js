import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{r as c}from"./iframe-BjtiHmwT.js";import{T as o}from"./textarea-CK4pDFmD.js";import"./preload-helper-PPVm8Dsz.js";import"./debounce-C-hnF4Z3.js";const h={title:"Components/TextArea",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{label:{control:"text",description:"Label for the textarea"},placeholder:{control:"text",description:"Placeholder text for the textarea"},disabled:{control:"boolean",description:"If true, disables the textarea"},variant:{control:{type:"select",options:["outline","subtle"]},description:"Visual variant of the textarea"},size:{control:{type:"select",options:["sm","md","lg"]},description:"Size of the textarea"},id:{control:"text",description:"HTML id attribute for the textarea"},value:{control:"text",description:"Current value of the textarea"},rows:{control:"number",description:"Number of visible text lines for the textarea"},onChange:{action:"changed",description:"Callback function when the textarea value changes"},debounce:{control:"number",description:"Debounce time in milliseconds for the onChange event"},type:{control:{type:"select",options:["text","number","email","date","datetime-local","password","search","tel","time","url"]},description:"Type of the text input"},htmlId:{control:"text",description:"HTML id attribute for the text input"}}},n={render:r=>{const[l,s]=c.useState(r.value||"");return a.jsx("div",{className:"p-4 w-[300px]",children:a.jsx(o,{...r,value:l,onChange:i=>s(i.target.value)})})}},e={...n,args:{type:"text",placeholder:"Placeholder",variant:"subtle",value:""}},t={...n,args:{type:"number",placeholder:"Placeholder",variant:"outline",value:""}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "text",
    placeholder: "Placeholder",
    variant: "subtle",
    value: ""
  }
}`,...e.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    type: "number",
    placeholder: "Placeholder",
    variant: "outline",
    value: ""
  }
}`,...t.parameters?.docs?.source}}};const b=["SubtleVariant","OutlineVariant"];export{t as OutlineVariant,e as SubtleVariant,b as __namedExportsOrder,h as default};

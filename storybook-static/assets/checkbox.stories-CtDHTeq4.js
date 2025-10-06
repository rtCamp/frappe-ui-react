import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{C as c}from"./checkbox-BMJ6yhQh.js";import{r as s}from"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";const{action:l}=__STORYBOOK_MODULE_ACTIONS__,b={title:"Components/Checkbox",component:c,parameters:{layout:"centered"},argTypes:{label:{control:"text",description:"The text label for the checkbox."},size:{control:{type:"select",options:["sm","md"]},description:"The size of the checkbox."},padding:{control:"boolean",description:"Whether to apply padding and hover/focus styles to the wrapper."},disabled:{control:"boolean",description:"Whether the checkbox is disabled."},value:{control:"boolean",description:"The checked state of the checkbox."},onChange:{action:"checked",description:"Event handler for when the checkbox state changes."},checked:{control:"boolean",description:"Whether the checkbox is checked"},htmlId:{control:"text",description:"The HTML id attribute for the checkbox input"}},tags:["autodocs"]},e={render:t=>{const[r,n]=s.useState(!1);return a.jsx("div",{className:"p-2",children:a.jsx(c,{...t,htmlId:"abc",value:r,onChange:o=>{l("checked")(o),n(o)},label:t.label??"Enable feature"})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState(false);
    return <div className="p-2">
        <Checkbox {...args} htmlId="abc" value={value} onChange={_value => {
        action("checked")(_value);
        setValue(_value);
      }} label={args.label ?? "Enable feature"} />
      </div>;
  }
}`,...e.parameters?.docs?.source}}};const u=["Default"];export{e as Default,u as __namedExportsOrder,b as default};

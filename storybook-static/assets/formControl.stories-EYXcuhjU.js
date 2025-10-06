import{j as a}from"./jsx-runtime-D_zvdyIk.js";import{F as x}from"./formControl-BeUs0fwX.js";import{F as f}from"./featherIcon-eOJL9Jb5.js";import{r as b}from"./iframe-BjtiHmwT.js";import"./textarea-CK4pDFmD.js";import"./debounce-C-hnF4Z3.js";import"./textInput-CNgXm6zK.js";import"./checkbox-BMJ6yhQh.js";import"./autoComplete-BoMhdFAk.js";import"./button-B1ly99NU.js";import"./combobox-Df2Q83WM.js";import"./label-BM8_gdnq.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./use-resolve-button-type-pYJO_gjF.js";import"./focus-management-B7CZ_raV.js";import"./floating-ui.react-dom-CqRtmaVQ.js";import"./popover-DUAFz4a3.js";import"./select-BDAVSmPi.js";import"./preload-helper-PPVm8Dsz.js";const A={title:"Components/FormControl",component:x,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select",options:["subtle","outline"],description:"Visual variant of the form control"},size:{control:"select",options:["sm","md","lg","xl"],description:"Size of the form control"},disabled:{control:"boolean",description:"If true, disables the form control"},label:{control:"text",description:"Label for the form control"},placeholder:{control:"text",description:"Placeholder text for the form control"},type:{control:!1,description:"Type of the form control (e.g., text, number, email, date, password, search, textarea, select, autocomplete, checkbox)"},description:{control:"text",description:"Description text for the form control"},required:{control:"boolean",description:"If true, marks the form control as required"},prefix:{control:!1,description:"Function to render a prefix element inside the input"},suffix:{control:!1,description:"Function to render a suffix element inside the input"},children:{control:"text",description:"Children elements to render inside the form control"},options:{control:"object",description:"Options for select and autocomplete types"},htmlId:{control:"text",description:"HTML id attribute for the form control"}},args:{label:"Label",placeholder:"Placeholder",variant:"subtle",size:"sm",disabled:!1}},s={args:{type:"text"}},n={args:{type:"number"}},l={args:{type:"email"}},c={args:{type:"date"}},p={args:{type:"password"}},i={args:{type:"search"}},m={args:{type:"textarea"}},u={args:{type:"select",htmlId:"select",options:[{label:"One",value:"1"},{label:"Two",value:"2"},{label:"Three",value:"3"}]},render:e=>{const[r,t]=b.useState("");return a.jsx("div",{className:"w-40",children:a.jsx(x,{...e,value:r,onChange:o=>t(o)})})}},d={args:{type:"autocomplete",options:[{label:"One",value:"1"},{label:"Two",value:"2"},{label:"Three",value:"3"}]},render:e=>{const[r,t]=b.useState("");return a.jsx(x,{...e,value:r,onChange:o=>t(o)})}},g={args:{type:"checkbox",label:"Checkbox Label"},render:e=>{const[r,t]=b.useState(!1);return a.jsx(x,{...e,value:r,onChange:o=>t(o)})}},h={args:{type:"text",placeholder:"",prefix:()=>a.jsx(f,{className:"w-4",name:"search"})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    type: "text"
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    type: "number"
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    type: "email"
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    type: "date"
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    type: "password"
  }
}`,...p.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    type: "search"
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    type: "textarea"
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: "select",
    htmlId: "select",
    options: [{
      label: "One",
      value: "1"
    }, {
      label: "Two",
      value: "2"
    }, {
      label: "Three",
      value: "3"
    }]
  },
  render: args => {
    const [value, setValue] = useState("");
    return <div className="w-40">
        <FormControl {...args} value={value} onChange={(_value: string) => setValue(_value)} />
      </div>;
  }
}`,...u.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: "autocomplete",
    options: [{
      label: "One",
      value: "1"
    }, {
      label: "Two",
      value: "2"
    }, {
      label: "Three",
      value: "3"
    }]
  },
  render: args => {
    const [value, setValue] = useState("");
    return <FormControl {...args} value={value} onChange={(_value: string) => setValue(_value)} />;
  }
}`,...d.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    type: "checkbox",
    label: "Checkbox Label"
  },
  render: args => {
    const [value, setValue] = useState(false);
    return <FormControl {...args} value={value} onChange={(_value: boolean) => setValue(_value)} />;
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    type: "text",
    placeholder: "",
    prefix: () => <FeatherIcon className="w-4" name="search" />
  }
}`,...h.parameters?.docs?.source}}};const W=["Text","Number","Email","Date","Password","Search","Textarea","Select","Autocomplete","Checkbox","WithPrefixIcon"];export{d as Autocomplete,g as Checkbox,c as Date,l as Email,n as Number,p as Password,i as Search,u as Select,s as Text,m as Textarea,h as WithPrefixIcon,W as __namedExportsOrder,A as default};

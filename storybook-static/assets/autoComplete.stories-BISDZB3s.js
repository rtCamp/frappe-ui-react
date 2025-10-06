import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./iframe-BjtiHmwT.js";import{A as s}from"./autoComplete-BoMhdFAk.js";import"./preload-helper-PPVm8Dsz.js";import"./button-B1ly99NU.js";import"./featherIcon-eOJL9Jb5.js";import"./combobox-Df2Q83WM.js";import"./label-BM8_gdnq.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./use-resolve-button-type-pYJO_gjF.js";import"./focus-management-B7CZ_raV.js";import"./floating-ui.react-dom-CqRtmaVQ.js";import"./popover-DUAFz4a3.js";const n=[{label:"John Doe",value:"john-doe",image:"https://randomuser.me/api/portraits/men/59.jpg"},{label:"Jane Doe",value:"jane-doe",image:"https://randomuser.me/api/portraits/women/58.jpg"},{label:"John Smith",value:"john-smith",image:"https://randomuser.me/api/portraits/men/59.jpg"},{label:"Jane Smith",value:"jane-smith",image:"https://randomuser.me/api/portraits/women/59.jpg"},{label:"John Wayne",value:"john-wayne",image:"https://randomuser.me/api/portraits/men/57.jpg"},{label:"Jane Wayne",value:"jane-wayne",image:"https://randomuser.me/api/portraits/women/51.jpg"}],O={title:"Components/Autocomplete",component:s,tags:["autodocs"],parameters:{layout:"centered"},argTypes:{value:{control:"object",description:"The currently selected value(s)."},options:{control:"object",description:"Array of options to display."},multiple:{control:"boolean",description:"Allow multiple selections."},label:{control:"text",description:"Label for the autocomplete input."},placeholder:{control:"text",description:"Placeholder text for the input."},loading:{control:"boolean",description:"Show loading indicator."},hideSearch:{control:"boolean",description:"Hide the search input in the dropdown."},showFooter:{control:"boolean",description:"Show the default footer (Clear/Select All)."},maxOptions:{control:"number",description:"Maximum number of options to display."},compareFn:{control:!1,description:"Function to compare option values (for objects)."},placement:{control:"select",options:["bottom-start","bottom","top-end"],description:"Placement of the dropdown."},bodyClasses:{control:"text",description:"CSS classes for the popover body."},onChange:{action:"update:value",description:"Event when selection changes."},prefix:{control:!1,description:"Function to render a prefix element inside the input"},suffix:{control:!1,description:"Function to render a suffix element inside the input"},itemPrefix:{control:!1,description:"Function to render a prefix element inside each option"},itemSuffix:{control:!1,description:"Function to render a suffix element inside each option"}},args:{multiple:!1,label:"Select an Option",placeholder:"Start typing to search...",loading:!1,hideSearch:!1,showFooter:!1,maxOptions:50,placement:"bottom-start"}},i={render:o=>{const[r,a]=l.useState(null);return t.jsx("div",{style:{width:"450px"},children:t.jsx(s,{...o,value:r,onChange:e=>{a(e)},options:n})})},args:{options:n}},p={render:o=>{const[r,a]=l.useState(null);return t.jsx("div",{style:{width:"450px"},children:t.jsx(s,{...o,value:r,prefix:e=>t.jsx("img",{src:e?.image??"",className:"mr-2 h-4 w-4 rounded-full"}),itemPrefix:e=>t.jsx("img",{src:e?.image??"",className:"ml-2 h-4 w-4 rounded-full"}),onChange:e=>{a(e)},options:n,compareFn:(e,d)=>e?.value===d?.value})})},args:{options:n,label:"Select Person"}},u={render:o=>{const[r,a]=l.useState([]);return t.jsx("div",{style:{width:"450px"},children:t.jsx(s,{...o,hideSearch:!0,value:r,onChange:e=>{a(e)},options:n,compareFn:(e,d)=>e?.value===d?.value})})},args:{options:n,label:"Select Persons",showFooter:!0}},c={render:o=>{const[r,a]=l.useState(null);return t.jsx("div",{style:{width:"450px"},children:t.jsx(s,{...o,multiple:!0,value:r,onChange:e=>{a(e)},options:n})})},args:{options:n,label:"Select Person"}},m={render:o=>{const[r,a]=l.useState(null);return t.jsx("div",{style:{width:"450px"},children:t.jsx(s,{...o,hideSearch:!0,multiple:!0,value:r,onChange:e=>{a(e)},options:n})})},args:{options:n,label:"Select Person"}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{
      width: "450px"
    }}>
        <Autocomplete {...args} value={value} onChange={_value => {
        setValue(_value as string);
      }} options={options} />
      </div>;
  },
  args: {
    options: options
  }
}`,...i.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{
      width: "450px"
    }}>
        <Autocomplete {...args} value={value} prefix={value => <img src={value?.image ?? ""} className="mr-2 h-4 w-4 rounded-full" />} itemPrefix={value => <img src={value?.image ?? ""} className="ml-2 h-4 w-4 rounded-full" />} onChange={_value => {
        setValue(_value as string);
      }} options={options} compareFn={(a, b) => a?.value === b?.value} />
      </div>;
  },
  args: {
    options: options,
    label: "Select Person"
  }
}`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [values, setValues] = useState<string[]>([]);
    return <div style={{
      width: "450px"
    }}>
        <Autocomplete {...args} hideSearch value={values} onChange={_value => {
        setValues(_value as string[]);
      }} options={options} compareFn={(a, b) => a?.value === b?.value} />
      </div>;
  },
  args: {
    options: options,
    label: "Select Persons",
    showFooter: true
  }
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{
      width: "450px"
    }}>
        <Autocomplete {...args} multiple value={value} onChange={_value => {
        setValue(_value as string);
      }} options={options} />
      </div>;
  },
  args: {
    options: options,
    label: "Select Person"
  }
}`,...c.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: args => {
    const [value, setValue] = useState<string | null>(null);
    return <div style={{
      width: "450px"
    }}>
        <Autocomplete {...args} hideSearch multiple value={value} onChange={_value => {
        setValue(_value as string);
      }} options={options} />
      </div>;
  },
  args: {
    options: options,
    label: "Select Person"
  }
}`,...m.parameters?.docs?.source}}};const _=["SingleOption","SingleOptionWithPrefixSlots","SingleOptionWithoutSearch","MultipleOptions","MultipleOptionsWithoutSearch"];export{c as MultipleOptions,m as MultipleOptionsWithoutSearch,i as SingleOption,p as SingleOptionWithPrefixSlots,u as SingleOptionWithoutSearch,_ as __namedExportsOrder,O as default};

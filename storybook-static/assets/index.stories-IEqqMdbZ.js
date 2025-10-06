import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./iframe-C5ToFRAX.js";import{T as a}from"./index-py82SV0g.js";import{M as u}from"./button-0OwgFvfr.js";import"./preload-helper-PPVm8Dsz.js";import"./label-CSL3Mk2A.js";import"./index-CtTXlRe_.js";import"./index-CmBHVr2C.js";import"./focus-management-BcN-g8BK.js";import"./featherIcon-B3IzmdwS.js";const v={title:"Components/TabButtons",tags:["autodocs"],argTypes:{buttons:{control:"object",description:"Array of button items with label and value."},value:{control:"text",description:"Currently selected tab value."},onChange:{action:"changed",description:"Function called when the selected tab changes."}},parameters:{layout:"centered"},component:a},e={render:()=>{const[r,s]=o.useState("mytasks");return t.jsx(u,{children:t.jsx(a,{buttons:[{label:"Tasks assigned to me",value:"mytasks"},{label:"Tasks created by me",value:"created"}],value:r,onChange:n=>s(n)})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [currentTab, setCurrentTab] = useState<string>("mytasks");
    return <MemoryRouter>
        <TabButtons buttons={[{
        label: "Tasks assigned to me",
        value: "mytasks"
      }, {
        label: "Tasks created by me",
        value: "created"
      }]} value={currentTab} onChange={value => setCurrentTab(value as string)} />
      </MemoryRouter>;
  }
}`,...e.parameters?.docs?.source}}};const x=["TabButtonsExample"];export{e as TabButtonsExample,x as __namedExportsOrder,v as default};

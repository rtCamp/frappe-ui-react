import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./iframe-BjtiHmwT.js";import{T as a}from"./index-DsV0eMGi.js";import{M as u}from"./button-B1ly99NU.js";import"./preload-helper-PPVm8Dsz.js";import"./label-BM8_gdnq.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./focus-management-B7CZ_raV.js";import"./featherIcon-eOJL9Jb5.js";const v={title:"Components/TabButtons",tags:["autodocs"],argTypes:{buttons:{control:"object",description:"Array of button items with label and value."},value:{control:"text",description:"Currently selected tab value."},onChange:{action:"changed",description:"Function called when the selected tab changes."}},parameters:{layout:"centered"},component:a},e={render:()=>{const[r,s]=o.useState("mytasks");return t.jsx(u,{children:t.jsx(a,{buttons:[{label:"Tasks assigned to me",value:"mytasks"},{label:"Tasks created by me",value:"created"}],value:r,onChange:n=>s(n)})})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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

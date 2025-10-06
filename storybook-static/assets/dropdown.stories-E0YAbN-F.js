import{j as l}from"./jsx-runtime-D_zvdyIk.js";import{M as g,B as b}from"./button-B1ly99NU.js";import{D as d}from"./dropdown-COCufLWg.js";import"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";import"./featherIcon-eOJL9Jb5.js";import"./index-DGnss_9L.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./index-Uuy_qmiW.js";import"./Combination-BMP8bqHG.js";import"./index-CVFSsF3X.js";import"./index-D-NEFJrh.js";import"./floating-ui.react-dom-CqRtmaVQ.js";const{action:e}=__STORYBOOK_MODULE_ACTIONS__,O={title:"Components/Dropdown",component:d,argTypes:{options:{control:"object",description:"An array of dropdown options, which can be individual items or groups."},placement:{control:{type:"select",options:["left","right","center"]},description:"Placement of the dropdown content relative to the trigger."},button:{control:"object",description:"Props for the default button trigger if no children are provided."},children:{control:"text",description:"Custom trigger element for the dropdown."}},parameters:{layout:"centered"},tags:["autodocs"]},p=[{label:"Edit",icon:"edit",onClick:()=>e("Edit clicked")()},{label:"Delete",icon:"trash-2",theme:"red",onClick:()=>e("Delete clicked")()}],m=[{group:"Actions",key:"actions-group",items:[{label:"Edit",icon:"edit",onClick:()=>e("Edit clicked")()},{label:"Duplicate",icon:"copy",onClick:()=>e("Duplicate clicked")()},{label:"More Actions",icon:"more-horizontal",submenu:[{label:"Archive",icon:"archive",onClick:()=>e("Archive clicked")()},{label:"Export",icon:"download",submenu:[{label:"Export as PDF",icon:"file-text",onClick:()=>e("Export as PDF clicked")()},{label:"Export as CSV",icon:"file",onClick:()=>e("Export as CSV clicked")()}]},{label:"Share",icon:"share",onClick:()=>e("Share clicked")()}]}]},{group:"Danger",key:"danger-group",items:[{label:"Delete",icon:"trash-2",theme:"red",onClick:()=>e("Delete clicked")()}]}],h=[{label:"New",icon:"plus",submenu:[{group:"Documents",key:"new-docs-group",items:[{label:"New Document",icon:"file-plus",onClick:()=>e("New Document clicked")()},{label:"New Template",icon:"file-text",onClick:()=>e("New Template clicked")()},{label:"Delete",icon:"trash-2",theme:"red",onClick:()=>e("Delete clicked")()}]},{group:"Organization",key:"new-org-group",items:[{label:"New Folder",icon:"folder-plus",onClick:()=>e("New Folder clicked")()},{label:"New Project",icon:"briefcase",onClick:()=>e("New Project clicked")()}]}]},{label:"Edit",icon:"edit",onClick:()=>e("Edit clicked")()},{label:"Share",icon:"share",submenu:[{label:"Share with Link",icon:"link",onClick:()=>e("Share with Link clicked")()},{label:"Share with Email",icon:"mail",onClick:()=>e("Share with Email clicked")()},{group:"Advanced",key:"share-advanced-group",items:[{label:"Share Settings",icon:"settings",onClick:()=>e("Share Settings clicked")()},{label:"Permission Management",icon:"shield",onClick:()=>e("Permission Management clicked")()}]}]}],o={render:u=>l.jsx(g,{children:l.jsx("div",{className:"p-4 flex justify-center items-center h-40",children:l.jsx(d,{...u})})})},t={...o,args:{options:p,button:{label:"Options"}}},n={...o,args:{options:p,children:l.jsx(b,{variant:"solid",children:"Custom Trigger"})}},r={...o,args:{options:m,button:{label:"Grouped Options"}}},i={...o,args:{options:p,placement:"right",button:{label:"Right Aligned"}}},s={...o,args:{options:p,placement:"center",button:{label:"Center Aligned"}}},a={...o,args:{options:h,button:{label:"With Submenus"}}},c={...o,args:{options:m,button:{label:"Nested Submenus"}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: actions,
    button: {
      label: "Options"
    }
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: actions,
    children: <Button variant="solid">Custom Trigger</Button>
  }
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: groupedActions,
    button: {
      label: "Grouped Options"
    }
  }
}`,...r.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: actions,
    placement: "right",
    button: {
      label: "Right Aligned"
    }
  }
}`,...i.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: actions,
    placement: "center",
    button: {
      label: "Center Aligned"
    }
  }
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: submenuActions,
    button: {
      label: "With Submenus"
    }
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...DropdownTemplate,
  args: {
    options: groupedActions,
    button: {
      label: "Nested Submenus"
    }
  }
}`,...c.parameters?.docs?.source}}};const W=["Default","WithCustomButton","WithGroups","RightAligned","CenterAligned","WithSubmenus","WithNestedSubmenus"];export{s as CenterAligned,t as Default,i as RightAligned,n as WithCustomButton,r as WithGroups,c as WithNestedSubmenus,a as WithSubmenus,W as __namedExportsOrder,O as default};

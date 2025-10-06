import{j as t}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./iframe-BjtiHmwT.js";import{F}from"./featherIcon-eOJL9Jb5.js";import"./preload-helper-PPVm8Dsz.js";const w=`
.progressbar {
  --size: 60px;
  --bar-width: 14px;
  --font-size: 16px;
  --check-icon-size: 24px;
  --color-progress: #333;
  --color-remaining-circle: #888;
  --color-complete: lightgreen;
  --progress: 0%;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  display: grid;
  place-items: center;
  position: relative;
  font-size: var(--font-size);
}
@property --progress {
  syntax: '<length-percentage>';
  inherits: true;
  initial-value: 0%;
}
.progressbar::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: conic-gradient(
    var(--color-progress) var(--progress),
    var(--color-remaining-circle) 0%
  );
  transition: --progress 500ms linear;
  aspect-ratio: 1 / 1;
  align-self: center;
}
.progressbar::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: inherit;
  z-index: 1;
  width: calc(100% - var(--bar-width));
  aspect-ratio: 1 / 1;
}
.progressbar > div {
  z-index: 2;
  position: relative;
}
.progressbar.completed:not(.fillOuter)::after {
  background: var(--color-complete);
}
.progressbar.completed.fillOuter::before {
  background: var(--color-complete);
}
.check-icon {
  z-index: 3;
  width: var(--check-icon-size);
  height: var(--check-icon-size);
}
`;if(typeof document<"u"){const e=document.createElement("style");e.innerHTML=w,document.head.appendChild(e)}const f=({step:e=1,totalSteps:o=4,showPercentage:r=!1,theme:n="black",size:v="md",themeComplete:z="lightgreen",variant:S="solid"})=>{const g=a.useMemo(()=>({xs:{ringSize:"30px",ringBarWidth:"6px",innerTextFontSize:r?"8px":"12px",checkIconSize:"16px"},sm:{ringSize:"42px",ringBarWidth:"10px",innerTextFontSize:r?"12px":"16px",checkIconSize:"20px"},md:{ringSize:"60px",ringBarWidth:"14px",innerTextFontSize:r?"16px":"20px",checkIconSize:"24px"},lg:{ringSize:"84px",ringBarWidth:"18px",innerTextFontSize:r?"20px":"24px",checkIconSize:"40px"},xl:{ringSize:"108px",ringBarWidth:"22px",innerTextFontSize:r?"24px":"28px",checkIconSize:"48px"}}),[r]),h=a.useMemo(()=>({black:{primary:"#333",secondary:"#888"},red:{primary:"#FF0000",secondary:"#FFD7D7"},green:{primary:"#22C55E",secondary:"#b1ffda"},blue:{primary:"#2376f5",secondary:"#D7D7FF"},orange:{primary:"#FFA500",secondary:"#FFE5CC"}}),[]),i=a.useMemo(()=>g[v]||g.md,[g,v]),b=a.useMemo(()=>typeof n=="string"?h[n]||h.black:n,[n,h]),x=a.useMemo(()=>e/o*100,[e,o]),y=a.useMemo(()=>e>=o,[e,o]),T={"--size":i.ringSize,"--bar-width":i.ringBarWidth,"--font-size":i.innerTextFontSize,"--check-icon-size":i.checkIconSize,"--color-progress":b.primary,"--color-remaining-circle":b.secondary,"--color-complete":z,"--progress":`${x}%`},k=y?"completed":"",C=S==="outline"?"fillOuter":"";return t.jsx("div",{className:`progressbar ${k} ${C}`,role:"progressbar","aria-valuenow":x,"aria-valuemin":0,"aria-valuemax":100,style:T,children:y?t.jsx(F,{name:"check",className:"check-icon"}):t.jsx("div",{children:r?t.jsxs("p",{children:[x.toFixed(0),"%"]}):t.jsx("p",{children:e})})})};f.__docgenInfo={description:"",methods:[],displayName:"CircularProgressBar",props:{step:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1",computed:!1}},totalSteps:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"4",computed:!1}},showPercentage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},theme:{required:!1,tsType:{name:"union",raw:"Theme | ThemeProps",elements:[{name:"union",raw:"'black' | 'red' | 'green' | 'blue' | 'orange'",elements:[{name:"literal",value:"'black'"},{name:"literal",value:"'red'"},{name:"literal",value:"'green'"},{name:"literal",value:"'blue'"},{name:"literal",value:"'orange'"}]},{name:"ThemeProps"}]},description:"",defaultValue:{value:"'black'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},themeComplete:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'lightgreen'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'solid' | 'outline'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'outline'"}]},description:"",defaultValue:{value:"'solid'",computed:!1}}}};const V={title:"Components/CircularProgressBar",component:f,argTypes:{step:{control:{type:"number",min:0},description:"The current step or progress value."},totalSteps:{control:{type:"number",min:1},description:"The total number of steps to completion."},showPercentage:{control:"boolean",description:"If true, shows percentage instead of the step number."},theme:{control:{type:"select",options:["black","red","green","blue","orange"]},description:"Predefined color theme for the progress bar."},size:{control:{type:"select",options:["xs","sm","md","lg","xl"]},description:"The size of the progress bar."},themeComplete:{control:"color",description:"Color of the progress bar when completion is reached."},variant:{control:{type:"select",options:["solid","outline"]},description:"Visual variant of the progress bar."}},parameters:{layout:"centered"},tags:["autodocs"]},s={render:e=>t.jsx("div",{className:"p-4 flex justify-center items-center",children:t.jsx(f,{...e})})},l={...s,args:{step:1,totalSteps:4}},c={...s,args:{step:1,totalSteps:4,size:"lg",showPercentage:!0}},p={...s,args:{step:3,totalSteps:4,theme:"orange"}},m={...s,args:{step:2,totalSteps:6,theme:{primary:"#2376f5",secondary:"#ddd5d5"}}},d={...s,args:{step:9,totalSteps:9,variant:"solid",themeComplete:"lightgreen"}},u={...s,args:{step:9,totalSteps:9,variant:"outline",themeComplete:"lightgreen"}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 1,
    totalSteps: 4
  }
}`,...l.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 1,
    totalSteps: 4,
    size: "lg",
    showPercentage: true
  }
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 3,
    totalSteps: 4,
    theme: "orange"
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 2,
    totalSteps: 6,
    theme: {
      primary: "#2376f5",
      secondary: "#ddd5d5"
    }
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 9,
    totalSteps: 9,
    variant: "solid",
    themeComplete: "lightgreen"
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...Template,
  args: {
    step: 9,
    totalSteps: 9,
    variant: "outline",
    themeComplete: "lightgreen"
  }
}`,...u.parameters?.docs?.source}}};const q=["Default","LargeSize","Theme","CustomTheme","CompletedSolid","CompletedOutline"];export{u as CompletedOutline,d as CompletedSolid,m as CustomTheme,l as Default,c as LargeSize,p as Theme,q as __namedExportsOrder,V as default};

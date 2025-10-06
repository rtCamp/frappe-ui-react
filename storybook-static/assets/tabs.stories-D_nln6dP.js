import{j as n}from"./jsx-runtime-D_zvdyIk.js";import{F as g}from"./featherIcon-eOJL9Jb5.js";import{r as d}from"./iframe-BjtiHmwT.js";import"./preload-helper-PPVm8Dsz.js";const y=({tabs:t,tabIndex:o,setTabIndex:i,vertical:r})=>{const s=d.useRef([]),c=d.useRef(null);return d.useEffect(()=>{const a=s.current[o],e=c.current;!a||!e||(r?(e.style.height=`${a.offsetHeight}px`,e.style.top=`${a.offsetTop}px`,e.style.right="0px",e.style.width="1px",e.style.left=""):(e.style.width=`${a.offsetWidth}px`,e.style.left=`${a.offsetLeft}px`,e.style.bottom="0px",e.style.height="1px",e.style.top=""),e.classList.add("transition-all","duration-300","ease-in-out"))},[o,t,r]),n.jsxs("div",{className:["relative flex border-gray-200",r?"flex-col border-r overflow-y-auto":"gap-7.5 border-b overflow-x-auto items-center px-5"].join(" "),children:[t.map((a,e)=>{const l=o===e;return n.jsxs("button",{ref:p=>{s.current[e]=p},className:["focus:outline-none focus:transition-none flex items-center gap-1.5 text-base text-ink-gray-5 duration-300 ease-in-out hover:text-ink-gray-9 cursor-pointer",l?"text-ink-gray-9":"",r?"py-2.5 px-4 border-r border-transparent hover:border-outline-gray-3":"py-3 border-b border-transparent hover:border-outline-gray-3"].join(" "),onClick:()=>i(e),type:"button",tabIndex:l?0:-1,"aria-selected":l,children:[a.icon&&n.jsx("span",{className:"size-4",children:a.icon}),a.label]},e)}),n.jsx("div",{ref:c,className:["tab-indicator absolute bg-surface-gray-7",r?"right-0 w-px":"bottom-0 h-px"].join(" ")})]})};y.__docgenInfo={description:"",methods:[],displayName:"TabList",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},tabIndex:{required:!0,tsType:{name:"number"},description:""},setTabIndex:{required:!0,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:""}}};const x=({tabs:t,tabIndex:o})=>n.jsx("div",{className:"flex flex-1 overflow-hidden",children:t.map((i,r)=>n.jsx("div",{className:["flex flex-1 flex-col overflow-y-auto focus:outline-none",o===r?"":"hidden"].join(" "),children:n.jsx("div",{className:"p-5 text-ink-gray-8",children:i.content})},r))});x.__docgenInfo={description:"",methods:[],displayName:"TabPanel",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},tabIndex:{required:!0,tsType:{name:"number"},description:""}}};const b=({tabs:t,vertical:o=!1,className:i="",tabIndex:r,onTabChange:s,children:c})=>{const[a,e]=d.useState(r||0),l=d.useCallback(p=>{e(p),s&&s(p)},[s]);return n.jsx("div",{className:["flex flex-1 overflow-hidden",o?"":"flex-col",i].join(" "),children:c||n.jsxs(n.Fragment,{children:[n.jsx(y,{tabs:t,tabIndex:a,setTabIndex:l,vertical:o}),n.jsx(x,{tabs:t,tabIndex:a})]})})};b.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"TabItem"}],raw:"TabItem[]"},description:""},vertical:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},tabIndex:{required:!1,tsType:{name:"number"},description:""},onTabChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const j={title:"Components/Tabs",tags:["autodocs"],component:b,parameters:{layout:"centered"},argTypes:{tabs:{control:!1,description:"Array of tab objects to display"},tabIndex:{control:"number",name:"Tab Index",description:"Currently selected tab index"},onTabChange:{action:"onTabChange",description:"Callback when tab changes"},className:{control:"text",description:"CSS classes for the Tabs container"},vertical:{control:"boolean",name:"Vertical",description:"Display tabs vertically"},children:{control:!1,description:"Content inside the Tabs component"}}},T=[{label:"Github",content:"Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere."},{label:"Twitter",content:'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".'},{label:"Linkedin",content:"LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps."}],f=[{label:"Github",content:"Github is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.",icon:n.jsx(g,{name:"github",className:"w-4 h-4"})},{label:"Twitter",content:'Twitter is an American microblogging and social networking service on which users post and interact with messages known as "tweets".',icon:n.jsx(g,{name:"twitter",className:"w-4 h-4"})},{label:"Linkedin",content:"LinkedIn is an American business and employment-oriented online service that operates via websites and mobile apps.",icon:n.jsx(g,{name:"linkedin",className:"w-4 h-4"})}],m={args:{tabs:T,tabIndex:0,onTabChange:()=>{},className:"border border-outline-gray-1 rounded"},render:t=>n.jsx(b,{...t}),argTypes:{tabs:{control:!1,description:"Array of tab objects to display."},tabIndex:{control:"number",name:"Tab Index",description:"Currently selected tab index."},onTabChange:{action:"onTabChange",description:"Callback when tab changes."},className:{control:"text",description:"CSS classes for the Tabs container."}}},u={args:{tabs:f,tabIndex:0,onTabChange:()=>{},className:"border border-outline-gray-1 rounded"},render:t=>n.jsx(b,{...t}),argTypes:{tabs:{control:!1,description:"Array of tab objects to display (with icon property)."},tabIndex:{control:"number",name:"Tab Index",description:"Currently selected tab index."},onTabChange:{action:"onTabChange",description:"Callback when tab changes."},className:{control:"text",description:"CSS classes for the Tabs container."}}},h={args:{tabs:f,tabIndex:0,onTabChange:()=>{},vertical:!0,className:"border border-outline-gray-1 rounded"},render:t=>n.jsx(b,{...t}),argTypes:{tabs:{control:!1,description:"Array of tab objects to display (with icon property)."},tabIndex:{control:"number",name:"Tab Index",description:"Currently selected tab index."},onTabChange:{action:"onTabChange",description:"Callback when tab changes."},vertical:{control:"boolean",name:"Vertical",description:"Display tabs vertically."},className:{control:"text",description:"CSS classes for the Tabs container."}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: tabsWithoutIcon,
    tabIndex: 0,
    onTabChange: () => {},
    className: "border border-outline-gray-1 rounded"
  },
  render: args => <Tabs {...args} />,
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display."
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index."
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes."
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container."
    }
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: tabsWithIcon,
    tabIndex: 0,
    onTabChange: () => {},
    className: "border border-outline-gray-1 rounded"
  },
  render: args => <Tabs {...args} />,
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display (with icon property)."
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index."
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes."
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container."
    }
  }
}`,...u.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    tabs: tabsWithIcon,
    tabIndex: 0,
    onTabChange: () => {},
    vertical: true,
    className: "border border-outline-gray-1 rounded"
  },
  render: args => <Tabs {...args} />,
  argTypes: {
    tabs: {
      control: false,
      description: "Array of tab objects to display (with icon property)."
    },
    tabIndex: {
      control: "number",
      name: "Tab Index",
      description: "Currently selected tab index."
    },
    onTabChange: {
      action: "onTabChange",
      description: "Callback when tab changes."
    },
    vertical: {
      control: "boolean",
      name: "Vertical",
      description: "Display tabs vertically."
    },
    className: {
      control: "text",
      description: "CSS classes for the Tabs container."
    }
  }
}`,...h.parameters?.docs?.source}}};const N=["WithoutIcon","WithIcon","VerticalWithIcon"];export{h as VerticalWithIcon,u as WithIcon,m as WithoutIcon,N as __namedExportsOrder,j as default};

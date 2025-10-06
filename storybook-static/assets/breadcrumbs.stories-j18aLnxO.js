import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as s,e as j}from"./iframe-BjtiHmwT.js";import{u as C,B as I,a as v,M as B}from"./button-B1ly99NU.js";import{D as N}from"./dropdown-COCufLWg.js";import"./preload-helper-PPVm8Dsz.js";import"./featherIcon-eOJL9Jb5.js";import"./index-DGnss_9L.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./index-Uuy_qmiW.js";import"./Combination-BMP8bqHG.js";import"./index-CVFSsF3X.js";import"./index-D-NEFJrh.js";import"./floating-ui.react-dom-CqRtmaVQ.js";function S(){const[o,a]=s.useState({width:window.innerWidth,height:window.innerHeight});return s.useEffect(()=>{const n=()=>{a({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",n),()=>window.removeEventListener("resize",n)},[]),o}const L=()=>e.jsxs("svg",{className:"w-4 text-(--ink-gray-5)",xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[e.jsx("circle",{cx:"12",cy:"12",r:"1"}),e.jsx("circle",{cx:"19",cy:"12",r:"1"}),e.jsx("circle",{cx:"5",cy:"12",r:"1"})]}),p=({items:o})=>{const a=C(),{width:n}=S(),i=s.useMemo(()=>(o||[]).filter(Boolean),[o]),b=s.useMemo(()=>n>640?[]:i.slice(0,-2).map(t=>{const c=()=>{t.onClick&&t.onClick(),t.route&&a(t.route)};return{label:t.label,onClick:c}}),[n,i,a]),x=s.useMemo(()=>n>640?i:i.slice(-2),[n,i]),h=s.useCallback(r=>r.suffixIcon?e.jsx("span",{className:"mr-1",children:r.suffixIcon}):null,[]),w=s.useCallback(r=>r.prefixIcon?e.jsx("span",{className:"mr-1",children:r.prefixIcon}):null,[]);return e.jsxs("div",{className:"flex min-w-0 items-center bg-surface-gray-1",children:[b.length>0&&e.jsxs("div",{className:"h-7",children:[e.jsx(N,{options:b,children:e.jsx(I,{variant:"ghost",children:e.jsx(L,{})})}),e.jsx("span",{className:"ml-1 mr-0.5 text-base text-(--ink-gray-4)","aria-hidden":"true",children:"/"})]}),e.jsx("div",{className:"flex min-w-0 items-center overflow-hidden text-ellipsis whitespace-nowrap",children:x.map((r,t)=>{const c=t===x.length-1,g=`flex items-center rounded px-0.5 py-1 text-lg font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-(--outline-gray-3) ${c?"text-(--ink-gray-9)":"text-(--ink-gray-5) hover:text-(--ink-gray-7)"}`,k=y=>{r.onClick&&r.onClick(),!r.route&&r.onClick&&y.preventDefault()};return e.jsxs(j.Fragment,{children:[r.route?e.jsxs(v,{to:r.route,onClick:k,className:`${g} cursor-default`,children:[w(r),e.jsx("span",{children:r.label}),h(r)]}):e.jsxs("button",{type:"button",onClick:k,className:`${g} cursor-pointer`,children:[w(r),e.jsx("span",{children:r.label}),h(r)]}),!c&&e.jsx("span",{className:"mx-0.5 text-base text-(--ink-gray-4) select-none","aria-hidden":"true",children:"/"})]},r.label)})})]})};p.__docgenInfo={description:"",methods:[],displayName:"Breadcrumbs",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:""},renderPrefix:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: BreadcrumbItem) => ReactNode",signature:{arguments:[{type:{name:"BreadcrumbItem"},name:"item"}],return:{name:"ReactNode"}}},description:""},renderSuffix:{required:!1,tsType:{name:"signature",type:"function",raw:"(item: BreadcrumbItem) => ReactNode",signature:{arguments:[{type:{name:"BreadcrumbItem"},name:"item"}],return:{name:"ReactNode"}}},description:""}}};const{action:d}=__STORYBOOK_MODULE_ACTIONS__,A={title:"Components/Breadcrumbs",component:p,argTypes:{items:{control:"object",description:"An array of breadcrumb items, each with a label, optional route, and optional onClick."},renderPrefix:{description:"Function to render a prefix element for each breadcrumb item."},renderSuffix:{description:"Function to render a suffix element for each breadcrumb item."}},parameters:{layout:"centered"},tags:["autodocs"]},f={render:o=>e.jsx(B,{children:e.jsx("div",{className:"p-4 bg-surface-gray-1 rounded-lg shadow-sm",children:e.jsx(p,{...o})})})},l={...f,args:{items:[{label:"Home",route:"/"},{label:"Views",route:"/components"},{label:"List",route:"/components/breadcrumbs"}]}},m={...f,args:{items:[{label:"Home",onClick:d("Home clicked")},{label:"Views",onClick:d("Views clicked")},{label:"Kanban",onClick:d("Kanban clicked")}]}},u={...f,args:{items:[{label:"Home",suffixIcon:"🏡",route:"/"},{label:"Views",suffixIcon:"🏞️",route:"/components"},{label:"List",suffixIcon:"📃",route:"/components/breadcrumbs"}]}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  ...BreadcrumbsTemplate,
  args: {
    items: [{
      label: "Home",
      route: "/"
    }, {
      label: "Views",
      route: "/components"
    }, {
      label: "List",
      route: "/components/breadcrumbs"
    }]
  }
}`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  ...BreadcrumbsTemplate,
  args: {
    items: [{
      label: "Home",
      onClick: action("Home clicked")
    }, {
      label: "Views",
      onClick: action("Views clicked")
    }, {
      label: "Kanban",
      onClick: action("Kanban clicked")
    }]
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  ...BreadcrumbsTemplate,
  args: {
    items: [{
      label: "Home",
      suffixIcon: "🏡",
      route: "/"
    }, {
      label: "Views",
      suffixIcon: "🏞️",
      route: "/components"
    }, {
      label: "List",
      suffixIcon: "📃",
      route: "/components/breadcrumbs"
    }]
  }
}`,...u.parameters?.docs?.source}}};const F=["WithRouteOption","WithOnClickOption","WithPrefixSlot"];export{m as WithOnClickOption,u as WithPrefixSlot,l as WithRouteOption,F as __namedExportsOrder,A as default};

import{j as e}from"./jsx-runtime-D_zvdyIk.js";const t=({className:n=""})=>e.jsxs("svg",{className:`spinner ${n}`,viewBox:"0 0 50 50",children:[e.jsx("defs",{children:e.jsxs("linearGradient",{id:"gradient",x1:"0%",y1:"0%",x2:"0%",y2:"100%",children:[e.jsx("stop",{offset:"0%",stopColor:"rgba(0,110,219,1)"}),e.jsx("stop",{offset:"100%",stopColor:"rgba(255,255,255,0)"})]})}),e.jsx("circle",{stroke:"url(#gradient)",className:"spinner-path",cx:"25",cy:"25",r:"20",fill:"none",strokeWidth:"5"})]});t.__docgenInfo={description:"",methods:[],displayName:"Spinner",props:{className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}}}};const o={title:"Components/Spinner",component:t,parameters:{layout:"centered"},decorators:[n=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"2rem",width:"300px"},children:e.jsx(n,{})})],argTypes:{className:{control:"text",description:"Custom CSS classes for sizing and styling."}},tags:["autodocs"]},s={render:()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"text-center",children:[e.jsx(t,{className:"w-4 h-4"}),e.jsx("p",{className:"text-xs mt-2",children:"w-4 h-4"})]}),e.jsxs("div",{className:"text-center",children:[e.jsx(t,{className:"w-8 h-8"}),e.jsx("p",{className:"text-xs mt-2",children:"w-8 h-8"})]})]})},a={args:{className:"w-4 h-4"}},r={args:{className:"w-8 h-8"}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => <>
      <div className="text-center">
        <Spinner className="w-4 h-4" />
        <p className="text-xs mt-2">w-4 h-4</p>
      </div>
      <div className="text-center">
        <Spinner className="w-8 h-8" />
        <p className="text-xs mt-2">w-8 h-8</p>
      </div>
    </>
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    className: "w-4 h-4"
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    className: "w-8 h-8"
  }
}`,...r.parameters?.docs?.source}}};const l=["Default","Small","Large"];export{s as Default,r as Large,a as Small,l as __namedExportsOrder,o as default};

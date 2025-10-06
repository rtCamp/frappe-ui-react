import{j as b}from"./jsx-runtime-D_zvdyIk.js";import{r as t,e as i}from"./iframe-BjtiHmwT.js";import{Y as L,V,H as q,a as G,n as I,K as N,t as le,v as ie,W as ce,M as K,Z as _,x as de,m as ue,y as pe,b as fe,c as me,p as he,o as k,N as be,w as ge,$ as ve,e as xe,f as ye,j as we,h as P,k as Ce,g as ke}from"./label-BM8_gdnq.js";import{w as Se,e as $e}from"./use-resolve-button-type-pYJO_gjF.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";let Te="div";function Ne(s,n){let e=`headlessui-control-${t.useId()}`,[r,c]=V(),[o,g]=q(),a=G(),{disabled:l=a||!1,...d}=s,f=I({disabled:l}),m={ref:n,disabled:l||void 0,"aria-disabled":l||void 0},h=N();return i.createElement(le,{value:l},i.createElement(c,{value:r},i.createElement(g,{value:o},i.createElement(ie,{id:e},h({ourProps:m,theirProps:{...d,children:i.createElement(ce,null,typeof d.children=="function"?d.children(f):d.children)},slot:f,defaultTag:Te,name:"Field"})))))}let Ee=L(Ne),E=t.createContext(null);E.displayName="GroupContext";let je=t.Fragment;function De(s){var n;let[e,r]=t.useState(null),[c,o]=V(),[g,a]=q(),l=t.useMemo(()=>({switch:e,setSwitch:r}),[e,r]),d={},f=s,m=N();return i.createElement(a,{name:"Switch.Description",value:g},i.createElement(o,{name:"Switch.Label",value:c,props:{htmlFor:(n=l.switch)==null?void 0:n.id,onClick(h){e&&(de(h.currentTarget)&&h.preventDefault(),e.click(),e.focus({preventScroll:!0}))}}},i.createElement(E.Provider,{value:l},m({ourProps:d,theirProps:f,slot:{},defaultTag:je,name:"Switch.Group"}))))}let Fe="button";function Pe(s,n){var e;let r=t.useId(),c=ue(),o=G(),{id:g=c||`headlessui-switch-${r}`,disabled:a=o||!1,checked:l,defaultChecked:d,onChange:f,name:m,value:h,form:T,autoFocus:v=!1,...u}=s,j=t.useContext(E),[z,M]=t.useState(null),R=t.useRef(null),A=pe(R,n,j===null?null:j.setSwitch,M),x=fe(d),[C,y]=me(l,f,x??!1),U=he(),[W,D]=t.useState(!1),F=k(()=>{D(!0),y?.(!C),U.nextFrame(()=>{D(!1)})}),H=k(p=>{if(ke(p.currentTarget))return p.preventDefault();p.preventDefault(),F()}),O=k(p=>{p.key===P.Space?(p.preventDefault(),F()):p.key===P.Enter&&Ce(p.currentTarget)}),B=k(p=>p.preventDefault()),J=be(),X=ge(),{isFocusVisible:Y,focusProps:Z}=ve({autoFocus:v}),{isHovered:Q,hoverProps:ee}=xe({isDisabled:a}),{pressed:se,pressProps:ae}=Se({disabled:a}),te=I({checked:C,disabled:a,hover:Q,focus:Y,active:se,autofocus:v,changing:W}),ne=ye({id:g,ref:A,role:"switch",type:$e(s,z),tabIndex:s.tabIndex===-1?0:(e=s.tabIndex)!=null?e:0,"aria-checked":C,"aria-labelledby":J,"aria-describedby":X,disabled:a||void 0,autoFocus:v,onClick:H,onKeyUp:O,onKeyPress:B},Z,ee,ae),re=t.useCallback(()=>{if(x!==void 0)return y?.(x)},[y,x]),oe=N();return i.createElement(i.Fragment,null,m!=null&&i.createElement(we,{disabled:a,data:{[m]:h||"on"},overrides:{type:"checkbox",checked:C},form:T,onReset:re}),oe({ourProps:ne,theirProps:u,slot:te,defaultTag:Fe,name:"Switch"}))}let Le=L(Pe),Ve=De,qe=_,Ge=K,Ie=Object.assign(Le,{Group:Ve,Label:qe,Description:Ge});const $=({value:s,onChange:n,size:e="sm",label:r="",description:c="",disabled:o=!1,className:g=""})=>{const a=t.useMemo(()=>r&&c?2:r?1:0,[r,c]),l=["relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-transparent transition-colors duration-100 ease-in-out items-center","focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3","disabled:cursor-not-allowed disabled:bg-surface-gray-3",s?"bg-surface-gray-7 enabled:hover:bg-surface-gray-6 active:bg-surface-gray-5 group-hover:enabled:bg-surface-gray-6":"bg-surface-gray-4 enabled:hover:bg-gray-400 active:bg-gray-500 group-hover:enabled:bg-gray-400",e==="md"?"h-5 w-8 border-[3px]":"h-4 w-[26px] border-2"].join(" "),d=["pointer-events-none inline-block transform rounded-full bg-surface-white shadow ring-0 transition duration-100 ease-in-out",e==="md"?"h-3.5 w-3.5":"h-3 w-3",e==="md"?s?"translate-x-3 rtl:-translate-x-3":"translate-x-0":s?"translate-x-2.5 rtl:-translate-x-2.5":"translate-x-0"].join(" "),f=["font-medium leading-normal",o&&a===1?"text-ink-gray-4":"text-ink-gray-8",e==="md"?"text-lg":"text-base"].join(" "),m="max-w-xs text-p-base text-ink-gray-7",h=t.useMemo(()=>{const u=["flex justify-between"];return a===1?(u.push("group items-center space-x-3 cursor-pointer rounded focus-visible:bg-surface-gray-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-outline-gray-3"),u.push(o?"cursor-not-allowed":"hover:bg-surface-gray-3 active:bg-surface-gray-4"),u.push(e==="md"?"px-3 py-1.5":"px-2.5 py-1.5")):a===2&&(u.push("items-start"),u.push(e==="md"?"space-x-3.5":"space-x-2.5")),u.join(" ")},[a,e,o]),T="flex flex-col space-y-0.5",v=u=>{a===1&&u.code==="Space"&&!o&&n(!s)};return b.jsxs(Ee,{as:"div",tabIndex:a===1?0:-1,onKeyUp:v,className:`${h} ${g}`,children:[b.jsxs("span",{className:T,children:[r&&b.jsx(_,{as:"span",className:f,children:r}),c&&b.jsx(K,{as:"span",className:m,children:c})]}),b.jsx(Ie,{checked:!!s,onChange:()=>n(!s),disabled:o,className:l,children:b.jsx("span",{"aria-hidden":"true",className:d})})]})};$.__docgenInfo={description:"",methods:[],displayName:"Switch",props:{value:{required:!0,tsType:{name:"boolean"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(value: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"value"}],return:{name:"void"}}},description:""},size:{required:!1,tsType:{name:"union",raw:'"sm" | "md"',elements:[{name:"literal",value:'"sm"'},{name:"literal",value:'"md"'}]},description:"",defaultValue:{value:'"sm"',computed:!1}},label:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},description:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:'""',computed:!1}}}};const Ke=["sm","md"],He={title:"Components/Switch",tags:["autodocs"],component:$,parameters:{layout:"centered"}},w={args:{size:"sm",label:"Enable Notifications",description:"",disabled:!1,value:!1,className:""},render:s=>{const[n,e]=t.useState(s.value??!1);return b.jsx($,{...s,value:n,onChange:e})},argTypes:{size:{control:"select",options:Ke,description:"Switch size"},label:{control:"text",description:"Switch label"},description:{control:"text",description:"Switch description"},disabled:{control:"boolean",description:"Disable switch"},value:{control:"boolean",description:"Checked state"},onChange:{action:"onChange",description:"Callback when value changes"},className:{control:"text",description:"CSS classes for the Switch container"}}},S={args:{size:"sm",label:"Enable Notifications",description:"Get notified when something happens.",disabled:!1,value:!1,className:""},render:s=>{const[n,e]=t.useState(s.value??!1);return b.jsx($,{...s,value:n,onChange:e})},argTypes:w.argTypes};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "",
    disabled: false,
    value: false,
    className: ""
  },
  render: args => {
    const [checked, setChecked] = useState(args.value ?? false);
    return <Switch {...args} value={checked} onChange={setChecked} />;
  },
  argTypes: {
    size: {
      control: "select",
      options: sizes,
      description: "Switch size"
    },
    label: {
      control: "text",
      description: "Switch label"
    },
    description: {
      control: "text",
      description: "Switch description"
    },
    disabled: {
      control: "boolean",
      description: "Disable switch"
    },
    value: {
      control: "boolean",
      description: "Checked state"
    },
    onChange: {
      action: "onChange",
      description: "Callback when value changes"
    },
    className: {
      control: "text",
      description: "CSS classes for the Switch container"
    }
  }
}`,...w.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    size: "sm",
    label: "Enable Notifications",
    description: "Get notified when something happens.",
    disabled: false,
    value: false,
    className: ""
  },
  render: args => {
    const [checked, setChecked] = useState(args.value ?? false);
    return <Switch {...args} value={checked} onChange={setChecked} />;
  },
  argTypes: Label.argTypes
}`,...S.parameters?.docs?.source}}};const Oe=["Label","LabelAndDescription"];export{w as Label,S as LabelAndDescription,Oe as __namedExportsOrder,He as default};

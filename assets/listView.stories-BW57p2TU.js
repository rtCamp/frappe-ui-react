import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{B as N,a as te,M as C}from"./button-B1ly99NU.js";import{r}from"./iframe-BjtiHmwT.js";import{d as se}from"./debounce-C-hnF4Z3.js";import{C as M}from"./checkbox-BMJ6yhQh.js";import{T as oe}from"./tooltip-bmOWK2eJ.js";import{F as ne}from"./featherIcon-eOJL9Jb5.js";import{B as G}from"./badge-DwP9CpOV.js";import{A as F}from"./avatar-u9MTEoHU.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DGnss_9L.js";import"./index-DVL4rZCR.js";import"./index-BLmzO5SP.js";import"./index-CVFSsF3X.js";import"./index-D-NEFJrh.js";import"./floating-ui.react-dom-CqRtmaVQ.js";import"./index-D0BWuQVU.js";const x=r.createContext({options:void 0}),W=({children:t})=>{const o=r.useContext(x);if(!o||!o.options||!o.options.emptyState)throw new Error("EmptyState must be used within a ListContext.Provider");return e.jsx("div",{className:"flex h-full w-full flex-col items-center justify-center text-base",children:t||e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"text-xl font-medium",children:o.options.emptyState.title}),e.jsx("div",{className:"mt-1 text-base text-ink-gray-5",children:o.options.emptyState.description}),o.options.emptyState.button&&e.jsx(N,{...o.options.emptyState.button,className:"mt-4"})]})})};W.__docgenInfo={description:"",methods:[],displayName:"EmptyState",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};function J(t,o=!0){const n=o?"14px ":"",s=t.map(a=>{const i=a.width||1;return typeof i=="number"?i+"fr":i}).join(" ");return n+s}const I={left:"justify-start",start:"justify-start",center:"justify-center",middle:"justify-center",right:"justify-end",end:"justify-end"},z=({item:t,firstItem:o=!1,debounce:n=1e3,onColumnWidthUpdated:s,children:a,prefix:i,suffix:l})=>{const{options:u}=r.useContext(x);if(!u)throw new Error("ListHeaderItem must be used within a ListProvider");const c=r.useRef(null),[g,f]=r.useState(!1),w=se(p=>{s&&s(p)},n),y=r.useCallback(()=>{if(typeof t.width=="string"){const p=parseInt(t.width,10);if(t.width.includes("rem"))return p*16;if(t.width.includes("px"))return p}return c.current?.offsetWidth||0},[t.width]),R=r.useCallback(p=>{p.preventDefault(),f(!0);const h=p.clientX,j=y(),v=Z=>{const ee=j+(Z.clientX-h),K=Math.max(50,ee);c.current&&(c.current.style.width=`${K}px`),w(K)},P=()=>{f(!1),window.removeEventListener("mousemove",v),window.removeEventListener("mouseup",P)};window.addEventListener("mousemove",v),window.addEventListener("mouseup",P)},[y,w]),m=r.useMemo(()=>{const p=e.jsx("div",{className:"truncate",children:t.label});return a||p},[t.label,a]),d=r.useMemo(()=>["group relative flex items-center",o?"ml-4":"",t.align?I[t.align]:"justify-between"].filter(Boolean).join(" "),[t.align,o]);return e.jsxs("div",{ref:c,className:d,children:[e.jsxs("div",{className:`flex items-center space-x-2 truncate text-sm text-ink-gray-5 ${g?"cursor-col-resize":""}`,children:[i,m,l]}),u.options.resizeColumn&&e.jsx("div",{className:"flex h-4 absolute -right-2 w-2 cursor-col-resize justify-center",onMouseDown:R,children:e.jsx("div",{className:`h-full w-[2px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-gray-400 ${g?"bg-gray-400":""}`})})]})};z.__docgenInfo={description:"",methods:[],displayName:"ListHeaderItem",props:{item:{required:!0,tsType:{name:"any"},description:""},debounce:{required:!1,tsType:{name:"number"},description:"",defaultValue:{value:"1000",computed:!1}},onColumnWidthUpdated:{required:!1,tsType:{name:"signature",type:"function",raw:"(width: number) => void",signature:{arguments:[{type:{name:"number"},name:"width"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""},prefix:{required:!1,tsType:{name:"ReactNode"},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},firstItem:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const E=({children:t})=>{const{options:o}=r.useContext(x);if(!o)throw new Error("ListHeader must be used within a ListProvider");const n=r.useMemo(()=>J(o.columns,o.options.selectable),[o.columns,o.options.selectable]);return e.jsxs("div",{className:"mb-2 grid items-center rounded bg-surface-gray-2 p-2",style:{gridTemplateColumns:n},children:[o.options.selectable&&e.jsx(M,{value:o.allRowsSelected,onChange:o.toggleAllRows}),t||o.columns.map((s,a)=>e.jsx(z,{firstItem:a===0,item:s,onColumnWidthUpdated:()=>{}},s.key))]})};E.__docgenInfo={description:"",methods:[],displayName:"ListHeader",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const H=({column:t,row:o,item:n,align:s="left",prefix:a,suffix:i,children:l})=>{const{options:u}=r.useContext(x);if(!u)throw new Error("ListRowItem must be used within a ListProvider");const c=r.useCallback(y=>y&&typeof y=="object"?y:{label:y},[]),g=r.useMemo(()=>t?.getLabel?t.getLabel({row:o}):c(n).label||"",[t,o,n,c]),f=r.useMemo(()=>u.options.showTooltip?t.getTooltip?t.getTooltip(o):c(n).label:"",[u.options.showTooltip,t,o,n,c]),w=r.useMemo(()=>t.prefix?typeof t.prefix=="function"?t.prefix({row:o}):t.prefix:a,[t,a,o]);return e.jsxs("div",{className:`flex items-center space-x-2 ${I[s]}`,children:[w&&w,l||e.jsx(oe,{text:f,children:e.jsx("div",{className:"truncate text-base",children:g})}),i&&e.jsx("div",{className:"flex-shrink-0",children:i})]})};H.__docgenInfo={description:"",methods:[],displayName:"ListRowItem",props:{column:{required:!0,tsType:{name:"any"},description:""},row:{required:!0,tsType:{name:"any"},description:""},item:{required:!0,tsType:{name:"union",raw:"string | number | object",elements:[{name:"string"},{name:"number"},{name:"object"}]},description:""},align:{required:!1,tsType:{name:"union",raw:"'left' | 'right' | 'center'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'center'"}]},description:"",defaultValue:{value:"'left'",computed:!1}},prefix:{required:!1,tsType:{name:"ReactNode"},description:""},suffix:{required:!1,tsType:{name:"ReactNode"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const q=({row:t,isLastRow:o=!1,children:n})=>{const{options:s}=r.useContext(x);if(!s)throw new Error("ListRow must be used within a ListProvider");const a=r.useMemo(()=>s.selections.has(t[s.rowKey]),[s.selections,t,s.rowKey]),i=r.useMemo(()=>s.options.enableActive&&s.activeRow.value===t.name,[s.options.enableActive,s.activeRow,t.name]),l=r.useMemo(()=>!!s.options.getRowRoute||!!s.options.onRowClick,[s.options.getRowRoute,s.options.onRowClick]),u=r.useMemo(()=>typeof s.options.rowHeight=="number"?`${s.options.rowHeight}px`:s.options.rowHeight,[s.options.rowHeight]),c=r.useMemo(()=>{if(!a)return"rounded";const m=[...s.selections],d=s.rows.some(v=>v.group)?s.rows.flatMap(v=>v.rows):s.rows,p=d.findIndex(v=>v===t);if(p===-1)return"";const h=!m.includes(d[p+1]?.[s.rowKey]),j=!m.includes(d[p-1]?.[s.rowKey]);return(h?"rounded-b":"")+(j?"rounded-t":"")},[a,s.selections,s.rows,t,s.rowKey]),g=r.useCallback(m=>{s.options.onRowClick&&s.options.onRowClick(t,m),s.activeRow?.value===t.name?s.activeRow.value=null:s.activeRow.value=t.name},[s,t]),f=s.options.getRowRoute?te:"div",w=s.options.getRowRoute?{to:s.options.getRowRoute(t)}:{to:""},y=l?{onClick:g}:{},R=s.options.getRowRoute?"template":"button";return e.jsx(f,{className:`flex flex-col transition-all duration-300 ease-in-out ${c} ${a||i?"bg-surface-gray-2":""} ${l?"cursor-pointer":""} ${l?a||i?"hover:bg-surface-gray-3":"hover:bg-surface-menu-bar":""}`,...w,...y,children:e.jsxs(R,{className:"[all:unset] hover:[all:unset]",children:[e.jsxs("div",{className:"grid items-center px-2",style:{height:u,gridTemplateColumns:J(s.columns,s.options.selectable)},children:[s.options.selectable&&e.jsx("div",{className:"w-fit pr-2 py-3 flex",onClick:m=>{m.stopPropagation()},onDoubleClick:m=>m.stopPropagation(),children:e.jsx(M,{value:a,onChange:()=>s.toggleRow(t[s.rowKey])})}),n||s.columns.map((m,d)=>e.jsx("div",{className:`${I[m.align]} ${d===0?"ml-4 text-ink-gray-9":"text-ink-gray-7"}`,children:s.slots?.cell?e.jsx(s.slots.cell,{column:m,row:t,item:t[m.key],align:m.align}):e.jsx(H,{column:m,row:t,item:t[m.key],align:m.align})},m.key))]}),!o&&e.jsx("div",{className:`h-px border-t ${c==="rounded"||c.includes("rounded-b")?"mx-2 border-outline-gray-1":"border-t-[--surface-gray-2]"}`})]})})};q.__docgenInfo={description:"",methods:[],displayName:"ListRow",props:{row:{required:!0,tsType:{name:"any"},description:""},isLastRow:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const D=({children:t})=>{const{options:o}=r.useContext(x);if(!o)throw new Error("ListRows must be used within a ListContext.Provider");return e.jsx("div",{className:"h-full overflow-y-auto",children:t||o.rows&&o.rows.map(n=>e.jsx(q,{row:n},n[o.rowKey]))})};D.__docgenInfo={description:"",methods:[],displayName:"ListRows",props:{children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const re=t=>r.createElement("svg",{width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",...t},r.createElement("path",{d:"M7 10l5 5 5-5z"})),O=({group:t,setCollapsed:o,index:n,collapsed:s})=>{const a=r.useContext(x),i=r.useCallback(()=>{o(u=>{const c=structuredClone(u);return c[n]?c[n].collapsed=!c[n].collapsed:c[n]={collapsed:!0},c})},[n,o]),l=r.useMemo(()=>{const u=a?.options?.slots?.["group-header"];return u?e.jsx(u,{group:{...t,collapsed:s}}):e.jsx("span",{className:"text-base font-medium leading-6",children:t.group})},[a?.options?.slots,t,s]);return e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("button",{onClick:i,className:"ml-[3px] mr-[11px] rounded p-1 hover:bg-surface-gray-2",children:e.jsx(re,{className:`h-4 w-4 text-ink-gray-6 transition-transform duration-200 ${s?"-rotate-90":""}`})}),l]}),e.jsx("div",{className:"mx-2 h-px border-t border-outline-gray-modals"})]})};O.__docgenInfo={description:"",methods:[],displayName:"ListGroupHeader",props:{group:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  collapsed?: boolean;
  group: string;
}`,signature:{properties:[{key:"collapsed",value:{name:"boolean",required:!1}},{key:"group",value:{name:"string",required:!0}}]}},description:""},setCollapsed:{required:!0,tsType:{name:"ReactDispatch",raw:`React.Dispatch<
  React.SetStateAction<{
    [index: number]: {
      collapsed: boolean;
    };
  }>
>`,elements:[{name:"ReactSetStateAction",raw:`React.SetStateAction<{
  [index: number]: {
    collapsed: boolean;
  };
}>`,elements:[{name:"signature",type:"object",raw:`{
  [index: number]: {
    collapsed: boolean;
  };
}`,signature:{properties:[{key:{name:"number"},value:{name:"signature",type:"object",raw:`{
  collapsed: boolean;
}`,signature:{properties:[{key:"collapsed",value:{name:"boolean",required:!0}}]},required:!0}}]}}]}]},description:""},index:{required:!0,tsType:{name:"number"},description:""},collapsed:{required:!0,tsType:{name:"boolean"},description:""}}};const U=({group:t,children:o})=>{const n=r.useContext(x);if(!n.options)throw new Error("ListGroupBody must be used within a ListContext.Provider");if(t.collapsed)return null;const{rowKey:s=""}=n.options;return e.jsx("div",{className:"mb-5 mt-2",children:o||t.rows&&t.rows.map(a=>e.jsx(q,{row:a},a[s]))})};U.__docgenInfo={description:"",methods:[],displayName:"ListGroupBody",props:{group:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  collapsed?: boolean;
  rows: any[];
}`,signature:{properties:[{key:"collapsed",value:{name:"boolean",required:!1}},{key:"rows",value:{name:"Array",elements:[{name:"any"}],raw:"any[]",required:!0}}]}},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}}};const X=({children:t})=>{const{options:o}=r.useContext(x),[n,s]=r.useState({});r.useEffect(()=>{!o||!o.rows||s(i=>{const l={...i};return o.rows.forEach((u,c)=>{c>=Object.keys(l).length&&(l[c]={collapsed:!1})}),Object.keys(l).forEach(u=>{Number(u)>=o.rows.length&&delete l[Number(u)]}),l})},[o,o?.rows?.length]);const a=r.useMemo(()=>!o||!o.rows?[]:Array.isArray(o.rows)?o.rows.map((i,l)=>({...i,collapsed:n[l]?.collapsed})):[],[n,o]);if(!o)throw new Error("ListGroups must be used within a ListContext.Provider");return e.jsx("div",{className:"h-full overflow-y-auto",children:a.map((i,l)=>e.jsx("div",{children:t?t({group:i}):e.jsxs(e.Fragment,{children:[e.jsx(O,{group:i,setCollapsed:s,index:l,collapsed:n[l]?.collapsed??!1}),e.jsx(U,{group:{...i,collapsed:n[l]?.collapsed??!1}})]})},i.group))})};X.__docgenInfo={description:"",methods:[],displayName:"ListGroups",props:{children:{required:!1,tsType:{name:"signature",type:"function",raw:"(props: { group: any }) => ReactNode",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ group: any }",signature:{properties:[{key:"group",value:{name:"any",required:!0}}]}},name:"props"}],return:{name:"ReactNode"}}},description:""}}};const $=({children:t,actions:o,...n})=>{const{options:s}=r.useContext(x);if(!s)throw new Error("ListSelectBanner must be used within a ListContext.Provider");const a=r.useMemo(()=>s.options.selectionText(s.selections.size),[s.selections.size,s.options]),i=r.useMemo(()=>({selections:s.selections,allRowsSelected:s.allRowsSelected,selectAll:()=>s.toggleAllRows(!0),unselectAll:()=>s.toggleAllRows(!1)}),[s]),l=s.selections.size>0?"opacity-100 duration-300 ease-out":"opacity-0 duration-300 ease-in transform";return e.jsx("div",{className:`transition-all ${l}`,"aria-live":"polite",children:s.selections.size>0&&e.jsx("div",{className:"absolute inset-x-0 bottom-6 mx-auto w-max text-base",...n,children:e.jsx("div",{className:"flex min-w-[596px] items-center space-x-3 rounded-lg bg-surface-white px-4 py-2 shadow-2xl",children:t?t(i):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex flex-1 justify-between border-r border-outline-gray-2 text-ink-gray-9",children:[e.jsxs("div",{className:"flex items-center space-x-3",children:[e.jsx(M,{value:!0,disabled:!0}),e.jsx("div",{children:a})]}),e.jsx("div",{className:"mr-3",children:o&&o(i)})]}),e.jsxs("div",{className:"flex items-center space-x-1",children:[e.jsx(N,{className:"text-ink-gray-7",disabled:s.allRowsSelected,variant:"ghost",onClick:()=>s.toggleAllRows(!0),label:"Select all"}),e.jsx(N,{icon:"x",variant:"ghost",onClick:()=>s.toggleAllRows(!1),label:"Unselect all"})]})]})})})})};$.__docgenInfo={description:"",methods:[],displayName:"ListSelectBanner",props:{children:{required:!1,tsType:{name:"signature",type:"function",raw:`(props: {
  selections: Set<any>;
  allRowsSelected: boolean;
  selectAll: () => void;
  unselectAll: () => void;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  selections: Set<any>;
  allRowsSelected: boolean;
  selectAll: () => void;
  unselectAll: () => void;
}`,signature:{properties:[{key:"selections",value:{name:"Set",elements:[{name:"any"}],raw:"Set<any>",required:!0}},{key:"allRowsSelected",value:{name:"boolean",required:!0}},{key:"selectAll",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"unselectAll",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"props"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},actions:{required:!1,tsType:{name:"signature",type:"function",raw:`(props: {
  selections: Set<any>;
  allRowsSelected: boolean;
  selectAll: () => void;
  unselectAll: () => void;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  selections: Set<any>;
  allRowsSelected: boolean;
  selectAll: () => void;
  unselectAll: () => void;
}`,signature:{properties:[{key:"selections",value:{name:"Set",elements:[{name:"any"}],raw:"Set<any>",required:!0}},{key:"allRowsSelected",value:{name:"boolean",required:!0}},{key:"selectAll",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}},{key:"unselectAll",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"props"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""}}};const Q=({options:t,rows:o,rowKey:n,columns:s,children:a})=>{const[i,l]=r.useState(new Set),[u,c]=r.useState(null),g=r.useMemo(()=>({getRowRoute:t.options.getRowRoute,onRowClick:t.options.onRowClick,showTooltip:t.options.showTooltip!==void 0?t.options.showTooltip:!0,selectionText:t.options.selectionText||(d=>d===1?"1 row selected":`${d} rows selected`),enableActive:t.options.enableActive!==void 0?t.options.enableActive:!1,selectable:t.options.selectable!==void 0?t.options.selectable:!0,resizeColumn:t.options.resizeColumn!==void 0?t.options.resizeColumn:!1,rowHeight:t.options.rowHeight||40,emptyState:t.emptyState||{title:"No Data",description:"No data available"}}),[t]),f=r.useMemo(()=>o.every(d=>d.group&&d.rows&&Array.isArray(d.rows)),[o]),w=r.useMemo(()=>o.length?f?i.size===o.reduce((d,p)=>d+p.rows.length,0):i.size===o.length:!1,[o,f,i.size]),y=r.useCallback(d=>{l(p=>{const h=new Set(p);return h.has(d)?h.delete(d):h.add(d),h})},[]),R=r.useCallback(d=>{if(d===!1||w){l(new Set);return}const p=new Set;f?o.forEach(h=>{h.rows.forEach(j=>p.add(j[n]))}):o.forEach(h=>p.add(h[n])),l(p)},[w,o,f,n]);r.useMemo(()=>{i.size>0&&c({value:null})},[i.size]);const m=r.useMemo(()=>({options:{columns:s,rows:o,rowKey:n,options:g,selections:i,activeRow:u,allRowsSelected:w,slots:t.slots,toggleRow:y,toggleAllRows:R,emptyState:t.emptyState,setColumns:()=>{}}}),[s,o,n,t.slots,t.emptyState,g,i,u,w,y,R]);return e.jsx(x.Provider,{value:m,children:a})};Q.__docgenInfo={description:"",methods:[],displayName:"ListProvider",props:{options:{required:!0,tsType:{name:"ListOptionsProps"},description:""},children:{required:!0,tsType:{name:"ReactNode"},description:""},rows:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},rowKey:{required:!0,tsType:{name:"string"},description:""},columns:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""}}};const b=({columns:t,rows:o,rowKey:n,options:s,children:a,...i})=>{const l=r.useMemo(()=>o.every(g=>g.group&&g.rows&&Array.isArray(g.rows)),[o]);if(!s)return null;const u=s?.options?.selectable!==void 0?s.options.selectable:!0,c=e.jsxs(e.Fragment,{children:[e.jsx(E,{}),o.length?l?e.jsx(X,{}):e.jsx(D,{}):e.jsx(W,{}),u&&e.jsx($,{})]});return e.jsx(Q,{rows:o,columns:t,rowKey:n,options:{...s},children:e.jsx("div",{className:"relative flex w-full flex-1 flex-col overflow-x-auto",children:e.jsx("div",{className:`flex w-max min-w-full flex-col overflow-y-hidden ${i.className||""}`,style:i.style,children:a||c})})})};b.__docgenInfo={description:"",methods:[],displayName:"ListView",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},rows:{required:!0,tsType:{name:"Array",elements:[{name:"any"}],raw:"any[]"},description:""},rowKey:{required:!0,tsType:{name:"string"},description:""},options:{required:!1,tsType:{name:"ListOptionsProps"},description:""},children:{required:!1,tsType:{name:"ReactNode"},description:""}},composes:["HTMLAttributes"]};const B=[{label:"Name",key:"name",width:3,getLabel:({row:t})=>t.name,prefix:({row:t})=>e.jsx(F,{shape:"circle",image:t.user_image,size:"sm",label:t.name})},{label:"Email",key:"email",width:"200px"},{label:"Role",key:"role"},{label:"Status",key:"status"}],Y=[{id:1,name:"John Doe",email:"john@doe.com",status:"Active",role:"Developer",user_image:"https://avatars.githubusercontent.com/u/499550"},{id:2,name:"Jane Doe",email:"jane@doe.com",status:"Inactive",role:"HR",user_image:"https://avatars.githubusercontent.com/u/499120"}],ae=[{label:"Name",key:"name",width:3},{label:"Email",key:"email",width:"200px"},{label:"Role",key:"role"},{label:"Status",key:"status"}],ie=[{group:"Developer",collapsed:!1,rows:[{id:2,name:"Gary Fox",email:"gary@fox.com",status:"Inactive",role:"Developer"},{id:6,name:"Emily Davis",email:"emily@davis.com",status:"Active",role:"Developer"},{id:9,name:"David Lee",email:"david@lee.com",status:"Inactive",role:"Developer"}]},{group:"Manager",collapsed:!1,rows:[{id:3,name:"John Doe",email:"john@doe.com",status:"Active",role:"Manager"},{id:8,name:"Sarah Wilson",email:"sarah@wilson.com",status:"Active",role:"Manager"}]},{group:"Designer",collapsed:!1,rows:[{id:4,name:"Alice Smith",email:"alice@smith.com",status:"Active",role:"Designer"},{id:10,name:"Olivia Taylor",email:"olivia@taylor.com",status:"Active",role:"Designer"}]},{group:"HR",collapsed:!1,rows:[{id:1,name:"Jane Mary",email:"jane@doe.com",status:"Inactive",role:"HR"},{id:7,name:"Michael Brown",email:"michael@brown.com",status:"Inactive",role:"HR"},{id:12,name:"Sophia Martinez",email:"sophia@martinez.com",status:"Active",role:"HR"}]},{group:"Tester",collapsed:!1,rows:[{id:5,name:"Bob Johnson",email:"bob@johnson.com",status:"Inactive",role:"Tester"},{id:11,name:"James Anderson",email:"james@anderson.com",status:"Inactive",role:"Tester"}]}],_=[{label:"Name",key:"name",width:3,icon:"user"},{label:"Email",key:"email",width:"200px",icon:"at-sign"},{label:"Role",key:"role",icon:"users"},{label:"Status",key:"status",icon:"check-circle"}],V=[{id:1,name:{label:"John Doe",image:"https://avatars.githubusercontent.com/u/499550"},email:"john@doe.com",status:{label:"Active",bg_color:"bg-surface-green-3"},role:{label:"Developer",color:"green"}},{id:2,name:{label:"Jane Doe",image:"https://avatars.githubusercontent.com/u/499120"},email:"jane@doe.com",status:{label:"Inactive",bg_color:"bg-surface-red-5"},role:{label:"HR",color:"red"}}],Ce={title:"Components/ListView",component:b,tags:["autodocs"],argTypes:{options:{control:{type:"object"}},rows:{control:{type:"object"}},columns:{control:{type:"object"}},rowKey:{control:"text"}}},k={render:t=>e.jsx("div",{children:e.jsx(C,{children:e.jsx(b,{...t,columns:B,rows:Y,rowKey:"id"})})}),args:{options:{options:{getRowRoute:t=>`/users/${t.id}`,selectable:!0,showTooltip:!0,resizeColumn:!0}}}},S={render:t=>e.jsx("div",{children:e.jsx(C,{children:e.jsx(b,{...t,columns:_,rows:V,rowKey:"id",children:e.jsxs(e.Fragment,{children:[e.jsx(E,{children:_.map((o,n)=>e.jsx(z,{item:o,children:e.jsxs("div",{className:`flex items-center gap-2 ${n===0?"ml-4":""}`,children:[e.jsx(ne,{name:o.icon,className:"h-4 w-4"}),e.jsx("span",{children:o.label})]})},o.key))}),e.jsx(D,{children:V.map(o=>e.jsx(q,{row:o,children:_.map((n,s)=>{const a=o[n.key];return e.jsx("div",{className:`${s===0?"ml-4":""}`,children:e.jsx(H,{column:n,row:o,item:a,prefix:e.jsxs(e.Fragment,{children:[n.key==="status"&&e.jsx("div",{className:"h-3 w-3 rounded-full",style:{backgroundColor:a.bg_color}}),n.key==="name"&&e.jsx(F,{shape:"circle",image:a.image,size:"sm",label:a.label})]}),children:e.jsx(e.Fragment,{children:n.key==="role"?e.jsx(G,{variant:"subtle",theme:a.color,size:"md",label:a.label}):e.jsx("span",{className:"font-medium text-ink-gray-7",children:a.label||a})})},n.key)})})},o.id))}),e.jsx($,{children:({unselectAll:o})=>e.jsxs("div",{className:"flex w-full justify-between",children:[e.jsx(N,{variant:"ghost",label:"Delete"}),e.jsx(N,{variant:"ghost",label:"Unselect all",onClick:o})]})})]})})})}),args:{options:{options:{onRowClick:t=>console.log(t),selectable:!0,showTooltip:!0,resizeColumn:!0}}}},L={render:t=>e.jsx("div",{children:e.jsx(C,{children:e.jsx(b,{...t,columns:ae,rows:ie,rowKey:"id",options:{options:{selectable:!0,showTooltip:!0,resizeColumn:!0,getRowRoute:o=>`/users/${o.id}`}}})})}),args:{}},T={render:t=>{const o=({item:n,column:s})=>s.key==="status"?e.jsx(G,{children:n}):e.jsx("span",{className:"font-medium text-ink-gray-7",children:n});return e.jsx("div",{children:e.jsx(C,{children:e.jsx(b,{...t,columns:B,rows:Y,rowKey:"id",options:{options:{selectable:!0,showTooltip:!0,resizeColumn:!0},slots:{cell:o},emptyState:{title:"No records found",description:"Create a new record to get started"}}})})})},args:{}},A={render:t=>e.jsx("div",{children:e.jsx(C,{children:e.jsx(b,{...t,columns:B,rows:[],rowKey:"id",options:{options:{selectable:!0,showTooltip:!0,resizeColumn:!0},emptyState:{title:"No records found",description:"Create a new record to get started",button:{label:"New Record",variant:"solid",onClick:()=>console.log("New Record")}}}})})}),args:{}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <MemoryRouter>
          <ListView {...args} columns={simple_columns} rows={simple_rows} rowKey="id" />
        </MemoryRouter>
      </div>;
  },
  args: {
    options: {
      options: {
        getRowRoute: row => \`/users/\${row.id}\`,
        selectable: true,
        showTooltip: true,
        resizeColumn: true
      }
    }
  }
}`,...k.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <MemoryRouter>
          <ListView {...args} columns={custom_columns} rows={custom_rows} rowKey="id">
            <>
              <ListHeader>
                {custom_columns.map((column, index) => <ListHeaderItem key={column.key} item={column}>
                    <div className={\`flex items-center gap-2 \${index === 0 ? "ml-4" : ""}\`}>
                      <FeatherIcon name={column.icon} className="h-4 w-4" />
                      <span>{column.label}</span>
                    </div>
                  </ListHeaderItem>)}
              </ListHeader>
              <ListRows>
                {custom_rows.map(row => <ListRow key={row.id} row={row}>
                    {custom_columns.map((column, index) => {
                  //@ts-expects-error
                  const item = row[column.key];
                  return <div className={\`\${index === 0 ? "ml-4" : ""}\`}>
                          <ListRowItem key={column.key} column={column} row={row} item={item} prefix={<>
                                {column.key === "status" && <div className="h-3 w-3 rounded-full" style={{
                        backgroundColor: item.bg_color
                      }} />}
                                {column.key === "name" && <Avatar shape="circle" image={item.image} size="sm" label={item.label} />}
                              </>}>
                            <>
                              {column.key === "role" ? <Badge variant="subtle" theme={item.color} size="md" label={item.label} /> : <span className="font-medium text-ink-gray-7">
                                  {item.label || item}
                                </span>}
                            </>
                          </ListRowItem>
                        </div>;
                })}
                  </ListRow>)}
              </ListRows>
              <ListSelectBanner>
                {({
                unselectAll
              }) => <div className="flex w-full justify-between">
                    <Button variant="ghost" label="Delete" />
                    <Button variant="ghost" label="Unselect all" onClick={unselectAll} />
                  </div>}
              </ListSelectBanner>
            </>
          </ListView>
        </MemoryRouter>
      </div>;
  },
  args: {
    options: {
      options: {
        onRowClick: row => console.log(row),
        selectable: true,
        showTooltip: true,
        resizeColumn: true
      }
    }
  }
}`,...S.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <MemoryRouter>
          <ListView {...args} columns={group_columns} rows={grouped_rows} rowKey="id" options={{
          options: {
            selectable: true,
            showTooltip: true,
            resizeColumn: true,
            getRowRoute: row => \`/users/\${row.id}\`
          }
        }} />
        </MemoryRouter>
      </div>;
  },
  args: {}
}`,...L.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: args => {
    //@ts-expects-error
    const CustomCell = ({
      item,
      column
    }) => {
      if (column.key === "status") {
        return <Badge>{item}</Badge>;
      }
      return <span className="font-medium text-ink-gray-7">{item}</span>;
    };
    return <div>
        <MemoryRouter>
          <ListView {...args} columns={simple_columns} rows={simple_rows} rowKey="id" options={{
          options: {
            selectable: true,
            showTooltip: true,
            resizeColumn: true
          },
          slots: {
            cell: CustomCell
          },
          emptyState: {
            title: "No records found",
            description: "Create a new record to get started"
          }
        }} />
        </MemoryRouter>
      </div>;
  },
  args: {}
}`,...T.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: args => {
    return <div>
        <MemoryRouter>
          <ListView {...args} columns={simple_columns} rows={[]} rowKey="id" options={{
          options: {
            selectable: true,
            showTooltip: true,
            resizeColumn: true
          },
          emptyState: {
            title: "No records found",
            description: "Create a new record to get started",
            button: {
              label: "New Record",
              variant: "solid",
              onClick: () => console.log("New Record")
            }
          }
        }} />
        </MemoryRouter>
      </div>;
  },
  args: {}
}`,...A.parameters?.docs?.source}}};const ke=["SimpleList","CustomList","GroupedRows","CellSlot","EmptyList"];export{T as CellSlot,S as CustomList,A as EmptyList,L as GroupedRows,k as SimpleList,ke as __namedExportsOrder,Ce as default};

import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as o}from"./iframe-C5ToFRAX.js";import{H as A,k as $,B as E,U as G,a as V}from"./combobox-Dtl63kAB.js";import"./preload-helper-PPVm8Dsz.js";import"./label-CSL3Mk2A.js";import"./index-CtTXlRe_.js";import"./index-CmBHVr2C.js";import"./use-resolve-button-type-Dg7Ot-K2.js";import"./focus-management-BcN-g8BK.js";import"./floating-ui.react-dom-CkbDpIad.js";const h=a=>typeof a=="string"?a:a.label,r=a=>typeof a=="string"?a:a.value,J=a=>typeof a=="object"&&!!a.disabled,m=a=>typeof a=="object"?a.icon:void 0,i=({options:a,value:l,placeholder:t,disabled:p,onChange:x,className:B})=>{const u=o.useMemo(()=>{const n=[];return a.forEach(s=>{typeof s=="object"&&"group"in s?n.push(...s.options):n.push(s)}),n},[a]),c=o.useMemo(()=>l?u.find(n=>r(n)===l)??null:null,[l,u]),[b,w]=o.useState(""),k=o.useMemo(()=>{if(!b)return a;const n=s=>h(s).toLowerCase().includes(b.toLowerCase());return a.map(s=>typeof s=="object"&&"group"in s?{...s,options:s.options.filter(n)}:s).filter(s=>typeof s=="string"?n(s):"group"in s?s.options.length:n(s))},[a,b]),I=o.useCallback(n=>{const s=n&&u.find(d=>r(d)===n)||null;x?.(n,s),w(n||"")},[u,x]),R=o.useCallback(n=>{if(!n)return"";const s=u.find(d=>r(d)===n);return s?h(s):""},[u]);return e.jsx(A,{value:l??"",onChange:I,disabled:p,children:e.jsxs("div",{className:`relative w-full ${B??""}`,children:[e.jsxs("div",{className:"relative w-full",children:[c&&m(c)&&e.jsx("span",{className:"absolute left-2 top-1/2 -translate-y-1/2 flex items-center pointer-events-none z-10",children:m(c)}),e.jsx($,{className:`
              w-full border border-surface-gray-2 rounded
              ${c&&m(c)?"pl-8":"pl-2"}
              pr-2 py-1 min-h-[25px] text-base bg-surface-white
              placeholder-ink-gray-4 text-ink-gray-8
              outline-none focus:border-outline-gray-4 focus:ring-2 focus:ring-outline-gray-3
              transition-colors
              disabled:bg-surface-gray-1 disabled:text-ink-gray-5
            `,displayValue:R,value:b,placeholder:t,onChange:n=>w(n.target.value),autoComplete:"off"})]}),e.jsx(E,{className:"absolute inset-y-0 right-0 flex items-center pr-2 text-ink-gray-4",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M4 6l4 4 4-4",fill:"none",stroke:"currentColor",strokeWidth:"2"})})}),e.jsxs(G,{className:`
            absolute z-[100] mt-1 w-full bg-surface-white border border-surface-gray-2 rounded shadow-xl min-w-[160px]
            animate-fade-in
          `,children:[k.length===0&&e.jsx("div",{className:"px-2 py-2 text-ink-gray-5 text-sm",children:"No results found"}),k.map(n=>typeof n=="object"&&"group"in n?e.jsxs("div",{children:[e.jsx("div",{className:"px-2 py-1 text-xs text-ink-gray-5 font-semibold bg-surface-gray-2",children:n.group}),n.options.map(s=>e.jsxs(V,{value:r(s),disabled:J(s),className:({active:d,selected:O,disabled:P})=>`
                        text-ink-gray-8 flex items-center gap-2 px-2 py-1 text-base cursor-pointer truncate 
                        ${P?"opacity-50":""}
                        ${d?"bg-surface-gray-3":""}
                        ${O?"font-bold":""}
                      `,children:[m(s)&&e.jsx("span",{className:"mr-1",children:m(s)}),e.jsx("span",{className:"flex-1",children:h(s)}),c&&r(s)===r(c)&&e.jsx("span",{className:"ml-2 text-green-600",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M4 8l3 3 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2"})})})]},r(s)))]},n.group):e.jsxs(V,{value:r(n),disabled:J(n),className:({active:s,selected:d,disabled:O})=>`
                    text-ink-gray-8 flex items-center gap-2 px-2 py-1 text-base cursor-pointer truncate
                    ${O?"opacity-50":""}
                    ${s?"bg-surface-gray-3":""}
                    ${d?"font-bold":""}
                  `,children:[m(n)&&e.jsx("span",{className:"mr-1",children:m(n)}),e.jsx("span",{className:"flex-1",children:h(n)}),c&&r(n)===r(c)&&e.jsx("span",{className:"ml-2 text-green-600",children:e.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",children:e.jsx("path",{d:"M4 8l3 3 5-5",fill:"none",stroke:"currentColor",strokeWidth:"2"})})})]},r(n)))]})]})})};i.__docgenInfo={description:"",methods:[],displayName:"Combobox"};const Z={title:"Components/Combobox",tags:["autodocs"],component:i,parameters:{layout:"centered"},argTypes:{options:{control:"object",description:"Array of options (strings or objects) to display in the combobox"},value:{control:"text",description:"Currently selected value"},placeholder:{control:"text",description:"Placeholder text when no value is selected"},disabled:{control:"boolean",description:"Whether the combobox is disabled"},onChange:{action:"changed",description:"Event handler called when the selected value changes"},className:{control:"text",description:"Additional CSS classes to apply to the combobox container"}}},M=["John Doe","Jane Doe","John Smith","Jane Smith","John Wayne","Jane Wayne","Alice Johnson","Bob Wilson","Charlie Brown","Diana Prince"],W=[{label:"John Doe",value:"john-doe"},{label:"Jane Doe",value:"jane-doe"},{label:"John Smith",value:"john-smith"},{label:"Jane Smith",value:"jane-smith",disabled:!0},{label:"John Wayne",value:"john-wayne"},{label:"Jane Wayne",value:"jane-wayne"},{label:"Alice Johnson",value:"alice-johnson"},{label:"Bob Wilson",value:"bob-wilson"}],U=[{label:"Dashboard",value:"dashboard",icon:e.jsx("span",{children:"📊"})},{label:"Projects",value:"projects",icon:e.jsx("span",{children:"📁"})},{label:"Tasks",value:"tasks",icon:e.jsx("span",{children:"✅"})},{label:"Calendar",value:"calendar",icon:e.jsx("span",{children:"📅"})},{label:"Reports",value:"reports",icon:e.jsx("span",{children:"📈"})},{label:"Settings",value:"settings",icon:e.jsx("span",{children:"⚙️"})}],T=[{group:"Fruits",options:[{label:"Apple",value:"apple",icon:e.jsx("span",{children:"🍎"})},{label:"Banana",value:"banana",icon:e.jsx("span",{children:"🍌"})},{label:"Orange",value:"orange",icon:e.jsx("span",{children:"🍊"})},{label:"Grape",value:"grape",icon:e.jsx("span",{children:"🍇"})}]},{group:"Vegetables",options:[{label:"Carrot",value:"carrot",icon:e.jsx("span",{children:"🥕"})},{label:"Broccoli",value:"broccoli",icon:e.jsx("span",{children:"🥦"})}]}],D=[{label:"John Doe (Admin)",value:"john-doe",email:"john@example.com",role:"Admin"},{label:"Jane Smith (User)",value:"jane-smith",email:"jane@example.com",role:"User"},{label:"Bob Johnson (Manager)",value:"bob-johnson",email:"bob@example.com",role:"Manager"},{label:"Alice Brown (User)",value:"alice-brown",email:"alice@example.com",role:"User"}],g={args:{options:M,value:"",placeholder:"Select a person",onChange:()=>{}},render:a=>{const[l,t]=o.useState("");return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Simple Options"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None"]})]})}},v={args:{options:W,value:"",placeholder:"Select a person",onChange:()=>{}},render:a=>{const[l,t]=o.useState("");return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Object Options"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None"]})]})}},j={name:"Options with Icons",args:{options:U,value:"",placeholder:"Select an item",onChange:()=>{}},render:a=>{const[l,t]=o.useState("");return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Options with Icons"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None"]})]})}},f={name:"Grouped Options",args:{options:T,value:"",placeholder:"Select a food",onChange:()=>{}},render:a=>{const[l,t]=o.useState("");return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Grouped Options"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None"]})]})}},N={args:{options:M,value:"",placeholder:"This is disabled",disabled:!0,onChange:()=>{}},render:a=>e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Disabled Combobox"}),e.jsx(i,{...a})]})},y={name:"Pre-selected Value",args:{options:W,value:"john-doe",placeholder:"Select a person",onChange:()=>{}},render:a=>{const[l,t]=o.useState("john-doe");return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Pre-selected Value"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None"]})]})}},S={name:"Multiple Selection (Not Implemented)",render:()=>e.jsxs("div",{className:"p-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-2 text-ink-gray-9",children:"Multiple Simple Options"}),e.jsx("div",{className:"text-sm text-gray-600",children:"Not implemented in this Combobox"})]})},C={name:"Complex Objects (Display Value Demo)",args:{options:D,value:"",placeholder:"Select a user",onChange:()=>{}},render:a=>{const[l,t]=o.useState(""),p=D.find(x=>x.value===l);return e.jsxs("div",{className:"flex flex-col w-80",children:[e.jsx("label",{className:"block text-sm font-medium mb-2",children:"Complex Objects"}),e.jsx(i,{...a,value:l,onChange:t}),e.jsxs("div",{className:"mt-2 text-sm text-gray-600",children:["Selected: ",l||"None",p&&e.jsxs("div",{className:"text-xs mt-1",children:[e.jsxs("div",{children:["Email: ",p.email]}),e.jsxs("div",{children:["Role: ",p.role]})]})]})]})}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    options: simpleOptions,
    value: "",
    placeholder: "Select a person",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("");
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Simple Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>;
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    options: objectOptions,
    value: "",
    placeholder: "Select a person",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("");
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Object Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>;
  }
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: "Options with Icons",
  args: {
    options: optionsWithIcons,
    value: "",
    placeholder: "Select an item",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("");
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Options with Icons
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>;
  }
}`,...j.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: "Grouped Options",
  args: {
    options: groupedOptions,
    value: "",
    placeholder: "Select a food",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("");
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Grouped Options
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>;
  }
}`,...f.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    options: simpleOptions,
    value: "",
    placeholder: "This is disabled",
    disabled: true,
    onChange: () => {}
  },
  render: args => <div className="flex flex-col w-80">
          <label className="block text-sm font-medium mb-2">
            Disabled Combobox
          </label>
          <Combobox {...args} />
        </div>
}`,...N.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: "Pre-selected Value",
  args: {
    options: objectOptions,
    value: "john-doe",
    placeholder: "Select a person",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("john-doe");
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Pre-selected Value
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
            </div>
          </div>;
  }
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: "Multiple Selection (Not Implemented)",
  render: () => <div className="p-4">
          <label className="block text-sm font-medium mb-2 text-ink-gray-9">
            Multiple Simple Options
          </label>
          <div className="text-sm text-gray-600">
            Not implemented in this Combobox
          </div>
        </div>
}`,...S.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: "Complex Objects (Display Value Demo)",
  args: {
    options: complexObjects,
    value: "",
    placeholder: "Select a user",
    onChange: () => {}
  },
  render: args => {
    const [val, setVal] = React.useState("");
    const selected = complexObjects.find(o => o.value === val);
    return <div className="flex flex-col w-80">
            <label className="block text-sm font-medium mb-2">
              Complex Objects
            </label>
            <Combobox {...args} value={val} onChange={setVal} />
            <div className="mt-2 text-sm text-gray-600">
              Selected: {val || "None"}
              {selected && <div className="text-xs mt-1">
                  <div>Email: {selected.email}</div>
                  <div>Role: {selected.role}</div>
                </div>}
            </div>
          </div>;
  }
}`,...C.parameters?.docs?.source}}};const ee=["SimpleStringOptions","ObjectOptions","WithIcons","Grouped","DisabledState","PreselectedValue","MultipleSelection","ComplexObject"];export{C as ComplexObject,N as DisabledState,f as Grouped,S as MultipleSelection,v as ObjectOptions,y as PreselectedValue,g as SimpleStringOptions,j as WithIcons,ee as __namedExportsOrder,Z as default};

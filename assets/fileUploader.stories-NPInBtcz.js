import{j as f}from"./jsx-runtime-D_zvdyIk.js";import{r as u}from"./iframe-BjtiHmwT.js";import{M as B,B as A}from"./button-B1ly99NU.js";import"./preload-helper-PPVm8Dsz.js";import"./featherIcon-eOJL9Jb5.js";class C{listeners={};failed=!1;on(i,e){this.listeners[i]=this.listeners[i]||[],this.listeners[i].push(e)}trigger(i,e){(this.listeners[i]||[]).forEach(c=>{c.call(this,e)})}upload(i,e){return new Promise((g,c)=>{const r=new XMLHttpRequest;r.upload.addEventListener("loadstart",()=>{this.trigger("start")}),r.upload.addEventListener("progress",a=>{a.lengthComputable&&this.trigger("progress",{uploaded:a.loaded,total:a.total})}),r.upload.addEventListener("load",()=>{this.trigger("finish")}),r.addEventListener("error",()=>{this.trigger("error"),c()}),r.onreadystatechange=()=>{if(r.readyState==XMLHttpRequest.DONE){let a;if(r.status===200){let l=null;try{l=JSON.parse(r.responseText)}catch{l=r.responseText}let d;l&&typeof l=="object"&&l!==null&&"message"in l?d=l.message:d=l,g(d)}else if(r.status===403)a=JSON.parse(r.responseText);else{this.failed=!0;try{a=JSON.parse(r.responseText)}catch{}}if(a&&typeof a=="object"&&a!==null&&"exc"in a&&typeof a.exc=="string")try{console.error(JSON.parse(a.exc)[0])}catch{}c(a)}};const y=e.upload_endpoint||"/api/method/upload_file";r.open("POST",y,!0),r.setRequestHeader("Accept","application/json"),window.csrf_token&&window.csrf_token!=="{{ csrf_token }}"&&r.setRequestHeader("X-Frappe-CSRF-Token",window.csrf_token);const t=new FormData;if(i&&t.append("file",i,i.name),t.append("is_private",e.private?"1":"0"),t.append("folder",e.folder||"Home"),e.file_url&&t.append("file_url",e.file_url),e.doctype&&t.append("doctype",e.doctype),e.docname&&t.append("docname",e.docname),e.fieldname&&t.append("fieldname",e.fieldname),e.method&&t.append("method",e.method),e.type&&t.append("type",e.type),e.optimize&&(t.append("optimize","1"),e.max_width&&t.append("max_width",e.max_width.toString()),e.max_height&&t.append("max_height",e.max_height.toString())),e.params)for(const[a,l]of Object.entries(e.params))typeof l=="string"||l instanceof Blob?t.append(a,l):t.append(a,String(l));r.send(t)})}}const w=({fileTypes:s,uploadArgs:i,validateFile:e,children:g,onSuccess:c,onFailure:r})=>{const y=u.useRef(null),[t,a]=u.useState(null),[l,d]=u.useState(!1),[k,S]=u.useState(0),[b,q]=u.useState(0),[F,p]=u.useState(null),[x,U]=u.useState(null),[R,_]=u.useState(!1),j=b?Math.floor(k/b*100):0,T=R&&!F,E=u.useCallback(()=>{y.current?.click()},[]),N=async v=>{p(null);const o=v.target.files?.[0]||null;if(a(o),o&&e)try{const n=await e(o);if(n){p(n);return}}catch(n){n&&typeof n=="object"&&"message"in n?p(n.message||String(n)):p(String(n));return}!F&&o&&O(o)},O=v=>{p(null),S(0),q(0),_(!1);const o=new C;o.on("start",()=>d(!0)),o.on("progress",n=>{if(n&&typeof n=="object"&&n!==null&&"uploaded"in n&&"total"in n){const{uploaded:m,total:M}=n;S(m),q(M)}}),o.on("error",()=>{d(!1),p("Error Uploading File")}),o.on("finish",()=>{d(!1),_(!0)}),o.upload(v,i||{}).then(n=>{U(n),c?.(n)}).catch(n=>{d(!1);let m="Error Uploading File";if(n&&typeof n=="object"&&n!==null&&"_server_messages"in n)try{m=JSON.parse(JSON.parse(n._server_messages)[0]).message}catch{}else if(n&&typeof n=="object"&&n!==null&&"exc"in n)try{m=JSON.parse(n.exc)[0].split(`
`).slice(-2,-1)[0]}catch{}p(m),r?.(n)})};return f.jsxs("div",{children:[f.jsx("input",{ref:y,type:"file",accept:Array.isArray(s)?s.join(","):s,className:"hidden",onChange:N}),g({file:t,uploading:l,progress:j,uploaded:k,uploadedFile:x,error:F,total:b,success:T,openFileSelector:E})]})};w.__docgenInfo={description:"",methods:[],displayName:"FileUploader",props:{fileTypes:{required:!1,tsType:{name:"union",raw:"string | string[]",elements:[{name:"string"},{name:"Array",elements:[{name:"string"}],raw:"string[]"}]},description:""},uploadArgs:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  private?: boolean;
  folder?: string;
  file_url?: string;
  doctype?: string;
  docname?: string;
  fieldname?: string;
  method?: string;
  type?: string;
  upload_endpoint?: string;
  optimize?: boolean;
  max_width?: number;
  max_height?: number;
  params?: Record<string, string | Blob | number | boolean>;
}`,signature:{properties:[{key:"private",value:{name:"boolean",required:!1}},{key:"folder",value:{name:"string",required:!1}},{key:"file_url",value:{name:"string",required:!1}},{key:"doctype",value:{name:"string",required:!1}},{key:"docname",value:{name:"string",required:!1}},{key:"fieldname",value:{name:"string",required:!1}},{key:"method",value:{name:"string",required:!1}},{key:"type",value:{name:"string",required:!1}},{key:"upload_endpoint",value:{name:"string",required:!1}},{key:"optimize",value:{name:"boolean",required:!1}},{key:"max_width",value:{name:"number",required:!1}},{key:"max_height",value:{name:"number",required:!1}},{key:"params",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | Blob | number | boolean",elements:[{name:"string"},{name:"Blob"},{name:"number"},{name:"boolean"}]}],raw:"Record<string, string | Blob | number | boolean>",required:!1}}]}},description:""},validateFile:{required:!1,tsType:{name:"signature",type:"function",raw:`(
  file: File
) => Promise<string | null | undefined> | string | null | undefined`,signature:{arguments:[{type:{name:"File"},name:"file"}],return:{name:"union",raw:"Promise<string | null | undefined> | string | null | undefined",elements:[{name:"Promise",elements:[{name:"union",raw:"string | null | undefined",elements:[{name:"string"},{name:"null"},{name:"undefined"}]}],raw:"Promise<string | null | undefined>"},{name:"string"},{name:"null"},{name:"undefined"}]}}},description:""},children:{required:!0,tsType:{name:"signature",type:"function",raw:`(args: {
  file: File | null;
  uploading: boolean;
  progress: number;
  uploaded: number;
  uploadedFile: UploadedFile | null;
  error: string | null;
  total: number;
  success: boolean;
  openFileSelector: () => void;
}) => React.ReactNode`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  file: File | null;
  uploading: boolean;
  progress: number;
  uploaded: number;
  uploadedFile: UploadedFile | null;
  error: string | null;
  total: number;
  success: boolean;
  openFileSelector: () => void;
}`,signature:{properties:[{key:"file",value:{name:"union",raw:"File | null",elements:[{name:"File"},{name:"null"}],required:!0}},{key:"uploading",value:{name:"boolean",required:!0}},{key:"progress",value:{name:"number",required:!0}},{key:"uploaded",value:{name:"number",required:!0}},{key:"uploadedFile",value:{name:"union",raw:"UploadedFile | null",elements:[{name:"UploadedFile"},{name:"null"}],required:!0}},{key:"error",value:{name:"union",raw:"string | null",elements:[{name:"string"},{name:"null"}],required:!0}},{key:"total",value:{name:"number",required:!0}},{key:"success",value:{name:"boolean",required:!0}},{key:"openFileSelector",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}},name:"args"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}}},description:""},onSuccess:{required:!1,tsType:{name:"signature",type:"function",raw:"(data: UploadedFile) => void",signature:{arguments:[{type:{name:"UploadedFile"},name:"data"}],return:{name:"void"}}},description:""},onFailure:{required:!1,tsType:{name:"signature",type:"function",raw:"(error: unknown) => void",signature:{arguments:[{type:{name:"unknown"},name:"error"}],return:{name:"void"}}},description:""}}};const X={title:"Components/FileUploader",component:w,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{fileTypes:{control:"object",description:"Array of accepted file MIME types (e.g., ['image/*', 'application/pdf'])"},validateFile:{description:"Function to validate the selected file before upload"},onSuccess:{description:"Callback function called upon successful file upload"},children:{description:"Render prop function that provides upload state and controls"},onFailure:{description:"Callback function called upon failed file upload"},uploadArgs:{control:"object",description:"Additional arguments for the upload request"}}},J=async s=>s.type.startsWith("image/")?s.size>2*1024*1024?"File must be under 2MB.":null:"Only image files are allowed.",H=s=>{console.log("Upload success:",s)},h={render:()=>f.jsx(B,{children:f.jsx(w,{fileTypes:["image/*"],validateFile:J,onSuccess:H,children:({uploading:s,progress:i,openFileSelector:e})=>f.jsx(A,{onClick:e,loading:s,children:s?`Uploading ${i}%`:"Upload Image"})})})};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <MemoryRouter>
          <FileUploader fileTypes={["image/*"]} validateFile={validateFileFunction} onSuccess={onSuccess}>
            {({
        uploading,
        progress,
        openFileSelector
      }) => <Button onClick={openFileSelector} loading={uploading}>
                {uploading ? \`Uploading \${progress}%\` : "Upload Image"}
              </Button>}
          </FileUploader>
        </MemoryRouter>
}`,...h.parameters?.docs?.source}}};const $=["Default"];export{h as Default,$ as __namedExportsOrder,X as default};

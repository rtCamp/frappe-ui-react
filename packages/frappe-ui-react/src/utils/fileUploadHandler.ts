declare global {
  interface Window {
    csrf_token?: string;
  }
}

export type UploadOptions = {
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
};

export interface UploadedFile {
  file_name: string;
  file_size: number;
  file_url: string;
  name?: string;
  owner?: string;
  creation?: string;
  modified?: string;
  modified_by?: string;
  is_private?: 0 | 1;
  file_type?: string;
  folder?: string;
  is_folder?: 0 | 1;
  content_hash?: string;
}

export class FileUploadHandler {
  listeners: { [event: string]: Array<(data?: unknown) => void> } = {};
  failed = false;

  on(
    event: "start" | "progress" | "finish" | "error",
    handler: (data?: unknown) => void
  ) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(handler);
  }

  trigger(event: string, data?: unknown) {
    const handlers = this.listeners[event] || [];
    handlers.forEach((handler) => {
      handler.call(this, data);
    });
  }

  upload(file: File | null, options: UploadOptions): Promise<UploadedFile> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("loadstart", () => {
        this.trigger("start");
      });
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          this.trigger("progress", {
            uploaded: e.loaded,
            total: e.total,
          });
        }
      });
      xhr.upload.addEventListener("load", () => {
        this.trigger("finish");
      });
      xhr.addEventListener("error", () => {
        this.trigger("error");
        reject();
      });
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          let error: unknown;
          if (xhr.status === 200) {
            let r: unknown = null;
            try {
              r = JSON.parse(xhr.responseText);
            } catch {
              r = xhr.responseText;
            }
            let out: UploadedFile;
            if (r && typeof r === "object" && r !== null && "message" in r) {
              out = (r as { message: UploadedFile }).message;
            } else {
              out = r as UploadedFile;
            }
            resolve(out);
          } else if (xhr.status === 403) {
            error = JSON.parse(xhr.responseText);
          } else {
            this.failed = true;
            try {
              error = JSON.parse(xhr.responseText);
            } catch {
              // pass
            }
          }
          if (
            error &&
            typeof error === "object" &&
            error !== null &&
            "exc" in error &&
            typeof (error as { exc?: unknown }).exc === "string"
          ) {
            try {
              console.error(JSON.parse((error as { exc: string }).exc)[0]);
            } catch {
              // ignore JSON parse error
            }
          }
          reject(error);
        }
      };

      const uploadEndpoint =
        options.upload_endpoint || "/api/method/upload_file";
      xhr.open("POST", uploadEndpoint, true);
      xhr.setRequestHeader("Accept", "application/json");

      if (window.csrf_token && window.csrf_token !== "{{ csrf_token }}") {
        xhr.setRequestHeader("X-Frappe-CSRF-Token", window.csrf_token);
      }

      const form_data = new FormData();
      if (file) {
        form_data.append("file", file, file.name);
      }
      form_data.append("is_private", options.private ? "1" : "0");
      form_data.append("folder", options.folder || "Home");

      if (options.file_url) {
        form_data.append("file_url", options.file_url);
      }
      if (options.doctype) {
        form_data.append("doctype", options.doctype);
      }
      if (options.docname) {
        form_data.append("docname", options.docname);
      }
      if (options.fieldname) {
        form_data.append("fieldname", options.fieldname);
      }
      if (options.method) {
        form_data.append("method", options.method);
      }
      if (options.type) {
        form_data.append("type", options.type);
      }
      if (options.optimize) {
        form_data.append("optimize", "1");
        if (options.max_width) {
          form_data.append("max_width", options.max_width.toString());
        }
        if (options.max_height) {
          form_data.append("max_height", options.max_height.toString());
        }
      }
      if (options.params) {
        for (const [k, v] of Object.entries(options.params)) {
          // Only append string or Blob, convert others to string
          if (typeof v === "string" || v instanceof Blob) {
            form_data.append(k, v);
          } else {
            form_data.append(k, String(v));
          }
        }
      }
      xhr.send(form_data);
    });
  }
}

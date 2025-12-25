import { useState, useCallback } from "react";

export interface UploadOptions {
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
  params?: object;
}

export interface UploadState {
  uploading: boolean;
  progress: number;
  uploaded: number;
  total: number;
  error: Error | null;
  result: UploadedFile | null;
}

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

export function useFileUpload() {
  const [state, setState] = useState<UploadState>({
    uploading: false,
    progress: 0,
    uploaded: 0,
    total: 0,
    error: null,
    result: null,
  });

  const reset = useCallback(() => {
    setState({
      uploading: false,
      progress: 0,
      uploaded: 0,
      total: 0,
      error: null,
      result: null,
    });
  }, []);

  const upload = useCallback(
    (file: File, options: UploadOptions = {}): Promise<UploadedFile> => {
      reset();
      setState((prev) => ({ ...prev, uploading: true }));

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        // Set up event listeners
        xhr.upload.addEventListener("loadstart", () => {
          setState((prev) => ({
            ...prev,
            uploading: true,
            error: null,
          }));
        });

        xhr.upload.addEventListener("progress", (e) => {
          if (e.lengthComputable) {
            setState((prev) => ({
              ...prev,
              uploaded: e.loaded,
              total: e.total,
              progress: Math.round((e.loaded / e.total) * 100),
            }));
          }
        });

        xhr.upload.addEventListener("load", () => {
          setState((prev) => ({ ...prev, progress: 100 }));
        });

        xhr.addEventListener("error", () => {
          const err = new Error("Upload failed");
          setState((prev) => ({
            ...prev,
            uploading: false,
            error: err,
          }));
          reject(err);
        });

        xhr.onreadystatechange = () => {
          if (xhr.readyState == XMLHttpRequest.DONE) {
            let error;
            if (xhr.status === 200) {
              let r = null;
              try {
                r = JSON.parse(xhr.responseText);
              } catch {
                r = xhr.responseText;
              }

              const result = (r.message || r) as UploadedFile;
              setState((prev) => ({ ...prev, result }));
              resolve(result);
            } else if (xhr.status === 403) {
              error = JSON.parse(xhr.responseText);
            } else {
              try {
                error = JSON.parse(xhr.responseText);
              } catch {
                error = "Upload failed";
              }
            }

            if (error) {
              let exception;
              const errorParts = [
                [error.exc_type, error._error_message].filter(Boolean).join(" "),
              ];
              if (error.exc) {
                exception = error.exc;
                try {
                  exception = JSON.parse(exception)[0];
                  console.log(exception);
                  // eslint-disable-next-line no-empty
                } catch {}
              }
              const e = new Error(errorParts.join("\n"));
              let messages = error._server_messages
                ? JSON.parse(error._server_messages)
                : [];
              messages = messages
                .map((m: string) => {
                  try {
                    return JSON.parse(m).message;
                  } catch {
                    return m;
                  }
                })
                .filter(Boolean);
              if (!messages.length) {
                messages = error._error_message
                  ? [error._error_message]
                  : ["Internal Server Error"];
              }
              e.message = messages.join("\n");
              setState((prev) => ({ ...prev, error: e }));
              reject(e);
            }

            setState((prev) => ({ ...prev, uploading: false }));
          }
        };

        const uploadEndpoint =
          options.upload_endpoint || "/api/method/upload_file";
        xhr.open("POST", uploadEndpoint, true);
        xhr.setRequestHeader("Accept", "application/json");

        if (window.csrf_token && window.csrf_token !== "{{ csrf_token }}") {
          xhr.setRequestHeader("X-Frappe-CSRF-Token", window.csrf_token);
        }

        const formData = new FormData();
        if (file) {
          formData.append("file", file, file.name);
        }

        formData.append("is_private", options.private ? "1" : "0");
        formData.append("folder", options.folder || "Home");

        if (options.file_url) {
          formData.append("file_url", options.file_url);
        }

        if (options.doctype) {
          formData.append("doctype", options.doctype);
        }

        if (options.docname) {
          formData.append("docname", options.docname);
        }

        if (options.fieldname) {
          formData.append("fieldname", options.fieldname);
        }

        if (options.method) {
          formData.append("method", options.method);
        }

        if (options.type) {
          formData.append("type", options.type);
        }

        if (options.optimize) {
          formData.append("optimize", "1");
          if (options.max_width) {
            formData.append("max_width", options.max_width.toString());
          }
          if (options.max_height) {
            formData.append("max_height", options.max_height.toString());
          }
        }
        if (options.params) {
          for (const [k, v] of Object.entries(options.params)) {
            formData.append(k, v as string);
          }
        }

        xhr.send(formData);
      });
    },
    [reset]
  );

  return {
    upload,
    reset,
    state,
    isUploading: state.uploading,
    progress: state.progress,
    error: state.error,
    result: state.result,
  };
}

// Add the Window interface for typescript
declare global {
  interface Window {
    csrf_token?: string;
  }
}

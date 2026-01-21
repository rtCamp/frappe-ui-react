import React, { useRef, useState, useCallback } from "react";
import { FileUploadHandler, type UploadOptions, type UploadedFile } from "../../utils";

export interface FileUploaderProps {
  fileTypes?: string | string[];
  uploadArgs?: UploadOptions;
  validateFile?: (
    file: File
  ) => Promise<string | null | undefined> | string | null | undefined;
  children: (args: {
    file: File | null;
    uploading: boolean;
    progress: number;
    uploaded: number;
    uploadedFile: UploadedFile | null;
    error: string | null;
    total: number;
    success: boolean;
    openFileSelector: () => void;
  }) => React.ReactNode;
  onSuccess?: (data: UploadedFile) => void;
  onFailure?: (error: unknown) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileTypes,
  uploadArgs,
  validateFile,
  children,
  onSuccess,
  onFailure,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [finishedUploading, setFinishedUploading] = useState(false);

  const progress = total ? Math.floor((uploaded / total) * 100) : 0;
  const success = finishedUploading && !error;

  const openFileSelector = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const onFileAdd = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0] || null;
    setFile(file);

    if (file && validateFile) {
      try {
        const msg = await validateFile(file);
        if (msg) {
          setError(msg);
          return;
        }
      } catch (err: unknown) {
        if (err && typeof err === "object" && "message" in err) {
          setError((err as { message?: string }).message || String(err));
        } else {
          setError(String(err));
        }
        return;
      }
    }

    if (!error && file) {
      uploadFile(file);
    }
  };

  const uploadFile = (file: File) => {
    setError(null);
    setUploaded(0);
    setTotal(0);
    setFinishedUploading(false);

    const uploader = new FileUploadHandler();
    uploader.on("start", () => setUploading(true));
    uploader.on("progress", (data?: unknown) => {
      if (
        data &&
        typeof data === "object" &&
        data !== null &&
        "uploaded" in data &&
        "total" in data
      ) {
        const { uploaded, total } = data as { uploaded: number; total: number };
        setUploaded(uploaded);
        setTotal(total);
      }
    });
    uploader.on("error", () => {
      setUploading(false);
      setError("Error Uploading File");
    });
    uploader.on("finish", () => {
      setUploading(false);
      setFinishedUploading(true);
    });

    uploader
      .upload(file, uploadArgs || {})
      .then((data: UploadedFile) => {
        setUploadedFile(data);
        onSuccess?.(data);
      })
      .catch((err: unknown) => {
        setUploading(false);
        let errorMessage = "Error Uploading File";
        if (
          err &&
          typeof err === "object" &&
          err !== null &&
          "_server_messages" in err
        ) {
          try {
            errorMessage = JSON.parse(
              JSON.parse(
                (err as { _server_messages: string })._server_messages
              )[0]
            ).message;
          } catch {
            // ignore JSON parse error
          }
        } else if (
          err &&
          typeof err === "object" &&
          err !== null &&
          "exc" in err
        ) {
          try {
            errorMessage = JSON.parse((err as { exc: string }).exc)[0]
              .split("\n")
              .slice(-2, -1)[0];
          } catch {
            // ignore JSON parse error
          }
        }
        setError(errorMessage);
        onFailure?.(err);
      });
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={Array.isArray(fileTypes) ? fileTypes.join(",") : fileTypes}
        className="hidden"
        onChange={onFileAdd}
      />
      {children({
        file,
        uploading,
        progress,
        uploaded,
        uploadedFile,
        error,
        total,
        success,
        openFileSelector,
      })}
    </div>
  );
};

export default FileUploader;

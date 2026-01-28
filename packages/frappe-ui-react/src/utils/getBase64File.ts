import type { UploadedFile } from "./fileUploadHandler";

export const getBase64File = async (file: File): Promise<UploadedFile> => {
  const base64Url = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject(new Error("Failed to read file as base64"));
      }
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });

  return {
    file_name: file.name,
    file_size: file.size,
    file_url: base64Url,
  };
};

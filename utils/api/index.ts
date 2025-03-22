import { fileUpload } from "@/src/app/api/services/file-upload";

export const getApiErrorMessage = (error: any) => {
  return error?.message || error;
};

export const getUrl = async (file: File | string) => {
  return typeof file === "string" ? file : (await fileUpload(file)).url;
};

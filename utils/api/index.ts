import { fileUpload } from "@/src/app/api/services/file-upload";

export const getApiErrorMessage = (error: any) => {
  return error?.message || error;
};

export const getUrl = async (file: File) => {
  return (await fileUpload(file)).url;
};

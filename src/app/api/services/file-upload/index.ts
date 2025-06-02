import { post } from "../../http-requests";

type FileUploadResponse = {
  message: string;
  url: string;
};

export const fileUpload = async (
  payload: File
): Promise<FileUploadResponse> => {
  const formData = new FormData();
  formData.append("file", payload);
  return await post("upload/file", formData);
};

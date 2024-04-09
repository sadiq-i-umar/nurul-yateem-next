import { baseUrl } from "../../utils/constant";
import { request } from "../../utils/request";

export const UpdateAccount = async (Data: any, token: any) => {
  const res = await request("POST", `${baseUrl}/guardian/update-account`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });

  return res;
};
export const AddOphanApi = async (Data: any, token: any) => {
  const res = await request("POST", `${baseUrl}/guardian/add-orphan`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });

  return res;
};

export const EditOrphanApi = async (Data: any, token: any, id: number) => {
  const res = await request("PUT", `${baseUrl}/guardian/edit-orphan/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    data: Data,
  });

  return res;
};

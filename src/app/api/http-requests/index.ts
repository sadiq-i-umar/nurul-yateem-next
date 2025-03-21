import { baseUrl } from "@/constants";
import axios from "axios";
import { getAuthHeader } from "./headers";

export const get = async (endpoint: string, params?: object) => {
  const authHeader = await getAuthHeader();
  try {
    const res = await axios.get(`${baseUrl}/${endpoint}`, {
      headers: {
        Accept: "*/*",
        ...authHeader.headers,
      },
      params: params,
    });
    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
};

export const post = async (endpoint: string, data?: object) => {
  const authHeader = await getAuthHeader();
  try {
    const res = await axios.post(`${baseUrl}/${endpoint}`, data, {
      headers: {
        Accept: "*/*",
        ...authHeader.headers,
      },
    });
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(error.response?.data || error.message);
    }
    return Promise.reject(error);
  }
};

export const put = async (endpoint: string, data: object) => {
  const authHeader = await getAuthHeader();
  const res = await axios.put(`${baseUrl}/${endpoint}`, data, {
    headers: {
      Accept: "*/*",
      ...authHeader.headers,
    },
  });
  return res;
};

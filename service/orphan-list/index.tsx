import { baseUrl } from "../../utils/constant";
import { request } from "../../utils/request";

export const getOrphans = async (token: any) => {
    const res = await request("GET", `${baseUrl}/guardian/guardian/orphans`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    return res;
  };
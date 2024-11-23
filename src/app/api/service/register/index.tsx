
// export const updateAiProfile = async (token: string, AiprofileData: any) => {
//   const res = await request("PUT", `${baseUrl}/v1/angel-investor/profile`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     data: AiprofileData,
//   });

import { baseUrl } from "@/constants";
import { request } from "@/utils/request";

//   return res;
// };

export const RegisterUser = async (RegisterData: any) => {
  const res = await request("POST", `${baseUrl}/v1/user`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: RegisterData,
  });

  return res;
};

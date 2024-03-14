import { baseUrl } from "../../utils/constant";
import { request } from "../../utils/request";

// export const updateAiProfile = async (token: string, AiprofileData: any) => {
//   const res = await request("PUT", `${baseUrl}/v1/angel-investor/profile`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     data: AiprofileData,
//   });

//   return res;
// };

export const RegisterUser = async (RegisterData: any) => {
  const res = await request("POST", `${baseUrl}/register`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: RegisterData,
  });

  return res;
};

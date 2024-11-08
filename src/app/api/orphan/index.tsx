"use server";

import { getServerSession } from "next-auth";

import { request } from "@/utils/request";
import { authOptions } from "../auth/[...nextauth]/options";
import { api } from "@/constants";

export const createOrphan = async (payload: any) => {
  const session = await getServerSession(authOptions);

  return request("POST", api.addOrphan, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.token.accessToken}`,
    },
    data: payload,
  });
};

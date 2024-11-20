import { OrphanProps } from "@/types";
import { baseUrl } from "../../utils/constant";
import { request } from "../../utils/request";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export const getOrphans = async (token: string): Promise<OrphanProps[]> => {
  const res = await request("GET", `${baseUrl}/v1/orphan`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // Ensure the response is of the correct type
  return res as Promise<OrphanProps[]>;
};

export const deleteOrphanRequest = async (payload: { orphanId: any; deletionReason: string }, token: string) => {
  

  const res = await request("DELETE", `http://localhost:3002/api/v1/orphan/deletion-request`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
        data: payload

  });

  return res;
};



export const GetOphansDetails = async (token: any, id: any) => {
  const res = await request("GET", `${baseUrl}/guardian/orphans/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res;
};


"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export const getAuthHeader = async () => {
  const session = await getServerSession(authOptions);
  return {
    headers: {
      Authorization: `Bearer ${session?.user.token.accessToken}`,
    },
  };
};

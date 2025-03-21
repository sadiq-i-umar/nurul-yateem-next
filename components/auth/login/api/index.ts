import { get } from "@/src/app/api/http-requests";
import { User } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getApiErrorMessage } from "../../../../utils/api";

const useLoginApi = () => {
  const login = async (payload: { email: string; password: string }) => {
    try {
      const res = await signIn("credentials", {
        email: payload.email,
        password: payload.password,
        redirect: false,
      });
      switch (res?.status) {
        case 200:
          alert("Login successful");
          const session = await getSession();
          const roles: ("guardian" | "sponsor" | "admin")[] =
            session?.user.profile.roles;
          if (roles.includes("guardian")) {
            const userId = session?.user.id;
            if (userId) getProfile.mutateAsync(userId);
          }
          break;
        case 401:
          alert("Invalid login details");
          break;
        default:
          alert("Login Failed");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const router = useRouter();

  const getProfile = useMutation({
    mutationFn: (id: string): Promise<AxiosResponse<User>> =>
      get(`v1/user/${id}`),
    onSuccess: (res) => {
      const homeAddress = res.data.profile.homeAddress;
      console.log(res);
      if (homeAddress === null) {
        alert("Complete your account"),
          router.push("/dashboard/complete-account");
      } else {
        getMyOrphans.mutateAsync();
      }
    },
    onError: (error) => {
      alert(getApiErrorMessage(error)), signOut({ redirect: false });
    },
  });

  const getMyOrphans = useMutation({
    mutationFn: (): Promise<AxiosResponse> => get("v1/orphan/mine"), //TODO: Include Orphan interface in the promise
    onSuccess: (res) => {
      const orphans = res.data;
      if (orphans.length < 1) {
        router.push("/dashboard/add-orphans");
      } else {
        router.push("/dashboard/guardian/home");
      }
    },
    onError: () => {
      alert("An error occured");
    },
  });

  return { login };
};

export default useLoginApi;

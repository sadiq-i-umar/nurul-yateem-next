import { post } from "@/src/app/api/http-requests";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { AccountSetupPayload } from "./types";

const useCompleteAccountApi = () => {
  const router = useRouter();
  const completeAccount = useMutation({
    mutationFn: (payload: AccountSetupPayload): Promise<AxiosResponse> =>
      post("v1/user/account-setup", payload),
    onSuccess: () => {
      alert("Profile submitted successfully");
      router.push("/login");
    },
    onError: () => {
      alert("An error occured");
    },
  });

  return { completeAccount };
};

export default useCompleteAccountApi;

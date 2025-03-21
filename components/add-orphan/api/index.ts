import { post } from "@/src/app/api/http-requests";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { AddOrphanPayload } from "./types";

const useAddOrphanApi = () => {
  const router = useRouter();
  const addOrphan = useMutation({
    mutationFn: (payload: AddOrphanPayload): Promise<AxiosResponse> =>
      post("v1/orphan", payload),
    onSuccess: () => {
      alert("Orphan successfully added");
      router.push("/dashboard/add-orphan-success");
    },
    onError: () => alert("An error occured"),
  });
  return { addOrphan };
};

export default useAddOrphanApi;

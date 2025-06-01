import { post } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { PerformActionMutationProps } from "../types";

const useActionApi = ({ onSuccess }: { onSuccess?: () => void }) => {
  const performActionMutation = useMutation({
    mutationFn: (args?: PerformActionMutationProps): Response =>
      post(`v1/action`, args?.data, args?.params),
    onSuccess: () => {
      alert("Action performed successfully");
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });

  return { performActionMutation };
};

export default useActionApi;

import { HookFormProps } from "@/components/form";
import { queryKey } from "@/constants/query-key";
import { post, put } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddEditOrphanPayload } from "./types";

const useAddOrphanApi = ({
  orphanId,
  hookForm,
  onSuccess,
}: {
  orphanId?: string;
  hookForm?: Pick<HookFormProps, "reset">;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const addOrphan = useMutation({
    mutationFn: (payload: AddEditOrphanPayload): Response =>
      (orphanId ? put : post)(
        `v1/orphan${orphanId ? `/${orphanId}` : ""}`,
        payload
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.myOrphans] });
      alert(`Orphan successfully ${orphanId ? "edited" : "added"}`);
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => alert("An error occured"),
  });
  return { addOrphan };
};

export default useAddOrphanApi;

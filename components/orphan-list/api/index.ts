import { HookFormProps } from "@/components/form";
import { queryKey } from "@/constants/query-key";
import { deleteRequest, get, post } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Orphan } from "./types";

const useOrphanListApi = (hookForm?: HookFormProps, onSuccess?: () => void) => {
  const queryClient = useQueryClient();

  const getAllOrphans = useQuery({
    queryKey: [queryKey.allOrphans],
    queryFn: (): Response<Orphan[]> => get("v1/orphan"),
  });

  const getMyOrphans = useQuery({
    queryKey: [queryKey.myOrphans],
    queryFn: (): Response<Orphan[]> => get("v1/orphan/mine"),
  });

  const deleteOrphan = useMutation({
    mutationFn: (id: string): Response =>
      deleteRequest(`v1/orphan/${id}/delete`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.myOrphans] });
      alert("Orphan deleted successfully");
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const submitOrphan = useMutation({
    mutationFn: (id: string): Response => post(`v1/orphan/${id}/submit`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.myOrphans] });
      alert("Submitted for approval");
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const approveOrphan = useMutation({
    mutationFn: (id: string): Response => post(`v1/orphan/${id}/approve`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.allOrphans] });
      alert("Orphan approved successfully");
    },
    onError: () => {
      alert("An error occured");
    },
  });

  const rejectOrphan = useMutation({
    mutationFn: (payload: { id?: string; reason: string }): Response =>
      post(`v1/orphan/${payload.id}/reject`, { reason: payload.reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.allOrphans] });
      alert("Orphan rejected");
      hookForm?.reset();
      onSuccess?.();
    },
    onError: () => {
      alert("An error occured");
    },
  });

  return {
    getAllOrphans,
    getMyOrphans,
    deleteOrphan,
    submitOrphan,
    approveOrphan,
    rejectOrphan,
  };
};

export default useOrphanListApi;

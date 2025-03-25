import { HookFormProps } from "@/components/form";
import { queryKey } from "@/constants/query-key";
import { get, post } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateSponsorshipRequestDto } from "./types";

const useSponsorshipRequestApi = ({
  hookForm,
  onSuccess,
}: {
  hookForm: HookFormProps;
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const createSponsorshipRequest = useMutation({
    mutationFn: (payload: CreateSponsorshipRequestDto): Response =>
      post("sponsorship-requests/request", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Sponsorship request created successfully");
      onSuccess?.();
      hookForm.reset();
    },
    onError: () => alert("An error occurred"),
  });

  const getMySponsorshipRequests = useQuery({
    queryKey: [queryKey.mySponsorshipRequests],
    queryFn: (): Response<SponsorshipRequest[]> =>
      get("sponsorship-requests/mine"),
  });

  return { createSponsorshipRequest, getMySponsorshipRequests };
};

export default useSponsorshipRequestApi;

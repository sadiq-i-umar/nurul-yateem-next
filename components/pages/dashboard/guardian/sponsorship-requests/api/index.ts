import { queryKey } from "@/constants/query-key";
import { deleteRequest, get } from "@/src/app/api/http-requests";
import { Response } from "@/types/api";
import { SponsorshipRequest } from "@/types/sponsorship-requests";
import { Status } from "@/types/status";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSponsorshipRequestApi = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  const getQuery = (status?: Status) => (): Response<SponsorshipRequest[]> =>
    get("sponsorship-requests", { status: status });

  const getApprovalRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.approval_requested],
    queryFn: getQuery(Status.approval_requested),
  });

  const getEditRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.edit_requested],
    queryFn: getQuery(Status.edit_requested),
  });

  const getPublishRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.publish_requested],
    queryFn: getQuery(Status.publish_requested),
  });

  const getReopenPublishRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.reopen_publish_requested],
    queryFn: getQuery(Status.reopen_publish_requested),
  });

  const getReopenRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.reopen_requested],
    queryFn: getQuery(Status.reopen_requested),
  });

  const getPublishedRequests = useQuery({
    queryKey: [queryKey.sponsorshipRequests, Status.published],
    queryFn: getQuery(Status.published),
  });

  const getMySponsorshipRequests = useQuery({
    queryKey: [queryKey.mySponsorshipRequests],
    queryFn: (): Response<SponsorshipRequest[]> =>
      get("sponsorship-requests/mine"),
  });

  const deleteSupportingDocument = useMutation({
    mutationFn: (payload: { id?: string; attachmentId?: string }) =>
      deleteRequest(
        `sponsorship-requests/${payload.id}/attachments/${payload.attachmentId}`
      ),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: [queryKey.mySponsorshipRequests],
      });
      alert("Supporting document deleted successfully");
      onSuccess?.();
    },
    onError: () => {
      alert("An error occured");
    },
  });

  return {
    getMySponsorshipRequests,
    getApprovalRequests,
    getEditRequests,
    getPublishRequests,
    getReopenPublishRequests,
    getReopenRequests,
    getPublishedRequests,
    deleteSupportingDocument,
  };
};

export default useSponsorshipRequestApi;
